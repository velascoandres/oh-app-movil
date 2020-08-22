import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from 'src/app/store/app.reducers';
import {IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {OPCIONES_CARRUSEL_COVERFLOW} from './animaciones-slide/opciones-carrusel-coverflow';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-informacion-inmueble',
    templateUrl: './informacion-inmueble.component.html',
    styleUrls: ['./informacion-inmueble.component.scss'],
})
export class InformacionInmuebleComponent implements OnInit, OnDestroy, AfterViewInit {


    cargando: boolean;
    inmueble: InmuebleInterface;
    opciones = {
        initialSlide: 1,
        speed: 400
    };
    totalImagenes = 0;
    imagenActual = 1;
    subscripciones: Subscription[] = [];

    @ViewChild(IonSlides) ionSlides: IonSlides;

    constructor(
        private readonly inmubleStore: Store<AppStateInmueble>,
        private readonly modalController: ModalController,
        public loadingController: LoadingController,
    ) {
        this.cargando = true;
    }

    ngOnInit() {
        this.loader();
        this.escucharInmueble();
    }

    private async loader() {
        const loading = await this.loadingController.create({
            message: 'Cargando...',
            duration: 1000
        });
        await loading.present();
    }

    private escucharInmueble() {
        const subscripcion = this.inmubleStore
            .select('inmueble')
            .subscribe(
                (estado) => {
                    this.inmueble = estado;
                    this.totalImagenes = estado.imagenes.length;
                    this.imagenActual = 1;
                }
            );
        this.subscripciones.push(subscripcion);
    }

    cerrarModal(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
        this.modalController.dismiss();
    }

    gestionarPaginacion(evento) {
        this.imagenActual += evento;
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.ionSlides.startAutoplay();
    }

}
