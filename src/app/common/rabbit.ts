import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { DatabaseService } from '../services/database.service';
import Rabbit from '../interfaces/rabbit';
import * as moment from 'moment';

export function goToAddNew(
    router: Router,
    id: string = 'females',
    title: string = 'إنثى جديدة',
    showData: boolean = false
): void {
    let page = {
        id,
        title,
        showData
    };

    const navExt: NavigationExtras = {
        state: {
            page
        }
    };

    router.navigate(['add-new'], navExt);
}

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

export function getAgeFromArabic(birth: string): string {
    // @ts-ignore
    birth = birth.split(' ');

    let age = getAge(
        parseInt(birth[2]),
        ArabicMonths.indexOf(birth[1]) + 1,
        parseInt(birth[0])
    );

    return age.length ? age : 'اليوم';
}

export function createDate(date: string = null): string {
    const d = date ? new Date(date) : new Date();
    const months = [
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

    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}
