import { Component, OnInit, Input } from '@angular/core';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { Store } from '@ngrx/store';
import { InmuebleState } from 'src/app/modulos/compartido/menu-inmueble-store/inmueble.state';
import { ModalController } from '@ionic/angular';
import { InformacionInmuebleComponent } from 'src/app/modulos/compartido/modales/informacion-inmueble/informacion-inmueble.component';
import { InmuebleActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/inmueble.actions';

@Component({
  selector: 'app-item-inmueble',
  templateUrl: './item-inmueble.component.html',
  styleUrls: ['./item-inmueble.component.scss'],
})
export class ItemInmuebleComponent implements OnInit {

  @Input()
  inmueble: InmuebleInterface;

  constructor(
    private readonly inmuebleStore: Store<InmuebleState>,
    private readonly modalController: ModalController,
  ) { }

  ngOnInit() { }

  async verInformacion() {
    const modal = await this.modalController.create({
      component: InformacionInmuebleComponent,
    });
    this.inmuebleStore.dispatch(
      InmuebleActions.cargarInmueble({ parametros: this.inmueble }),
    );
    return await modal.present();
  }

}
