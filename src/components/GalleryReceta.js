import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform,StyleSheet, TouchableOpacity , Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';



export default function GalleryReceta({base64Foto ,setBase64Foto,uriFoto,setUriFoto}) {
	const [image, setImage] = useState(null);
	
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
	
	const chooseImg = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,			
            allowsEditing: true,
            base64:true
		});
	
		if (!result.cancelled) {
            const {uri,base64} =result;
           setUriFoto(uri);
           setBase64Foto(base64);
		}
	};
	
	return (
		<View style={imageUploaderStyles.container}>	
            <Image source={{ uri: uriFoto }} style={{ width: "100%", height: "100%" }} />
            <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={chooseImg} style={imageUploaderStyles.uploadBtn} >
            <Text>{uriFoto ? 'Editar ' : 'Cargar '}una Imagen</Text>
            <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
			</View>
		</View>
	);
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width: "100%",
     //    width:150,
        backgroundColor:'#efefef',
        position:'relative',
     //    borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
 })
 
