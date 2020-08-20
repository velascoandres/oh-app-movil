import { Component, OnInit } from '@angular/core';
import { CategoriaRestService } from 'src/app/modulos/compartido/servicios/rest/categoria-rest.service';
import { CategoriaInterface } from 'src/app/interfaces/categoria.interface';
import { ApiResponse } from 'src/lib/principal.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-filtros-inmuebles',
  templateUrl: './filtros-inmuebles.component.html',
  styleUrls: ['./filtros-inmuebles.component.scss'],
})
export class FiltrosInmueblesComponent implements OnInit {

  categorias: CategoriaInterface[] = [];


  filtros = {
    categorias: [],
    esAlquiler: 0,
    habitaciones: {lower: 1, upper: 5},
    areaConstruccion: {lower: 50, upper: 200},
    areaTerreno: {lower: 50, upper: 200},
    plantas: {lower: 1, upper: 4},
    parqueaderos: {lower: 1, upper: 2},
    precios: {lower: 30000, upper: 100000},
  };

  constructor(
    private readonly categoriaService: CategoriaRestService,
    private readonly filtroStore: Store<AppState>,
  ) { }
  ngOnInit() {
    const consulta = {
      where: {
        habilitado: 1,
      },
      skip: 0,
      take: 30,
    };
    this.categoriaService
      .findAll(consulta)
      .subscribe(
        (respuesta: ApiResponse<CategoriaInterface>) => {
          console.log(respuesta);
          this.categorias = respuesta.data;
        }
      );
  }

  setearCategoria(evento){
    console.log(evento);
  }

}
