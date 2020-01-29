import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { DatabaseService } from '../services/database.service';

@Component({
    selector: 'app-mony',
    templateUrl: './mony.page.html',
    styleUrls: ['./mony.page.scss']
})
export class MonyPage implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    openPage(id: string, title: string) {
        const page = {
            id,
            title
        };

        const navExt: NavigationExtras = {
            state: {
                page
            }
        };
        this.router.navigate(['list'], navExt);
    }

    // loadData() {
    //     this.data = this.db.get('mony');
    //     console.log(this.data);
    //     this.showSum();
    // }

    // addToMony(form) {
    //     const f = form.value;
    //     const d = new Date();
    //     const date = d.getDate() + ' يناير ' + d.getFullYear();

    //     if (f.value && f.count) {
    //         // @ts-ignore
    //         this.data.push({
    //             value: f.value,
    //             count: f.count,
    //             notes: f.notes,
    //             date
    //         });

    //         // to save the sum: this.data.filter(x => x.sum !== true)
    //         this.db.set('mony', this.data);
    //         this.doneSum = false;
    //     }
    // }

    // showSum() {
    //     let vc = 0,
    //         tc = 0;
    //     // @ts-ignore
    //     this.data.map(current => {
    //         if (!current.sum) {
    //             vc += parseFloat(current.value);
    //             tc += parseFloat(current.count);
    //         }
    //     });
    //     // @ts-ignore
    //     this.data.push({
    //         value: vc,
    //         count: tc,
    //         notes: '=====',
    //         date: '25 فبراير 2020',
    //         sum: true
    //     });

    //     this.doneSum = true;
    // }
}
