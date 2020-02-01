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

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss']
})
export class ShowPage implements OnInit {
    rabbit: Rabbit;
    title = '';
    initHasPlayed = false;
    activeSlide = 0;
    sliderVal = 'home';
    slideOpts = {
        speed: 400
    };
    slidesArr = ['home', 'report', 'child', 'ill'];

    @ViewChild('rabbitSlides', {static: false}) slides: IonSlides;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService
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

    changeSlide(inx) {
        console.log(inx);
        this.slides.slideTo(this.slidesArr.indexOf(inx));
    }
}
