import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
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
  totalInmuebles: number;
  @Input()
  query = {
    skip: 0,
    take: 10,
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
          if (inmueblesState.cargo) {
            this.inmuebles = inmueblesState.inmuebles;
            this.totalInmuebles = inmueblesState.total;
          }
        }
      );
    this.subscripciones.push(subscripcionStoreInmueble);
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(
      sub => sub.unsubscribe(),
    );
  }

  cargarMasInmuebles(evento) {
    console.log('me carge');
    this.query.skip = this.query.skip + 10;
    const deberCargar = this.inmuebles.length < this.totalInmuebles;
    evento.target.complete();
    if (deberCargar) {
      this.storeInmuebles.dispatch(
        InmueblesActions.cargarInmuebles(
          {
            parametros: { skip: this.query.skip, take: 10 },
          },
        ),
      );
    } else {
      evento.target.disabled = true;
    }
  }
}
