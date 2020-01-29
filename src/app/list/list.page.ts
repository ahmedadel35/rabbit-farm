import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public title = '';
    private pageId = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        private db: DatabaseService,
        private loader: LoaderService
    ) {
        if (this.router.getCurrentNavigation().extras.state) {
            // get page name and id from state
            this.title = this.router.getCurrentNavigation().extras.state.page.title;
            this.pageId = this.router.getCurrentNavigation().extras.state.page.id;
        } else {
            this.router.navigate(['mony']);
        }

        this.loadByType('income');

    }

    ngOnInit() {}

    loadByType(type = this.pageId) {
        this.db.get('config').then(d => {
            console.log(d);
        });
    }
    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }

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
