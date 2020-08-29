import {TipoMonedaInterface} from './tipo-moneda.interface';

export interface PrecioInterface {
    id?: number;
    valor: number;
    tipoMoneda: TipoMonedaInterface | number;
}
