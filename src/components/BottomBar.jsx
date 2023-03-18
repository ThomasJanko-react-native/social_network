import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../config/context';




const BottomHeader = styled.View`
  position: absolute;
  bottom: -6px;
  width: 100%;
  background-color: ${props => props.theme.primaryColor}
  height: 50px;
  border-top-width: 1px;
  border-top-color: #ddd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BottomHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-right: 5px;
  borderColor: white;
  borderWidth: 2px;
`;

const BottomBar = () => {
  const navigation = useNavigation();
  const {userAuth} = useContext(Context)

  return (
    <BottomHeader>
      <BottomHeaderText>
        <TouchableOpacity>
        <Icon name="home" size={24} color="#fff" />
        </TouchableOpacity>
      </BottomHeaderText>
      <BottomHeaderText>
        <TouchableOpacity>
        <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </BottomHeaderText>
      <BottomHeaderText>
        <TouchableOpacity onPress={() =>  navigation.navigate('AddPostScreen')}>
        <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </BottomHeaderText>
      <BottomHeaderText>
        <TouchableOpacity onPress={() =>  navigation.navigate('LoginScreen')}>
        <IconM name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </BottomHeaderText>
      {/* <Text>{userAuth.avatar} </Text> */}
      <Avatar source={{uri: userAuth?.avatar}}/>
    </BottomHeader>
  );
};

export default BottomBar;
