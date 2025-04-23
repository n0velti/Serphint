import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { SampleData } from "@/SampleData";
import { SampleItem } from '@/constants/Types';

const Feed = () => {
  const renderItem = ({ item }: { item: SampleItem }) => {
    return (
      <Link
        style={styles.sampleItem}
        href={{
          pathname: '[productId]/[postId]',
          params: { productId: item.product.id, postId: item.id },
        }}
      >
        <View style={styles.sampleDataLeftContainer}>
          <Image style={styles.productImage} source={{ uri: item.product.coverImage }} />

          <View style={styles.postTitle}>
            <Text style={styles.productNameText}>{item.product.name}</Text>

            <View style={styles.userInfo}>
              <Image style={styles.userAvatar} source={{ uri: item.user.avatar }} />
              <Text style={styles.userName}>{item.user.name}</Text>
            </View>

            <Text style={styles.userComment}>{item.user.comment}</Text>

            <View style={styles.postDetails}>
              <Text style={styles.metaText}>{item.likes} Likes</Text>
              <Text style={styles.metaText}>{item.dislikes} Dislikes</Text>
              <Text style={styles.metaText}>{item.comments} Comments</Text>
              <Text style={styles.metaText}>{item.shares} Shares</Text>
            </View>
          </View>
        </View>

        <View style={styles.sampleDataRightContainer}>
          <Text style={styles.createdAtText}>{item.createdAt}</Text>
          <Entypo name="chevron-right" size={18} color="#888" />
        </View>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={SampleData}
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