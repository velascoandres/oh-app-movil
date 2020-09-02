import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-carrusel',
    templateUrl: './carrusel.component.html',
    styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent implements OnInit {


    @Input()
    imagenes: any[] = [];

    totalImagenes = 0;
    indiceImagenActual = 1;

    @Input()
    opciones = {};

    constructor() {
    }

    ngOnInit() {
        this.totalImagenes = this.imagenes.length;
    }

    gestionarPaginacionAdelante() {
        this.totalImagenes = this.imagenes.length;
        this.indiceImagenActual += 1;
    }

    gestionarPaginacionAtras() {
        this.totalImagenes = this.imagenes.length;
        this.indiceImagenActual += -1;
    }

}
