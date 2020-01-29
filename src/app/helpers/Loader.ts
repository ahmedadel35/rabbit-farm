import { LoadingController } from '@ionic/angular';

export default class Loader {
    public loader: Promise<HTMLIonLoadingElement>;

    constructor(private loadCtrl: LoadingController) {}

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
