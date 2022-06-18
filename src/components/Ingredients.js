import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Input, Select, CheckIcon,HStack,Spinner} from "native-base";
import axios from 'axios'
import Tipos from './Tipos';
import config from "../config/default.json";
import useSWR from 'swr'

const InputSelectCombo = ({item, unidades}) => {

  const [unidadSeleccionada, setUnidadSeleccionada] = useState(item.IdUnidad.toString());
 
  const onChangeHandler = (item) => {
    setUnidadSeleccionada(item);
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
      value={item.cantidad.toString()}
    />

    <Select
      style={{backgroundColor:'#ffff'}}
      selectedValue={unidadSeleccionada}
      ml="2"
      minWidth="40%"
      fontSize= "16"
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


const Ingredients = ({Receta}) => {

  /*const [unidades,setUnidades] = useState([
    {label:"kg",value:"1"},
    {label:"g",value:"2"}
  ]);*/

  var unidades = [{label:"kg",value:"1"},
  {label:"gr",value:"2"}]

  const baseUrl =  config.baseUrl;

   var fetcher= url => axios.get(`${baseUrl}/ingredientes/getUnidades`).then(res => res.data)

   const unidad = useSWR(`${baseUrl}/ingredientes/getUnidades`, fetcher);

   if (unidad.data) unidades=unidad.data;

  fetcher = url => axios.get(`${baseUrl}/ingredientes/getIngredienteUtilizadoPorReceta?idReceta=${Receta}`).then(res => res.data)
  
  const ingredientes=useSWR(`${baseUrl}/ingredientes/getIngredienteUtilizadoPorReceta?idReceta=${Receta}`, fetcher);

  if (ingredientes.data) console.log(ingredientes.data);


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
  
              <InputSelectCombo  unidades={unidades} item={element}/>
              
            </View>
          ))}
  
      </View>
    );
  }

};

export default Ingredients;
