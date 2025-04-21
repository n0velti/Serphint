import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PostsProps = {
    productId: string;
};

function Posts(props: PostsProps) {
    return (
        <View>
            <Text>Posts</Text>
        </View>
    );
}

export default Posts;