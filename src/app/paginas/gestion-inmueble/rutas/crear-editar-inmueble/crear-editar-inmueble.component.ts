import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-crear-editar-inmueble',
    templateUrl: './crear-editar-inmueble.component.html',
    styleUrls: ['./crear-editar-inmueble.component.scss'],
})
export class CrearEditarInmuebleComponent implements OnInit {

    formularioValido: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    escucharInmueble(evento) {
        console.log(evento);
        this.formularioValido = !!evento;
    }

}
