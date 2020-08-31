import {Component, ContentChild, forwardRef, Input, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileProviderService, ObjetoArchivo} from '../../../../servicios/utilitarios/file-provider.service';

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

    @ContentChild('galeria') galeria: TemplateRef<any>;

    constructor(
        private readonly archivoService: FileProviderService,
    ) {
    }

    onChange(value) {
    }

    onTouch() {
    }

    onInput(value) {
        console.log(this.value);
        if (this.value.length > 0){
            this.value.pop();
        }
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
        if (obj && obj.length) {
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
