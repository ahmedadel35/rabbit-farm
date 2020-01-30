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
        let pageData = {
            showData: false
        };
        const navExt: NavigationExtras = {
            state: {
                pageData
            }
        };

        this.router.navigate(['add-new'], navExt);
    }
}
