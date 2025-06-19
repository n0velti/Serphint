import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PostViewTwo from '@/components/ui/web/Post/PostViewTwo';
import ProductPreview from '@/components/ui/web/Post/ProductPreview';

const { width, height } = Dimensions.get('window');

export default function Product() {
  const { productId, postId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.postView}>
          <PostViewTwo postId={postId} />
        </View>
      </ScrollView>

      {/* <View style={styles.productView}>
        <ProductPreview />
      </View> */}
    </View>
  );
}

const SIDEBAR_WIDTH = width * 0.29;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingRight: SIDEBAR_WIDTH + 20, // so content doesn't get hidden under sidebar
   
  },
  postView: {
    flex: 1,
  },
  productView: {
    position: 'absolute',
    top: 55,
    right: 0,
    width: SIDEBAR_WIDTH,
    height: height - 55,
    backgroundColor: 'white',
 
    padding: 20,
    zIndex: 5,
  },
});