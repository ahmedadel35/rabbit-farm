import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public loader: Promise<HTMLIonLoadingElement>;

    constructor(private loaderCtrl: LoadingController) {}

    /**
     * show ionic spinner loader
     *
     * @memberof Loader
     */
    async showLoader() {
        if (!this.loader) {
            this.loader = await this.loaderCtrl.create({
                backdropDismiss: false,
                message: 'يرجى الإنتظار',
                duration: 7000
            });
        }
        await this.loader.present();
    }

    /**
     * hide active loader
     *
     * @memberof Loader
     */
    async hideLoader() {
        if (this.loader) {
            await this.loader.dismiss();
        }
    }
}
