import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

class Recetas extends React.Component{

    render(){
        const {tipo,tipoImage} = this.props.tipos;
        return (
            
            <TouchableOpacity style={{ flexDirection:"row",width:'40%',marginHorizontal:'5%',marginVertical:'5%' ,margin:1 }}>
                <Image style={{resizeMode: 'cover',width: '100%',height: 100}}  source ={{uri:tipoImage}}>
                
                </Image>

                <Text style={{textAlign:"left",fontWeight:'bold'}}>
                    {tipo}
                </Text>
            </TouchableOpacity>    

        )
    }

}

export default Recetas;