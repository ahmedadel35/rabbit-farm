import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import Fetam from '../interfaces/fetam';

@Component({
    selector: 'app-add-fetam-state',
    templateUrl: './add-fetam-state.page.html',
    styleUrls: ['./add-fetam-state.page.scss']
})
export class AddFetamStatePage implements OnInit {
    initHasPlayed = false;
    title = '';
    f: Fetam = {
        age: 10,
        count: 34,
        date: '12 فبراير 2020',
        patchNo: 2,
        weight: 22
    };
    slide = 1;
    slideStr = ['بيع', 'دواء أو تحصين', 'وفاة فطام'];
    vaccineSlide = 1;
    vaccineStr = {
        str: ['إسم المرض', 'تحصين ضد', 'السبب'],
        notes: ['إسم العلاج', 'إسم التحصين', 'الإسم'],
        value: ['الجرعة', 'جرعة التحصين', 'الكمية']
    };

    // form props


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
                console.log(routerData.state);
                // get page name and id from state
                this.f = routerData.state.f;
                this.slide = routerData.state.slide;
                this.title = `إضافة ${this.slideStr[this.slide]}`;
            }
        }

        this.title = `إضافة ${this.slideStr[this.slide]}`;
    }

    goBack() {
        const b: NavigationExtras = {
            state: {
                f: this.f
            }
        };

        this.router.navigate(['show-fetam']);
    }

    setVaccineSlide(v: number) {
        this.vaccineSlide = v;
    }
}
