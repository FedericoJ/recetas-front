var tipos;


const setTipos=(datosReceta) =>{

    tipos =datosReceta;

}

const getTipos=() =>{

    console.log(tipos);

    return tipos;
}


export default {setTipos,getTipos}