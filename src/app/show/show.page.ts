import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    NavigationExtras,
    Navigation
} from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { IonSlides } from '@ionic/angular';
import State from '../interfaces/state';

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss']
})
export class ShowPage implements OnInit {
    rabbit: Rabbit = {
        num: 3,
        date: '20 feb 2020',
        type: 'asf'
    };
    data: State[];
    calc = {
        talqeh: {},
        gas: {},
        welada: {},
        gasPercent: '0',
        weladaMode: 0
    };
    title = '';
    initHasPlayed = false;
    activeSlide = 0;
    sliderVal = 'home';
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };
    slidesArr = ['home', 'report', 'child', 'ill'];

    @ViewChild('rabbitSlides', { static: false }) slides: IonSlides;

    constructor(
        private router: Router,
        private db: DatabaseService,
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
            if (!routerData.state || !routerData.state.obj) {
                // this.router.navigate(['females']);
            } else {
                // get page name and id from state
                this.rabbit = routerData.state.obj;
                this.title += this.rabbit.name
                    ? this.rabbit.name
                    : 'رقم ' + this.rabbit.num;

                console.log(routerData.state.obj);
            }
        }
        console.log(this.rabbit);
        this.loadData();
    }

    addState() {
        const d: NavigationExtras = {
            state: {
                rb: this.rabbit
            }
        };

        this.router.navigate(['add-state'], d);
    }

    goBack() {
        this.router.navigate(['females']);
    }

    getIndex(slider: IonSlides) {
        slider.getActiveIndex().then(v => {
            console.log(v);
            this.sliderVal = this.slidesArr[v];
        });
    }

    changeSlide(inx: string) {
        console.log(inx);
        this.slides.slideTo(this.slidesArr.indexOf(inx));
    }

    loadData() {
        this.loader.show();

        this.db.get('states').then((d: State[]) => {
            // console.log(d);
            // filter data to get states related to this female
            d = d.filter(x => x.num === this.rabbit.num);

            console.log(d);
            this.data = d;

            const talqeh = d.filter(x => x.state === 1);
            const gas = d.filter(x => x.state === 2);
            const goodGas = gas.filter(x => x.positive);
            // const badGas = gas.filter(x => !x.positive);
            const welada = d.filter(x => x.state === 3 && x.positive);
            const alive = welada.reduce(
                (t, c) => {
                    t.child.alive += c.child.alive;
                    return t;
                },
                { child: { alive: 0 } }
            );
            const dead = welada.reduce(
                (t, c) => {
                    t.child.dead += c.child.dead;
                    return t;
                },
                { child: { dead: 0 } }
            );
            const goodGasPercent =
                (goodGas.length / (goodGas.length + gas.length)) * 100;

            this.calc.talqeh = talqeh;
            this.calc.gas = gas;
            this.calc.gasPercent = (gas.length > 0) ? goodGasPercent.toFixed(2) : '0';
            this.calc.welada = welada;
            this.calc.weladaMode = Math.round(
                (alive.child.alive) / welada.length
            );

            this.loader.hide();
        });
    }
}
