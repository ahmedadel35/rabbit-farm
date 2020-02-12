import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
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

    constructor(private loader: LoaderService, private router: Router, private db: DatabaseService) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;
        this.db.get('fetam').then((d: Fetam[]) => {
            // console.log(d);
            d = d.filter(x => x.date !== 'noDate');

            this.data = d;
            this.oldData = [...d];
            console.log(d);
        });
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
}
