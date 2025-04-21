import { Link } from 'expo-router';
import React from 'react';

import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

type NavBarProps = {
};

function NavBar(props: NavBarProps) {
    return (
        <View style={styles.container}>

            <View style={styles.navBarLeftContainer}>
                <Link 
                style={{ fontSize: 20, fontWeight: 'bold' }}
                href={{ pathname: '/', params: {} }}>
                    Serphint
                </Link>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.searchButton}>
                        <Feather name="search" size={16} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.navBarRightContainer}>
                <Link 
                style={styles.createAccountButton}
                href={{ 
                    pathname: '/[userId]/CreateAnAccount', 
                    params: { userId: '0' } 
                }}
                
                >
                    <Text style={styles.createAccountText}>Create An Account</Text>
                </Link>
                <Link 
                style={styles.signInButton}
                href={{ 
                    pathname: '/[userId]/SignIn', 
                    params: { userId: '0' } 
                }}
                >
                    <Text style={styles.signInText}>Sign In</Text>
                </Link>
            </View>

         
        </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    navBarLeftContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },

    navBarRightContainer: {
        alignItems: 'flex-end',

        flexDirection: 'row',
    },

    signInButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },

    signInText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 13,
    },

    createAccountButton: {
   
        paddingVertical: 10,
        paddingHorizontal: 20,

    },

    createAccountText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 13,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    searchInput: {
     
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 300,
      
    },
    searchButton: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 5,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 13,
    },

});