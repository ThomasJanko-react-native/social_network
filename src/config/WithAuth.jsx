import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WithAuth = (WrappedComponent) => {

    return () => {
        const navigation = useNavigation();

    const [isLogged, setisLogged] = useState(false)
    useEffect(() => {

        //Api creer router verify Token => renvoie si le token en parametre est valide
        let token = AsyncStorage.getItem('token')
        if(!token){
            setisLogged(false)
            navigation.navigate('LoginScreen')
        }
        else{
            setisLogged(true)
        }
    }, []);

    if(isLogged){
        return <WrappedComponent/>
    }
    else {
        return null;
    }

}
}

export default WithAuth;
