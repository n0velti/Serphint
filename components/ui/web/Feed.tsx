import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';

import { FlashList } from "@shopify/flash-list";

import {SampleData} from "@/SampleData";

import { SampleItem } from '@/constants/Types';

import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

type FeedProps = {
};
function Feed(props: FeedProps) {
    const [isHovered, setIsHovered] = useState(false);



    const renderItem = ({ item }: { item: SampleItem }) => {

    


        return (
            <Link
            
            style={styles.sampleItem}

            href={{ 
                pathname: '[productId]/[postId]', 
                params: { productId: item.product.id, postId: item.id } 
            }}
            
        >
            <View style={styles.sampleDataLeftContainer}
            >
            
                <Image style={styles.productImage} source={{ uri: item.product.coverImage }} />

                <View style={styles.postTitle}>
                    <Text style={styles.productNameText}>{item.product.name}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Image style={styles.userAvatar} source={{ uri: item.user.avatar }} />
                        <Text style={styles.userName}>{item.user.name}</Text>
                    </View>

                    <Text style={styles.userComment}>{item.user.comment}</Text>

                    <View style={styles.postDetails}>
                        <Text style={styles.likes}>{item.likes} Likes</Text>
                        <Text style={styles.dislikes}>{item.dislikes} Dislikes</Text>
                        <Text style={styles.comments}>{item.comments} Comments</Text>
                        <Text style={styles.shares}>{item.shares} Shares</Text>
                    </View>
                </View>
            </View>

            <View style={styles.sampleDataRightContainer}>
                <Text style={styles.createdAtText}>{item.createdAt}</Text>
                <Entypo name="chevron-right" size={18} color="black" />
            </View>
        </Link>
        );
    }

    return (
        <View style={styles.container}>

            <FlashList
                data={SampleData}
                renderItem={({ item }) => renderItem({ item })}
                estimatedItemSize={200}
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                
                />
        </View>
    );
}

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      
    },
    sampleItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        position: 'relative', // necessary for absolute children
      },

    sampleDataLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sampleDataRightContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
  
      },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 4,
        marginRight: 10,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    productNameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },  

    postTitle: {
        flex: 1,
        justifyContent: 'center',
    },
    postDetails: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    userAvatar: {
        width: 24,
        height: 24,
        borderRadius: 3,
        marginRight: 5,
        backgroundColor: 'blue',
    },
    userName: {
        fontSize: 12,
        fontWeight: '600',
    },
    userComment: {
        fontSize: 12,
        color: '#555',
        marginVertical: 8,
    },
    likes: {
        fontSize: 12,
        color: '#555',
    },
    dislikes: {
        fontSize: 12,
        color: '#555',
    },
    comments: {
        fontSize: 12,
        color: '#555',
    },
    shares: {
        fontSize: 12,
        color: '#555',
    },

    createdAtText: {
        fontSize: 12,
        color: '#555',
    },


});