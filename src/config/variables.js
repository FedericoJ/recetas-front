var tipos;
var servicio;
var busqueda;
var idUsuario;

const setUsuario=(idUser)=>{
    idUsuario =idUser
    console.log(idUsuario);
}

const getUsuario=()=>{
    return idUsuario; 
}

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

export default {setTipos,getTipos,setServicio,getServicio,setBusqueda,getBusqueda,setUsuario,getUsuario}