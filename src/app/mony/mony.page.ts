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
    totalSell = 0;
    totalBuy = 0;
    diff = 0;
    state = '';

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
                let sell = 0,
                    buy = 0;
                d.map((x: Funds) => {
                    if (x.src === 'sell') {
                        sell += x.value;
                    } else if (x.src === 'buy') {
                        buy += x.value
                    }
                });

                this.totalSell = sell;
                this.totalBuy = buy;
                this.diff = Math.abs(this.totalSell - this.totalBuy); 
                if (this.totalSell > this.totalBuy) {
                    this.state = 'مكسب';
                } else {
                    this.state = 'خسارة';
                }
            }
        });

        this.loader.hide();
    }

    openPage() {
        this.router.navigate(['list']);
    }

    private showInfo(
        fund: Funds
    ) {
        const alert = this.alertCtrl
            .create({
                header: 'بيان',
                cssClass: 'fundsRepo',
                message:`
                <ion-list>
                    <ion-item>
                    <ion-note slot='start'>شراء</ion-note>
                    <ion-label>${fund.type}</ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-note slot='start'>إسم البائع</ion-note>
                    <ion-label>${fund.seller}</ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-note slot='start'>العدد</ion-note>
                    <ion-label>${fund.count}</ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-note slot='start'>الوزن</ion-note>
                    <ion-label>${fund.weight}</ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-note slot='start'>الملاحظات</ion-note>
                    <ion-label>${fund.info}</ion-label>
                    </ion-item>
                </ion-list>
                `,
                buttons: ['OK']
            })
            .then(a => {
                a.present();
            });
    }
}
