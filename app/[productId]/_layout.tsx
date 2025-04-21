import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

type ProductLayoutProps = {
    params: {
        productId: string;
    };
};

function ProductLayout(props: ProductLayoutProps) {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        </Stack>
    );
}

export default ProductLayout;

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    subHeaderButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});