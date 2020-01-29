import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
    selector: 'app-mony',
    templateUrl: './mony.page.html',
    styleUrls: ['./mony.page.scss']
})
export class MonyPage implements OnInit {
    private data: Array<{}> | false;
    constructor(private db: DatabaseService) {
        this.data = this.db.get('mony');
    }

    ngOnInit() {}
}
