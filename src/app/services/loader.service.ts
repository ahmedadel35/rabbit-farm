import { Injectable } from '@angular/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
// import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public loader: any = null;

    constructor(private loaderCtrl: SpinnerDialog) {}

    /**
     * show ionic spinner loader
     *
     * @memberof Loader
     */
    show() {
        this.loaderCtrl.show();
    }

    /**
     * hide active loader
     *
     * @memberof Loader
     */
    hide() {
        this.loaderCtrl.hide();
        setTimeout(x => this.loaderCtrl.hide(), 500);
    }
}
