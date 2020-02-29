import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import Fetam from '../interfaces/fetam';
import { NgForm } from '@angular/forms';
import { createDate } from '../common/rabbit';
import FetamState from '../interfaces/fetamState';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Funds from '../interfaces/funds';
import { ToastController } from '@ionic/angular';

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
    srcArr = ['sell', 'vaccine', 'death'];
    slide = 1;
    slideStr = ['بيع', 'دواء أو تحصين', 'وفاة فطام'];
    vaccineSlide = 1;
    vaccineStr = {
        str: ['إسم المرض', 'تحصين ضد', 'السبب'],
        notes: ['إسم العلاج', 'إسم التحصين', 'الإسم'],
        value: ['الجرعة', 'جرعة التحصين', 'الكمية']
    };

    // form props
    str = null;
    count = null;
    weight = null;
    value = null;
    notes = null;
    date = null;
    showData = false;

    constructor(
        private router: Router,
        private db: DatabaseService,
        public loader: LoaderService,
        public toast: ToastController
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        this.date = new Date().toDateString();

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

    setVaccineSlide(v: string) {
        this.vaccineSlide = parseInt(v, 10);

        // reset form
        this.str = null;
        this.notes = null;
        this.value = null;
    }

    save(form: NgForm) {
        this.loader.show();

        const f: FetamState = form.value;

        // console.log(f);
        const d = new Date(f.date || this.date);
        const date = createDate(
            `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
        );
        // console.log(date);
        // console.log(this.slide);

        const fs: FetamState = {
            patchNo: this.f.patchNo,
            src: this.srcArr[this.slide],
            str: f.str,
            count: f.count || this.vaccineSlide,
            weight: f.weight,
            value: f.value,
            date,
            notes: f.notes
        };

        console.log(fs);

        this.db.add('fetamState', fs).then(d => {
            const fu: Funds = {
                src: 'sell',
                seller: f.str,
                type: `فطام مباع دفعة: ${this.f.patchNo}`,
                value: f.value,
                weight: f.weight,
                count: f.count,
                date,
                info: f.notes
            };

            console.log(fu);

            // save to funds table
            this.db.add('funds', fu).then(d => {
                this.loader.hide();
                this.toast
                    .create({
                        message: 'تم الحفظ بنجاح',
                        duration: 2000,
                        color: 'success'
                    })
                    .then(t => t.present());
                form.resetForm();
                this.goBack();
            });
        });
    }
}
