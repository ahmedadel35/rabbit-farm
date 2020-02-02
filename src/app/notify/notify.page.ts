import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { Storage } from '@ionic/storage';
import { FirstTimeUsage, FirstTimeKey } from './FirstTimeUsage';

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

    @ViewChild('notifySlides', {static: false}) slides: IonSlides;

    constructor(
        private plt: Platform,
        private storage: Storage,
        private db: DatabaseService,
        private loader: LoaderService
    ) {
        // this.loader.show();
        // this.plt.ready().then(rbd => {
        //     if (rbd) {
        //         // check if this first time to use the app
        //         this.storage.get(FirstTimeKey).then(fth => {
        //             if (fth) return true; // not the first time
        //             // create the basic tables
        //             (new FirstTimeUsage(this.db)).run();
        //         });
        //     }
        // });
    }

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;
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
