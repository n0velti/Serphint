import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

function ProductPreview(props) {
    return (
        <View style={styles.container}>

            {/* image
            price
            In stock
            purchase button / add to cart
            consult a doctor button */}

            <View style={styles.heroImageContainer}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png' }} // Replace with your image URL
                    style={styles.heroImage}
                />
            </View>
            <View style={styles.productPrice}>
                <Text>129.99</Text>
                <Text> / Month</Text>
            </View>

            <Text>In Stock</Text>

            <View style={styles.purchaseBtns}>
                <TouchableOpacity>
                    <Text style={styles.purchaseBtn}>Purchase</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.purchaseBtn}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.purchaseBtn}>Consult a Doctor</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default ProductPreview;

const styles = StyleSheet.create({
    container: {
        
  
        width: 300,
        padding: 10,
        margin: 10,
        borderRadius: 10,
       
      
        borderWidth: 1,
        borderColor: 'black',

        
    },
    heroImageContainer: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
        borderRadius: 10,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    productContent: {
        padding: 10,
    },
    productNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    purchaseBtns: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 10,
    },
    purchaseBtn: {
        fontSize: 14,
        color: 'black',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});