import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public loader: any = null;

    constructor(private loaderCtrl: LoadingController) {}

    /**
     * show ionic spinner loader
     *
     * @memberof Loader
     */
    show() {
        this.loaderCtrl
            .create({
                backdropDismiss: false,
                message: 'يرجى الإنتظار',
                duration: 7000
            })
            .then(l => {
                this.loader = l;
                this.loader.present().then(p => p);
            });
    }

    /**
     * hide active loader
     *
     * @memberof Loader
     */
    hide() {
        if (this.loader) {
            this.loader.dismiss().then(d => d);
        } else {
            setTimeout(x => {
                this.loader.dismiss().then(d => d);
                this.loader = null;
            }, 600);
        }
    }
}
