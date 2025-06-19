import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePostOperations } from '@/hooks/data/usePostOperations';

import FeedItem from '@/components/FeedItem';

type PostsProps = {
    params: {
        productId: string;
  
    };
};

function Posts(props: PostsProps) {

    const { productId } = useLocalSearchParams();
    const [posts, setPosts] = useState([]);

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const {getPostsByProduct} = usePostOperations();

    useEffect(() => {
        // You can fetch posts related to the productId here
        // For example, fetchPosts(productId);
        const fetchPosts = async () => {
            try {
                const posts = await getPostsByProduct(productId);
                setPosts(posts.data);
                console.log('Fetched posts:', posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [productId]);

    const renderItem = ({ item }) => (
        <FeedItem item={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>



            </View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default Posts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        paddingTop: 55,

    },
    header: {
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
    },
});