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
    habitaciones: { lower: 1, upper: 5, habilitado: 1 },
    areaConstruccion: { lower: 50, upper: 200, habilitado: 1 },
    areaTerreno: { lower: 50, upper: 200, habilitado: 1 },
    plantas: { lower: 1, upper: 4, habilitado: 1 },
    parqueaderos: { lower: 1, upper: 2, habilitado: 1 },
    precios: { lower: 30000, upper: 100000, habilitado: 1 },
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

  setearCategoria(evento) {
    const idCategoria = +evento.detail.value;
    const debeAgregarElemento = evento.detail.checked;
    if (debeAgregarElemento) {
      this.filtros.categorias.push(idCategoria);
    }
    this.filtros.categorias = this.filtros.categorias.filter(
      debeAgregarElemento ? this.callbackSoloUnicos() : this.callbackQuitar(idCategoria),
    );
    console.log(this.filtros);
  }

  private callbackSoloUnicos() {
    return (valor, indice, arreglo) => {
      return arreglo.indexOf(valor) === indice;
    };
  }

  private callbackQuitar(valorQuitar) {
    return (valor) => {
      return valorQuitar !== valor;
    };
  }

  filtrar() {
    // categorias: [],
    // esAlquiler: 0,
    // habitaciones: { lower: 1, upper: 5 },
    // areaConstruccion: { lower: 50, upper: 200 },
    // areaTerreno: { lower: 50, upper: 200 },
    // plantas: { lower: 1, upper: 4 },
    // parqueaderos: { lower: 1, upper: 2 },
    // precios: { lower: 30000, upper: 100000 },
    // const categorias = {this.filtros.categorias;

    const consultaCategoria = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaHabitaciones = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaPrecio = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaParqueaderos = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaAreaConstruccion = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaAreaTerreno = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consultaPlantas = this.filtros.categorias.length > 0 ? { $in: this.filtros.categorias, } : undefined;
    const consulta = {
      where: {
        categoria: { $in: this.filtros.categorias, },
        esAlquiler: this.filtros.esAlquiler,
        habitaciones: [
          { $gte: this.filtros.habitaciones.lower },
          { $lte: this.filtros.habitaciones.upper }
        ],
        precio: [
          { $gte: this.filtros.precios.lower },
          { $lte: this.filtros.precios.upper }
        ],
        parqueaderos: [
          { $gte: this.filtros.parqueaderos.lower },
          { $lte: this.filtros.parqueaderos.upper }
        ],
        areaConstruccion: [
          { $gte: this.filtros.areaConstruccion.lower },
          { $lte: this.filtros.areaConstruccion.upper }
        ],
        areaTerreno: [
          { $gte: this.filtros.areaConstruccion.lower },
          { $lte: this.filtros.areaConstruccion.upper }
        ],
      }
    };
  }
}
