import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { NgForm } from '@angular/forms';
import State from '../interfaces/state';
import { createDate } from '../common/rabbit';
import * as moment from 'moment';
import Config from '../interfaces/Config';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-state',
    templateUrl: './add-state.page.html',
    styleUrls: ['./add-state.page.scss']
})
export class AddStatePage implements OnInit {
    rabbit: Rabbit;
    config: Config;
    currentState: State;
    statesArr = ['تلقيح', 'جس', 'ولادة', 'فطام'];
    state = '1';
    positive = true;
    date: string;
    alive: number;
    dead: number;
    maleNo: number;
    notes: string;
    segmentVal = '1';

    constructor(
        private router: Router,
        private db: DatabaseService,
        private loader: LoaderService,
        public toast: ToastController,
        public calender: Calendar
    ) {}

    ngOnInit() {
        // set default date to today
        this.date = new Date().toDateString();

        const routerData = this.router.getCurrentNavigation().extras;
        if (!routerData.state || !routerData.state.rb) {
            this.router.navigate(['females']);
        } else {

            // get page name and id from state
            this.rabbit = routerData.state.rb;

            if (!this.rabbit.state) {
                this.segmentVal = '1';
                this.setState('1');
            } else if (this.rabbit.state === 1 || this.rabbit.state === 4) {
                this.segmentVal = '2';
                this.setState('2');
            } else if (this.rabbit.state === 2 || this.rabbit.state === 5) {
                this.segmentVal = '3';
                this.setState('3');
            } else if (this.rabbit.state === 3) {
                this.segmentVal = '1';
                this.setState('1');
            }

            this.db.get('config').then((c: any) => {
                this.loader.show();
                this.config = c;

                this.db.get('states').then((s: State[]) => {
                    s = s.reverse();
                    s = s.filter(x => x.num === this.rabbit.num && x.positive);
                    this.currentState = s[0];

                    if (this.segmentVal && this.segmentVal !== '1') {
                        this.maleNo = this.currentState.maleNo;
                    }

                    this.loader.hide();
                });
                this.loader.hide();
            });
        }
    }

    goBack() {
        const d: NavigationExtras = {
            state: {
                obj: this.rabbit
            }
        };

        this.router.navigate(['show'], d);
    }

    setState(v: string) {
        this.state = v;
    }

    setPositive(v: string): void {
        this.positive = !!parseInt(v, 10);
    }

    async addCalender(
        mess: string,
        startDate: Date,
        endDate: Date,
        notes: string = '',
        location = ''
    ) {
        const a = await this.calender.hasReadWritePermission();
        if (!a) await this.calender.requestReadWritePermission();

        const event = await this.calender.createEvent(
            mess,
            location,
            notes,
            new Date(startDate),
            new Date(endDate)
        );
    }

    save(form: NgForm): void {
        this.loader.show();
        const f = form.value;
        const s = parseInt(this.state, 10);

        if (form.invalid) {
            this.loader.hide();
            return;
        }

        const state: State = {
            state: s,
            num: this.rabbit.num,
            maleNo: f.maleNo,
            date: createDate(new Date(f.date)),
            positive: this.positive,
            child: {
                alive: f.alive,
                dead: f.dead
            },
            notes: f.notes,
            toDate: createDate(new Date(f.date))
        };

        const sInd = s > 3 ? 1 : s + 1;
        const d = new Date(f.date);
        // console.log(d);

        const m = moment(
            `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`,
            'YYYY MM DD'
        );

        if (s === 1) {
            m.add(this.config.gas, 'd');
        } else if (s === 2) {
            m.add(this.config.hamlMotaqa, 'd');
        } else if (s === 3) {
            m.add(this.config.fetam, 'd');
        } else if (s === 4) {
            m.add(this.config.talqeh, 'd');
        }

        const newState: State = {
            state: sInd,
            positive: true,
            num: this.rabbit.num,
            maleNo: f.maleNo,
            date: createDate(),
            done: false,
            toDate: createDate(m.format('YYYY-MM-DD'))
        };
        // console.log(newState);
        // return;

        // check for male exsitance
        this.db.get('males').then(d => {
            const found = (d as Rabbit[]).some(x => x.num === f.maleNo);

            if (!found) {
                // male not found
                this.showFeedback(f.maleNo, 0);
                this.loader.hide();
                return;
            }

            this.saveDataToDb(f.maleNo, state, newState, m);
        });
    }

    private saveDataToDb(
        maleNo: number,
        state: State,
        newState: State,
        m: any
    ) {
        // save new state into database
        this.db.add('states', state).then(d => {
            // update this female state
            if (this.positive) {
                this.db.get('females').then((f: Rabbit[]) => {
                    const allFemales = f.map(v => {
                        if (v.num === this.rabbit.num) {
                            v.state = parseInt(this.state, 10);
                        }
                        return v;
                    });

                    this.db.set('females', allFemales);

                    // add the new state
                    this.db.add('states', newState).then(_ => {
                        this.addCalender(
                            ` ${
                                this.statesArr[newState.state - 1]
                            } الأرنب رقم :${newState.num}`,
                            m.format('YYYY-MM-DD'),
                            m.format('YYYY-MM-DD'),
                            `الذكر رقم ${newState.maleNo}`
                        );
                        this.afterSaving();
                    });
                });
            } else {
                this.afterSaving();
            }
        });
    }

    private afterSaving() {
        this.loader.hide();
        this.showFeedback(0, 1, 'success');
        this.goBack();
    }

    private showFeedback(num: number, mess: number, color: string = 'danger') {
        const messages = ['الذكر رقم ' + num + ' غير موجود', 'تم الحفظ بنجاح'];
        this.toast
            .create({
                message: messages[mess],
                duration: 2000,
                color
            })
            .then(ts => ts.present());
    }
}
