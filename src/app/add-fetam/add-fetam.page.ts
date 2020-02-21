import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { createDate } from '../common/rabbit';
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

    ngOnInit() {
        this.date = new Date().toDateString();
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

            // console.log(obj);
            this.db.add('fetam', obj).then(d => {
                this.loader.hide();
                this.toast.create({
                    message: 'تم الحفظ بنجاح',
                    duration: 2000,
                    color: 'success'
                }).then(t => t.present());
                this.goBack();
            });
        }
    }
}
