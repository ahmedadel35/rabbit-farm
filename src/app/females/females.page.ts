import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { goToAddNew, getAgeFromArabic } from '../common/rabbit';
import State from '../interfaces/state';

@Component({
    selector: 'app-females',
    templateUrl: './females.page.html',
    styleUrls: ['./females.page.scss']
})
export class FemalesPage implements OnInit {
    data: Array<Rabbit> = [];
    oldData: Array<Rabbit> = [];
    initHasPlayed = false;
    states = ['فارغة', 'ملقحة', 'موجبة', 'ولادة'];

    constructor(
        private router: Router,
        private db: DatabaseService,
        public loader: LoaderService
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        this.loader.show();

        this.db.get('females').then((d: Array<Rabbit>) => {
            this.data = d;
            this.oldData = [...d];
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

    show(obj: Rabbit): void {
        const data: NavigationExtras = {
            state: {
                obj
            }
        };
        this.router.navigate(['show'], data);
    }

    archive(r: Rabbit, inx: number) {
        console.log(this.oldData[inx]);
        this.loader.show();
        this.db.add('archive', r).then(d => {
            this.oldData.splice(inx, 1);

            // save new data without this female
            this.db.set('females', this.oldData);

            // get all states for this female and change its number
            this.db.get('states').then((s: State[]) => {
                // const d = [...s];
                // s = s.filter(x => )
                s = s.map(x => {
                    if (x.num === r.num) {
                        x.num = r.num * Math.round(Math.random() * 100);
                    }
                    return x;
                });

                // save new states
                this.db.set('states', s);
                this.data.splice(inx, 1);
                this.loader.hide();
            });
        });
    }

    destroy(r: Rabbit, inx: number) {
        // this.a
    }
}
