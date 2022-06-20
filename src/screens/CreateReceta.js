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
import {
  NativeBaseProvider,
  TextArea,
  Input,
  Divider,
  FormControl,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Box, Center
} from "native-base";
import {
  ButtonModal,
  ButtonFondoBlanco,
  ButtonFondoRosa,
  ButtonCreateBlanco,
  ButtonCreateRosa,
  ButtonModalUnico,
} from "../components/ButtonsLogin";
import { useNavigation } from "@react-navigation/native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Ionicons } from '@expo/vector-icons';
import {useNetInfo} from "@react-native-community/netinfo";
import GalleryPaso from "../components/GalleryPaso";
import GalleryReceta from "../components/GalleryReceta";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const CargarIngrediente = ({unidades, ingredientes}) => {

  const [unidadSel, setUnidadesSel] = useState("1");
  const [ingrediente, setIngrediente] = useState("");
  const [cantidad, setCantidad] = useState("");
  const onChangeHandler2 = (item) => {
    setUnidadesSel(item);
  };
  console.log('ingredientes');
  console.log(ingredientes);
  return (
    <View>
      {ingredientes.map((ing, indice) => (
        <HStack mt="3" w="90%" key={ing.valor}>
          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            mx="0.5"
            w="40%"
            fontSize="16"
            placeholder="Ingrediente"
            value={ingrediente}
            onChangeText={setIngrediente}
            marginLeft="5%"
          />
          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            mx="1"
            w="25%"
            fontSize="16"
            placeholder="Cant"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Select
            style={{ backgroundColor: "#ffff" }}
            selectedValue={unidadSel}
            // marginRight="47%"
            // w="50%"
            mx="0.5"
            width="110"
            fontSize="16"
            mr="2"
            alignSelf="flex-end"
            _selectedItem={{
              bg: "indigo",
              endIcon: <CheckIcon size={1} />,
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
      ))}
    </View>
  );
};

// const CargarPasos = ({pasos}) => {

//   const [paso, setPaso] = useState("");
//   return (
//     <View>
//       {pasos.map((ing, indice) => ( 
//         <HStack mt="3" w="90%" key={ing.valor}
//         >
//           <View flexDirection="row">
//           <Text  style={{fontSize:20, fontWeight:"bold", marginLeft:"2%"}}>1 </Text> 
//             <TextArea
//               style={{ backgroundColor: "#ffff" }}
//               w="85%"
//               mx="1"
//               placeholder="Descripcion"
//               value={paso}
//               onChangeText={setPaso}
//               fontSize="20"
//               marginBottom="5%"
//             />
//             </View>
//          <View style={styles.imagenPaso}>
//         <View style={{ width: "20%", marginLeft: "7%" }}>
//           <GalleryPaso />
//         </View>
//     </View>
//         </HStack>
//         ))} 
//     </View>  
//   );
// };



const CreateReceta = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
 
  const [value, setValue] = React.useState(0);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [porciones, setPorciones] = useState("");
  const [personas, setPersonas] = useState("");
  const [categoriaSel, setCategoriaSel] = useState("1");
  const [ingredientes, setIngredientes] = useState([{ valor: "valor" }]);
  const [paso, setPaso] = useState("");
  const [visibleExisteReceta, setVisibleExisteReceta] = useState("");
  const netInfo = useNetInfo();
  const [noWifi, setNoWifi] = React.useState(false);
  const [visibleCarga, setVisibleCarga] = React.useState(false);
  const [visibleWifi, setVisibleWifi] = React.useState(false);

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

  const onChangeBlur = () => {
    setVisibleExisteReceta(true);
    console.log(visible);
  };

  const agregarIngrediente = () => {
    setIngredientes([{valor: "1"}, ...ingredientes,]);
  };

  const agregarPaso = () => {
    setPasos([{valor: "1"}, ...pasos,]);
  };

  const wifi = () => {
    if(netInfo.type === "wifi"){
      setVisibleCarga(true)
    }
    else {
      setNoWifi(true)
    }
  };

  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <ProgressSteps
          disabledStepNumColor="white"
          completedStepNumColor="#D6B1B1"
          activeStepNumColor="#D6B1B1"
          completedLabelColor="#FFD700"
          activeLabelfontSize="Large"
          activeLabelColor="#AC6363"
          disabledStepIconColor="white"
          completedStepIconColor="#FFD700"
          completedProgressBarColor="#FFD700"
          activeStepIconBorderColor="#AC6363"
        >
          <ProgressStep
            label="Descripción"
            nextBtnText="Siguiente"
            previousBtnText="Anterior"
            nextBtnTextStyle={{ color: "black", fontWeight: "bold" }}
          >
            <View style={styles.container}>
              <View style={{ width: "100%", height: 200 }}>
                <GalleryReceta />
              </View>
              <NativeBaseProvider>
                <ModalPoup visible={visibleExisteReceta}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{  color: "black" }}>
                      Ya existe una receta con este nombre
                    </Text>
                  </View>

                  <View style={styles.botonesModal2}>
                    <ButtonModal
                      text="Editar"
                      onPress={() => {
                        setVisibleExisteReceta(false);
                      }}
                    />
                    <ButtonModal
                      text="Reemplazar"
                      onPress={() => {
                        setVisibleExisteReceta(false);
                      }}
                    />
                    <ButtonModal
                      text="Cancelar"
                      onPress={() => {
                        setVisibleExisteReceta(false);
                      }}
                    />
                  </View>
                </ModalPoup>
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
                      fontSize="25"
                      onBlur={() => onChangeBlur()}
                    />
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
                ></View>

                <TextArea
                  style={{ backgroundColor: "#ffff" }}
                  w="90%"
                  mx="5"
                  placeholder="Descripcion"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  fontSize="20"
                  marginBottom="10%"
                />

                <HStack mt="2" w="100%">
                  <Text
                    style={{fontSize:25, marginLeft: "5%", width: "45%" }}
                  >
                    {" "}
                    Categoria{" "}
                  </Text>

                  <Select
                    style={{ backgroundColor: "#ffff" }}
                    selectedValue={categoriaSel}
                    flexDirection= "row"
                    alignItems= "center"
                    ml="3"
                    w="62%"
                    fontSize= "16"
                    _selectedItem={{
                      
                      bg: "indigo",
                      endIcon: <CheckIcon size={5} />,
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
                  <Text style={{fontSize:25,  width: "55%" }}>
                    {" "}
                    Porciones{" "}
                  </Text>

                  <Input
                    style={{ backgroundColor: "#ffff", textAlign: "center" }}
                    mx="1"
                    w="44%"
                    fontSize="16"
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
                  <Text style={{fontSize:25,width: "55%" }}> Personas </Text>

                  <Input
                    style={{ backgroundColor: "#ffff", textAlign: "center" }}
                    mx="1"
                    w="44%"
                    placeholder="Cantidad"
                    value={personas}
                    fontSize="16"
                    onChangeText={setPersonas}
                  />
                </View>
              </NativeBaseProvider>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Ingredientes"
            nextBtnText="Siguiente"
            previousBtnText="Anterior"
            nextBtnTextStyle={{ color: "black", fontWeight: "bold" }}
            previousBtnTextStyle={{ color: "black", fontWeight: "bold" }}
          >
            <View style={styles.container}>
              <NativeBaseProvider>

                <CargarIngrediente unidades={unidades} ingredientes={ingredientes}></CargarIngrediente>

                <TouchableOpacity onPress={() => agregarIngrediente()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "5%",
                      marginBottom: "2%",
                      marginLeft:"17%"
                    }}
                  >
                  <Ionicons name="add-circle-outline" size={25} color="black" />

                    <Text
                      style={{fontSize:24, width: "80%", fontWeight: "bold" }}
                    >
                      Agregar Ingrediente
                    </Text>
                  </View>
                </TouchableOpacity>
              </NativeBaseProvider>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Pasos"
            nextBtnText="Siguiente"
            previousBtnText="Anterior"
            nextBtnTextStyle={{ color: "black", fontWeight: "bold" }}
            previousBtnTextStyle={{ color: "black", fontWeight: "bold" }}
          >
            <View style={styles.container}>
              <NativeBaseProvider>
              <View flexDirection="row">
                    <Text  style={{fontSize:20, fontWeight:"bold", marginLeft:"2%"}}>1 </Text> 
                  <TextArea
                    style={{ backgroundColor: "#ffff" }}
                    w="85%"
                    mx="1"
                    placeholder="Descripcion"
                    value={paso}
                    onChangeText={setPaso}
                    fontSize="20"
                    marginBottom="5%"
                  />
                </View>

              <View style={styles.imagenPaso}>
              <View style={{ width: "20%", marginLeft: "7%" }}>
                <GalleryPaso />
              </View>          
              </View>

                <TouchableOpacity onPress={() => agregarPaso()}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "5%",
                      marginBottom: "2%",
                      marginHorizontal: "27%",
                    }}
                  >
                  <Ionicons name="add-circle-outline" size={25} color="black" />

                    <Text
                      style={{fontSize:24, width: "90%", fontWeight: "bold" }}
                    >
                      {" "}
                      Agregar Paso{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </NativeBaseProvider>
            </View>
          </ProgressStep>

          <ProgressStep
            label="Guardar"
            previousBtnText="Anterior"
            previousBtnTextStyle={{ color: "black", fontWeight: "bold" }}
            finishBtnText=""
            nextBtnDisabled={true}
          >
            <ModalPoup visible={noWifi}>
                <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: "black" }}>No se encuentra conectado a una red Wifi. ¿Desea publicarla igualmente? </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
                </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
                <ButtonModal text="Cancelar" onPress={() => { setNoWifi(false);setVisibleWifi(true) }} />
                <ButtonModal text="Aceptar" onPress={() => {setNoWifi(false); setVisibleCarga(true) }} />
                </View>
            </ModalPoup>
            
            <ModalPoup visible={visibleWifi}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ color: "black" }}>
                  La receta se cargará cuando estes conectado a una red WIFI
                </Text>
              </View>
              <View style={styles.botonesModal}>
                <ButtonModalUnico
                  text="Aceptar"
                  onPress={() => {
                    navigation.navigate("Principal");
                    setVisibleWifi(false);
                  }}
                />
              </View>
            </ModalPoup>

            <ModalPoup visible={visibleCarga}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{  color: "black" }}>
                  La receta se cargó correctamente, la verás publicada cuando
                  sea autorizada
                </Text>
              </View>
              <View style={styles.botonesModal}>
                <ButtonModalUnico
                  text="Aceptar"
                  onPress={() => {
                    navigation.navigate("Principal");
                    setVisibleCarga(false);
                  }}
                />
              </View>
            </ModalPoup>
            <View style={styles.botones}>
              <ButtonCreateRosa
                text="Guardar"
                onPress={() => {
                  wifi();
                }}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </NativeBaseProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6B1B1",
  },
  botones: {
    flexDirection: "row",
    backgroundColor: "#D6B1B1",
    justifyContent: "center",
  },
  imagenPaso: {
    flexDirection: "row",
    backgroundColor: "#D6B1B1",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#F7F4F4",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  botonesModal: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "1%",
    marginHorizontal: "1%",
  },
  botonesModal2: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "2%",
    marginBottom: "1%",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <CreateReceta />
    </NativeBaseProvider>
  );
};
