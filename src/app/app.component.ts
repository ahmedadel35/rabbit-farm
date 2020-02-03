import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
      title: 'المالية',
      url: '/mony',
      icon: 'cash'
    },
    {
      title: 'الإعدادات',
      url: '/config',
      icon: 'cog'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleBlackOpaque();
      this.statusBar.backgroundColorByHexString('#3171e0');
      this.splashScreen.hide();
    });
  }
}
