import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function LibrarySubHeader() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.borderWrapper}>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.leftContent}>
                        <Ionicons name="time-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonText}>Following</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.previewValue}>113</Text>
                        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.leftContent}>
                        <Ionicons name="apps-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonText}>Followers</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.previewValue}>144</Text>
                        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.leftContent}>
                        <Ionicons name="wallet-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonText}>Messages</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.previewValue}>0</Text>
                        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.leftContent}>
                        <Ionicons name="wallet-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonText}>Purchased</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.previewValue}>0</Text>
                        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.leftContent}>
                        <Ionicons name="wallet-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonText}>Financials</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.previewValue}>$0.00</Text>
                        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={() => router.push('(screens)/ProductsAndBrands')}>
                    <View style={styles.leftContent}>
                        <Ionicons name="briefcase-outline" size={24} color="#6B46C1" />
                        <Text style={styles.buttonTextPandB}>Products and Brands</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        paddingHorizontal: 16,
    },
    borderWrapper: {
        borderTopWidth: 1,
        borderTopColor: '#000',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    lastMenuItem: {
        borderBottomWidth: 1,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        fontSize: 15,
        color: '#1A202C',
        marginLeft: 12,
    },
    buttonTextPandB: {
        fontSize: 15,
        color: '#1A202C',
        fontWeight: 'bold',
        marginLeft: 12,
    },
    previewValue: {
        fontSize: 14,
        color: 'grey',
    },
});

export default LibrarySubHeader;