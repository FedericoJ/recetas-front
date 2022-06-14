import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Input, Select, CheckIcon,HStack } from "native-base";


const InputSelectCombo = ({item,unidades}) => {

  const [unidadSeleccionada, setUnidadSeleccionada] = useState("1");

  const onChangeHandler = (item) => {
    setUnidadSeleccionada(item);
  };

  return(<NativeBaseProvider>
    <HStack>
    <Select
      style={{backgroundColor:'#ffff'}}
      selectedValue={unidadSeleccionada}
      w='40%'
      mx="2"
      _selectedItem={{
        bg: "indigo",
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

export default InputSelectCombo;