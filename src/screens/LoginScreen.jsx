import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Context } from '../config/context';


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.primaryColor};
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const LoginScreen = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const {userAuth} = useContext(Context)
  return (
    <Container>
    <Title>{showLoginForm ? 'Login' : 'Register'}</Title>
    {showLoginForm ? <LoginForm /> : <RegisterForm />}
    <ButtonContainer>
      <Button onPress={() => setShowLoginForm(!showLoginForm)}>
        <ButtonText>{showLoginForm ? 'Register' : 'Login'}</ButtonText>
      </Button>
    </ButtonContainer>
     {userAuth && <Text style={{color: 'black'}}>{userAuth.email} </Text>} 
  </Container>
  );
};

export default LoginScreen;
