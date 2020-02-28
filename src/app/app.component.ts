import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './services/database.service';
import { LoaderService } from './services/loader.service';
import { setDarkMode } from './common/rabbit';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public darkMode = false;
    public appPages = [
        {
            title: 'الإشعارات',
            url: '/notify',
            icon: 'notifications'
        },
        {
            title: 'الإناث',
            url: '/females',
            icon: 'female'
        },
        {
            title: 'الذكور',
            url: '/males',
            icon: 'male'
        },
        {
            title: 'الفطام',
            url: '/fetam',
            icon: 'medical'
        },
        {
            title: 'المالية',
            url: '/mony',
            icon: 'cash'
        },
        {
            title: 'التقويم',
            url: '/calender',
            icon: 'calendar'
        },
        {
            title: 'دليل الأمراض وعلاجها',
            url: '/illness',
            icon: 'bug'
        },
        {
            title: 'الإعدادات',
            url: '/config',
            icon: 'cog'
        },
        {
            title: 'عن التطبيق',
            url: '/about',
            icon: 'information-circle'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private db: DatabaseService,
        public loader: LoaderService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.styleDefault();
            this.statusBar.styleBlackOpaque();
            this.statusBar.backgroundColorByHexString('#3171e0');

            this.changeAppTheme();

            setTimeout(_ => {
                this.splashScreen.hide();
            }, 600);
        });
    }

    changeAppTheme() {
        this.db.get('darkMode').then((dm: any) => {
            if (dm) {
                this.darkMode = dm.darkMode;
            }

            // load primary color
            this.db.get('primaryColor').then((c: any) => {
                if (c && c.pc) {
                    document.body.classList.add(c.pc);
                }

                setDarkMode(this);
            });
        });
    }
}
