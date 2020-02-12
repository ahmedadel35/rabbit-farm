import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';

@Component({
    selector: 'app-fetam',
    templateUrl: './fetam.page.html',
    styleUrls: ['./fetam.page.scss']
})
export class FetamPage implements OnInit {
    data: Fetam[] = [];
    constructor(private db: DatabaseService) {}

    ngOnInit() {
        this.db.get('fetam').then((d: Fetam[]) => {
            // console.log(d);
            d = d.filter(x => x.date !== 'noDate');

            this.data = d;
        });
    }
}
