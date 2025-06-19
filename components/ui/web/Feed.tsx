import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform, Animated } from 'react-native';
import { FlashList } from "@shopify/flash-list";

import FeedItem from '@/components/FeedItem';



import { usePostOperations } from '@/hooks/data/usePostOperations';
import { useAccountOperations } from '@/hooks/S3/useAccountOperations';


const Feed = () => {

  const {getPosts} = usePostOperations();
  const [posts, setPosts] = useState();

  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const {getS3ImageUrl} = useAccountOperations();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await getPosts();
        const postsWithImages = await Promise.all(
          postsResponse.data.map(async (post: any) => {
            try {
              const result = await getS3ImageUrl(post.postUser?.userAvatarUri);
              return { ...post, profilePictureUrl: result?.href };
            } catch (e) {
              console.error("Image fetch failed:", e);
              return { ...post, profilePictureUrl: null };
            }
          })
        );
        setPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);



  const renderItem = ({ item }: { item: any }) => <FeedItem item={item} />;


  return (
    <View style={styles.container}>
      {        posts && posts.length === 0 ? (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#888' }}>No posts available</Text>
        </View>
      )
        : 
      <FlashList
        data={posts}
        renderItem={renderItem}
        estimatedItemSize={200}
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
        contentContainerStyle={styles.listContent}
      />
      }
    </View>
  );
};

export default Feed;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
    sampleItem: {
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#f0f0f0',
      backgroundColor: '#fff',
      
      marginVertical: 3,
   
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
    postTitle:{
      fontSize: 15,
      fontWeight: '500',
      color: '#333',
      marginBottom: 6,

    },
    postDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
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

  });