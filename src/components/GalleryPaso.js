import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform,StyleSheet, TouchableOpacity , Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { HStack, NativeBaseProvider } from 'native-base';



export default function GalleryPaso({images,setImages}) {
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
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		   setImage(result.uri);
		   setImages([{valor: "1"}, ...images,]);
		}
	};
	
	return (
		<View style={{flexDirection:"row"}}>
			 {images.map((ing, indice) => ( 
			<View>
					<View style={imageUploaderStyles.container}>	
						{image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
						<View>
							<TouchableOpacity onPress={chooseImg} >
							<AntDesign name="camera" size={20} color="black" />
							</TouchableOpacity>
						</View>
					</View>
			</View>
			 ))}
		</View>

	);
}

const imageUploaderStyles=StyleSheet.create({
   container:{
    height:50,
 	width:50,
	backgroundColor:'#efefef',
	justifyContent:"center",
	alignItems:"center"
 //    borderRadius:999,

},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'30%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
}

 })
 
