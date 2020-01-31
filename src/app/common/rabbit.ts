import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { DatabaseService } from '../services/database.service';
import Rabbit from '../interfaces/rabbit';

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
