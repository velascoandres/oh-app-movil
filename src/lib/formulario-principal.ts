import {EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ToastController} from '@ionic/angular';

export class FormularioPrincipal {
    formulario: FormGroup;
    mensajesErrores = {};
    @Input()
    registro = undefined;
    @Output()
    datosFormulario: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
    controles = {};
    objetoArreglosErrores: {};
    constructor(
        private formBuilder: FormBuilder,
        private toaster: ToastController
    ) {
        this.formulario = this.formBuilder.group(
            this.controles,
        );
    }

    escucharCampo(nombreCampo: string) {
        const campo$ = this.formulario.get(nombreCampo);
        const subscripcionCampo = campo$
            .valueChanges
            .subscribe(
                valor => {
                    console.log(valor);
                    this.objetoArreglosErrores[nombreCampo] = this.llenarMensajesErrorCampo(campo$, nombreCampo);
                }
            );
        // this.listaSubscripciones.push(subscripcionCampo);
    }

    escucharCampos() {
        const nombreControles = Object.keys(this.formulario.controls);
        nombreControles.forEach(
            (control) => {
                this.escucharCampo(control);
            }
        );
    }

    protected llenarMensajesErrorCampo(control: AbstractControl | any, nombreCampo: string) {
        let arregloErrores = [];
        const tieneDatosPorDefecto = this.registro !== undefined && Object.keys(this.registro).length > 0;
        if ((control.controls || (control.dirty || control.touched) || tieneDatosPorDefecto) && control.errors) {
            arregloErrores = Object.keys(control.errors).map(
                (llave) => {
                    if (llave === 'matDatepickerParse') {
                        llave = 'date';
                    }
                    return this.mensajesErrores[nombreCampo][llave];
                }
            );
        }
        return arregloErrores;
    }
    llenarFormulario() {
        if (this.registro) {
            this.formulario.setValue(this.registro);
        }
    }

    private async mostrarToaster(mensaje: string) {
        const toast = await this.toaster.create({
            message: mensaje,
            duration: 2000
        });
        await toast.present();
    }

    escucharFormulario() {
        this.formulario
            .valueChanges
            .subscribe(
                (informacionFormulario) => {
                    const formularioValido = !this.formulario.invalid;
                    if (formularioValido) {
                        if (this.toaster) {
                            this.mostrarToaster('Formulario Valido').then().catch();
                        }
                        this.datosFormulario.emit(informacionFormulario);
                    } else {
                       // this.validarControles(this.formulario);
                        if (this.toaster) {
                            this.mostrarToaster('Formulario Invalido').then().catch();
                        }
                        this.datosFormulario.emit(undefined);
                    }
                }
            );
    }

    protected validarControlesSincrono(formulario) {
        const controles = Object.keys(formulario.controls);
        controles.forEach(
            (control: string) => {
                const controlFormulario = formulario.controls[control];
                if (controlFormulario.errors !== null && (controlFormulario.dirty || controlFormulario.touched)) {
                    const llavesErrores = Object.keys(controlFormulario.errors);
                    this.objetoArreglosErrores[control] = llavesErrores.map(
                        (llave: string) => {
                            return this.mensajesErrores[control][llave];
                        }
                    );
                }
            }
        );
    }

    protected modificarValor(controlName: string, valor: any) {
        this.formulario.get(controlName).setValue(valor);
    }

}
