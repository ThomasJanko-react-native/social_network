import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import postService from '../services/post.service';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fakePosts = [
    {
        "id": 1,
        "user": "John Smith",
        "date": "2022-12-01",
        "content": "Just had the most amazing sushi dinner! #foodie #sushi",
        "image": "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg",
        "likes": 35,
        "comments": [
          {
            "user": "Jane Doe",
            "comment": "That looks delicious, John! Where did you go?",
            "date": "2022-12-01"
          },
          {
            "user": "Mark Johnson",
            "comment": "I love sushi too! I need to check out that place.",
            "date": "2022-12-01"
          }
        ]
      },
      {
        "id": 2,
        "user": "Sarah Lee",
        "date": "2022-11-28",
        "content": "Just finished my first half marathon! #running #fitness",
        "image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        "likes": 75,
        "comments": [
          {
            "user": "Emily Chen",
            "comment": "Wow, congrats Sarah! That's a huge accomplishment.",
            "date": "2022-11-28"
          },
          {
            "user": "Alex Kim",
            "comment": "Awesome job, Sarah! I need to start training for a half marathon too.",
            "date": "2022-11-29"
          }
        ]
      },
      {
        "id": 3,
        "user": "David Wang",
        "date": "2022-11-25",
        "content": "Had an amazing time at the concert last night! #music #fun",
        "image": "https://cdn-uploads.gameblog.fr/img/news/409777_63720be0605c4.jpg?ver=1",
        "likes": 42,
        "comments": [
          {
            "user": "Rachel Chen",
            "comment": "Who did you see, David? I love going to concerts!",
            "date": "2022-11-25"
          },
          {
            "user": "Jason Li",
            "comment": "I heard that concert was amazing. Wish I could've gone!",
            "date": "2022-11-26"
          }
        ]
      }
]





const PostsList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [posts, setPosts] = useState([])

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
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
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post.comments.slice(0, 4));
    const [showAllComments, setShowAllComments] = useState(post.comments.length <= 4);
    const [dialogComment, setDialogComment] = useState(false);
    
    const handleComment = async (postId) => {
      console.log(postId)
      
    let jwt = await AsyncStorage.getItem('token')
    postService.addComment(jwt, comment)
    .then(() => {
      setDialogComment(!dialogComment)
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
        <Text>{post.content}</Text>
        <PostImage source={{ uri: post.image }} />
      </PostContent>
      <PostFooter>
      <PostLikes>
          <Icon name="heart-o" size={20} color="red" /> {post.likes} likes
        </PostLikes>
        <PostComment>
          <Icon name="comment" size={20} color="#888" onPress={()=> setDialogComment(!dialogComment)} /> {post.comments.length} comments
        </PostComment>
        <PostFooterText>{post.date}</PostFooterText>
      </PostFooter>
        <Comments>
          {post.comments.map(comment => (
            <Comment key={comment.user}>
              <Username>{comment.user}: </Username>
              <CommentText >{comment.comment}</CommentText>
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
  padding: 10px;
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
  margin-horizontal: 10px;
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


export default PostsList;