import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute,db: Storage) {


        console.log(location.pathname);
        // console.log(this.router, this.router.getCurrentNavigation());
        this.route.queryParams.subscribe(param => {
            console.log(param);
            if (this.router.getCurrentNavigation().extras.state) {
                // get page name and title from state
                console.log(
                    this.router.getCurrentNavigation().extras.state.page.title
                );
                console.log(
                    this.router.getCurrentNavigation().extras.state.page.id
                );
            }
        });

        db.get('mony').then(x => console.log(x));
    }

    ngOnInit() {}
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
