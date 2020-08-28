import {Component, OnInit} from '@angular/core';
import {FileProviderService, ObjetoArchivo} from '../../../../servicios/native/file-provider.service';
import {CategoriaRestService} from '../../../../modulos/compartido/servicios/rest/categoria-rest.service';
import {CategoriaInterface} from '../../../../interfaces/categoria.interface';
import {FormularioPrincipal} from '../../../../../lib/formulario-principal';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {VALIDACION_SELECT} from '../../../../../lib/constantes-formulario';
import {ToastController} from '@ionic/angular';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../../lib/principal.service';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {debounceTime, map} from 'rxjs/operators';

@Component({
    selector: 'app-formulario-crear-editar-inmueble',
    templateUrl: './formulario-crear-editar-inmueble.component.html',
    styleUrls: ['./formulario-crear-editar-inmueble.component.scss'],
})
export class FormularioCrearEditarInmuebleComponent extends FormularioPrincipal implements OnInit {
    imagenes: ObjetoArchivo[] = [];
    categorias: CategoriaInterface[] = [];
    etiquetaSiguiente = 'SIGUIENTE PASO';
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
        imagenes: [[], [Validators.required]],
        esAlquiler: [0],
    };

    objetoArreglosErrores = {
        nombre: [],
        descripcion: [],
        direccion: [],
        precio: [],
        predio: [],
        plantas: [],
        parqueaderos: [],
        habitaciones: [],
        areaConstruccion: [],
        areaTerreno: [],
        imagenes: [],
        categoria: [],
    };
    mensajesErrores = {
        nombre: {
            required: 'El nombre es requerido',
            minlength: 'El nombre debe tener mínimo 4 caracteres',
            maxlength: 'El nombre debe tener máximo 30 caracteres',
        },
        descripcion: {
            required: 'La descripcion es requerido',
            minlength: 'La descripcion tener mínimo 10 caracteres',
            maxlength: 'La descripcion tener máximo 160 caracteres',
        },
        direccion: {
            required: 'La direccion es requerido',
            minlength: 'La direccion tener mínimo 10 caracteres',
            maxlength: 'La direccion tener máximo 160 caracteres',
        },
        categoria: {
            required: 'La categoria es obligatoria',
        },
        precio: {
            required: 'El precio es obligatorio',
            min: 'La precio debe ser mayor a 0',
            pattern: 'Ingresar solo numeros'
        },
        predio: {
            required: 'El predio es obligatorio',
            min: 'La precio debe ser mayor a 0',
            pattern: 'Ingresar solo numeros',
            repetido: 'Ya existe un inmueble registrado con ese predio',
        },
        habitaciones: {
            required: 'La numero de habitaciones es obligatorio',
            pattern: 'Ingresar solo numeros'
        },
        plantas: {
            required: 'EL numero de plantas es obligatorio',
            pattern: 'Ingresar solo numeros'
        },
        parqueaderos: {
            required: 'El numero de parqueaderos es obligatorio',
            pattern: 'Ingresar solo numeros'
        },
        areaConstruccion: {
            required: 'El area de construccion es obligatorio',
            pattern: 'Ingresar solo numeros'
        },
        areaTerreno: {
            required: 'El area del terreno es obligatorio',
            pattern: 'Ingresar solo numeros'
        },
        imagenes: {
            required: 'Las imagenes son requeridas',
        },
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _toaster: ToastController,
        private archivoService: FileProviderService,
        private readonly categoriaService: CategoriaRestService,
        private readonly inmubleService: InmuebleRestService,
    ) {
        super(_formBuilder, _toaster);
        this.formulario = this._formBuilder.group(
            this.controles,
        );
        this.obtenerCategorias();
    }

    ngOnInit(): void {
        this.escucharFormulario();
        this.escucharCampos();
        this.llenarFormulario();
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
                        console.log(total);
                        return total ? {repetido: true} : null;
                    },
                ),
            );
    }

}
