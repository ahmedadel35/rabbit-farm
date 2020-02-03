import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import Config from '../interfaces/Config';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss']
})
export class ConfigPage implements OnInit {
    // @ts-ignore
    config: Config = {};
    initHasPlayed = false;

    constructor(
        private db: DatabaseService,
        public alertCtrl: AlertController,
        public loader: LoaderService,
        public file: File,
        public fileChr: FileChooser
    ) {}

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
        this.alertCtrl
            .create({
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
                        handler: res => {
                            if (!res || !res.day) return false;

                            this.config[state] = parseInt(res.day, 10);
                            this.db.set('config', this.config);
                        }
                    }
                ]
            })
            .then(a => a.present());
    }

    backup() {
        this.loadAllData();
    }

    async loadAllData() {
        this.loader.hide();

        const states = await this.db.get('states');
        const females = await this.db.get('females');
        const males = await this.db.get('males');
        const archive = await this.db.get('archive');
        const funds = await this.db.get('funds');
        const ill = await this.db.get('ill');

        const data = {
            config: this.config,
            states,
            females,
            males,
            archive,
            funds,
            ill
        };

        this.file.writeFile(
            this.file.externalRootDirectory,
            'rabbitFarmDB.json',
            JSON.stringify(data),
            { replace: true }
        );

        this.loader.hide();
    }

    restore() {
        this.loader.show();

        this.file
            .readAsText(this.file.externalRootDirectory, 'rabbitFarmDB.json')
            .then(res => {
                const data = JSON.parse(res);

                for (const d in data) {
                    if (d) {
                        console.log(d, data[d]);
                        this.db.set(d, data[d]);
                        if (d === 'config') {
                            this.config = data[d];
                        }
                    }
                }

                this.loader.hide();
            })
            .catch(err => {
                console.log(err);
                this.loader.hide();
            });
    }
}
