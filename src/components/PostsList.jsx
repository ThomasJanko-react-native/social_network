import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import postService from '../services/post.service';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../config/context';

const PostsList = () => {

  const {reload} = useContext(Context)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [posts, setPosts] = useState([])

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [reload])
  );

  const fetchPosts = async () => {
    try{
      response = await postService.getPosts()
      console.log(response)
      setPosts(response.data)
    }
    catch(err){
      setError(error);
      Alert.alert('Error', 'Something went wrong')
    }
    finally{
      setLoading(false);
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
    // return <Loader/>
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  
  return (
    <Container>
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <Post post={item} />}
    />
    </Container>
  );
};

const Post = ({ post }) => {

    const {reload, setReload} = useContext(Context)

    const [comment, setComment] = useState("");
    // const [comments, setComments] = useState(post.comments.slice(0, 4));
    // const [showAllComments, setShowAllComments] = useState(post.comments.length <= 4);
    const [dialogComment, setDialogComment] = useState(false);
    const [like, setLike] = useState(false)
    
    const handleComment = async (postId) => {
    let jwt = await AsyncStorage.getItem('token')
    let form = {
      content: comment
    }
    postService.addComment(postId, jwt, form)
    .then((res) => {
      setComment('')
      setDialogComment(!dialogComment)
      setReload(!reload)
      })
    .catch((err) => {
      console.log(err)
    })
  
  }

  return (
    <PostContainer>
      <PostHeader>
        <ProfileImage source={{ uri: post.author.avatar }} />
        <Text>{post.author.firstName}</Text>
      </PostHeader>
      <PostContent>
        <TitleText>{post.title} </TitleText>
        <Text>{post.content}</Text>
        <PostImage source={{ uri: post.image }} />
      </PostContent>
      <PostFooter>
      <PostLikes>
          {like? 
          <Icon name="heart" size={20} color="red" onPress={() => setLike(!like)} />
           : 
           <Icon name="heart-o" size={20} color="white" onPress={() => setLike(!like)} />
          }
          
        </PostLikes>
        <PostComment>
          <Icon name="comment" size={20} color="#888" onPress={()=> setDialogComment(!dialogComment)} /> {post.comments.length} comments
        </PostComment>
        <PostFooterText>{post.date}</PostFooterText>
      </PostFooter>
        <Comments>
          {post.comments.map(comment => (
            <Comment key={comment._id}>
              <Username>{comment.author.firstName}: </Username>
              <CommentText >{comment.content}</CommentText>
            </Comment>
          ))}
        </Comments>
        {dialogComment && (
            <AddComment>
                <TextInput placeholder='add comment...' value={comment} onChangeText={(e) => setComment(e)} />
                <Icon name="send-o" size={20} color="#888" onPress={() => handleComment(post._id)} />
            </AddComment>
        )}

        
    </PostContainer>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: black;
  position: relative;
  marginBottom: 50px;
`;

const PostContainer = styled.View`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const PostHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const PostContent = styled.View`
  padding-horizontal: 12px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 300px;
  marginTop: 4px;
  borderRadius: 10px;
`;

const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const PostFooterText = styled.Text`
  margin-left: auto;
  color: gray;
`;

const PostLikes = styled.Text`
  font-weight: bold;
  align-items: center;
  margin-right: 10px;
`;

const PostComment = styled.Text`
  color: #888;
  align-items: center;

`;

const Comments = styled.View`
  text-align: left;
  margin: 10px;
  max-width: 70%;

`;

const Comment = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 4px;
  word-wrap: break-word;
`;

const CommentText = styled.Text`
  margin-left: 0px;
`;
const Username = styled.Text`
  font-weight: bold;
`;

const AddComment = styled.View`
margin-horizontal: 20px;
align-items: center;
flex-direction: row;
justify-content: space-between;
`;

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;


export default PostsList;