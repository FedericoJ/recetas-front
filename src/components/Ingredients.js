import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Input, Select, CheckIcon,HStack } from "native-base";

const InputSelectCombo = ({item, unidades}) => {

  const [unidadSeleccionada, setUnidadSeleccionada] = useState("1");
 
  const onChangeHandler = (item) => {
    setUnidadSeleccionada(item);
  };

  return(<NativeBaseProvider>
    <HStack w="100%">

      <Input
      style={{backgroundColor:'#ffff',
      textAlign:"center" }} 
      fontSize= "16"
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
          value={unidad.value}
        />
      ))}
    </Select>
    </HStack>
  </NativeBaseProvider>)
}


const Ingredients = ({ ingredientes }) => {

  const [unidades, setUnidades] = useState([
    { label: "kg", value: "1" },
    { label: "g", value: "2" },
  ]);


  return (
    <View>
      {ingredientes &&
        ingredientes.map((element, i) => (
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
};

export default Ingredients;
