import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { goToAddNew, getAgeFromArabic } from '../common/rabbit';
import State from '../interfaces/state';
import Ill from '../interfaces/ill';

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
    isArchive = false;
    onlyFree = false;

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

        this.loadData(this.isArchive ? 'archive' : 'females');
    }

    loadData(tb: string = 'females'): void {
        this.isArchive = (tb === 'archive');
        this.onlyFree = false;
        this.loader.show();

        this.db.get(tb).then((d: Array<Rabbit>) => {
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
        } else if (s === 'free') {
            this.onlyFree = true;
        }

        // user serched for something
        const d = this.oldData.filter((x: Rabbit) => {
            if (s === 'free') {
                return !x.state || x.state === 0;
            }

            return (
                x.num === parseInt(s, 10) || (x.name && x.name.indexOf(s) > -1)
            );
        });

        this.data = [...d];
    }

    show(obj: Rabbit): void {
        const data: NavigationExtras = {
            state: {
                obj,
                isArchive: this.isArchive
            }
        };
        this.router.navigate(['show'], data);
    }

    archive(r: Rabbit, inx: number): void {
        console.log(this.oldData[inx]);
        this.loader.show();
        // create new number for this female
        // and save in archive with this new number
        // also change saved states to this new number
        // so that it can be accessed any time without problems
        const oldNum = r.num;
        r.name = !r.name ? `رقم ${r.num}` : r.name + ' - ' + r.num;
        r.num *= Math.round(Math.random() * Math.random() * 100);

        this.db.add('archive', r).then(d => {
            this.oldData.splice(inx, 1);

            // save new data without this female
            this.db.set('females', this.oldData);

            // get all states for this female and change its number
            this.db.get('states').then((s: State[]) => {
                s = s.map(x => {
                    if (x.num === oldNum) {
                        x.num = r.num;
                    }
                    return x;
                });

                // save new states
                this.db.set('states', s);

                // get all illness records for this female and change the number
                this.db.get('ill').then((i: Ill[]) => {
                    i = i.map(x => {
                        if (x.num === oldNum) {
                            x.num = r.num;
                        }
                        return x;
                    });

                    this.db.set('ill', i);

                    this.data.splice(inx, 1);
                    this.loader.hide();
                });
            });
        });
    }

    destroy(r: Rabbit, inx: number): void {
        this.loader.show();
        this.oldData.splice(inx, 1);
        this.db.set(this.isArchive ? 'archive' : 'females', this.oldData);

        // remove all stats about this female
        this.db.get('states').then((s: State[]) => {
            s = s.filter(x => x.num !== r.num);
            this.db.set('states', s);

            // remove all illness of this female
            this.db.get('ill').then((i: Ill[]) => {
                i = i.filter(x => x.num !== r.num);
                this.db.set('ill', i);

                this.data.splice(inx, 1);
                this.loader.hide();
            });
        });
    }
}
