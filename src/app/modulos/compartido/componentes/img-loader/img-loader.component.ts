import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
})
export class ImgLoaderComponent implements OnInit {

    @Input()
    imagen: string;


    @Input()
    estilo: any;

    cargoImagen: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
