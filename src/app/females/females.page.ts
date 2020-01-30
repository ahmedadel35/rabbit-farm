import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-females',
    templateUrl: './females.page.html',
    styleUrls: ['./females.page.scss']
})
export class FemalesPage implements OnInit {
    constructor() {}

    ngOnInit() {}

    addNewFemale() {
        console.log('some thing');
    }
}
