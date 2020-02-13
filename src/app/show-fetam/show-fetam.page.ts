import { Component, OnInit, ViewChild } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import { IonSlides } from '@ionic/angular';

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
        weight: 22,
    };
    slidesArr = ['info', 'sell', 'vaccine', 'death'];
    sliderVal = 'info';
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };

    @ViewChild('fetamSlides', { static: false }) slides: IonSlides;

    constructor(private router: Router) {}

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
}
