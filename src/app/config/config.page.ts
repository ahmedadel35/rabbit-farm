import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import Config from '../interfaces/Config';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss']
})
export class ConfigPage implements OnInit {
    // @ts-ignore
    config: Config = {};
    initHasPlayed = false;

    constructor(private db: DatabaseService, public alertCtrl: AlertController) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.db.get('config').then((c: any) => {
            this.config = c;
        });
    }

    changeConfig(state: string) {
        this.alertCtrl.create({
            header: 'الأيام اللازمة',
            inputs: [
                {
                    type: 'number',
                    name: 'day',
                    value: this.config[state]
                }
            ],
            buttons: [
                {
                    text: 'إلغاء',
                    role: 'cancel'
                },
                {
                    text: 'حفظ',
                    handler: (res) => {
                        if (!res || !res.day) return false;

                        this.config[state] = parseInt(res.day, 10);
                        this.db.set('config', this.config);
                    }
                }
            ]
        }).then(a => a.present());
    }
}
