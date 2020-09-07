import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileProviderService, ObjetoArchivo} from '../../../../servicios/utilitarios/file-provider.service';
import {CategoriaRestService} from '../../../../modulos/compartido/servicios/rest/categoria-rest.service';
import {CategoriaInterface} from '../../../../interfaces/categoria.interface';
import {FormularioPrincipal} from '../../../../../lib/formulario-principal';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {VALIDACION_SELECT} from '../../../../../lib/constantes-formulario';
import {ToastController} from '@ionic/angular';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {Observable, Subscription} from 'rxjs';
import {ApiResponse} from '../../../../../lib/principal.service';
import {InmuebleFormulario, InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {debounceTime, map} from 'rxjs/operators';
import {TipoMonedaService} from '../../../../modulos/compartido/servicios/rest/tipo-moneda.service';
import {TipoMonedaInterface} from '../../../../interfaces/tipo-moneda.interface';
import {Store} from '@ngrx/store';
import {AppStateFormularioInmueble} from '../../store/formulario-inmueble.store';
import {FormularioInmuebleActions} from '../../store/formulario-inmueble.actions';
import {MENSAJES_ERRORES, OBJETO_ARREGLOS_ERRORES} from './constantes';

@Component({
    selector: 'app-formulario-crear-editar-inmueble',
    templateUrl: './formulario-crear-editar-inmueble.component.html',
    styleUrls: ['./formulario-crear-editar-inmueble.component.scss'],
})
export class FormularioCrearEditarInmuebleComponent extends FormularioPrincipal<InmuebleFormulario> implements OnInit, OnDestroy {
    imagenes: ObjetoArchivo[] = [];
    categorias: CategoriaInterface[] = [];
    tiposMonedas: TipoMonedaInterface[] = [];
    etiquetaSiguiente = 'SIGUIENTE PASO';
    subs: Subscription[] = [];
    controles = {
        id: [0, ''],
        nombre: ['', [Validators.minLength(4), Validators.required, Validators.maxLength(30)]],
        categoria: ['', VALIDACION_SELECT],
        descripcion: ['', [Validators.minLength(10), Validators.required, Validators.maxLength(160)]],
        direccion: ['', [Validators.minLength(10), Validators.required, Validators.maxLength(160)]],
        precio: ['', [Validators.min(1), Validators.required, Validators.pattern('[0-9]+')]],
        predio: ['', [Validators.min(1), Validators.required, Validators.pattern('[0-9]+')], this.validarPredioAsync.bind(this)],
        areaTerreno: ['', [Validators.min(1), Validators.required, Validators.pattern('[0-9]+')]],
        areaConstruccion: ['', [Validators.min(1), Validators.required, Validators.pattern('[0-9]+')]],
        habitaciones: ['', [Validators.min(0), Validators.required, Validators.pattern('[0-9]+')]],
        parqueaderos: ['', [Validators.min(0), Validators.required, Validators.pattern('[0-9]+')]],
        plantas: ['', [Validators.min(0), Validators.required, Validators.pattern('[0-9]+')]],
        tipoMoneda: ['', [Validators.required]],
        imagenes: [[], [Validators.required]],
        enAlquiler: [0],
    };

    objetoArreglosErrores = {
        ...OBJETO_ARREGLOS_ERRORES,
    };
    mensajesErrores = {
        ...MENSAJES_ERRORES,
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _toaster: ToastController,
        private archivoService: FileProviderService,
        private readonly categoriaService: CategoriaRestService,
        private readonly inmubleService: InmuebleRestService,
        private readonly tipoMonedaService: TipoMonedaService,
        private readonly _formularioInmuebleStore: Store<AppStateFormularioInmueble>
    ) {
        super(_formBuilder, _toaster);
        this.formulario = this._formBuilder.group(
            this.controles,
        );
        this.obtenerCategorias();
        this.obtenerTipoMoneda();
    }

    ngOnInit(): void {
        this.escucharFormulario();
        this.escucharCampos();
        this.llenarFormulario();
        this.escucharStoreFormulario();
    }

    private obtenerCategorias() {
        const query = {
            where: {
                habilitado: 1,
            },
            skip: 0,
            take: 30,
        };
        this.categoriaService.findAll(query).subscribe(
            ({data}) => this.categorias = data,
        );
    }

    private obtenerTipoMoneda() {
        const query = {
            where: {},
            skip: 0,
            take: 30,
        };
        this.tipoMonedaService.findAll(query).subscribe(
            ({data}) => this.tiposMonedas = data,
        );
    }

    seleccionarImagen(event) {
        this.archivoService
            .obtenerDatosArchivo(event)
            .subscribe(
                (respuesta) => {
                    this.imagenes = respuesta;
                    this.modificarValor('imagenes', this.imagenes);
                },
            );
    }

    validarPredioAsync({value}: AbstractControl): Observable<ValidationErrors | null> {
        const consulta = {
            where: {
                predio: value,
            },
        };
        const respuestaConsulta$: Observable<ApiResponse<InmuebleInterface>> = this.inmubleService.findAll(consulta);
        return respuestaConsulta$
            .pipe(
                debounceTime(500),
                map(({total}) => {
                        return total ? {repetido: true} : null;
                    },
                ),
            );
    }


    limpiarFormulario() {
        this.formulario.reset();
        this.formulario.markAsUntouched();
        this.formulario.get('imagenes').setValue([]);
    }

    protected emitirDatos(informacionParaSerEnviada) {
        this._formularioInmuebleStore.dispatch(
            FormularioInmuebleActions.emitirInmueble(
                {inmueble: informacionParaSerEnviada}
            ),
        );
    }


    escucharStoreFormulario() {
        const subStoreFormulario = this._formularioInmuebleStore
            .select('formularioInmueble').subscribe(
                ({inmueble}) => {
                    if (inmueble) {
                        this.registro = {
                            ...inmueble,
                            categoria: inmueble.categoria.id,
                        };
                        this.llenarFormulario();
                    } else {
                        this.limpiarFormulario();
                    }
                }
            );
        this.subs.push(subStoreFormulario);
    }

    ngOnDestroy(): void {
        this.subs.forEach(
            sub => sub.unsubscribe(),
        );
    }

}
