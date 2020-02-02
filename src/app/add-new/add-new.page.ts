import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { NgForm } from '@angular/forms';
import Rabbit from '../interfaces/rabbit';
import { ToastController } from '@ionic/angular';
import { createDate } from '../common/rabbit';

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
        this.loader.show();

        const f: Rabbit = form.value;
        const date = createDate(f.date);

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

        if (this.pageId === 'males') {
            if (typeof f.mother === 'number') {
                // check if this female exists
                this.db.get(this.pageId).then(d => {
                    const found = (d as Array<Rabbit>).some(
                        x => x.mother === f.mother
                    );
                    if (!found) {
                        this.showFeedback(f.mother, 0);
                        this.loader.hide();
                        return false;
                    }

                    this.saveData(obj, form);
                });
            } else {
                this.saveData(obj, form);
            }
        } else {
            this.saveData(obj, form);
        }
        console.log(obj);
    }

    private saveData(obj: Rabbit, form: NgForm) {
        // before add check if this number exists
        this.db.get(this.pageId).then(d => {
            const found = (d as Array<Rabbit>).some(x => x.num === obj.num);

            console.log(found);

            if (found) {
                this.showFeedback(obj.num, 1);
                this.loader.hide();
                return false;
            }

            this.db.add(this.pageId, obj).then(d => {
                this.loader.hide();
                this.showFeedback(obj.num, 2, 'success');
                // TODO navigate to this rabbit own page
                const st: NavigationExtras = {
                    state: {
                        obj,
                        male: (this.pageId === 'males')
                    }
                };

                this.router.navigate(['show'], st);
            });
        });
    }

    private showFeedback(
        num: number,
        mess: number,
        color: string = 'danger'
    ) {
        const messages = [
            'الإم رقم ' + num + ' غير موجودة',
            'الأرنب رقم ' + num + ' مسجل بالفعل',
            'تم الحفظ بنجاح'
        ];
        this.toastCtrl
            .create({
                message: messages[mess],
                duration: 2000,
                showCloseButton: true,
                color
            })
            .then(ts => ts.present());
    }
}
