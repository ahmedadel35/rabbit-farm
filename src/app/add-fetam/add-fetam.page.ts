import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-fetam',
    templateUrl: './add-fetam.page.html',
    styleUrls: ['./add-fetam.page.scss']
})
export class AddFetamPage implements OnInit {
    // form inputs
    patchNo?: number = null;
    count: number = null;
    weight: number = null;
    age: number = null;
    date: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.date = new Date().toDateString();
    }

    goBack() {
        this.router.navigate(['fetam']);
    }
}
