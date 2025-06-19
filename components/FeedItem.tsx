import React, { useRef } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';

const FeedItem = ({ item }: { item: any }) => {
  const profilePictureUrl = item.profilePictureUrl;


  return (
    <Link
      style={styles.sampleItem}
      href={{
        pathname: '[productId]/[postId]',
        params: { productId: item.postProduct.id, postId: item.id },
      }}
    >
  
          <View style={styles.sampleDataLeftContainer}>
            <Image
              style={styles.productImage}
              source={{
                uri:
                  item.postProduct.imageUri ||
                  'https://images.everydayhealth.com/images/news/finasteride-may-cut-heart-disease-risk-in-men-1440x810.jpg?sfvrsn=62bc7bcc_3',
              }}
            />

            <View style={styles.postTitle}>
              <Text style={styles.productNameText}>{item.postProductName}</Text>

              <View style={styles.userInfo}>
                <Image
                  style={styles.userAvatar}
                  source={{ uri: profilePictureUrl || 'https://via.placeholder.com/150' }}
                />
                <Text style={styles.userName}>{item.postUser?.userName}</Text>
              </View>

              <Text style={styles.postTitle}>{item.postTitle}</Text>

              <View style={styles.postDetails}>
                <Text style={styles.metaText}>{item.postLikes?.length} Likes</Text>
                <Text style={styles.metaText}>{item.postDislikes?.length} Dislikes</Text>
                <Text style={styles.metaText}>{item.postComments?.length} Comments</Text>
              </View>
            </View>
          </View>

          <View style={styles.sampleDataRightContainer}>
            <Text style={styles.createdAtText}>
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </Text>
            <Entypo name="chevron-right" size={18} color="#888" />
          </View>
      
    </Link>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
    sampleItem: {
      flexDirection: 'row',

      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#f0f0f0',
      backgroundColor: '#fff',
      paddingVertical: 5,
    },
    backgroundCard: {
      flex: 1,
      width: '100%',
      borderRadius: 4,
      padding: 12,
   
    },
    sampleDataLeftContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    sampleDataRightContainer: {
      position: 'absolute',
      top: 12,
      right: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: '#eee',
    },
    postTitle: {
      flex: 1,
    },
    productNameText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#111',
      marginBottom: 4,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    userAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
      backgroundColor: '#ccc',
    },
    userName: {
      fontSize: 13,
      fontWeight: '500',
      color: '#333',
    },
    postDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 6,
    },
    metaText: {
      fontSize: 12,
      color: '#888',
    },
    createdAtText: {
      fontSize: 11,
      color: '#888',
      marginRight: 4,
    },
    hoveredFeedItem: {
        backgroundColor: '#ddd',
        transitionDuration: '0.25s',
        transitionProperty: 'background-color',
        transitionTimingFunction: 'ease-in-out',
        
      },
  });