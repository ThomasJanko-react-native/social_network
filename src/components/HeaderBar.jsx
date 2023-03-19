import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import userService from '../services/user.service';


const users = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://example.com/john.jpg',
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: 'https://example.com/jane.jpg',
      },
      {
        id: 3,
        name: 'Bob Smith',
        avatar: 'https://example.com/bob.jpg',
      },
      {
        id: 4,
        name: 'Alice Johnson',
        avatar: 'https://example.com/alice.jpg',
      },
      {
        id: 5,
        name: 'Tom Williams',
        avatar: 'https://example.com/tom.jpg',
      },
      {
        id: 6,
        name: 'Emily Davis',
        avatar: 'https://example.com/emily.jpg',
      },
      {
        id: 7,
        name: 'Mark Lee',
        avatar: 'https://example.com/mark.jpg',
      },
      {
        id: 8,
        name: 'Catherine Kim',
        avatar: 'https://example.com/catherine.jpg',
      },
  ];


const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
  background-color:  ${props => props.theme.primaryColor}
  padding: 10px;
  
`;

const AvatarContainer = styled.ScrollView`
  flex-grow: 0;
  flex-shrink: 0;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin-right: 5px;
  borderColor: white;
  borderWidth: 2px;
`;

const HeaderBar = () => {

  const [users, setUsers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const fetchUsers = async () => {
    try{
      response = await userService.getusers()
      console.log(response)
      setUsers(response.data)
    }
    catch(err){
      setError(err);
      Alert.alert('Error', 'Something went wrong')
    }
    
  }



  return (
    <Container>
      <AvatarContainer horizontal={true}>
      {users.map((user, index) => (
        <Avatar key={index} source={{ uri: user.avatar}} />
      ))}
      </AvatarContainer>
    </Container>
  );
};

export default HeaderBar;
