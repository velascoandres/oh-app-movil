import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import View from 'ol/View';
import * as olProj from 'ol/proj';


@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

    mapa: any;

    constructor() {
    }

    ngOnInit() {
        this.mapa = new Map(
            {
                target: document.getElementById('mapa_contenedor'),
                layers: [
                    new TileLayer(
                        {
                            source: new OSM()
                        },
                    ),
                ],
                view: new View(
                    {
                        center: olProj.fromLonLat([7.0785, 51.4614]),
                        zoom: 5
                    },
                )
            },
        );
        console.log(this.mapa);
    }
}
