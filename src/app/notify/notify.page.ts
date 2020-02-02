import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { Storage } from '@ionic/storage';
import { FirstTimeUsage, FirstTimeKey } from './FirstTimeUsage';
import State from '../interfaces/state';
import Ill from '../interfaces/ill';
import Config from '../interfaces/Config';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.page.html',
    styleUrls: ['./notify.page.scss']
})
export class NotifyPage implements OnInit {
    initHasPlayed = false;
    activeSlide = 0;
    sliderVal = 'talqeh';
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };
    slidesArr = ['talqeh', 'gas', 'welada', 'fetam', 'ill'];
    statesData: State[];
    illData: Ill[];
    slidesData: Array<State[] | Ill[]> = [];
    calc = {
        t: 0,
        g: 0,
        w: 0,
        f: 0,
        i: 0
    };

    @ViewChild('notifySlides', { static: false }) slides: IonSlides;

    constructor(
        private plt: Platform,
        private storage: Storage,
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

        // this.loader.show();
        this.plt.ready().then(rbd => {
            if (rbd) {
                // check if this first time to use the app
                this.storage.get(FirstTimeKey).then(fth => {
                    if (fth) {
                        // not the first time
                        this.loadData();
                        return true;
                    }
                    // create the basic tables
                    new FirstTimeUsage(this.db).run();

                    // load page data
                    this.loadData();
                });
            }
        });
    }

    async loadData() {
        const config = (await this.db.get('config')) as Config[];
        const states = (await this.db.get('states')) as State[];
        const ill = (await this.db.get('ill')) as Ill[];
        const talqeh = [],
            gas = [],
            welada = [],
            fetam = [];

        this.statesData = states;
        this.illData = ill;

        states.map(x => {
            if (!x.positive && !x.done) {
                if (x.state === 1) talqeh.push(x);
                else if (x.state === 2) gas.push(x);
                else if (x.state === 3) welada.push(x);
                else if (x.state === 4) fetam.push(x);
            }
        });

        const illness = ill.filter(x => !x.healed);

        this.slidesData = [talqeh, gas, welada, fetam, illness];

        this.calc = {
            t: talqeh.length,
            g: gas.length,
            w: welada.length,
            f: fetam.length,
            i: illness.length
        };
        console.log(this.slidesData);
        console.log(talqeh, gas, welada, fetam, illness);
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
}
