import React from 'react';
import { SafeAreaView } from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import BottomBar from '../components/BottomBar';
import HeaderBar from '../components/HeaderBar';
import PostsList from '../components/PostsList';

const PostsScreen = () => {
    return (
        <SafeAreaView>
            <HeaderBar/>
            <PostsList/>
            <BottomBar/>
            {/* <Text style={{color: 'red', position: 'absolute', bottom: 40}}>HELLLOO</Text> */}
        </SafeAreaView>
    );
}


export default PostsScreen;
