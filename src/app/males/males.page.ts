import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { goToAddNew, getAgeFromArabic } from '../common/rabbit';
import Ill from '../interfaces/ill';

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
            this.oldData = [...d];
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
            this.data = [...this.oldData];
            return;
        }

        // user serched for something
        const d = this.oldData.filter((x: Rabbit) => {
            return (
                x.num === parseInt(s, 10) || (x.name && x.name.indexOf(s) > -1)
            );
        });

        this.data = [...d];
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

    destroy(r: Rabbit, inx: number) {
        this.loader.show();
        this.oldData.splice(inx, 1);
        this.db.set('males', this.oldData);

        // remove from illness table
        this.db.get('ill').then((i: Ill[]) => {
            i = i.filter(x => x.num !== r.num);
            this.db.set('ill', i);

            this.data.splice(inx, 1);
            this.loader.hide();
        });
    }
}
