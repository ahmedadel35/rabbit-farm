import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit() {
        const mony = this.get('mony');
        if (!mony) {
            this.http.get('assets/seed/mony.json')
                .subscribe(x => {
                    console.log(x);
                    this.set('mony', x);
                });
        }
    }

    get(key: string): Array<{}> | false {
        const d = localStorage.getItem(key);
        if (null !== d) {
            return JSON.parse(d);
        }
        return false;
    }

    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    add(key: string, value: any): void | false {
        const d = this.get(key);

        if (d) {
            d.push(value);
            // save again with new data
            this.set(key, JSON.stringify(d));
        }

        return false;
    }
}
