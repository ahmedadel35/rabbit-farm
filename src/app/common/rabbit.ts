import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { DatabaseService } from '../services/database.service';
import Rabbit from '../interfaces/rabbit';
import * as moment from 'moment';

export const ArabicMonths = [
    'يناير',
    'فبراير',
    'مارس',
    'ابريل',
    'مايو',
    'يونية',
    'يوليو',
    'اغسطس',
    'سبتمبر',
    'اكتوبر',
    'نوفمبر',
    'ديسمبر'
];

export const ArabicDays = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

moment.locale('ar', {
    months: ArabicMonths,
    weekdays: ArabicDays
});

export function goToAddNew(
    router: Router,
    id: string = 'females',
    title: string = 'إنثى جديدة',
    showData: boolean = false,
    isEdit: boolean = false,
    rb: any = {}
): void {
    let page = {
        id,
        title,
        showData,
        isEdit,
        rb
    };

    const navExt: NavigationExtras = {
        state: {
            page
        }
    };

    router.navigate(['add-new'], navExt);
}

export function getAge(year, month, day) {
    const a = moment(new Date()),
        b = moment([year, month - 1, day]),
        intervals = ['years', 'months', 'weeks', 'days'];
    let out = [];

    intervals.forEach(function(interval: any) {
        var diff = a.diff(b, interval);
        b.add(diff, interval);
        out.push(diff + ' ' + interval);
    });

    // remove zero intities
    out = out.filter(x => x.charAt(0) !== '0');

    return out
        .join(', ')
        .replace('years', 'سنوات')
        .replace('months', 'شهور')
        .replace('weeks', 'أسابيع')
        .replace('days', 'ايام');
}

export function getAgeFromArabic(birth: string | string[]): string {
    birth = toEngDate(birth, false) as string[];

    const age = getAge(birth[0], birth[1], birth[2]);

    return age.length ? age : 'اليوم';
}

export function toEngDate(
    date: string | string[] | number[],
    asStr: boolean = true,
    minus: number = 0
): string[] | string {
    date = (date as string).split(' ');

    const m = date[1].split('(');
    let month = 0;
    if (typeof m[1] !== 'undefined') {
        month = parseInt(m[1], 10);
    } else {
        month = ArabicMonths.indexOf(date[1]) + 1;
    }

    // @ts-ignore
    date = [
        parseInt(date[2], 10),
        month,
        parseInt(date[0], 10) + minus
    ];

    // @ts-ignore
    return asStr ? (date as string[]).join('-') : date;
}

export function createDate(
    date: string | Date = null,
    format = 'YYYY-MM-DD',
    returnAs = 'D MMMM(M) YYYY'
): string {
    const m = date ? moment(date, format) : moment();
    moment.locale('ar');

    return m.format(returnAs);
}

// export function updateTheme(self: any, updateDB: boolean = false, color: string = '') {
//     this.loader.show();
//     const bo = document.body.classList;

//     // check if dark mode was enabled then change dark classes
//     if (this.darkMode) {
//         bo.remove('dark', 'darkTeal', 'darkBlue');
//         if (color === 'teal') bo.add('darkTeal');
//         else if (color === 'blue') bo.add('darkBlue');
//         else bo.add('dark');
//     } else {
//         bo.remove('blue', 'teal');
//         bo.add(color);
//     }

//     if()this.db.set('primaryColor', color);

//     this.loader.hide();
// }

export function setDarkMode(self: any, updateDB: boolean = false) {
    self.loader.show();
    const bo = document.body.classList,
        dm = { darkMode: self.darkMode };

    // change page theme
    if (self.darkMode) {
        if (bo.contains('teal')) {
            bo.add('darkTeal');
        } else if (bo.contains('blue')) {
            bo.add('darkBlue');
        } else {
            bo.add('dark');
        }
        bo.remove('teal', 'blue');
    } else {
        if (bo.contains('darkTeal')) bo.add('teal');
        else if (bo.contains('darkBlue')) bo.add('blue');

        bo.remove('dark', 'darkTeal', 'darkBlue');
    }

    if (updateDB) self.db.set('darkMode', dm);

    self.loader.hide();
}