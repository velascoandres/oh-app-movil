import { Component, OnInit } from '@angular/core';
import { InmuebleState } from '../../menu-inmueble-store/inmueble.state';
import { Store } from '@ngrx/store';
import { AppStateInmueble, AppState, AppStateInmuebleSolo } from 'src/app/store/app.reducers';
import { ModalController } from '@ionic/angular';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';

@Component({
  selector: 'app-informacion-inmueble',
  templateUrl: './informacion-inmueble.component.html',
  styleUrls: ['./informacion-inmueble.component.scss'],
})
export class InformacionInmuebleComponent implements OnInit {


  cargando: boolean;
  inmueble: InmuebleInterface;

  constructor(
    private readonly inmubleStore: Store<AppStateInmuebleSolo>,
    private readonly modalController: ModalController,
  ) {
    this.cargando = true;
  }

  ngOnInit() {
    this.escucharInmueble();
  }

  private escucharInmueble() {
    this.inmubleStore
    .select('inmueble')
    .subscribe(
      (estado) => {
        this.inmueble = estado;
      }
    );
  }

  cerrarModal(): void {
    this.modalController.dismiss();
  }

}
