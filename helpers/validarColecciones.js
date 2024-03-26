
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const includes = colecciones.includes(coleccion);

    if(!includes){
        throw new Error('Coleccion no permitida');
    }
    return true;

}

export {coleccionesPermitidas}