import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import Fetam from '../interfaces/fetam';

@Component({
    selector: 'app-add-fetam-state',
    templateUrl: './add-fetam-state.page.html',
    styleUrls: ['./add-fetam-state.page.scss']
})
export class AddFetamStatePage implements OnInit {
    f: Fetam = {
        age: 10,
        count: 34,
        date: '12 فبراير 2020',
        patchNo: 2,
        weight: 22
    };

    constructor(private router: Router) {}

    ngOnInit() {}

    goBack() {
        const b: NavigationExtras = {
            state: {
                f: this.f
            }
        };

        this.router.navigate(['show-fetam']);
    }
}
