import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { HttpClientModule } from '@angular/common/http';

// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
// import { SQLite } from '@ionic-native/sqlite/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'rabbit_farm_aboadel_db'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileChooser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
