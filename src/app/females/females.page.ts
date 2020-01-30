import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-females',
    templateUrl: './females.page.html',
    styleUrls: ['./females.page.scss']
})
export class FemalesPage implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    addNewFemale() {
        let page = {
            id: 'females',
            showData: false,
            title: 'إنثى جديدة'
        };
        const navExt: NavigationExtras = {
            state: {
                page
            }
        };

        this.router.navigate(['add-new'], navExt);
    }
}
