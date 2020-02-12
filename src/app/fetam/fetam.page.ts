import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';

@Component({
    selector: 'app-fetam',
    templateUrl: './fetam.page.html',
    styleUrls: ['./fetam.page.scss']
})
export class FetamPage implements OnInit {
    initHasPlayed = false;
    data: Fetam[] = [];

    constructor(private db: DatabaseService) {}

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
            console.log(d);
        });
    }
}
