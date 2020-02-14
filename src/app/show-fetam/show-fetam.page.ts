import { Component, OnInit, ViewChild } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import FetamState from '../interfaces/fetamState';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-show-fetam',
    templateUrl: './show-fetam.page.html',
    styleUrls: ['./show-fetam.page.scss']
})
export class ShowFetamPage implements OnInit {
    initHasPlayed = false;
    title = '';
    activeSlide = 0;
    f: Fetam = {
        age: 10,
        count: 34,
        date: '12 فبراير 2020',
        patchNo: 2,
        weight: 22
    };
    slidesArr = ['info', 'sell', 'vaccine', 'death'];
    sliderVal = 'info';
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };
    data: FetamState[];
    sell: FetamState[] = [];
    vaccine: FetamState[] = [];
    death: FetamState[] = [];
    calc = {
        sell: 0,
        death: 0,
        remain: 0
    };
    vaccineStr = ['علاج', 'تحصين', 'أخرى'];

    @ViewChild('fetamSlides', { static: false }) slides: IonSlides;

    constructor(
        private router: Router,
        public db: DatabaseService,
        private loader: LoaderService
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        let routerData:
            | NavigationExtras
            | Navigation = this.router.getCurrentNavigation();
        if (routerData) {
            routerData = routerData.extras;
            if (!routerData.state || !routerData.state.f) {
                // this.router.navigate(['fetam']);
            } else {
                // get page name and id from state
                this.f = routerData.state.f;
                this.title = `دفعه رقم: ${this.f.patchNo}`;
            }

            // console.log(routerData.state.f);
        }
        this.title = `دفعه رقم: ${this.f.patchNo}`;
        // this.fakedData();
        this.loadData();
    }

    goBack() {
        this.router.navigate(['fetam']);
    }

    async loadData() {
        const states: FetamState[] = (await this.db.get(
            'fetamState'
        )) as FetamState[];
        const sell = [],
            vaccine = [],
            death = [];

        states.map(x => {
            if (x.date !== 'noDate') {
                if (x.src === 'sell') sell.push(x);
                else if (x.src === 'vaccine') vaccine.push(x);
                else death.push(x);
            }
        });

        // set
        this.data = states;
        this.sell = sell;
        this.vaccine = vaccine;
        this.death = death;

        this.doCalc();
    }

    doCalc() {
        this.calc.sell = this.sell.reduce(
            (t, c) => {
                t.count += c.count;
                return t;
            },
            { count: 0 }
        ).count;

        this.calc.death = this.death.reduce(
            (t, c) => {
                t.count += c.count;
                return t;
            },
            { count: 0 }
        ).count;

        this.calc.remain = this.f.count - (this.calc.sell + this.calc.death);
    }

    async fakeData() {
        const tb = 'fetamState';

        const sell: FetamState = {
            patchNo: 444,
            src: 'sell',
            str: 'عبدالسلام',
            count: 6,
            weight: 32,
            value: 250,
            date: '22 فبراير(2) 2020'
        };

        await this.db.add(tb, sell);
        sell.str = 'شسيىشس يىتشنسا';
        sell.count = 3;
        sell.value = 120;
        sell.date = '10 مارس(3) 2020';
        await this.db.add(tb, sell);

        const vaccine: FetamState = {
            patchNo: 444,
            src: 'vaccine',
            count: 1,
            str: 'جرب الأرانب',
            notes: 'ريبوفلافين',
            value: 55,
            date: '12 فبراير(2) 2020'
        };

        await this.db.add(tb, vaccine);
        vaccine.count = 2;
        vaccine.str = 'الحمى القلاعية';
        vaccine.notes = 'تشسيشسىي شسيشسي';
        vaccine.value = 32;
        await this.db.add(tb, vaccine);

        const death: FetamState = {
            patchNo: 444,
            src: 'death',
            count: 5,
            str: 'نسشينا شسنيت',
            notes: 'سشةيسشىي شسوةيشسلايا شسيشستينتسش يىسشيا',
            date: '2 فبراير(2) 2020'
        };

        await this.db.add(tb, death);
        death.str = 'ىشسةي شسيلالسشي';
        death.notes = 'هخعتشسيىة غعسشيلاى شسلي';
        death.count = 6;
        await this.db.add(tb, death);
    }

    getIndex(slider: IonSlides) {
        slider.getActiveIndex().then(v => {
            // console.log(v);
            this.sliderVal = this.slidesArr[v];
            this.activeSlide = v;
        });
    }

    changeSlide(inx: string) {
        // console.log(inx);
        this.slides.slideTo(this.slidesArr.indexOf(inx));
    }

    destroy(fs: FetamState, inx: number, type: 'sell' | 'vaccine' | 'death') {
        this.loader.show();
        console.log(inx, this[type]);
        this.data.splice(this.data.indexOf(fs), 1);
        // console.log(this.data);
        // this.db.set('fetamState', this.data);
        // TODO fix splice cuts more than one row
        this[type].splice(inx, 1);

        console.log(this.sell);
        this.doCalc();
        this.loader.hide();
    }

    addState() {
        const addFS: NavigationExtras = {
            state: {
                f: this.f,
                slide: this.activeSlide - 1 > -1 ? this.activeSlide - 1 : 0
            }
        };

        this.router.navigate(['add-fetam-state'], addFS);
    }
}
