export interface Rango {
    min: number;
    max: number;
    habilitado: 0 | 1;
}

export interface FiltroInmueble {
    categorias: number[];
    esAlquiler: number;
    habitaciones: Rango;
    areaConstruccion: Rango;
    areaTerreno: Rango;
    plantas: Rango;
    parqueaderos: Rango;
    precios: Rango;

}

export type CriteroRango = keyof (Omit<FiltroInmueble, 'categorias'>) & keyof (Omit<FiltroInmueble, 'esAlquiler'>);
