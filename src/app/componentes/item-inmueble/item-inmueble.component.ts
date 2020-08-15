import { Component, OnInit, Input } from '@angular/core';
import { Inmueble } from 'src/app/interfaces/inmueble.interface';

@Component({
  selector: 'app-item-inmueble',
  templateUrl: './item-inmueble.component.html',
  styleUrls: ['./item-inmueble.component.scss'],
})
export class ItemInmuebleComponent implements OnInit {

  @Input()
  imbueble: Inmueble;

  constructor() { }

  ngOnInit() {}

}
