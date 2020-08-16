import { Component, OnInit } from '@angular/core';
import { InmuebleState } from 'src/app/modulos/compartido/menu-inmueble-store/inmueble.state';
import { Store } from '@ngrx/store';
import { MenuInmuebleState } from 'src/app/modulos/compartido/menu-inmueble-store/menu-inmueble.state';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';

@Component({
  selector: 'app-lista-inmueble',
  templateUrl: './lista-inmueble.component.html',
  styleUrls: ['./lista-inmueble.component.scss'],
})
export class ListaInmuebleComponent implements OnInit {

  inmuebles: InmuebleInterface[] = [];

  query = {
    where: {
      habilitado: 1,
      imagenes: {},
    }
  };

  constructor(
    private readonly storeInmueble: Store<InmuebleState>,
    private readonly storeInmuebles: Store<MenuInmuebleState>
  ) { }

  ngOnInit() {

  }

  private escucharInmuebles() {
    this.storeInmuebles
      .subscribe(
        (inmueblesState: MenuInmuebleState) => {
          this.inmuebles = inmueblesState.inmuebles;
        }
      );
  }

  private listarInmuebles() {
    this.storeInmueble
      .dispatch(
        InmueblesActions.cargarInmuebles(
          {
            parametros: this.query,
          }
        ),
      );
  }
}
