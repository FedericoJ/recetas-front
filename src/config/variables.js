var tipos;
var servicio;
var busqueda;

const setTipos=(datosReceta) =>{
    tipos =datosReceta;
}

const setServicio =(sweb)=>{
    servicio =sweb;
}

const getServicio=() =>{
    return servicio;
}

const getTipos=() =>{
    return tipos;
}

const setBusqueda =(busq) =>{
    busqueda =busq;
}

const getBusqueda=()=>{

    return busqueda;
}

export default {setTipos,getTipos,setServicio,getServicio,setBusqueda,getBusqueda}