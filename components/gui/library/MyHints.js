import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';

function MyHints(props) {
    // Get screen dimensions
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 32 - 16) / 3; // Total width minus padding minus gaps
    const itemHeight = itemWidth * (16/9); // Maintain aspect ratio similar to iPhone screen

    // Sample data - replace with your actual hints data
    const hints = [
        { id: 1, image: '/api/placeholder/320/640' },
        { id: 2, image: '/api/placeholder/320/640' },
        { id: 3, image: '/api/placeholder/320/640' },
        { id: 4, image: '/api/placeholder/320/640' },
        { id: 5, image: '/api/placeholder/320/640' },
        { id: 6, image: '/api/placeholder/320/640' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Hints</Text>
            </View>

            <View style={styles.hintsContainer}>
                {hints.map((hint) => (
                    <View 
                        key={hint.id} 
                        style={[
                            styles.hintItem, 
                            { 
                                width: itemWidth, 
                                height: itemHeight 
                            }
                        ]}
                    >
                        <Image
                            source={{ uri: hint.image }}
                            style={styles.hintImage}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        marginBottom: 70,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    hintsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 8,
    },
    hintItem: {
        backgroundColor: '#F7FAFC',
        borderRadius: 8,
        overflow: 'hidden',
    },
    hintImage: {
        width: '100%',
        height: '100%',
    },
});

export default MyHints;