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
        // this.loaderCtrl
        //     .create({
        //         backdropDismiss: false,
        //         message: 'يرجى الإنتظار',
        //         duration: 7000
        //     })
        //     .then(l => {
        //         this.loader = l;
        //         this.loader.present().then(p => p);
        //     });

        this.loaderCtrl.show();
    }

    /**
     * hide active loader
     *
     * @memberof Loader
     */
    hide() {
        this.loaderCtrl.hide();
        // if (this.loader) {
        //     this.hideLoader(700);
        // } else {
        //     this.hideLoader(2500);
        // }
    }

    private hideLoader(timeout: number): void {
        setTimeout(x => {
            if (this.loader) this.loader.dismiss().then(d => d);
            this.loader = null;
        }, timeout);
    }
}
