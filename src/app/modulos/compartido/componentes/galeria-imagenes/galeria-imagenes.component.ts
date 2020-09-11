import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObjetoArchivo} from '../../../../servicios/utilitarios/file-provider.service';

@Component({
    selector: 'app-galeria-imagenes',
    templateUrl: './galeria-imagenes.component.html',
    styleUrls: ['./galeria-imagenes.component.scss'],
})
export class GaleriaImagenesComponent implements OnInit {
    @Input() imagenes: (ObjetoArchivo & { seleccionado: boolean })[] = [];
    @Output()// tslint:disable-next-line:max-line-length
    imagenesSeleccionadas: EventEmitter<(ObjetoArchivo & { seleccionado: boolean })[]> = new EventEmitter<(ObjetoArchivo & { seleccionado: boolean })[]>();

    constructor() {
    }

    ngOnInit() {
    }

    emitirImagenes() {
        const imagenes = this.imagenes.filter(img => img.seleccionado);
        console.log(imagenes);
        this.imagenesSeleccionadas.emit(imagenes);
    }

    seleccionarTodas(event) {
        const estaSeleccionado = event.target.checked;
        this.imagenes = this.imagenes.map(
            imagen => ({...imagen, seleccionado: estaSeleccionado})
        );
        this.emitirImagenes();
    }

}
