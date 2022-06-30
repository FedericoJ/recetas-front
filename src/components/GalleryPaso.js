import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform,StyleSheet, TouchableOpacity , Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { HStack, NativeBaseProvider } from 'native-base';
import * as FileSystem from 'expo-file-system';

const ImageToLoad =({img,setPasos,indicePaso,indice})=>{
	const chooseImg = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,			
			allowsEditing: true,
			base64:true
		});
	
		if (!result.cancelled) {
			const {uri,base64,type} =result;
			var baseaux=base64;
			var tipo="imagen"
			console.log(result);
			if (type==="video") {
				baseaux=await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
				tipo="video"
			}

			setPasos((prev) => {
				const newPasos = [...prev];
				const length=newPasos[indicePaso].multimedia.length;
				newPasos[indicePaso].multimedia[indice]={id:indice,imagen:uri,base64:baseaux,tipo:tipo} 
				newPasos[indicePaso].multimedia.push({id:length,imagen:"",base64:"",tipo:""})
				return newPasos;
			  });
		}
	};

	const IconoCamara=()=>{
		if (img.imagen){
			return(<View></View>);
		}else{
			return (
			<View style={imageUploaderStyles.camarita}>
				<AntDesign name="camera" size={20} color="black"/>
			</View>)
		}
	}

	return(<View style={imageUploaderStyles.container}>	
		<Image source={{ uri: img.imagen }} style={{ width: 50, height: 50 }} />
		<View style= {{backgroundColor:"#efefef"}}>
			<TouchableOpacity onPress={chooseImg} >
				<IconoCamara/>
			</TouchableOpacity>
		</View>
		</View>);

}


export default function GalleryPaso({paso,setPasos,indice}) {
	useEffect(() => {
		(async () => {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			alert('Sorry, Camera roll permissions are required to make this work!');
			}
		}
		})();
	}, []);
	
	return (
		<View style={{flexDirection:"row"}}>
			 {paso.multimedia.map((img, ind) => ( 
			<View key={img.id}>
			<ImageToLoad img={img} setPasos={setPasos} indicePaso={indice} indice={img.id}/>
			</View>
			 ))}
		</View>

	);
}

const imageUploaderStyles=StyleSheet.create({
   container:{
    height:60,
 	width:60,
	//backgroundColor:'#efefef',
	justifyContent:"center",
	alignItems:"center"
 //    borderRadius:999,

},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'red',
    width:'100%',
    height:'30%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},
camarita:{
	height:60,
	width:60,
	borderColor:"black",
	borderWidth:1,
	backgroundColor:"#D6B1B1",
	display:'flex',
	alignItems:"center",
	justifyContent:'center'
}


 })
 
