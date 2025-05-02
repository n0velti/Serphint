import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { SampleData } from "@/SampleData";
import { SampleItem } from '@/constants/Types';

import { usePostOperations } from '@/hooks/data/usePostOperations';

const Feed = () => {

  const {getPosts} = usePostOperations();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        console.log("Fetched posts:", posts.data);
        setPosts(posts.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    console.log("Item:", item);


    const postCreatedTime = (time: string | number | Date) => {
      const postDate = new Date(time);
      const now = new Date();
    
      const isSameDay = postDate.toDateString() === now.toDateString();
    
      // Yesterday check
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      const isYesterday = postDate.toDateString() === yesterday.toDateString();
    
      // Start of the week (Monday)
      const dayOfWeek = now.getDay(); // Sunday = 0
      const diffToMonday = (dayOfWeek + 6) % 7;
      const monday = new Date(now);
      monday.setDate(now.getDate() - diffToMonday);
      monday.setHours(0, 0, 0, 0);
    
      if (isSameDay) {
        // Today → return time
        return postDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (isYesterday) {
        return 'Yesterday';
      } else if (postDate >= monday) {
        // This week → return weekday
        return postDate.toLocaleDateString('en-US', { weekday: 'long' });
      } else {
        // Older → return date
        return postDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }
    };
    
    return (
      <Link
        style={styles.sampleItem}
        href={{
          pathname: '[productId]/[postId]',
         // params: { productId: item.product.id, postId: item.id },
        }}
      >
        <View style={styles.sampleDataLeftContainer}>
          <Image style={styles.productImage} source={{ uri: 'https://images.everydayhealth.com/images/news/finasteride-may-cut-heart-disease-risk-in-men-1440x810.jpg?sfvrsn=62bc7bcc_3' }} />

          <View style={styles.postTitle}>
            <Text style={styles.productNameText}>{item.postProductName}</Text>

            <View style={styles.userInfo}>
              {/* <Image style={styles.userAvatar} source={{ uri: item.user.avatar }} /> */}
              <Text style={styles.userName}>{item.postUser?.userEmail}</Text>
            </View>

            <Text style={styles.userComment}>{item.postContent}</Text>

            <View style={styles.postDetails}>
              <Text style={styles.metaText}>{item.postLikes?.length} Likes</Text>
              <Text style={styles.metaText}>{item.postDislikes?.length} Dislikes</Text>
              <Text style={styles.metaText}>{item.postComments?.length} Comments</Text>

            </View>
          </View>
        </View>

        <View style={styles.sampleDataRightContainer}>
          <Text style={styles.createdAtText}>{postCreatedTime(item.createdAt)}</Text>
          <Entypo name="chevron-right" size={18} color="#888" />
        </View>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        renderItem={renderItem}
        estimatedItemSize={200}
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
        contentContainerStyle={styles.listContent}
      />
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
      borderBottomWidth: 1,
      borderColor: '#f0f0f0',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOpacity: Platform.OS === 'web' ? 0 : 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 1,
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
      justifyContent: 'center',
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
    userComment: {
      fontSize: 13,
      color: '#555',
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