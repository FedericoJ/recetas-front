import React, { useState, setState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Input, Select, CheckIcon,HStack,Spinner} from "native-base";
import axios from 'axios'
import config from "../config/default.json";
import useSWR from 'swr'

const InputSelectCombo = ({item, unidades, numero}) => {

  const [unidadSeleccionada, setUnidadSeleccionada] = useState(item.IdUnidad.toString());
  const [cantidad,setCantidad]=useState(item.cantidad)//useState(calculo(numero));
  const recalculo = item.cantidad * numero;
  
  React.useEffect(() => {
      setCantidad(recalculo);
  },[recalculo]);


  const onChangeHandler = (item) => {
    
    const baseUrl =  config.baseUrl;
    var conversion =1;

    try{
    axios.get(`${baseUrl}/ingredientes/getFactorConversion?idOrigen=${unidadSeleccionada}&idDestino=${item}`)
    .then(function(res){
      conversion=res.data;
      const multiplicacion = conversion * recalculo;
      setCantidad(multiplicacion);
      setUnidadSeleccionada(item);
    })
    .catch(function(error){console.log(error)});  
    }catch(error){
    console.log(error.msg)
    }
   
  };

  return(<NativeBaseProvider>
    <HStack w="100%">

      <Input
      style={{backgroundColor:'#ffff',
      textAlign:"center" }} 
      fontSize= "16"
      isDisabled
      w="25%"
      ml="10"
      value={cantidad.toString()}
    />

    <Select
      style={{backgroundColor:'#ffff',textAlign:"center"}}
      selectedValue={unidadSeleccionada}
      ml="2"
      minWidth="40%"
      fontSize= "16"
      isDisabled={item.IdUnidad.toString() ==="7" ? true : item.IdUnidad.toString()==="8" ? true: false}
      _selectedItem={{
        bg: "indigo",
        fontSize: "16",
        endIcon: <CheckIcon size={5} />,
      }}
      onValueChange={onChangeHandler}
    >
      {unidades.map((unidad) => (
        <Select.Item
          key={unidad.value}
          label={unidad.label}
          value={unidad.value.toString()}
        />
      ))}
    </Select>
    </HStack>
  </NativeBaseProvider>)
}


const Ingredients = ({Receta, numero}) => {

  /*const [unidades,setUnidades] = useState([
    {label:"kg",value:"1"},
    {label:"g",value:"2"}
  ]);*/

  var unidades = [{label:"...",value:"1"},
  ]

  const baseUrl =  config.baseUrl;

   var fetcher= url => axios.get(`${baseUrl}/ingredientes/getUnidades`).then(res => res.data)

   const unidad = useSWR(`${baseUrl}/ingredientes/getUnidades`, fetcher);

   if (unidad.data) unidades=unidad.data;

  fetcher = url => axios.get(`${baseUrl}/ingredientes/getIngredienteUtilizadoPorReceta?idReceta=${Receta}`).then(res => res.data)
  
  const ingredientes=useSWR(`${baseUrl}/ingredientes/getIngredienteUtilizadoPorReceta?idReceta=${Receta}`, fetcher);


  if (!ingredientes.data){
    return( <NativeBaseProvider>
            <HStack space={8} justifyContent="center">
              <Spinner color="warning.500" />
            </HStack>
            </NativeBaseProvider>)
  }else{
    return (
      <View>
        {ingredientes.data &&
          ingredientes.data.map((element, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
                marginBottom: "2%",
                marginLeft: "5%",
                width:"100%"
              }}
            >
              <Text style={{ fontSize: 16 , width:"40%"}}>{element.nombre}</Text>
  
              <InputSelectCombo  unidades={unidades} item={element} numero={numero}/>
              
            </View>
          ))}
  
      </View>
    );
  }

};

export default Ingredients;
