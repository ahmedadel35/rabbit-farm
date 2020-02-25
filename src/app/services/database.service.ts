import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private storage: Storage) {}

    async get(key: string): Promise<Array<{}> | boolean> {
        // console.log(this.storage.driver);
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
