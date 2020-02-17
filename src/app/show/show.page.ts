import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    NavigationExtras,
    Navigation
} from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';
import { IonSlides, AlertController } from '@ionic/angular';
import State from '../interfaces/state';
import Ill from '../interfaces/ill';
import { createDate, goToAddNew } from '../common/rabbit';
import * as moment from 'moment';

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss']
})
export class ShowPage implements OnInit {
    rabbit: Rabbit = {
        num: 0,
        date: '',
        type: ''
    };
    isMale = false;
    isArchive = false;
    rabbitAttr = 'num'; // defalut for female usage
    data: State[];
    allData: State[];
    illData: Ill[];
    allIllData: Ill[];
    calc = {
        talqeh: [],
        gas: [],
        welada: [],
        gasPercent: '0',
        weladaMode: 0,
        alive: 0,
        dead: 0,
        allWelada: 0
    };
    title = '';
    initHasPlayed = false;
    activeSlide = 0;
    sliderVal = 'home';
    slideOpts = {
        speed: 400,
        centeredSlides: false
    };
    slidesArr = ['home', 'report', 'child', 'ill'];

    @ViewChild('rabbitSlides', { static: false }) slides: IonSlides;

    constructor(
        private router: Router,
        private db: DatabaseService,
        private loader: LoaderService,
        private alertCtrl: AlertController
    ) {}

    ionViewDidEnter() {
        if (!this.initHasPlayed) this.ngOnInit();
    }
    ionViewWillLeave() {
        this.initHasPlayed = false;
    }

    ngOnInit() {
        this.initHasPlayed = true;
        this.data = [];
        this.allData = [];
        this.illData = [];
        this.allIllData = [];

        let routerData:
            | NavigationExtras
            | Navigation = this.router.getCurrentNavigation();
        if (routerData) {
            routerData = routerData.extras;
            if (!routerData.state || !routerData.state.obj) {
                this.router.navigate(['females']);
            } else {
                // get page name and id from state
                this.rabbit = routerData.state.obj;
                this.title += this.rabbit.name
                    ? this.rabbit.name
                    : 'رقم ' + this.rabbit.num;
                this.isMale = routerData.state.male;
                this.isArchive = routerData.state.isArchive;

                // if this rabbit is male
                if (this.isMale) {
                    this.slidesArr.splice(1, 2);
                    this.rabbitAttr = 'maleNo';
                }

                // console.log(routerData.state.obj);
            }
        }
        // console.log(this.rabbit);
        this.loadData();
        // console.log(this.getTodayDate());
    }

    addState(): void {
        if (this.sliderVal === 'home') {
            this.showRadioAlert();
            return;
        }
        if (this.sliderVal === 'ill' || this.isMale) {
            this.showAlert();
            return;
        }

        const d: NavigationExtras = {
            state: {
                rb: this.rabbit
            }
        };

        this.router.navigate(['add-state'], d);
    }

    showRadioAlert() {
        const st = this.rabbit.state;

        this.alertCtrl
            .create({
                header: 'تعديل حالة هذه الإنثى',
                backdropDismiss: false,
                keyboardClose: false,
                inputs: [
                    {
                        type: 'radio',
                        name: 'state',
                        label: 'فارغة',
                        value: 0,
                        checked: !st || st === 4
                    },
                    {
                        type: 'radio',
                        name: 'state',
                        label: 'ملقحة',
                        value: 1,
                        checked: st === 1
                    },
                    {
                        type: 'radio',
                        name: 'state',
                        label: 'موجبة',
                        value: 2,
                        checked: st === 2
                    },
                    {
                        type: 'radio',
                        name: 'state',
                        label: 'ولادة',
                        value: 3,
                        checked: st === 3
                    }
                ],
                buttons: [
                    {
                        role: 'cancel',
                        text: 'إلغاء'
                    },
                    {
                        text: 'حفظ',
                        handler: a => {
                            this.editState(a);
                        }
                    }
                ]
            })
            .then(a => a.present());
    }

    editState(st: number) {
        this.loader.show();

        this.db.get('females').then((d: Rabbit[]) => {
            d = d.map(x => {
                if (x.num === this.rabbit.num) {
                    x.state = st;
                }
                return x;
            })
            this.db.set('females', d);
            this.loader.hide();
        });
    }

    editRabbit(): void {
        const rabbitGender = this.isMale ? 'الذكر' : 'الإنثى';
        goToAddNew(
            this.router,
            this.isMale ? 'males' : 'females',
            `تعديل ${rabbitGender} رقم: ${this.rabbit.num}`,
            true,
            true,
            this.rabbit
        );
    }

    goBack() {
        this.router.navigate([this.isMale ? 'males' : 'females']);
    }

    getIndex(slider: IonSlides) {
        slider.getActiveIndex().then(v => {
            // console.log(v);
            this.sliderVal = this.slidesArr[v];
        });
    }

    changeSlide(inx: string) {
        this.sliderVal = inx;
        this.slides.slideTo(this.slidesArr.indexOf(inx));
    }

    loadData() {
        this.loader.show();

        this.db.get('states').then((d: State[]) => {
            this.allData = d;

            // filter data to get states related to this female
            d = d.filter(x => x[this.rabbitAttr] === this.rabbit.num);

            this.data = d.reverse();

            this.doAllCalculations(this.data);

            // load ill data
            this.db.get('ill').then((i: Ill[]) => {
                this.allIllData = i;

                // get current rabbit illness
                i = i.filter(x => x.num === this.rabbit.num);
                this.illData = i.reverse();
                // console.log(this.illData);
            });

            this.loader.hide();
        });
    }

    doAllCalculations(d: State[]) {
        const talqeh = d.filter(x => x.state === 1);
        const gas = d.filter(x => x.state === 2);
        const goodGas = gas.filter(x => x.positive);
        // const badGas = gas.filter(x => !x.positive);
        const welada = d.filter(x => x.state === 3 && x.positive);
        const alive = welada.reduce(
            (t, c) => {
                t.child.alive += c.child.alive;
                return t;
            },
            { child: { alive: 0 } }
        );
        const dead = welada.reduce(
            (t, c) => {
                t.child.dead += c.child.dead;
                return t;
            },
            { child: { dead: 0 } }
        );
        const goodGasPercent =
            (goodGas.length / (goodGas.length + gas.length)) * 100;

        this.calc.talqeh = talqeh;
        this.calc.gas = gas;
        this.calc.gasPercent = gas.length > 0 ? goodGasPercent.toFixed(1) : '0';
        this.calc.welada = welada;
        this.calc.weladaMode = Math.round(alive.child.alive / welada.length);
        this.calc.alive = alive.child.alive;
        this.calc.dead = dead.child.dead;
        this.calc.allWelada = alive.child.alive + dead.child.dead;
    }

    getStateText(st: number): string {
        return ['تلقيح', 'جس', 'ولادة', 'فطام'][st - 1];
    }

    destroy(st: State, inx: number): void {
        this.allData.splice(this.allData.indexOf(st), 1);
        this.data.splice(inx, 1);

        // reCalculate every thing
        this.doAllCalculations(this.data);

        // save new data
        this.db.set('states', this.allData);
    }

    showAlert() {
        const alert = this.alertCtrl
            .create({
                header: 'إضافة مرض',
                message: ``,
                cssClass: 'fundsRepo',
                inputs: [
                    {
                        name: 'type',
                        // @ts-ignore
                        type: 'text',
                        placeholder: 'إسم المرض',
                        required: true
                    },
                    {
                        name: 'date',
                        // @ts-ignore
                        type: 'date',
                        placeholder: 'التاريخ',
                        value: this.getTodayDate(),
                        required: true
                    },
                    {
                        name: 'anti',
                        // @ts-ignore
                        type: 'string',
                        placeholder: 'العلاج'
                    },
                    {
                        name: 'notes',
                        // @ts-ignore
                        type: 'text',
                        placeholder: 'ملاحظات'
                    }
                ],
                buttons: [
                    {
                        text: 'إلغاء',
                        role: 'cancel',
                        cssClass: 'danger'
                    },
                    {
                        text: 'حفظ',
                        handler: (a: Ill) => {
                            // console.log(a);
                            // if user hasnot entered type or date
                            if (!a.type.length || !a.date.length) {
                                return false;
                            }

                            a.num = this.rabbit.num;

                            // save this illness
                            this.saveIll(a);
                        }
                    }
                ]
            })
            .then(a => a.present());
    }

    getTodayDate(): string {
        const d = new Date();
        let m: number | string = d.getMonth() + 1,
            i: number | string = d.getDate();

        m = m >= 10 ? m : `0${m}`;
        i = i >= 10 ? i : `0${i}`;

        return `${d.getFullYear()}-${m}-${i}`;
    }

    saveIll(i: Ill) {
        this.loader.show();
        console.log(i);

        i.date = createDate(i.date);

        this.db.add('ill', i).then(_ => {
            this.allIllData.unshift(i);
            this.illData.unshift(i);
            this.loader.hide();
        });
    }

    updateIll(i: Ill, inx: number) {
        this.loader.show();
        this.illData[inx].healed = true;
        this.allIllData[this.allIllData.indexOf(i)].healed = true;
        // console.log(this.illData);

        // save new data
        this.db.set('ill', this.allIllData);
        this.loader.hide();
    }

    deleteIll(i: Ill, inx: number) {
        this.loader.show();
        this.illData.splice(inx, 1);
        this.allIllData.splice(this.allIllData.indexOf(i), 1);

        // save new data
        this.db.set('ill', this.allIllData);
        this.loader.hide();
    }

    showYoungRepo() {
        const alert = this.alertCtrl
            .create({
                header: 'تقارير الولدة',
                cssClass: 'fundsRepo',
                message: `<ion-list>
            <ion-item>
                <ion-label>إجمالى الولدة</ion-label>
                <ion-note slot="end" color='primary'>${
                    this.calc.allWelada
                }</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>الولدة الحية</ion-label>
                <ion-note slot="end" color='success'>${
                    this.calc.alive
                }</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>الولدة الميتة</ion-label>
                <ion-note slot="end" color='danger'>${this.calc.dead}</ion-note>
            </ion-item>
            <ion-item>
                <ion-label>نسبة الحى</ion-label>
                <ion-note slot="end" color='tertiary'>
                ${((this.calc.alive / this.calc.allWelada) * 100).toFixed(2)} %
                </ion-note>
            </ion-item>
            <ion-item>
                <ion-label>نسبة الميت</ion-label>
                <ion-note slot="end" color='tertiary'>
                ${((this.calc.dead / this.calc.allWelada) * 100).toFixed(2)} %
                </ion-note>
            </ion-item>
            </ion-list>`,
                buttons: [
                    {
                        text: 'تم'
                    }
                ]
            })
            .then(a => a.present());
    }
}
