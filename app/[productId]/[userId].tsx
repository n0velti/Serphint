import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useLocalSearchParams } from 'expo-router';


type ProductProps = {
    params: {
        productId: string;
        userId: string;
    };
};

function Product(props: ProductProps) {
    const { productId, userId } = useLocalSearchParams();


    return (
        <View style={styles.container}>

            <View style={styles.subHeader}>
                <TouchableOpacity>
                    <Text style={styles.subHeaderButton}>Product</Text>
                </TouchableOpacity>
                {userId && (
                <TouchableOpacity>
                    <Text style={styles.subHeaderButton}>Post</Text>
                </TouchableOpacity>
                )}
                <TouchableOpacity>
                    <Text style={styles.subHeaderButton}>All Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subHeaderButton}>Options</Text>
                </TouchableOpacity>
            </View>
           
  
            <Text>Product</Text>
            <Text>Product ID: {productId} </Text>
            <Text>User ID: {userId}</Text>
        </View>
    );
}

export default Product;


  const styles = StyleSheet.create({
    container: {
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