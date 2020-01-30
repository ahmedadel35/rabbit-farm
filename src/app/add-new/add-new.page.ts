import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { NgForm } from '@angular/forms';
import Rabbit from '../interfaces/rabbit';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-new',
    templateUrl: './add-new.page.html',
    styleUrls: ['./add-new.page.scss']
})
export class AddNewPage implements OnInit {
    pageId = 'females';
    title = 'إنثى جديدة';
    showData = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService,
        private loader: LoaderService,
        public toastCtrl: ToastController
    ) {}

    ngOnInit() {
        if (!this.router.getCurrentNavigation().extras.state) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.title = this.router.getCurrentNavigation().extras.state.page.title;
            this.pageId = this.router.getCurrentNavigation().extras.state.page.id;
            this.showData = this.router.getCurrentNavigation().extras.state.page.showData;

            console.log(this.router.getCurrentNavigation().extras.state.page);
        }

        this.db.get(this.pageId).then(x => console.log(x));
    }

    save(form: NgForm) {
        // this.loader.show();
        const f: Rabbit = form.value;
        const date = this.createDate(f.date);

        // create rabbit object
        const obj: Rabbit = {
            name: f.name,
            num: f.num,
            type: f.type,
            date,
            source: f.source,
            father: f.father,
            mother: f.mother,
            box: f.box,
            eye: f.eye,
            weight: f.weight
        };

        console.log(obj);

        if (this.pageId === 'males') {
            if (typeof f.mother !== 'undefined') {
                // check if this female exists
                this.db.get(this.pageId).then(d => {
                    const found = (d as Array<Rabbit>).some(x => x.mother === f.mother);
                    console.log(found);
                });
            }
        }

        this.db.add(this.pageId, obj).then(d => {
            form.resetForm();
        });
    }

    private createDate(utc: string): string {
        const d = new Date(utc);
        const months = [
            'يناير',
            'فبراير',
            'مارس',
            'ابريل',
            'مايو',
            'يونية',
            'يوليو',
            'اغسطس',
            'سبتمبر',
            'اكتوبر',
            'نوفمبر',
            'ديسمبر'
        ];

        return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    }
}
