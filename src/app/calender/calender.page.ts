import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import State from '../interfaces/state';
import { toEngDate, createDate } from '../common/rabbit';
import * as moment from 'moment';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.page.html',
    styleUrls: ['./calender.page.scss']
})
export class CalenderPage implements OnInit {
    public data: State[] = [];
    public days: State[] = [];
    public statesStr = ['', 'تلقيح', 'جس', 'ولادة'];

    constructor(
        private db: DatabaseService,
        private alertCtrl: AlertController,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        this.loader.show();
        let states = (await this.db.get('states')) as State[];

        // TODO load only states with upcoming date
        states.map(x => {
            const d = x.toDate;
            // console.log(d);
            if (
                x.date !== 'noDate' &&
                x.state !== 4 &&
                moment().isSameOrBefore(toEngDate(
                    x.toDate,
                    true,
                    1
                ) as string)
            ) {
                if (
                    !this.days.some(
                        // @ts-ignore
                        i => i.toDate === x.toDate
                    )
                ) {
                    this.days.push(x);
                }

                this.data.push(x);
            }
        });

        this.days.sort((a, b) =>
            moment(toEngDate(a.toDate, true)).isBefore(
                toEngDate(b.toDate, true)
            )
                ? -1
                : 1
        );

        this.loader.hide();
    }

    turnTODate(d: string) {
        return createDate(
            toEngDate(d, true) as string,
            undefined,
            'dddd DD MMMM(M) YYYY'
        );
    }

    count(date: string): State[] {
        return this.data.filter(x => x.toDate === date);
    }

    show(s: State) {
        this.loader.show();
        const arr = this.count(s.toDate);
        if (arr.length > 1) {
            this.alertCreate(s.toDate, arr).then(x =>
                this.loader.hide()
            );
        }
        this.loader.hide();
    }

    async alertCreate(date: string, arr: State[]) {
        let message = '<ion-list>';
        arr.forEach((x, inx) => {
            message += `<ion-item>
            <ion-label class='${inx % 2 === 0 ? 'bg-tertiary' : 'bg-primary'}'>
            ${this.statesStr[x.state]}
            </ion-label>
            <ion-label class='${inx % 2 === 0 ? 'bg-tertiary' : 'bg-primary'}'>
                <ion-icon name='female'></ion-icon>${x.num}
            </ion-label>
            </ion-item>`;
        });
        message += '</ion-list>';
        const al = await this.alertCtrl.create({
            header: date,
            cssClass: 'fundsRepo calendar',
            message,
            buttons: [
                {
                    role: 'cancel',
                    text: 'تم'
                }
            ]
        });

        al.present();
    }
}
