var tipos;
var servicio;
var busqueda;
var idUsuario;
var idReceta;
var nickname;

const setUsuario=(idUser)=>{
    idUsuario =idUser
}

const setNick=(alias)=>{
    nickname =alias;
}

const getNick=()=>{
    return nickname;
}

const setReceta=(receta)=>{
    idReceta=receta;
}

const getReceta=()=>{
    return idReceta;
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

export default {
    setTipos,
    getTipos,
    setServicio,
    getServicio,
    setBusqueda,
    getBusqueda,
    setUsuario,
    getUsuario,
    setReceta,
    getReceta,
getNick,
setNick}