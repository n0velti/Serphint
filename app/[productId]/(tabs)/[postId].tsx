import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import PostView from '@/components/ui/web/Post/PostView';
import ProductPreview from '@/components/ui/web/Post/ProductPreview';
import PostViewTwo from '@/components/ui/web/Post/PostViewTwo';



type ProductProps = {
    params: {
        productId: string;
        postId: string;
    };
};

const { width, height } = Dimensions.get('window');

function Product(props: ProductProps) {
    const { productId, postId } = useLocalSearchParams();

    console.log('Product ID:', productId);
    console.log('Post ID:', postId);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>

                <View style={styles.postView}>
                    <PostViewTwo postId={postId}/>
                </View>

                {/* <View style={styles.productView}>
                    <ProductPreview/>
                </View> */}
            </View>

        </ScrollView>
    );
}   

export default Product;


  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        
        
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
     
        paddingHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
     
    },
    postView: {
        flex: 1,
      
    },
    productView: {
   
         height: height,
        width: '30%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,

    },
   



})