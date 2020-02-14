import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-fetam',
    templateUrl: './fetam.page.html',
    styleUrls: ['./fetam.page.scss']
})
export class FetamPage implements OnInit {
    initHasPlayed = false;
    data: Fetam[] = [];
    oldData: Fetam[] = [];

    constructor(
        private loader: LoaderService,
        private router: Router,
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
}
