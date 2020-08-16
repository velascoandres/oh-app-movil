import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuInmuebleState } from 'src/app/modulos/compartido/menu-inmueble-store/menu-inmueble.state';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';
import { AppStateInmueble } from 'src/app/store/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-inmueble',
  templateUrl: './lista-inmueble.component.html',
  styleUrls: ['./lista-inmueble.component.scss'],
})
export class ListaInmuebleComponent implements OnInit, OnDestroy {

  inmuebles: InmuebleInterface[] = [];
  subscripciones: Subscription[] = [];

  @Input()
  query = {
    where: {
      habilitado: 1,
      imagenes: {},
    }
  };

  constructor(
    private readonly storeInmuebles: Store<AppStateInmueble>
  ) { }


  ngOnInit() {
    this.inicializar();
  }


  private inicializar() {
    // this.listarInmuebles();
    this.escucharInmuebles();
  }

  private escucharInmuebles() {
    const subscripcionStoreInmueble = this.storeInmuebles
      .select('inmuebles')
      .subscribe(
        (inmueblesState: MenuInmuebleState) => {
          this.inmuebles = inmueblesState.inmuebles;
        }
      );
    this.subscripciones.push(subscripcionStoreInmueble);
  }

  private listarInmuebles() {
    this.storeInmuebles
      .dispatch(
        InmueblesActions.cargarInmuebles(
          {
            parametros: this.query,
          }
        ),
      );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(
      sub => sub.unsubscribe(),
    );
  }
}
