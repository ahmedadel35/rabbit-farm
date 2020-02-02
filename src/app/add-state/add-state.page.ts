import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { NgForm } from '@angular/forms';
import State from '../interfaces/state';
import { createDate } from '../common/rabbit';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-state',
    templateUrl: './add-state.page.html',
    styleUrls: ['./add-state.page.scss']
})
export class AddStatePage implements OnInit {
    state = '1';
    positive = true;
    date: string;
    rabbit: Rabbit;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService,
        private loader: LoaderService,
        public toastCtrl: ToastController
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

            console.log(routerData.state.rb);
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

    save(form: NgForm): void {
        this.loader.show();
        const f = form.value;

        if (form.invalid) {
            this.loader.hide();
            return;
        }

        const state: State = {
            state: parseInt(this.state, 10),
            num: this.rabbit.num,
            maleNo: f.maleNo,
            date: createDate(f.date),
            positive: this.positive,
            child: {
                alive: f.alive,
                dead: f.dead
            },
            notes: f.notes
        };

        // check if state is talqeh then check for male exsitance
        this.db.get('males').then(d => {
            const found = (d as Rabbit[]).some(x => x.num === f.maleNo);

            if (!found) {
                // male not found
                this.showFeedback(f.maleNo, 0);
                this.loader.hide();
                return;
            }

            this.saveDataToDb(f.maleNo, state);
        });
    }

    private saveDataToDb(maleNo: number, state: State) {
        // save new state into database
        this.db.add('states', state).then(d => {
            this.loader.hide();
            this.showFeedback(maleNo, 1, 'success');
            this.goBack();
        });
    }

    private showFeedback(num: number, mess: number, color: string = 'danger') {
        const messages = ['الذكر رقم ' + num + ' غير موجود', 'تم الحفظ بنجاح'];
        this.toastCtrl
            .create({
                message: messages[mess],
                duration: 2000,
                showCloseButton: true,
                color
            })
            .then(ts => ts.present());
    }
}
