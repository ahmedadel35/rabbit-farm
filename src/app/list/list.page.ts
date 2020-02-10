import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Funds from '../interfaces/funds';
import { NgForm } from '@angular/forms';
import { createDate } from '../common/rabbit';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    src= 'sell';
    type = '';
    seller = '';
    count = '';
    weight = '';
    value = '';
    info = '';
    date = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        private db: DatabaseService,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.date = (new Date()).toDateString();
    }

    // loadByType(type: string) {
    //     this.loader.show();
    //     this.db.get('funds').then(d => {
    //         // save all data into one object
    //         this.allData = d as Array<Funds>;
    //         // remove types other than this page id
    //         d = (d as Array<Funds>).filter(
    //             x => x.type === type && x.date !== 'noDate'
    //         );
    //         // console.log(d);
    //         this.data = d as Array<Funds>;
    //         this.loader.hide();

    //         // check if user has entered any funds
    //         if (this.data.length > 1) {
    //             this.showSum();
    //         }
    //     });
    // }

    // addToMony(form: NgForm) {
    //     this.loader.show();

    //     const f = form.value;

    //     if (form.valid) {
    //         const obj = {
    //             value: f.value,
    //             count: f.count,
    //             info: f.info,
    //             date: createDate(),
    //             type: this.pageId,
    //             sum: false
    //         };
    //         // this.data.push(obj);
    //         // this.allData.push(obj);

    //         // add sold fetam to income
    //         if (this.pageId === 'fetam') {
    //             // this.allData.push({
    //             //     type: 'income',
    //             //     value: f.value,
    //             //     count: 0,
    //             //     info: f.info,
    //             //     date: createDate(),
    //             //     sum: false
    //             // });
    //         }

    //         // console.log(this.data);

    //         // to save the sum: this.data.filter(x => x.sum !== true)
    //         this.db.set('funds', this.allData);
    //         this.loader.hide();
    //         this.doneSum = false;
    //         form.resetForm();
    //     }
    // }

    // showSum() {
    //     let vc = 0,
    //         tc = 0;
    //     this.data.map(current => {
    //         if (!current.sum) {
    //             // @ts-ignore
    //             vc += parseFloat(current.value);
    //             // @ts-ignore
    //             tc += parseFloat(current.count);
    //         }
    //     });
    //     // this.data.push({
    //     //     type: this.pageId,
    //     //     value: vc,
    //     //     count: tc,
    //     //     info: '=====',
    //     //     date: createDate(),
    //     //     sum: true
    //     // });

    //     this.doneSum = true;
    // }

    getSgment(sg) {
        this.src = sg;
    }

    save(form: NgForm) {
        this.loader.show();
        const f = form.value;
        const obj: Funds = {
            src: this.src,
            type: f.type,
            seller: f.seller,
            count: f.count,
            weight: f.weight,
            value: f.value,
            info: f.info,
            date: createDate(new Date(f.date))
        };
        console.log(obj);

        this.db.add('funds', obj).then(d => {
            this.loader.hide();
            form.resetForm();
            this.router.navigate(['mony']);
        });
    }
}
