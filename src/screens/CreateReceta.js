import React, { useState } from "react";
import {  ScrollView,  StyleSheet,  Image,  View,  Text,  TouchableOpacity,  TextInput,  Modal,} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeBaseProvider, TextArea, Input, Divider, FormControl,VStack, HStack,Select,CheckIcon } from "native-base";
import { ButtonModal, ButtonFondoBlanco, ButtonFondoRosa, ButtonCreateBlanco,ButtonCreateRosa } from "../components/ButtonsLogin";
import UploadImageReceta from '../components/UploadImageReceta';
import UploadImagePaso from '../components/UploadImagePaso';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react'


const CreateReceta = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [titulo , setTitulo] = useState("");
  const [descripcion , setDescripcion] = useState("");
  const [porciones , setPorciones] = useState("");
  const [personas , setPersonas] = useState("");
  const [categoriaSel,setCategoriaSel]=useState("1");
  const [unidadSel,setUnidadesSel]=useState("1");
  const [ingrediente , setIngrediente] = useState("");
  const [cantidad , setCantidad] = useState("");
  const [descPaso , setdescPaso] = useState("");

  const [categorias, setCategorias] = useState([
    { label: "Pasta", value: "1" },
    { label: "Emapanadas", value: "2" },
    { label: "Comida China", value: "3" },
  ]);

  const onChangeHandler = (item) => {
    setCategoriaSel(item);
  };

  const [unidades, setUnidades] = useState([
    { label: "Kg", value: "1" },
    { label: "Gr", value: "2" },
    { label: "Lt", value: "3" },
  ]);

  const onChangeHandler2 = (item) => {
    setUnidadesSel(item);
  };




  return (
    <ScrollView style={styles.container}>
           <NativeBaseProvider>
          <ProgressSteps>
              <ProgressStep label="Descripción">
               <ScrollView style={styles.container}>
                <Text
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                      marginHorizontal: "5%",
                      fontSize: 25,
                      fontWeight: "bold"
                    }}
                  >
                    {" "}
                    Descripcion{" "}
                  </Text>

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
                        onChangeText={setTitulo}
                        fontSize= "25"/>
                        
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
                    style={{ backgroundColor: "#ffff"}}
                    w="90%"
                    mx="5"
                    placeholder="Descripcion"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    fontSize= "20"
                    marginBottom="10%"        
                  />
                  
                  <HStack mt="2" w="100%"  >
                    <Text style={{ fontSize: 20, marginLeft:"5%" ,width:"45%" }}> Categoria </Text>

                    <Select
                        style={{backgroundColor:'#ffff'}}
                        selectedValue={categoriaSel}
                        marginRight="10%"
                        w="70%"
                        fontSize= "16"
                        mr="2"
                        alignSelf="flex-end"
                        _selectedItem={{
                          bg: "indigo",
                          endIcon: <CheckIcon size={5}  />,
                        }}
                        onValueChange={onChangeHandler}
                        
                      >
                        {categorias.map((categoria) => (
                          <Select.Item
                            key={categoria.value}
                            label={categoria.label}
                            value={categoria.value}
                          />
                        ))}
                    </Select>

                  </HStack>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "5%",
                      marginHorizontal: "5%",
                    }}
                  >
                    <Text style={{ fontSize: 20, width: "90%" }}> Porciones </Text>

                    <Input
                      style={{ backgroundColor: "#ffff", textAlign: "center" }}
                      mx="1"
                      w="44%"
                      fontSize= "16"
                      placeholder="Cantidad"
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
                    <Text style={{ fontSize: 20, width: "90%" }}> Personas </Text>

                    <Input
                      style={{ backgroundColor: "#ffff", textAlign: "center" }}
                      mx="1"
                      w="44%"
                      placeholder="Cantidad"
                      value={personas}
                      fontSize= "16"
                      onChangeText={setPersonas}
                    />
                  </View>
                  </NativeBaseProvider>
              </ScrollView>
              </ProgressStep>
              <ProgressStep label="Ingredientes">
              <ScrollView style={styles.container}>
                    <NativeBaseProvider>
                  <Text
                    style={{
                      marginTop: "5%",
                      marginHorizontal: "5%",
                      marginBottom: "2%",
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Ingredientes{" "}
                  </Text>
                  <HStack mt="3" w="90%"  >
                  <Input
                      style={{ backgroundColor: "#ffff", textAlign: "center" }}
                      mx="1"
                      w="44%"
                      fontSize= "16"
                      placeholder="Ingrediente"
                      value={ingrediente}
                      onChangeText={setIngrediente}
                      marginLeft="5%"
                    />
                     <Input
                      style={{ backgroundColor: "#ffff", textAlign: "center" }}
                      mx="1"
                      w="21%"
                      fontSize= "16"
                      placeholder="Cant"
                      value={cantidad}
                      onChangeText={setCantidad}
                    />

                    <Select
                        style={{backgroundColor:'#ffff'}}
                        selectedValue={unidadSel}
                        marginRight="47%"
                        w="50%"
                        fontSize= "16"
                        mr="2"
                        alignSelf="flex-end"
                        _selectedItem={{
                          bg: "indigo",
                          endIcon: <CheckIcon size={1}  />,
                        }}
                        onValueChange={onChangeHandler2}
                        
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
                  <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "5%",
                      marginBottom: "2%",
                      marginHorizontal: "20%",
                    }}
                  >
                  <Icon path={mdiPlusCircleOutline}
                      title="User Profile"
                      size={1}
                      color="black"/>
                  
                  <Text style={{ fontSize: 20, width: "90%", fontWeight: "bold" }}> Agregar Ingrediente </Text>  
                  </View>
                  </TouchableOpacity>
                  </NativeBaseProvider>
              </ScrollView>
              </ProgressStep>
              <ProgressStep label="Pasos" >
              <View style={styles.botones}>
                      <ButtonCreateRosa text="Guardar"   onPress={() => navigation.navigate('Receta')}/>
                   </View>
              <ScrollView style={styles.container}>
                    <NativeBaseProvider>
                  <Text
                    style={{
                      marginTop: "5%",
                      marginHorizontal: "5%",
                      marginBottom: "2%",
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Pasos{" "}
                  </Text>

                  <TextArea
                    style={{ backgroundColor: "#ffff"}}
                    w="90%"
                    mx="5"
                    placeholder="Descripcion"
                    value={descPaso}
                    onChangeText={setdescPaso}
                    fontSize= "20"
                    marginBottom="10%"        
                  />
              <View style={styles.imagenPaso}>
              <View style={{ width: "20%", marginLeft:"5%"}}>
                  <UploadImagePaso/>
                  </View>
                   </View>

                  <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "10%",
                      marginBottom: "2%",
                      marginHorizontal: "30%",
                    }}
                  >

                  <Icon path={mdiPlusCircleOutline}
                      title="User Profile"
                      size={1}
                      color="black"/>
                  
                  <Text style={{ fontSize: 20, width: "90%", fontWeight: "bold" }}> Agregar Paso </Text>  
                  </View>
                  </TouchableOpacity>
                  </NativeBaseProvider>
              </ScrollView>
              </ProgressStep>
          </ProgressSteps>

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
    backgroundColor:"#D6B1B1",
    justifyContent:"center",
  },
  imagenPaso: {
    flexDirection:"row",
    backgroundColor:"#D6B1B1",
    justifyContent:"left",
  },

});

export default () => {
  return (
    <NativeBaseProvider>
          <CreateReceta />
    </NativeBaseProvider>
  )}
