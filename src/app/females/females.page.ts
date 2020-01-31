import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { goToAddNew, getAgeFromArabic } from '../common/rabbit';

@Component({
    selector: 'app-females',
    templateUrl: './females.page.html',
    styleUrls: ['./females.page.scss']
})
export class FemalesPage implements OnInit {
    data: Array<Rabbit> = [];
    oldData: Array<Rabbit> = [];

    constructor(
        private router: Router,
        private db: DatabaseService,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.loader.show();

        this.db.get('females').then((d: Array<Rabbit>) => {
            this.data = d;
            this.oldData = d;
            this.loader.hide();
        });
    }

    addNewFemale() {
        goToAddNew(this.router);
    }

    ageForHumans(birth: string): string {
        return getAgeFromArabic(birth);
    }

    filterData(s: string): void {
        if (!s.length) {
            this.data = this.oldData;
            return;
        }

        // user serched for something
        this.data = this.oldData.filter((x: Rabbit)=> {
            return x.num === parseInt(s) || (x.name && x.name.indexOf(s) > -1);
        });
    }

    show(obj: Rabbit): void {
        const data: NavigationExtras = {
            state: {
                obj
            }
        };
        this.router.navigate(['show'], data);
    }
}
