import {Component, Input, OnInit} from '@angular/core';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';

@Component({
    selector: 'app-item-inmueble-gestion',
    templateUrl: './item-inmueble-gestion.component.html',
    styleUrls: ['./item-inmueble-gestion.component.scss'],
})
export class ItemInmuebleGestionComponent implements OnInit {
    @Input()
    inmueble: InmuebleInterface;

    constructor() {
    }

    ngOnInit() {
    }

}
