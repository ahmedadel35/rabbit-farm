import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { NgForm } from '@angular/forms';
import Rabbit from '../interfaces/rabbit';
import { createDate, toEngDate } from '../common/rabbit';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
    selector: 'app-add-new',
    templateUrl: './add-new.page.html',
    styleUrls: ['./add-new.page.scss']
})
export class AddNewPage implements OnInit {
    pageId = 'females';
    title = 'إنثى جديدة';
    rabbit: Rabbit;
    showData = false;
    isEdit = false;
    name: string;
    num: number;
    type: string;
    date: string;
    source: string;
    father: number;
    mother: number;
    box: number;
    eye: number;
    weight: number;

    constructor(
        private router: Router,
        private db: DatabaseService,
        private loader: LoaderService,
        public toast: Toast
    ) {}

    ngOnInit() {
        // set default date to today
        this.date = new Date().toDateString();

        if (!this.router.getCurrentNavigation().extras.state) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.title = this.router.getCurrentNavigation().extras.state.page.title;
            this.pageId = this.router.getCurrentNavigation().extras.state.page.id;
            this.showData = this.router.getCurrentNavigation().extras.state.page.showData;
            this.isEdit = this.router.getCurrentNavigation().extras.state.page.isEdit;
            this.rabbit = this.router.getCurrentNavigation().extras.state.page.rb;

            if (this.isEdit) {
                this.name = this.rabbit.name;
                this.num = this.rabbit.num;
                this.type = this.rabbit.type;
                this.date = new Date(toEngDate(
                    this.rabbit.date,
                    true
                ) as string).toDateString();
                this.source = this.rabbit.source;
                this.father = this.rabbit.father;
                this.mother = this.rabbit.mother;
                this.box = this.rabbit.box;
                this.eye = this.rabbit.eye;
                this.weight = this.rabbit.weight;
            }

            // console.log(this.router.getCurrentNavigation().extras.state.page);
        }

        // this.db.get(this.pageId).then(x => {
        //     // console.log(x)
        // });
    }

    save(form: NgForm) {
        this.loader.show();

        const f: Rabbit = form.value;
        const d = new Date(f.date || this.date);
        const date = createDate(
            `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
        );
        // console.log(date, f.date);

        // create rabbit object
        const obj: Rabbit = {
            name: f.name,
            num: f.num || this.num,
            type: f.type || this.type,
            date,
            source: f.source,
            father: f.father,
            mother: f.mother,
            box: f.box,
            eye: f.eye,
            weight: f.weight
        };

        // console.log(obj);

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
        // console.log(obj);
    }

    private saveData(obj: Rabbit, form: NgForm) {
        // before add check if this number exists
        this.db.get(this.pageId).then((d: Rabbit[]) => {
            // TODO updata if data was edited
            if (this.isEdit) {
                console.log(d);
                d = d.map(x => {
                    if (x.num === obj.num) {
                        x = obj;
                        console.log(x);
                    }
                    return x;
                });
                console.log(d);
                this.db.set(this.pageId, d);
                this.loader.hide();
                // console.log(obj);
                setTimeout(() => this.showRabbit(obj, true), 300);
            } else {
                const found = d.some(x => x.num === obj.num);

                if (found) {
                    this.showFeedback(obj.num, 1);
                    this.loader.hide();
                    return false;
                }
                this.db.add(this.pageId, obj).then(d => {
                    this.loader.hide();
                    this.showFeedback(obj.num, 2, 'success');
                    // TODO navigate to this rabbit own page
                    this.showRabbit(obj);
                });
            }
        });
    }

    showRabbit(obj: Rabbit, isEdit = false) {
        const st: NavigationExtras = {
            state: {
                obj,
                isEdit,
                male: this.pageId === 'males'
            }
        };

        this.router.navigate([isEdit ? 'showEdited' : 'show'], st);
    }

    private showFeedback(num: number, mess: number, color: string = 'danger') {
        const messages = [
            'الإم رقم ' + num + ' غير موجودة',
            'الأرنب رقم ' + num + ' مسجل بالفعل',
            'تم الحفظ بنجاح'
        ];
        this.toast.show(messages[mess], '2000', 'center');
    }
}
