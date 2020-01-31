import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';

@Component({
    selector: 'app-females',
    templateUrl: './females.page.html',
    styleUrls: ['./females.page.scss']
})
export class FemalesPage implements OnInit {
    data: Array<Rabbit> = [];

    constructor(
        private router: Router,
        private db: DatabaseService,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.loader.show();

        this.db.get('females').then((d: Array<Rabbit>) => {
            this.data = d;
            this.loader.hide();
        });
    }

    addNewFemale() {
        let page = {
            id: 'females',
            showData: false,
            title: 'إنثى جديدة'
        };

        const navExt: NavigationExtras = {
            state: {
                page
            }
        };

        this.router.navigate(['add-new'], navExt);
    }
}
