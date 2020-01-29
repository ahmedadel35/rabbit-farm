import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import { Storage } from '@ionic/storage';
import { FirstTimeUsage, FirstTimeKey } from './FirstTimeUsage';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.page.html',
    styleUrls: ['./notify.page.scss']
})
export class NotifyPage implements OnInit {
    constructor(
        private plt: Platform,
        private storage: Storage,
        private db: DatabaseService,
        private loader: LoaderService
    ) {
        this.loader.show();

        this.plt.ready().then(rbd => {
            if (rbd) {
                // check if this first time to use the app
                this.storage.get(FirstTimeKey).then(fth => {
                    if (fth) return true; // not the first time

                    // create the basic tables
                    (new FirstTimeUsage(this.db)).run();
                });
            }
        });
    }

    ngOnInit() {}
}
