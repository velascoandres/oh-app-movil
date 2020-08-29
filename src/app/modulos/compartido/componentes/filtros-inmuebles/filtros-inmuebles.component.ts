import {Component, OnInit} from '@angular/core';
import {CategoriaRestService} from 'src/app/modulos/compartido/servicios/rest/categoria-rest.service';
import {CategoriaInterface} from 'src/app/interfaces/categoria.interface';
import {ApiResponse} from 'src/lib/principal.service';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from 'src/app/store/app.reducers';
import {FiltroActions} from 'src/app/store/filtro-store/actions/filtro.actions';
import {CriteroRango, FiltroInmueble} from '../../../../interfaces/filtro-inmueble.interface';
import {inmuebleUsuarioSelector} from '../../../../paginas/menu-inmuebles/menu-inmueble-store/selectors/inmueble-usuario.selector';
import {PerfilUsuarioInterface} from '../../../../interfaces/perfil-usuario.interface';


@Component({
    selector: 'app-filtros-inmuebles',
    templateUrl: './filtros-inmuebles.component.html',
    styleUrls: ['./filtros-inmuebles.component.scss'],
})
export class FiltrosInmueblesComponent implements OnInit {

    categorias: CategoriaInterface[] = [];
    estaFiltrandoUsuario = false;
    usuario: PerfilUsuarioInterface;

    filtros: FiltroInmueble = {
        categorias: [],
        esAlquiler: 0,
        habitaciones: {min: 0, max: 0, habilitado: 0},
        areaConstruccion: {min: 0, max: 0, habilitado: 0},
        areaTerreno: {min: 0, max: 0, habilitado: 0},
        plantas: {min: 0, max: 0, habilitado: 0},
        parqueaderos: {min: 0, max: 0, habilitado: 0},
        precios: {min: 0, max: 0, habilitado: 0},
    };

    constructor(
        private readonly categoriaService: CategoriaRestService,
        private readonly filtroStore: Store<AppState>,
        private readonly store: Store<AppStateInmueble>,
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
                    this.categorias = respuesta.data;
                }
            );
        this.escucharInmueble();
    }

    escucharInmueble() {
        this.store
            .select(inmuebleUsuarioSelector)
            .subscribe(
                ({estadoInmueble, estadoUsuario}) => {
                    this.estaFiltrandoUsuario = estadoInmueble.sonDelUsuario;
                    this.usuario = estadoUsuario.usuario;
                }
            );
    }

    setearCategoria(evento) {
        this.filtros.categorias = evento.detail.value;
    }

    private empaquetarConsultaRango(criterio: CriteroRango) {
        return this.filtros[criterio].habilitado ? {$btw: [this.filtros[criterio].min, this.filtros[criterio].max]} : undefined;
    }

    filtrar() {
        const consultaCategoria = this.filtros.categorias.length > 0 ? {
            id: {$in: this.filtros.categorias},
        } : undefined;
        const consultaHabitaciones = this.empaquetarConsultaRango('habitaciones');
        const consultaPrecio = this.empaquetarConsultaRango('precios');
        const consultaParqueaderos = this.empaquetarConsultaRango('parqueaderos');
        const consultaAreaConstruccion = this.empaquetarConsultaRango('areaConstruccion');
        const consultaAreaTerreno = this.empaquetarConsultaRango('areaTerreno');
        const consultaPlantas = this.empaquetarConsultaRango('plantas');
        const consulta = {
            where: {
                categoria: consultaCategoria,
                enAlquiler: this.filtros.esAlquiler ? 1 : 0,
                habitaciones: consultaHabitaciones,
                precio: {
                    valor: consultaPrecio,
                },
                parqueaderos: consultaParqueaderos,
                areaConstruccion: consultaAreaConstruccion,
                areaTerreno: consultaAreaTerreno,
                plantas: consultaPlantas,
                habilitado: 1,
                imagenes: {},
                perfilUsuario: (this.estaFiltrandoUsuario ? {id: this.usuario.id} : undefined),
            },
            skip: 0,
            take: 10,
        };
        this.filtroStore
            .dispatch(
                FiltroActions.emitirFiltro(
                    {query: consulta}
                ),
            );
    }
}
