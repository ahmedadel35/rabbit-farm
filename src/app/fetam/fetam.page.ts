import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import FetamState from '../interfaces/fetamState';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-fetam',
    templateUrl: './fetam.page.html',
    styleUrls: ['./fetam.page.scss']
})
export class FetamPage implements OnInit {
    initHasPlayed = false;
    data: Fetam[] = [];
    oldData: Fetam[] = [];
    statesData: FetamState[];

    constructor(
        private loader: LoaderService,
        private router: Router,
        private db: DatabaseService,
        public alertCtrl: AlertController
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;
        this.loadData();
    }

    loadData() {
        this.db.get('fetam').then((d: Fetam[]) => {
            // console.log(d);
            d = d.filter(x => x.date !== 'noDate');

            this.data = d;
            this.oldData = [...d];
            console.log(d);
        });
    }

    filterData(s: string): void {
        if (!s.length) {
            this.data = [...this.oldData];
            return;
        }

        // user serched for something
        const d = this.oldData.filter((x: Fetam) => {
            return x.patchNo && x.patchNo === parseInt(s, 10);
        });

        this.data = [...d];
    }

    addNewFetam() {
        this.router.navigate(['add-fetam']);
    }

    destroy(f: Fetam, inx: number) {
        this.loader.show();
        this.oldData.splice(inx, 1);
        this.db.set('fetam', this.oldData);
        this.data = [...this.oldData];
        this.loader.hide();
    }

    show(f: Fetam) {
        const se: NavigationExtras = {
            state: {
                f
            }
        };

        this.router.navigate(['show-fetam'], se);
    }

    showAnalytics() {
        this.loader.show();
        // console.log(this.data);
        const rabbitCount = this.data.reduce(
            (t, c) => {
                t.count += c.count;
                return t;
            },
            { count: 0 }
        ).count;

        if (!this.statesData) {
            this.db.get('fetamState').then((fs: FetamState[]) => {
                let sell = 0,
                    death = 0,
                    remained = 0;

                fs.map(x => {
                    if (x.date !== 'noDate') {
                        if (x.src === 'sell') {
                            sell += x.count;
                        } else if (x.src === 'death') {
                            death += x.count;
                        }
                    }
                });

                remained = rabbitCount - (sell + death);

                this.loader.hide();

                this.showAlert(
                    this.data.length,
                    rabbitCount,
                    sell,
                    death,
                    remained
                );
            });
        } else {
            this.loader.hide();
        }
    }

    showAlert(
        len: number,
        count: number,
        sell: number,
        death: number,
        remained: number
    ) {
        this.alertCtrl
            .create({
                header: 'إحصائيات',
                cssClass: 'fundsRepo',
                buttons: [
                    {
                        text: 'تم'
                    }
                ],
                message: `
            <ion-list>
            <ion-item>
                <ion-label>إجمالى الدفعات</ion-label>
                <ion-note slot="end" color='primary'>${len}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>إجمالى الخلفات</ion-label>
                <ion-note slot="end" color='primary'>${count}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>إجمالى المباع</ion-label>
                <ion-note slot="end" color='primary'>${sell}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>إجمالى الميت</ion-label>
                <ion-note slot="end" color='primary'>${death}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>إجمالى المتبقى</ion-label>
                <ion-note slot="end" color='primary'>${remained}</ion-note>
            </ion-item>
            </ion-list>`
            })
            .then(a => a.present());
    }
}
