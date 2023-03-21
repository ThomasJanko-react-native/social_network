import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, Button, Image } from 'react-native';
import { Context } from '../config/context';
import postService from '../services/post.service';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import FlashMessage, { showMessage } from "react-native-flash-message";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  color: #000;

`;
const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  color: #fff;
  background-color: #000;
  margin-bottom: 20px;
  font-size: 16px;
`;

const SubmitButton = styled.Button``;

const ImagePreview = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 10px;
  align-items: center;
  align-self: center;
`;
const ViewLoader = styled.View`
  marginTop: 50px;
`;

const AddPostScreen = () => {
  const navigation = useNavigation();

  const { userAuth, loader, setLoader} = useContext(Context)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: userAuth._id,
    image: '',
  });


  const handleSubmit = async () => {
    setLoader(true)
    console.log(newPost)
    let jwt = await AsyncStorage.getItem('token')
    postService.addPost(newPost, jwt)
    .then(()=> {
      setLoader(false)
      navigation.navigate('PostsScreen')
    })
    .catch((err)=> {
      setLoader(false)
      showMessage({
        message: 'Error !',
        description: err.message,
        type: 'danger',
      });
      // Alert.alert('Error', 'Failed to add post')
    })
  };

  return (
    <Container>
      <Title>Add a new post</Title>
      <Input
        placeholder="Title"
        value={newPost.title}
        onChangeText={(text)=> setNewPost({ ...newPost, title: text }) }
      />
      <Input
        placeholder="Content"
        value={newPost.content}
        onChangeText={(text)=> setNewPost({ ...newPost, content: text }) }
        multiline
      />
      <Input
        placeholder="Image URL"
        value={newPost.image}
        onChangeText={(text)=> setNewPost({ ...newPost, image: text }) }
      />
      {newPost.image !== '' && (
        <ImagePreview source={{ uri: newPost.image }} />
      )}
      <SubmitButton title="Submit" onPress={handleSubmit} />
       {loader &&  
        <ViewLoader>
          <Loader/>
        </ViewLoader>
       }
    </Container>
  );
};

export default AddPostScreen;
