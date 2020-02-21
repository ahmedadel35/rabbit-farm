import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import Config from '../interfaces/Config';
import { AlertController, ToastController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { File } from '@ionic-native/file/ngx';

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
        public toast: ToastController
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

        this.showFeedback(0, 'success');

        this.loader.hide();
    }

    restore() {
        this.loader.show();

        this.file
            .readAsText(this.file.externalRootDirectory, 'rabbitFarmDB.json')
            .then(res => {
                if (!res || !JSON.parse(res)) {
                    this.showFeedback(1, 'danger');
                }
                const data = JSON.parse(res);

                for (const d in data) {
                    if (d) {
                        // console.log(d, data[d]);
                        this.db.set(d, data[d]);
                        if (d === 'config') {
                            this.config = data[d];
                        }
                    }
                }

                this.loader.hide();
                this.showFeedback(2, 'success');
            })
            .catch(err => {
                // console.log(err);
                this.showFeedback(3, 'danger');
                this.loader.hide();
            });
    }

    private showFeedback(mess: number, color: string = 'danger') {
        const messages = [
            'تم حفظ الملف (rabbitFarmDB.json) بنجاح على الذاكرة الداخلية للهاتف',
            'لم يتم العثور على الملف (rabbitFarmDB.json) على الذاكرة الداخلية للهاتف',
            'تم إسترداد البيانات بنجاح',
            'حدث خطأ غير متوقع ، برجاء إعادة المحاولة لاحقاً'
        ];
        this.toast
            .create({
                message: messages[mess],
                duration: 2000,
                color
            })
            .then(t => t.present());
    }
}
