import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides, AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { Storage } from '@ionic/storage';
import { FirstTimeUsage, FirstTimeKey } from './FirstTimeUsage';
import State from '../interfaces/state';
import Ill from '../interfaces/ill';
import Config from '../interfaces/Config';
import * as moment from 'moment';
import { toEngDate, createDate } from '../common/rabbit';
import Rabbit from '../interfaces/rabbit';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.page.html',
    styleUrls: ['./notify.page.scss']
})
export class NotifyPage implements OnInit {
    initHasPlayed = false;
    activeSlide = 0;
    sliderVal = 'talqeh';
    statesArr = ['تلقيح', 'جس', 'ولادة', 'فطام'];
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };
    slidesArr = ['talqeh', 'gas', 'welada', 'fetam', 'ill'];
    config: Config;
    statesData: State[];
    illData: Ill[];
    slidesData: Array<State[] | Ill[]> = [];
    calc = {
        t: [],
        g: [],
        w: [],
        f: [],
        i: []
    };
    analys = {
        alive: 0,
        dead: 0
    };
    alive = 0;
    dead = 0;

    @ViewChild('notifySlides', { static: false }) slides: IonSlides;

    constructor(
        private plt: Platform,
        private storage: Storage,
        private db: DatabaseService,
        private loader: LoaderService,
        public alertCtrl: AlertController,
        public calender: Calendar
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        this.plt.ready().then(rbd => {
            if (rbd) {
                this.loader.show();

                // check if this first time to use the app
                this.storage.get(FirstTimeKey).then(fth => {
                    if (fth) {
                        // not the first time
                        this.loadData();
                        return true;
                    }
                    // create the basic tables
                    new FirstTimeUsage(this.db).run();

                    // load page data
                    this.loadData();
                });
            }
        });
    }

    async loadData() {
        // this.loader.show();
        // @ts-ignore
        const config = (await this.db.get('config')) as Config;
        const states = (await this.db.get('states')) as State[];
        const ill = (await this.db.get('ill')) as Ill[];

        this.config = config;
        this.statesData = states.reverse();
        this.illData = ill.reverse();

        // console.log(states);
        this.doCalc(states, ill);
        // console.log(this.slidesData);
        // console.log(talqeh, gas, welada, fetam, illness);
        this.loader.hide();
    }

    doCalc(
        states: State[] = this.statesData,
        ill: Ill[] = this.illData.reverse()
    ): void {
        const talqeh = [],
            gas = [],
            welada = [],
            fetam = [];

        // reset every thing
        this.analys.alive = 0;
        this.analys.dead = 0;

        states.map(x => {
            if (!x.positive && !x.done) {
                if (x.state === 1) talqeh.push(x);
                else if (x.state === 2) gas.push(x);
                else if (x.state === 3) welada.push(x);
                else if (x.state === 4) fetam.push(x);
            }

            if (x.positive && x.child && x.child.alive) {
                this.analys.alive += x.child.alive;
                this.analys.dead += x.child.dead;
            }
        });

        const illness = ill.filter(x => !x.healed);

        this.slidesData = [talqeh, gas, welada, fetam, illness];

        this.calc = {
            t: talqeh,
            g: gas,
            w: welada,
            f: fetam,
            i: illness
        };
    }

    getIndex(slider: IonSlides) {
        slider.getActiveIndex().then(v => {
            // console.log(v);
            this.sliderVal = this.slidesArr[v];
            this.activeSlide = v;
        });
    }

    changeSlide(inx: string) {
        // console.log(inx);
        this.slides.slideTo(this.slidesArr.indexOf(inx));
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

    /**
     * update state or illness and remove from notification area
     *
     * @param {(State | Ill)} obj
     * @param {number} inx
     * @memberof NotifyPage
     */
    update(obj: State | Ill, inx: number) {
        this.loader.show();

        // check if object is state or illness
        if ((obj as Ill).type) {
            this.illData[this.illData.indexOf(obj as Ill)].healed = true;

            // save ill data
            this.db.set('ill', this.illData.reverse());
            this.slidesData[this.activeSlide].splice(inx, 1);
            this.loader.hide();
        } else {
            const state = (obj as State).state;
            const stateIndex = this.statesData.indexOf(obj as State);

            /**
             * add new state for upcoming event
             * ex. if this state is `talqeh`
             * Then we will add an `gas` state
             * so the user can know when will it happen
             * using config number of days for this states
             */
            const m = moment(
                toEngDate((obj as State).toDate || obj.date, true),
                'YYYY-M-DD'
            );
            console.log(m.format('YYYY-MM-DD'));
            if (state === 1) {
                m.add(this.config.gas, 'd');
            } else if (state === 2) {
                m.add(this.config.hamlMotaqa, 'd');
            } else if (state === 3) {
                m.add(this.config.fetam, 'd');
            } else if (state === 4) {
                m.add(this.config.talqeh, 'd');
            }

            // increset state to next state IF state is fetam
            // THEN assign 0 to it as free female state
            const s = state < 4 ? state + 1 : 0;

            // update female state
            this.db.get('females').then((d: Rabbit[]) => {
                d = d.map(x => {
                    if (x.num === obj.num) {
                        x.state = s > 1 ? s - 1 : 0;
                        console.log(x.state);
                    }
                    return x;
                });
                this.db.set('females', d);

                // save new state if new state is not after fetam
                // if (state < 4) {
                //     this.saveNewState(obj as State, s, m, stateIndex, inx);
                // } else {
                //     this.showUpdatedData(obj as State, inx);
                // }

                this.saveNewState(obj as State, s, m, stateIndex, inx);
            });
        }
    }

    modifyState(obj: State | Ill, inx: number) {
        this.alive = this.dead = 0;

        // check if this click comes from `welada` slide
        if (this.activeSlide === 2) {
            this.alertCtrl
                .create({
                    header: 'أعداد المواليد',
                    cssClass: 'fundsRepo',
                    backdropDismiss: false,
                    keyboardClose: false,
                    inputs: [
                        {
                            type: 'number',
                            name: 'alive',
                            placeholder: 'المواليد الحية'
                        },
                        {
                            type: 'number',
                            name: 'dead',
                            placeholder: 'المواليد الميتة'
                        }
                    ],
                    buttons: [
                        {
                            text: 'ok',
                            handler: res => {
                                if (!res || !res.alive || !res.dead) {
                                    return false;
                                }

                                this.alive = parseInt(res.alive, 10);
                                this.dead = parseInt(res.dead, 10);

                                this.update(obj, inx);
                            }
                        }
                    ]
                })
                .then(a => a.present());
        } else {
            this.update(obj, inx);
        }
    }

    showUpdatedData(obj: State, inx: number) {
        const si = this.statesData.indexOf(obj);
        this.statesData[si].done = true;
        this.statesData[si].positive = true;
        this.statesData[si].child = {
            alive: this.alive,
            dead: this.dead
        };

        this.db.set('states', this.statesData.reverse());

        this.loader.hide();
        this.slidesData[this.activeSlide].splice(inx, 1);
        this.doCalc();
    }

    saveNewState(
        obj: State,
        sInd: number,
        m: any,
        stateIndex: number,
        inx: number
    ) {
        sInd = sInd === 0 ? 1 : sInd;
        // console.log(sInd);
        // console.log(this.statesArr[sInd - 1]);

        const newState: State = {
            state: sInd,
            positive: false,
            num: obj.num,
            maleNo: obj.maleNo,
            date: createDate(),
            done: false,
            toDate: createDate(m.format('YYYY-MM-DD'))
        };
        console.log(newState);
        this.db.add('states', newState).then(d => {
            this.statesData.unshift(newState);
            if (this.activeSlide + 1 < 4) {
                (this.slidesData[this.activeSlide + 1] as State[]).unshift(
                    newState
                );
            }

            this.addCalender(
                ` ${this.statesArr[sInd - 1]} الأرنب رقم :${obj.num}`,
                m.format('YYYY-MM-DD'),
                m.format('YYYY-MM-DD'),
                `الذكر رقم ${obj.maleNo}`
            );

            this.showUpdatedData(obj, inx);
        });
    }

    destroy(obj: State, inx: number) {
        const si = this.statesData.indexOf(obj);
        this.statesData[si].done = true;

        (this.slidesData[this.activeSlide][inx] as State).done = true;

        this.db.set('states', this.statesData.reverse());
        this.doCalc();
    }

    showRepo() {
        const a = this.analys.alive,
            d = this.analys.dead,
            sum = a + d,
            aper = ((a / sum) * 100).toFixed(2),
            dper = ((d / sum) * 100).toFixed(2),
            fetam = this.statesData.filter(x => {
                return x.state === 4 && x.date !== 'noDate' && x.done === true;
            });

        const alert = this.alertCtrl
            .create({
                header: 'تقارير الولدة',
                cssClass: 'fundsRepo',
                message: `<ion-list>
            <ion-item>
                <ion-label>إجمالى الولدة</ion-label>
                <ion-note slot="end" color='primary'>${sum}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>الولدة الحية</ion-label>
                <ion-note slot="end" color='success'>${a}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>الولدة الميتة</ion-label>
                <ion-note slot="end" color='danger'>${d}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>نسبة الحى</ion-label>
                <ion-note slot="end" color='tertiary'>
                ${aper} %
                </ion-note>
            </ion-item>
            <ion-item>
                <ion-label>نسبة الميت</ion-label>
                <ion-note slot="end" color='tertiary'>
                ${dper} %
                </ion-note>
            </ion-item>
            <ion-item>
                <ion-label>إجمالى الفطام</ion-label>
                <ion-note slot="end" color='tertiary'>
                ${fetam.length}
                </ion-note>
            </ion-item>
            </ion-list>`,
                buttons: [
                    {
                        text: 'تم'
                    }
                ]
            })
            .then(a => a.present());
    }
}
