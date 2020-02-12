import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-illness',
    templateUrl: './illness.page.html',
    styleUrls: ['./illness.page.scss']
})
export class IllnessPage implements OnInit {
    data: Array<{name: string, vac: string}> = [];

    constructor() {}

    ngOnInit() {
        this.data = [
            {
                name: 'جرب',
                vac: 'علاج الجرب'
            },
            {
                name: 'سل',
                vac: 'علاج السل'
            },
        ];
    }
}
