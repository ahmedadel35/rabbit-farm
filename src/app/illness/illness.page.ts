import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { isArray } from 'util';

interface Illness {
    name: string;
    vaccine: string | string[];
    another: string| string[];
    value: string| string[];
    notes: string | string[];
}

@Component({
    selector: 'app-illness',
    templateUrl: './illness.page.html',
    styleUrls: ['./illness.page.scss']
})
export class IllnessPage implements OnInit {
    data: Illness[] = [];

    constructor(public alertCtrl: AlertController) {}

    ngOnInit() {
        this.data = [
            {
                name: 'الجرب',
                vaccine: [
                    'مرهم مينج سايد',
                    'مرهم كبريت حقن',
                    'ايفوماك'
                ],
                another: [
                    'ديزانون 60%',
                    'ايفوماك اردنى',
                    'بنزانيل بشرى'
                ],
                value: ['الحقن حسب الوزن والعمر', 'ديزانون 1سم'],
                notes: 'يمنع للعشار بعيد عن العلف والمياه والصغار'
            },
            {
                name: 'إسهالات',
                vaccine: 'سلفا ديمادين حقن',
                another: [
                    'فلاجيل أطفال',
                    'أنتنال تجريع'
                ],
                value: '1سم',
                notes: [
                    'يمنع للعشار ويفضل رده خشنه',
                    'وللفطام نزول فلاجيل فى المياه'
                ]
            },
            {
                name: 'البرد والعطس',
                vaccine: [
                    'انروفلوكساسين',
                    ' مضاد حيوى'
                ],
                another: [
                    'مضاد حيوى كونجستال تجريع',
                    ' 123'
                ],
                value: [
                    'حقن تحت الجلد أو عضل 1سم',
                    'من 2 إلى 3 أيام'
                ],
                notes: 'الجرعه كاملة حتى فى حالة الشفاء من البرد لا يعود ثانية'
            },
            {
                name: 'الإنتفاخ',
                vaccine: ['زيت الخروع تجريع',
                        'كيبكت مركب (بشرى)'
                ],
                another: 'حبوب الفحم',
                value: [
                    'صغار 1 سم',
                    'بالغ 2 سم'
                ],
                notes: [
                    'زيت الخروع مرة فى اليوم',
                    'كيبكت مرتين فى اليوم'
                ]
            },
            {
                name: 'إلتهاب رئوى',
                vaccine: 'انروفلوكس + مضاد حيوى',
                another: 'مضاد حيوى',
                value: 'حقن تحت الجلد أو عضل 1سم على 3 أيام',
                notes: 'الجرعة كاملة حتى فى حالة الشفاء من البرد لايعود ثانية'
            },
            {
                name: 'إلتهاب رحم',
                vaccine: 'مضاد حيوى',
                another: 'بتأدين مهبلى دش',
                value: 'حقن 1سم دش على 3 أيام',
                notes: 'دهان السرنجة بفازلين للتطهير'
            },
            {
                name: 'إصابات الخراج',
                vaccine: 'مضاد حيوى مع التطهير',
                another: 'مضاد حيوى مع التطهير',
                value: '1.5سم عضل أو تحت الجلد',
                notes: 'تنظيف الخراج نهائياً مع 2 سم مياه أكسوجين 10% للتطهير وقتل البكتريا'
            },
            {
                name: 'فاتح شهية عام',
                vaccine: 'كافوزال',
                another: 'القدونس',
                value: [
                    '1سم إلى 2سم ',
                    'البقدونس أخضر  '
                ],
                notes: ' البقدونس له تأثير على الأمعاء اَمن جدا جدا'
            },
            {
                name: 'كالسيوم',
                vaccine: 'كالبورماج',
                another: 'لكال دى ماج',
                value: '2سم إلى 3سم',
                notes: 'اليوم 7 من العشار وقبل الولادة 5أيام وبعد الولادة 3 أيام'
            },
            {
                name: 'غسول كلوى',
                vaccine: 'سترات بوتاسيوم',
                another: 'خل مركزى',
                value: ['2جرام على اللتر', '1سم على اللتر'],
                notes: 'مره كل إسبوعين اَمن'
            },
            {
                name: 'مطهرات ومنظفات',
                vaccine: 'ديزانون بيوتكس مركز',
                another: [
                    'بكتريا نافعة',
                    'فنيك كلور'
                ],
                value: '1سم رش بيوتكس اَمن للمبتدأين أو ديزانون للخبراء',
                notes: 'ديزنون 3سم رش المكان كله ماعدى الأرانب والأكل والمياه'
            },
            {
                name: 'تصمغ الإذن',
                vaccine: 'نقط بشرى (Remowax)',
                another: 'مسح الإذن بقطنة مبللة بـ ديزانون + يود (مخفف)',
                value: [
                    'النقط مرتين فى اليوم',
                    'الدهان 2-3 مرات فى اليوم'
                ],
                notes: ''
            },
            {
                name: 'سقوط الشعر',
                vaccine: 'أملاح معدنية مركزة',
                another: [
                    'قش أرز',
                    'قش برسيم'
                ],
                value: '2سم على اللتر',
                notes: 'قله الألياف فى العلف'
            },
            {
                name: 'إررتفاع الخصوبة',
                vaccine: 'ه سلينيوم مياه أو حقن',
                another: 'ثنائى فوسفات الكالسيوم تضاف على العلف',
                value: [
                    'حقن 1سم',
                    'مياه 3سم'
                ],
                notes: 'الأفضل إضافة للعلف يكون فايدة للكل'
            },
            {
                name: 'العلف',
                vaccine: 'أنضف العلف',
                another: 'أكبس لنفسك',
                value: [
                    'ذكر 150 جرام',
                    'إم 300جرام'
                ],
                notes: 'التأكد من سلامة العلف للأرانب'
            }
        ];
    }

    showDetails(i: Illness) {
        let mess = '';
        mess += '<ion-list>';
        mess += `<ion-item><ion-label><ion-note slot='start' color='danger'>العلاج: &nbsp;</ion-note>`;
        if (isArray(i.vaccine)) {
            mess += '<ul>';
            (i.vaccine as string[]).forEach(v => {
                mess += `<li>${v}</li>`;
            });
            mess += '</ul>';
        } else {
            mess += i.vaccine;
        }
        mess += `</ion-label></ion-item><ion-item><ion-label><ion-note slot='start' color='danger'>البديل: &nbsp;</ion-note>`;
        if (isArray(i.another)) {
            mess += '<ul>';
            (i.another as string[]).forEach(v => {
                mess += `<li>${v}</li>`;
            });
            mess += '</ul>';
        } else {
            mess += i.another;
        }
        mess += `</ion-label></ion-item><ion-item><ion-label><ion-note slot='start' color='danger'>الجرعة: &nbsp;</ion-note>`;
        if (isArray(i.value)) {
            mess += '<ul>';
            (i.value as string[]).forEach(v => {
                mess += `<li>${v}</li>`;
            });
            mess += '</ul>';
        } else {
            mess += i.value;
        }
        mess += `</ion-label></ion-item><ion-item><ion-label><ion-note slot='start' color='danger'>ملاحظات: &nbsp;</ion-note>`;
        if (isArray(i.notes)) {
            mess += '<ul>';
            (i.notes as string[]).forEach(v => {
                mess += `<li>${v}</li>`;
            });
            mess += '</ul>';
        } else {
            mess += i.notes;
        }
        mess += '</ion-label></ion-item>';

        mess += '</ion-list>';
        this.alertCtrl.create({
            header: `${i.name}`,
            message: mess,
            cssClass: 'fundsRepo',
            buttons: [
                {
                    text: 'تم'
                }
            ]
        }).then(a => a.present());
    }
}
