import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userService from '../services/user.service';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Context } from '../config/context';
import Loader from './Loader';


const Container = styled.View`
  width: 80%;
`;

const Input = styled.TextInput`
  height: 40px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #ccc;
  color: #000;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px 10px;
  border-radius: 5px;
  marginVertical: 10px;
  width: 50%;
  alignSelf: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  textAlign: center;
`;


const LoginForm = () => {
  const navigation = useNavigation();
  const {login, loader, setLoader} = useContext(Context)

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };

    const handleSubmit = () => {
      setLoader(true)
        console.log(user)
        userService.login(user)
        .then((res)=> {
            let token = res.data
            // console.log(token)
            AsyncStorage.setItem('token',token);
            login(token)
            setLoader(false)
            navigation.navigate('PostsScreen')
        })
        .catch(() => {
          setLoader(false)
          Alert.alert('Error', 'There was a problem with the login. Please try again later.');
        })
    }

  return (
    <Container>
      <Input placeholder="Email" placeholderTextColor={"grey"} value={user.email} onChangeText={(text) =>  handleInputChange('email', text)}/>
      <Input placeholder="Password" secureTextEntry placeholderTextColor={"grey"} value={user.password} onChangeText={(text) =>  handleInputChange('password', text)} />
      <Button>
        <ButtonText onPress={handleSubmit}>Login</ButtonText>
      </Button>
    </Container>
  );
};

export default LoginForm;
