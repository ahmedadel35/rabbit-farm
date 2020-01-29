import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

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
}
