import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import { NgForm } from '@angular/forms';
import { createDate, toEngDate } from '../common/rabbit';
import Fetam from '../interfaces/fetam';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-fetam',
    templateUrl: './add-fetam.page.html',
    styleUrls: ['./add-fetam.page.scss']
})
export class AddFetamPage implements OnInit {
    isEdit = false;
    initHasPlayed = false;
    f: Fetam;
    // form inputs
    patchNo?: number = null;
    count: number = null;
    weight: number = null;
    age: number = null;
    date: string;

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
            this.loader.show();
            routerData = routerData.extras;
            if (routerData.state && routerData.state.f) {
                // get page name and id from state
                this.f = routerData.state.f;
                this.isEdit = routerData.state.edit;
                this.patchNo = this.f.patchNo;
                this.count = this.f.count;
                this.weight = this.f.weight;
                this.age = this.f.age;
                this.date = new Date(toEngDate(
                    this.f.date,
                    true
                ) as string).toDateString();

                this.loader.hide();
            }
        }
    }

    goBack() {
        this.router.navigate(['fetam']);
    }

    add(form: NgForm) {
        this.loader.show();

        const f: Fetam = form.value;

        const d = new Date(f.date || this.date);
        const date = createDate(
            `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
        );

        if (form.valid) {
            const obj: Fetam = {
                patchNo: f.patchNo,
                count: f.count,
                weight: f.weight,
                age: f.age,
                date
            };

            if (this.isEdit) {
                obj.patchNo = this.patchNo;
                // obj.date = this.f.date;
            }

            // console.log(obj);
            this.db.get('fetam').then((d: Fetam[]) => {
                if (this.isEdit) {
                    d = d.map(x => {
                        if (x.patchNo === this.patchNo) {
                            x.count = obj.count;
                            x.weight = obj.weight;
                            x.age = obj.age;
                            x.date = obj.date;
                        }
                        return x;
                    });
                } else {
                    // check if patchNo already exists
                    const found = d.some(x => x.patchNo === obj.patchNo);

                    if (found) {
                        this.feedBack(
                            `دفعة الفطام رقم ${obj.patchNo} موجودة بالفعل`,
                            'danger'
                        );
                        this.loader.hide();
                        return;
                    }

                    d.push(obj);
                }

                // console.log(d);
                this.db.set('fetam', d);
                this.doneSaving(obj);
            });
        }
    }

    doneSaving(obj: Fetam) {
        this.loader.hide();
        this.feedBack();

        const st: NavigationExtras = {
            state: {
                f: obj
            }
        };

        this.router.navigate([this.isEdit ? 'showEditedFetam' : 'show-fetam'], st);
    }

    feedBack(message: string = 'تم الحفظ بنجاح', color: string = 'success') {
        this.toast
            .create({
                message,
                duration: 2000,
                color
            })
            .then(t => t.present());
    }
}
