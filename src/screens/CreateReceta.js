import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import {
  NativeBaseProvider,
  TextArea,
  Input,
  FormControl,
  HStack,
  Select,
  CheckIcon,
  Spinner,
} from "native-base";
import {
  ButtonModal,
  ButtonCreateRosa,
  ButtonModalUnico,
} from "../components/ButtonsLogin";
import { useNavigation } from "@react-navigation/native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Ionicons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import GalleryPaso from "../components/GalleryPaso";
import GalleryReceta from "../components/GalleryReceta";
import config from "../config/default.json";
import axios from "axios";
import variables from "../config/variables";
import { Constants } from "expo-barcode-scanner";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ModalPoup2 = ({ visible, children }) => {
  const [showModal2, setShowModal2] = React.useState(visible);
  React.useEffect(() => {
    toggleModal2();
  }, [visible]);
  const toggleModal2 = () => {
    if (visible) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  };

  return (
    <Modal transparent visible={showModal2}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer2]}>{children}</View>
      </View>
    </Modal>
  );
};

const InputSelectCombo = ({
  unidades,
  ingrediente,
  setIngredientes,
  indice,
}) => {
  // cantidad: ""
  // descripcion: ""
  // id: 0
  // idUnidad: "1"
  // observaciones: ""

  const { cantidad, descripcion, idUnidad } = ingrediente;

  const nombreIngredienteHandler = (descripcion) => {
    setIngredientes((prev) => {
      const newIngredientes = [...prev];
      newIngredientes[indice].descripcion = descripcion;
      return newIngredientes;
    });
  };

  const cantidadHandler = (cantidad) => {
    setIngredientes((prev) => {
      const newIngredientes = [...prev];
      newIngredientes[indice].cantidad = cantidad;
      return newIngredientes;
    });
  };

  const onIdUnidadHandler = (idUnidad) => {
    setIngredientes((prev) => {
      const newIngredientes = [...prev];
      newIngredientes[indice].idUnidad = idUnidad;
      return newIngredientes;
    });
  };

  return (
    <HStack mt="3" w="90%">
      <Input
        style={{ backgroundColor: "#ffff", textAlign: "center" }}
        mx="0.5"
        w="40%"
        fontSize="16"
        placeholder="Ingrediente"
        value={descripcion}
        onChangeText={nombreIngredienteHandler}
        marginLeft="5%"
      />
      <Input
        style={{ backgroundColor: "#ffff", textAlign: "center" }}
        mx="1"
        w="25%"
        fontSize="16"
        placeholder="Cant"
        value={cantidad}
        onChangeText={cantidadHandler}
      />

      <Select
        style={{ backgroundColor: "#ffff" }}
        // marginRight="47%"
        // w="50%"
        defaultValue={idUnidad}
        mx="0.5"
        width="110"
        fontSize="16"
        mr="2"
        alignSelf="flex-end"
        _selectedItem={{
          bg: "indigo",
          endIcon: <CheckIcon size={1} />,
        }}
        onValueChange={onIdUnidadHandler}
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
  );
};

const CargarIngrediente = ({ unidades, ingredientes, setIngredientes }) => {
  return (
    <View>
      {ingredientes.map((ing) => (
        <View  key={ing.id}>
          <InputSelectCombo
            unidades={unidades}
            ingrediente={ing}
            setIngredientes={setIngredientes}
            indice={ing.id}
          />
        </View>
      ))}
    </View>
  );
};

const InputPasos = ({ paso, setPasos, indice }) => {

  const onPasoHandler = (texto) => {
    setPasos((prev) => {
      const newPasos = [...prev];
      newPasos[indice].texto = texto;
      return newPasos;
    });
  };

  return (
    <TextArea
      style={{ backgroundColor: "#ffff" }}
      xcca
      w="90%"
      mx="2"
      placeholder="Descripcion"
      value={paso.texto}
      onChangeText={onPasoHandler}
      fontSize="20"
      marginBottom="5%"
    />
  );
};

const CargarPasos = ({ pasos, setPasos }) => {
  return (
    <View>
      {pasos.map((paso, indice) => (
        <View key={paso.id}>
          <HStack mt="3" w="100%" mx="2">
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {paso.nroPaso}{")"}
            </Text>
            <InputPasos paso={paso} setPasos={setPasos} indice={paso.id} />
          </HStack>
          <View style={{ width: "20%", marginLeft: "7%" }}>
            <GalleryPaso paso={paso} setPasos={setPasos} indice={paso.id} />
          </View>
        </View>
      ))}
    </View>
  );
};

const CreateReceta = () => {
  const navigation = useNavigation();
  const baseUrl = config.baseUrl;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [porciones, setPorciones] = useState("");
  const [personas, setPersonas] = useState("");
  const [categoriaSel, setCategoriaSel] = useState("1");
  const [ingredientes, setIngredientes] = useState([
    { id: 0, cantidad: "", descripcion: "", idUnidad: "1", observaciones: "" },
  ]);
  const [pasos, setPasos] = useState([{ id: 0, nroPaso: 1, texto: "", multimedia: [{ id: 0, imagen: "", base64: "", tipo: "" }] }]);
  const [visibleExisteReceta, setVisibleExisteReceta] = useState("");
  const netInfo = useNetInfo();
  const [base64Foto, setBase64Foto] = React.useState(null);
  const [uriFoto, setUriFoto] = React.useState(null);
  const [noWifi, setNoWifi] = React.useState(false);
  const [visibleCarga, setVisibleCarga] = React.useState(false);
  const [visibleWifi, setVisibleWifi] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [idRecetaElimina, setIdRecetaElimina] = useState(null);

  const [categorias, setCategorias] = useState([
    { descripcion: "...", idTipo: "1" },
  ]);

  const onChangeHandler = (item) => {
    setCategoriaSel(item);
  };

  const [unidades, setUnidades] = useState([{ label: "...", value: "1" }]);

  React.useEffect(() => {
    /*Cargando combos*/
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        axios
          .get(`${baseUrl}/ingredientes/getTiposreceta`)
          .then(function (res) {
            const categ = res.data;
            axios
              .get(`${baseUrl}/ingredientes/getUnidades`)
              .then(function (res) {
                setCategorias(categ);
                setUnidades(res.data);
              });
          });
      } catch (error) {
        alert(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const onChangeBlur = () => {
    const idUsuario = variables.getUsuario();
    axios
      .get(
        `${baseUrl}/receta/buscarRecetaPorUsuarioyNombre?nombre=${titulo.trim()}&idUsuario=${idUsuario}`
      )
      .then(function (res) {
        if (res.data.length !== 0) {
          console.log(res.data[0].idReceta);
          setIdRecetaElimina(res.data[0].idReceta)
          setVisibleExisteReceta(true);
        }
      });
    //setVisibleExisteReceta(true);
  };

  const onEditReceta = () =>{
    setVisibleExisteReceta(false);

    axios.get(`${baseUrl}/receta/recetaPorId?idReceta=${idRecetaElimina}`)
    .then(function(res){
        setDescripcion(res.data[0].Descripcion);
        setPorciones(res.data[0].Porciones.toString());
        setPersonas(res.data[0].CantidadPersonas.toString());
        setCategoriaSel(res.data[0].IdTipo.toString());
        setUriFoto(res.data[0].foto);
        axios.get(`${baseUrl}/ingredientes/getIngredienteUtilizadoPorReceta?idReceta=${idRecetaElimina}`)
        .then(function(res){
          var auxIng=[]
          res.data.forEach((ing,i)=>{
            const ingAux ={id:i,cantidad:ing.cantidad.toString(),descripcion:ing.nombre,idUnidad:ing.IdUnidad.toString(),observaciones:""}
            auxIng.push(ingAux)
          })
          setIngredientes(auxIng);
          axios.get(`${baseUrl}/receta/getPasos?idReceta=${idRecetaElimina}`)
          .then(function(res){
            var resPaso=res.data;
            axios.get(`${baseUrl}/ingredientes/getMultimedia?idReceta=${idRecetaElimina}`)
            .then(function(res){
              var arrPasoAux=[];
              resPaso.forEach((paso,i)=>{
                const pasoAux={id:i,nroPaso:paso.nroPaso,texto:paso.texto,multimedia:[{ id: 0, imagen: "", base64: "", tipo: "" }]}
                arrPasoAux.push(pasoAux);
                res.data.forEach((multi,ind)=>{
                  if (paso.idPaso===multi.idPaso){
                    const auxMulti={id:arrPasoAux[i].multimedia.length,extension:multi.extension,imagen:multi.urlContenido,base64:"",tipo:multi.tipo_contenido}
                    arrPasoAux[i].multimedia.push(auxMulti);
                  }
                })
              
              })
              //console.log(arrPasoAux);
              setPasos(arrPasoAux);
            })

          })

        })
         
      
    })

  }

  const agregarIngrediente = () => {
    setIngredientes((prevState) => [
      ...prevState,
      {
        id: prevState.length,
        cantidad: "",
        descripcion: "",
        idUnidad: "1",
        observaciones: "",
      },
    ]);
  };

  const agregarPaso = () => {
    //setPasos([{ valor: "1" }, ...pasos]);
    //{id:0 , nroPaso: 1, texto, multimedia}
    setPasos((prevState) => [
      ...prevState,
      {
        id: prevState.length,
        nroPaso: prevState.length + 1,
        texto: "",
        multimedia: [{ id: 0, imagen: "", base64: "", tipo: "" }]
      },
    ]);


  };

  const wifi = () => {
    if (netInfo.type === "wifi") {
      saveReceta();
      setVisibleCarga(true);
    } else {
      setNoWifi(true);
    }
  };


  const saveRecetaDispositivo = async () => {
    const idUsuario = variables.getUsuario();
    const nombre = titulo;
    const cantidadPersonas = personas;
    const idTipo = categoriaSel.valueOf();

    const recetaDispositivo = JSON.stringify({ idUsuario, nombre, descripcion, base64Foto, porciones, cantidadPersonas, idTipo, ingredientes, pasos });
    await AsyncStorage.setItem('recetaDispositivo',JSON.stringify([recetaDispositivo]));
    
    console.log('Receta Dispositivo: ', await AsyncStorage.getItem('recetaDispositivo'));
  }

  const saveReceta = async() => {

    const setup = {
      headers: {
        "content-type": "application/json",
      },
    };

    if (idRecetaElimina) {
      const bodyElimina = JSON.stringify({ idReceta: idRecetaElimina });
      axios.post(`${baseUrl}/receta/eliminarReceta`, bodyElimina, setup)
        .then(function (res) {
          console.log("Receta ", idRecetaElimina, " eliminada");
        })
        .catch(function (error) { console.log(error) })
    }

    const idUsuario = variables.getUsuario();
    const nombre = titulo;
    const cantidadPersonas = personas;
    const idTipo = categoriaSel.valueOf();

    const cloudPreset = "y02lecbn";
    const cloudUrl = "https://api.cloudinary.com/v1_1/dwghwqi4l/upload";

    const formData = new FormData();
    formData.append("upload_preset", cloudPreset);
    formData.append("file", "data:image/jpg;base64," + base64Foto);
    var arrPaso=[];

    pasos.forEach(async (paso, i) => {
      arrPaso[arrPaso.length] = ({ nroPaso: paso.nroPaso, texto: paso.texto, multimedia: [] })

      paso.multimedia.forEach(async multi => {
          if (multi.imagen!=="" && multi.base64!==""){
            
            const formData2 = new FormData();
            console.log("hola");
            formData2.append("upload_preset", cloudPreset);
            if(multi.tipo==="video"){
              formData2.append("file", "data:video/mp4;base64," + multi.base64)
            }else{
              formData2.append("file", "data:image/jpg;base64," + multi.base64)
            }
            
            try {
                fetch( cloudUrl, {
                  method: 'POST',
                  body: formData2
              })
              .then(response => response.json())
              .then(data => {
                if(data.secure_url!==''){
                  console.log(data.secure_url);
                  const multiPaso={tipo_contenido:multi.tipo,extension:data.format,urlContenido:data.secure_url}
                  arrPaso[i].multimedia.push(multiPaso);
                //console.log(i,arrPaso[i].multimedia.length);
              }
            })
            }catch(error){
              console.log(error)
            }
          }else{
            if (multi.imagen!==""){
                const auxMulti={tipo_contenido:multi.tipo,extension:multi.extension,urlContenido:multi.imagen}
                arrPaso[i].multimedia.push(auxMulti);
            }
          }
      })
    })

    if (!base64Foto){
      setLoading(true);
      const body = JSON.stringify({ idUsuario, nombre, descripcion, foto:uriFoto, porciones, cantidadPersonas, idTipo })
      axios.post(`${baseUrl}/receta/postReceta`, body, setup)
      .then(function (res) {
          console.log("guarde receta:", res.data.result.IdRecetaCreado);
          const idReceta = res.data.result.IdRecetaCreado;
          const bodyIng = JSON.stringify({ idReceta, ingredientes: ingredientes });
          axios.post(`${baseUrl}/ingredientes/postIngredienteUtilizadoPorReceta`, bodyIng, setup)
            .then(function (res) {
              console.log("guarde los ingredientes");
              const bodyPaso = JSON.stringify({ idreceta: idReceta, paso: arrPaso });
              console.log(arrPaso);
              axios.post(`${baseUrl}/receta/postPaso`, bodyPaso, setup)
                .then(function (res) {
                  setLoading(false);
                  console.log("guarde los pasos");
                })
                .catch(function (error) {
                  console.log("falle en el post pasos", error)
                })
            })
            .catch(function (error) {
              console.log("falle en el post ingredientes", error)
            })
        })
        .catch(function(err){console.log("falle en el post receta sin imagen ",err)})

    }else{
      try {
        setLoading(true);
        fetch(cloudUrl, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.secure_url !== '') {
              console.log(data);
              try {
                console.log("guarde foto ", data.secure_url.trim());
                const foto = data.secure_url.trim();
                const body = JSON.stringify({ idUsuario, nombre, descripcion, foto, porciones, cantidadPersonas, idTipo })
                axios.post(`${baseUrl}/receta/postReceta`, body, setup)
                  .then(function (res) {
                    console.log("guarde receta:", res.data.result.IdRecetaCreado);
  
                    const idReceta = res.data.result.IdRecetaCreado;
                    const bodyIng = JSON.stringify({ idReceta, ingredientes: ingredientes });
                    axios.post(`${baseUrl}/ingredientes/postIngredienteUtilizadoPorReceta`, bodyIng, setup)
                      .then(function (res) {
                        console.log("guarde los ingredientes");
                        const bodyPaso = JSON.stringify({ idreceta: idReceta, paso: arrPaso });
                        console.log(arrPaso);
                        axios.post(`${baseUrl}/receta/postPaso`, bodyPaso, setup)
                          .then(function (res) {
                            console.log("guarde los pasos");
                          })
                          .catch(function (error) {
                            console.log("falle en el post pasos", error)
                          })
                      })
                      .catch(function (error) {
                        console.log("falle en el post ingredientes", error)
                      })
                  })
  
              } catch (error) {
                console.log("falle en el post recetas", error.msg)
              }
            }
          })
      } catch (error) {
        console.log("falle cloudinary", error.msg)
      } finally {
        console.log("guarde la receta completa")
        setLoading(false);
      }
    }

   
  };

  const [modalErrorDatos, setModalErrorDatos] = useState(false);
  const [error, setError] = useState(false);

  const onNextStep = () => {
    /*setError(false)
  console.log("codigo")
  console.log(base64Foto)
  if (titulo.trim() ==0 || descripcion.trim() == 0 || personas.trim() == 0 || porciones.trim() == 0 || base64Foto === null)
  {
  setModalErrorDatos(true)
  setError(true)}*/
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
            label="Descripci??n"
            nextBtnText="Siguiente"
            onNext={onNextStep}
            errors={error}
            nextBtnTextStyle={{ color: "black", fontWeight: "bold" }}
          >
            <View style={styles.container}>
              <View style={{ width: "100%", height: 200 }}>
                <GalleryReceta
                  base64Foto={base64Foto}
                  setBase64Foto={setBase64Foto}
                  uriFoto ={uriFoto}
                  setUriFoto={setUriFoto}
                />
              </View>
              <NativeBaseProvider>
                <ModalPoup visible={visibleExisteReceta}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ color: "black" }}>
                      Ya existe una receta con este nombre
                    </Text>
                  </View>

                  <View style={styles.botonesModal2}>
                    <ButtonModal
                      text="Editar"
                      onPress={() => {
                        onEditReceta();
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

                <ModalPoup visible={modalErrorDatos}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Por favor complete todos los campos{" "}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "2%",
                        marginBottom: "2%",
                        marginHorizontal: "5%",
                      }}
                    ></View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1%",
                      marginBottom: "1%",
                      marginHorizontal: "1%",
                    }}
                  >
                    <ButtonModalUnico
                      text="Aceptar"
                      onPress={() => setModalErrorDatos(false)}
                    />
                  </View>
                </ModalPoup>
                <View
                  style={{
                    // flexDirection: "row",
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
                    style={{ fontSize: 25, marginLeft: "5%", width: "45%" }}
                  >
                    {" "}
                    Categoria{" "}
                  </Text>

                  <Select
                    style={{ backgroundColor: "#ffff" }}
                    selectedValue={categoriaSel}
                    flexDirection="row"
                    alignItems="center"
                    ml="3"
                    w="62%"
                    fontSize="16"
                    _selectedItem={{
                      bg: "indigo",
                      endIcon: <CheckIcon size={5} />,
                    }}
                    onValueChange={onChangeHandler}
                  >
                    {categorias.map((categoria) => (
                      <Select.Item
                        key={categoria.idTipo}
                        label={categoria.descripcion}
                        value={categoria.idTipo.toString()}
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
                  <Text style={{ fontSize: 25, width: "55%" }}>
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
                  <Text style={{ fontSize: 25, width: "55%" }}> Personas </Text>

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
                <CargarIngrediente
                  unidades={unidades}
                  ingredientes={ingredientes}
                  setIngredientes={setIngredientes}
                ></CargarIngrediente>

                <TouchableOpacity onPress={() => agregarIngrediente()}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "5%",
                      marginBottom: "2%",
                      marginLeft: "17%",
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={25}
                      color="black"
                    />

                    <Text
                      style={{ fontSize: 24, width: "80%", fontWeight: "bold" }}
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
              <CargarPasos pasos={pasos} setPasos={setPasos} />
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
                    style={{ fontSize: 24, width: "90%", fontWeight: "bold" }}
                  >
                    {" "}
                    Agregar Paso{" "}
                  </Text>
                </View>
              </TouchableOpacity>
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
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ fontSize: 20, color: "black" }}>
                  No se encuentra conectado a una red Wifi. ??Desea publicarla
                  igualmente?{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "2%",
                    marginBottom: "2%",
                    marginHorizontal: "5%",
                  }}
                ></View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "1%",
                  marginBottom: "1%",
                  marginHorizontal: "1%",
                }}
              >
                <ButtonModal
                  text="Cancelar"
                  onPress={() => {
                    saveRecetaDispositivo();
                    setNoWifi(false);
                    setVisibleWifi(true);
                  }}
                />
                <ButtonModal
                  text="Aceptar"
                  onPress={() => {
                    setNoWifi(false);
                    setVisibleCarga(true);
                    saveReceta();
                  }}
                />
              </View>
            </ModalPoup>

            <ModalPoup visible={visibleWifi}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ color: "black" }}>
                  La receta se cargar?? cuando estes conectado a una red WIFI
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
                <Text style={{ color: "black" }}>
                  La receta se carg?? correctamente, la ver??s publicada cuando
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

            <ModalPoup2 visible={loading}>
              <View
                style={{ height: 50, width: 150, justifyContent: "center" }}
              >
                <NativeBaseProvider>
                  <HStack marginHorizontal="90%">
                    <Spinner size="lg" color="black" />
                  </HStack>
                </NativeBaseProvider>
              </View>
            </ModalPoup2>

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
  modalContainer2: {
    width: "80%",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <CreateReceta />
    </NativeBaseProvider>
  );
};