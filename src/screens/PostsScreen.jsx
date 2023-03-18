import React from 'react';
import { SafeAreaView } from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import BottomBar from '../components/BottomBar';
import HeaderBar from '../components/HeaderBar';
import PostsList from '../components/PostsList';

const PostsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <HeaderBar/>
            <PostsList/>
            <BottomBar/>
        </SafeAreaView>
    );
}


export default PostsScreen;
