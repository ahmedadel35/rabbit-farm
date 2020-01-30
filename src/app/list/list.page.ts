import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Funds from '../interfaces/funds';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public title = '';
    public data: Array<Funds> = [];
    public doneSum = false;

    private pageId = '';
    loader: LoaderService;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        private db: DatabaseService,
        public loader: LoaderService
    ) {
        if (!this.router.getCurrentNavigation().extras.state) {
            this.router.navigate(['mony']);
        } else {
            // get page name and id from state
            this.title = this.router.getCurrentNavigation().extras.state.page.title;
            this.pageId = this.router.getCurrentNavigation().extras.state.page.id;

            this.loadByType(this.pageId);

            // this.loader.show();
            // setTimeout(x => this.loader.hide(), 1500);
        }
    }

    ngOnInit() {}

    loadByType(type: string) {
        this.loader.show();
        this.db.get('funds').then(d => {
            d = (d as Array<Funds>).filter(x => (x.type === type && (x.date !== 'noDate')));
            console.log(d);
            this.data = d as Array<Funds>;
            // this.showSum();
            this.loader.hide();
        });
    }

    addToMony(form: NgForm) {
        this.loader.show();

        const f = form.value;

        if (form.valid) {
            this.data.push({
                value: f.value,
                count: f.count,
                info: f.info,
                date: this.createDate(),
                type: this.pageId,
                sum: false
            });
            console.log(this.data);

            // to save the sum: this.data.filter(x => x.sum !== true)
            this.db.set('funds', this.data);
            this.loader.hide();
            this.doneSum = false;
            // reset form
            form.resetForm();
        }
    }

    showSum() {
        let vc = 0,
            tc = 0;
        this.data.map(current => {
            if (!current.sum) {
                // @ts-ignore
                vc += parseFloat(current.value);
                // @ts-ignore
                tc += parseFloat(current.count);
            }
        });
        this.data.push({
            type: this.pageId,
            value: vc,
            count: tc,
            info: '=====',
            date: this.createDate(),
            sum: true
        });

        this.doneSum = true;
    }

    private createDate(): string {
        const d = new Date();
        const months = [
            'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونية', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'
        ];

        return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    }
}
