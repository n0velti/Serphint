import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type ProductProps = {
    productId: string;
};

function index(props: ProductProps) {
    const { productId } = useLocalSearchParams();

    return (
        <View>
            <Text>Product ID: {productId}</Text>
            <Text>Product</Text>
        </View>
    );
}

export default index;