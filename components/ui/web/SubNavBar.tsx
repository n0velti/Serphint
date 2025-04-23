import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SubNavBarProps = {
    // Define any props you need here
};

function SubNavBar(props: SubNavBarProps) {
    return (
        <View style={styles.container}>
         
            <View style={styles.subNavBarLeftContainer}>
                <TouchableOpacity>
                    <Text style={styles.subNavBarButton}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subNavBarButton}>All Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subNavBarButton}>Specialists</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default SubNavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    subNavBarLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    subNavBarText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subNavBarButton: {
        marginRight: 20,
        fontSize: 16,
    },
});

