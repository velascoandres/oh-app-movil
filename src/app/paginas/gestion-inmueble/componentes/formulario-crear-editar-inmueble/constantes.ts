export const MENSAJES_ERRORES = {
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
    tipoMoneda: {
        required: 'El tipo de moneda es obligatorio',
    },
};

export const OBJETO_ARREGLOS_ERRORES = {
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
    tipoMoneda: [],
};
