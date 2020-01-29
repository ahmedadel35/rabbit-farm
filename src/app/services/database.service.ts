import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(
        private plt: Platform,
        private storage: Storage,
        private http: HttpClient
    ) {
        this.plt.ready().then(rd => {

            // const mony = this.get('mony');
            // if (!mony) {
            //     this.http.get('assets/seed/mony.json').subscribe(x => {
            //         console.log(x);
            //         this.set('mony', x);
            //     });
            // }
        });
    }

    async get(key: string): Promise<Array<{}> | boolean> {
        return await this.storage.get(key).then(d => {
            if (null !== d) {
                return JSON.parse(d);
            }

            return false;
        });
    }

    set(key: string, value: any): void {
        this.storage.set(key, JSON.stringify(value));
    }

    async add(key: string, value: any): Promise<Array<{}> | boolean> {
        return await this.get(key).then((d: any | null) => {
            if (d) {
                d.push(value);
                // save with new data
                this.set(key, d);
                return true;
            }
            return false;
        });
    }
}
