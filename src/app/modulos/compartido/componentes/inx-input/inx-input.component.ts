import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileProviderService, ObjetoArchivo} from '../../../../servicios/native/file-provider.service';

@Component({
    selector: 'app-inx-input',
    templateUrl: './inx-input.component.html',
    styleUrls: ['./inx-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BsInputComponent),
            multi: true,
        },
    ]
})
export class BsInputComponent implements OnInit, ControlValueAccessor {
    @Input()
    controlName = '';
    @Input()
    placeholder = '';
    @Input()
    label = '';
    @Input()
    multiple = false;
    @Input()
    accept = '';
    @Input()
    showFile = false;
    @Input()
    hint = '';
    @Input()
    tableHeaders = {actions: '', description: ''};
    value: ObjetoArchivo[] = [];
    listaObjetosArchivos = [];
    isDisabled: boolean;

    constructor(
        private readonly archivoService: FileProviderService,
    ) {
    }

    onChange(value) {
    }

    onTouch() {
    }

    onInput(value) {
        this.value.pop();
        this.archivoService
            .obtenerDatosArchivo(value)
            .subscribe(res => {
                this.value = res;
                this.onTouch();
                this.onChange(this.value);
            });
    }

    ngOnInit() {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(obj: any): void {
        if (obj.length) {
            this.value.pop();
            this.archivoService
                .obtenerDatosArchivo(obj)
                .subscribe(res => this.value = res);
        }
    }

    escucharArchivo(event) {
        this.archivoService
            .obtenerDatosArchivo(event)
            .subscribe((res) => {
                this.value = res;
                const valores = Object.values(this.value[0]);
                if (!valores.length) {
                    this.value = [];
                }
                this.onTouch();
                this.onChange(this.value);
            });

    }
}
