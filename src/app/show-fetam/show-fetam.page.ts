import { Component, OnInit } from '@angular/core';
import Fetam from '../interfaces/fetam';
import { Router, NavigationExtras, Navigation } from '@angular/router';

@Component({
    selector: 'app-show-fetam',
    templateUrl: './show-fetam.page.html',
    styleUrls: ['./show-fetam.page.scss']
})
export class ShowFetamPage implements OnInit {
    f: Fetam;
    initHasPlayed = false;
    title = '';

    constructor(private router: Router) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;

        let routerData:
            | NavigationExtras
            | Navigation = this.router.getCurrentNavigation();
        if (routerData) {
            routerData = routerData.extras;
            if (!routerData.state || !routerData.state.f) {
                this.router.navigate(['fetam']);
            } else {
                // get page name and id from state
                this.f = routerData.state.f;
                this.title = `دفعه رقم: ${this.f.patchNo}`;
                }

                console.log(routerData.state.f);
            }
    }
}
