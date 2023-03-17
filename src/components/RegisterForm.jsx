import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userService from '../services/user.service';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Context } from '../config/context';
import AsyncStorage from '@react-native-async-storage/async-storage';



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

const RegisterForm = () => {
    const navigation = useNavigation();
    const {login} = useContext(Context)

    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        avatar: '',
    })

    const handleInputChange = (key, value) => {
      if (key === 'avatar') {
        value = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70);
      }
        setUser({ ...user, [key]: value });
    };

    const handleSubmit = () => {
        console.log(user)
        handleInputChange('avatar', 'avatar')
        userService.register(user)
        .then((res) => {
          let token = res.data
          AsyncStorage.setItem('token',token);
          login(token)
          navigation.navigate('PostsScreen')
        })
        .catch(() => {
          Alert.alert('Error', 'There was a problem with the register. Please try again later.');
        })
    }

  return (
    <Container>
      <Input placeholder="Email" placeholderTextColor={"grey"} value={user.email} onChangeText={(text) =>  handleInputChange('email', text)}/>
      <Input placeholder="firstName" placeholderTextColor={"grey"} value={user.firstName} onChangeText={(text) =>  handleInputChange('firstName', text)} />
      <Input placeholder="lastName" placeholderTextColor={"grey"} value={user.lastName} onChangeText={(text) =>  handleInputChange('lastName', text)} />
      <Input placeholder="Password" secureTextEntry placeholderTextColor={"grey"} value={user.password} onChangeText={(text) =>  handleInputChange('password', text)} />
      <Button>
        <ButtonText onPress={handleSubmit}>Register</ButtonText>
      </Button>
    </Container>
  );
};

export default RegisterForm;
