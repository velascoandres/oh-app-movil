import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuInmuebleState } from 'src/app/modulos/compartido/menu-inmueble-store/menu-inmueble.state';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';
import { AppStateInmueble, AppState } from 'src/app/store/app.reducers';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-lista-inmueble',
  templateUrl: './lista-inmueble.component.html',
  styleUrls: ['./lista-inmueble.component.scss'],
})
export class ListaInmuebleComponent implements OnInit, OnDestroy, AfterViewInit {

  inmuebles: InmuebleInterface[] = [];
  subscripciones: Subscription[] = [];
  totalInmuebles: number;
  mostrarLista: boolean;


  @Input()
  query = {
    skip: 0,
    take: 10,
  };

  @ViewChild('scroll') infiniteScroll: IonInfiniteScroll;


  constructor(
    private readonly storeInmuebles: Store<AppStateInmueble>,
    private readonly filtroStore: Store<AppState>,
  ) {
    this.mostrarLista = true;
  }

  ngAfterViewInit(): void {
    this.inicializar();
  }


  ngOnInit() {
    // this.inicializar();
  }


  private inicializar() {
    // this.listarInmuebles();
    this.escucharInmuebles();
    this.escucharFiltros();
  }

  private escucharInmuebles() {
    const subscripcionStoreInmueble = this.storeInmuebles
      .select('inmuebles')
      .subscribe(
        (inmueblesState: MenuInmuebleState) => {
          this.inmuebles = inmueblesState.inmuebles;
          this.totalInmuebles = inmueblesState.total;
          const deberCargar = this.inmuebles.length < this.totalInmuebles;
          this.infiniteScroll.disabled = !deberCargar;
          this.query.skip = inmueblesState.queryActual.skip;
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
    this.query.skip = this.query.skip + 10;
    const deberCargar = this.inmuebles.length < this.totalInmuebles;
    if (deberCargar) {
      this.storeInmuebles.dispatch(
        InmueblesActions.cargarInmuebles(
          {
            parametros: { skip: this.query.skip, take: 10 },
          },
        ),
      );
    }
    evento.target.complete();
  }

  escucharFiltros() {
    console.log('escuchando');
    this.filtroStore
      .select('filtro')
      .subscribe(
        (estado) => {
          console.log('escuchando', estado);
          this.mostrarLista = !estado.filtrando;
        }
      );
  }
}
