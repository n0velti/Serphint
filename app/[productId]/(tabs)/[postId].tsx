import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';


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


      
           
  
            <Text>Product</Text>
            <Text>Product ID: {productId} </Text>
            <Text>User ID: {postId}</Text>
        </View>
    );
}

export default Product;


  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10,
    },
    heroImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    productNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subHeader: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    subHeaderButton: {
        fontSize: 14,
        color: 'black',
        padding: 10,
    },



})