import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class CargandoService {
    constructor(
        public loadingController: LoadingController
    ) {
    }

    async mostrarCargando(mensaje: string) {
        const loading = await this.loadingController.create({
            message: mensaje,
        });
        await loading.present();
    }

    async ocultarCargando() {
        await this.loadingController.dismiss();
    }
}
