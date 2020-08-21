import {Component, OnInit} from '@angular/core';
import {CategoriaRestService} from 'src/app/modulos/compartido/servicios/rest/categoria-rest.service';
import {CategoriaInterface} from 'src/app/interfaces/categoria.interface';
import {ApiResponse} from 'src/lib/principal.service';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.reducers';
import {FiltroActions} from 'src/app/store/filtro-store/actions/filtro.actions';

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
        habitaciones: {lower: 0, upper: 0, habilitado: 0},
        areaConstruccion: {lower: 0, upper: 0, habilitado: 0},
        areaTerreno: {lower: 0, upper: 0, habilitado: 0},
        plantas: {lower: 0, upper: 0, habilitado: 0},
        parqueaderos: {lower: 0, upper: 0, habilitado: 0},
        precios: {lower: 0, upper: 0, habilitado: 0},
    };

    constructor(
        private readonly categoriaService: CategoriaRestService,
        private readonly filtroStore: Store<AppState>,
    ) {
    }

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
        // const idCategoria = +evento.detail.value;
        this.filtros.categorias = evento.detail.value;
        // const debeAgregarElemento = evento.detail.checked;
        // if (debeAgregarElemento) {
        //   this.filtros.categorias.push(idCategoria);
        // }
        // this.filtros.categorias = this.filtros.categorias.filter(
        //   debeAgregarElemento ? this.callbackSoloUnicos() : this.callbackQuitar(idCategoria),
        // );
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
        const consultaCategoria = this.filtros.categorias.length > 0 ? {
            id: {$in: this.filtros.categorias},
        } : undefined;
        const consultaHabitaciones = this.filtros.habitaciones.habilitado ? [
            {$gte: this.filtros.habitaciones.lower},
            {$lte: this.filtros.habitaciones.upper}
        ] : undefined;
        const consultaPrecio = this.filtros.precios.habilitado ? [
            {$gte: this.filtros.precios.lower},
            {$lte: this.filtros.precios.upper}
        ] : undefined;
        const consultaParqueaderos = this.filtros.parqueaderos.habilitado ? [
            {$gte: this.filtros.parqueaderos.lower},
            {$lte: this.filtros.parqueaderos.upper}
        ] : undefined;
        const consultaAreaConstruccion = this.filtros.areaConstruccion.habilitado ? [
            {$gte: this.filtros.areaConstruccion.lower},
            {$lte: this.filtros.areaConstruccion.upper}
        ] : undefined;
        const consultaAreaTerreno = this.filtros.areaTerreno.habilitado ? [
            {$gte: this.filtros.areaTerreno.lower},
            {$lte: this.filtros.areaTerreno.upper}
        ] : undefined;
        const consultaPlantas = this.filtros.plantas.habilitado ? [
            {$gte: this.filtros.plantas.lower},
            {$lte: this.filtros.plantas.upper}
        ] : undefined;
        const consulta = {
            where: {
                categoria: consultaCategoria,
                enAlquiler: this.filtros.esAlquiler ? 1 : 0,
                habitaciones: consultaHabitaciones,
                precio: consultaPrecio,
                parqueaderos: consultaParqueaderos,
                areaConstruccion: consultaAreaConstruccion,
                areaTerreno: consultaAreaTerreno,
                plantas: consultaPlantas,
            }
        };
        this.filtroStore
            .dispatch(
                FiltroActions.emitirFiltro(
                    {query: consulta}
                ),
            );
    }
}
