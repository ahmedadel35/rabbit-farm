import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    de: any = 'wasdasdxzad';

    constructor(private http: HttpClient) {
        // this.http.get('assets/females.json').subscribe(x => {
        //     // @ts-ignore
        //     // console.log(x);
        //     // @ts-ignore
        //     // this.de = x.name;
        // });
        // this.createData();
    }

    createData() {
        let arr = [];
        for (let i = 1; i < 8; i++) {
            let x = {
                id: 0,
                name: this.hash() + ' ' + i,
                rnum: i,
                type: this.hash(),
                birth:  this.rand() + '2/5/2019',
                source: this.hash() + ' body names',
                father: this.rand(),
                mother: 4,
                box: this.rand(),
                eye: this.rand(),
                weight: this.rand() * 25
            };
            arr.push(x);
        }
        console.clear();
        console.log(JSON.stringify(arr));
    }

    rand(): number {
        return Math.floor(Math.random() * (Math.random() * 10));
    }

    hash(length = 8) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
