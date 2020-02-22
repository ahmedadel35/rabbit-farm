import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import State from '../interfaces/state';
import { toEngDate, createDate } from '../common/rabbit';
import { type } from 'os';

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
            if (x.date !== 'noDate' && x.state !== 4) {
                x.date = this.turnTODate(x.date);
                if (!this.days[0] || this.days[this.days.length - 1].date !== x.date) {
                    this.days.push(x);
                }
                this.data.push(x);
            }
        });
        console.log(this.days);
        // this.data = states;

        console.log(this.data);

        this.loader.hide();
    }

    turnTODate(d: string) {
        return createDate(
            toEngDate(d, true) as string,
            undefined,
            'dddd DD MMMM(M) YYYY'
        );
    }

    show(s: State) {
        const arr = this.data.filter(x => x.date === s.date);
        console.log(arr);
        // if (arr.length)
        this.alertCreate(s.date, arr);
    }

    async alertCreate(date: string, arr: State[]) {
        let message = '<ion-list>';
        arr.forEach((x, inx) => {
            message += `<ion-item>
            <ion-label class='${inx%2===0 ? "bg-tertiary" : "bg-primary"}'>
            ${this.statesStr[x.state]}
            </ion-label>
            <ion-label class='${inx%2===0 ? "bg-tertiary" : "bg-primary"}'>
                <ion-icon name='female'></ion-icon>${x.num}
            </ion-label>
            </ion-item>`;
        });
        message += '</ion-list>';
        const al = await this.alertCtrl.create({
            header: date,
            cssClass: 'fundsRepo calendar',
            message,
            buttons: [{
                role: 'cancel',
                text: 'تم'
            }]
        });

        al.present();
    }
}
