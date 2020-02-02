import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { goToAddNew, getAgeFromArabic } from '../common/rabbit';

@Component({
    selector: 'app-males',
    templateUrl: './males.page.html',
    styleUrls: ['./males.page.scss']
})
export class MalesPage implements OnInit {
    data: Array<Rabbit> = [];
    oldData: Array<Rabbit> = [];
    constructor(
        private router: Router,
        private db: DatabaseService,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.loader.show();

        this.db.get('males').then((d: Array<Rabbit>) => {
            this.data = d;
            this.oldData = d;
            this.loader.hide();
        });
    }

    addNewMale() {
        goToAddNew(this.router, 'males', 'ذكر جديد');
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
            return x.num === parseInt(s, 10) || (x.name && x.name.indexOf(s) > -1);
        });
    }

    goToRabbit(obj: Rabbit): void {
        const data: NavigationExtras = {
            state: {
                obj,
                male: true
            }
        };
        this.router.navigate(['show'], data);
    }
}
