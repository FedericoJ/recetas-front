import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeBaseProvider, TextArea, Input, Divider, FormControl,VStack } from "native-base";
import TipoComidas from "../components/TipoComida";
import { ButtonModal, ButtonFondoBlanco, ButtonFondoRosa, ButtonCreateBlanco,ButtonCreateRosa } from "../components/ButtonsLogin";
import Box from "@mui/material/Box";
import Steps from "../components/Step";
import UploadImageReceta from '../components/UploadImageReceta';


const CreateReceta = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [titulo , setTitulo] = useState("");
  const [descripcion , setDescripcion] = useState("");
  const [porciones , setPorciones] = useState("");
  const [personas , setPersonas] = useState("");




  return (
    <ScrollView style={styles.container}>
      <View style={styles.botones}>
      <ButtonCreateBlanco text="Cancelar"  onPress={() => navigation.navigate('Principal')}/>
      <ButtonCreateRosa text="Guardar"   onPress={() => navigation.navigate('ViewReceta')}/>
      </View>

      <View style={{ width: "100%", height: 200 }}>
        <UploadImageReceta/>
      </View>
      <NativeBaseProvider>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
        <FormControl isRequired>
            <Input 
              placeholder="Titulo"
              backgroundColor="#FFFF"
              value={titulo}
              onChangeText={setTitulo}/>
          </FormControl>

      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "2%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >

      </View>


        <TextArea
          style={{ backgroundColor: "#ffff" }}
          w="90%"
          mx="5"
          placeholder="Descripcion"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "90%" }}> Categoria </Text>


        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "90%" }}> Porciones </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            mx="1"
            w="15%"
            placeholder=""
            value={porciones}
            onChangeText={setPorciones}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "2%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "90%" }}> Personas </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            mx="1"
            w="15%"
            placeholder=""
            value={personas}
            onChangeText={setPersonas}
          />
        </View>

        <Divider thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {" "}
          Ingredientes{" "}
        </Text>

        <Divider my="2" thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {" "}
          Pasos{" "}
        </Text>


      </NativeBaseProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6B1B1",
  },
  botones: {
    flexDirection:"row",
    backgroundColor:'#ffff',
    justifyContent:"space-between",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
          <CreateReceta />
    </NativeBaseProvider>
  )}
