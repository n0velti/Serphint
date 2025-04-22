import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import PostView from '@/components/ui/web/Post/PostView';
import ProductPreview from '@/components/ui/web/Post/ProductPreview';


type ProductProps = {
    params: {
        productId: string;
        postId: string;
    };
};

function Product(props: ProductProps) {
    const { productId, postId } = useLocalSearchParams();


    return (
        <View style={styles.container}>


            <PostView/>
            <ProductPreview/>

        </View>
    );
}

export default Product;


  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
   



})