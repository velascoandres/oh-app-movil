export function eliminarPropiedadesObjeto<T>(
    objeto: T,
    propiedadesParaElminar: (keyof T)[],
): any {
    const propiedadesObjeto = Object.keys(objeto) as (keyof T)[];
    return propiedadesObjeto.reduce(
        (acc: Partial<T>, propiedad: keyof T) => {
            const noSeDebeEliminar = !propiedadesParaElminar.includes(propiedad);
            if (noSeDebeEliminar) {
                acc[propiedad] = objeto[propiedad];
            }
            return acc;
        }, {},
    );
}
