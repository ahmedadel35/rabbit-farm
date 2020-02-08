import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { DatabaseService } from '../services/database.service';
import Funds from '../interfaces/funds';
import { NgForm } from '@angular/forms';
import { createDate } from '../common/rabbit';

@Component({
    selector: 'app-mony',
    templateUrl: './mony.page.html',
    styleUrls: ['./mony.page.scss']
})
export class MonyPage implements OnInit {
    public data: Array<Funds> = [];
    public allData: Array<Funds> = [];
    initHasPlayed = false;

    constructor(
        private router: Router,
        public alertCtrl: AlertController,
        private loader: LoaderService,
        private db: DatabaseService
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        this.loader.show();

        this.db.get('funds').then(d => {
            // console.log(d);
            // save all data into one object
            this.allData = d as Array<Funds>;
            // remove types other than this page id
            d = (d as Array<Funds>).filter(x => x.date !== 'noDate');
            console.log(d);
            this.data = d as Array<Funds>;
            this.loader.hide();

            // check if user has entered any funds
            if (this.data.length > 1) {
                // this.showSum();
            }
        });

        this.loader.hide();
    }

    openPage(id: string, title: string) {
        const page = {
            id,
            title
        };

        const navExt: NavigationExtras = {
            state: {
                page
            }
        };
        this.router.navigate(['list'], navExt);
    }

    showReport() {
        this.loader.show();

        // load date from db
        this.db.get('funds').then(d => {
            let income = 0,
                outcome = 0,
                inVal = '',
                ratio = 0,
                state = '',
                cssClass = '';
            (d as Array<Funds>).forEach(x => {
                if (x.type === 'income') {
                    income += x.value;
                } else if (x.type === 'outcome') {
                    outcome += x.value;
                }
            });

            inVal = Math.abs(income - outcome).toFixed(1);
            // check if outcome is zero
            if (outcome === 0) {
                ratio = 0;
            } else {
                // @ts-ignore
                ratio = parseFloat(income / outcome).toFixed(2);
            }

            // determine state is
            if (income > outcome) {
                state = 'ربح';
                cssClass = 'success';
            } else {
                state = 'خسارة';
                cssClass = 'danger';
            }

            // show alert with report data
            this.showAlert(state, cssClass, income, outcome, inVal, ratio);
            this.loader.hide();
        });
    }

    private showAlert(
        state: string,
        cssClass: string,
        income: number,
        outcome: number,
        value: string,
        ratio: number
    ) {
        const alert = this.alertCtrl
            .create({
                header: 'تقرير',
                cssClass: 'fundsRepo',
                message:
                    `<ion-list>
                <ion-list-header class='` +
                    cssClass +
                    `'>
                <ion-label>` +
                    state +
                    `</ion-label>
                </ion-list-header>
                <ion-item>
                <ion-label>الإيرادات</ion-label>
                <ion-note slot='end' color='primary'>` +
                    income +
                    `</ion-note>
                </ion-item>
                <ion-item>
                <ion-label>المصروفات</ion-label>
                <ion-note slot='end' color='secondary'>` +
                    outcome +
                    `</ion-note>
                </ion-item>
                <ion-item>
                <ion-label>قيمة الربح / الخسارة</ion-label>
                <ion-note slot='end' color='tertiary'>` +
                    value +
                    `</ion-note>
                </ion-item>
                <ion-item>
                <ion-label>معدل الربح / الخسارة</ion-label>
                <ion-note slot='end' color='warning'>` +
                    ratio +
                    `</ion-note>
                </ion-item>
                </ion-list>`,
                buttons: ['OK']
            })
            .then(a => {
                a.present();
            });
    }
}
