import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';


import { Ionicons } from '@expo/vector-icons';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';

type NavBarProps = {
    setIsMenuOpen: (isOpen: boolean) => void;
    isMenuOpen: boolean;

};

function NavBar({setIsMenuOpen, isMenuOpen}: NavBarProps) {

    const { user, fetchUser } = useAuthProvider();

    console.log('user', user);


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

                {user ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
                    <TouchableOpacity>
                        <Ionicons name="create-outline" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} onPress={() => setIsMenuOpen(!isMenuOpen)}>
                        <Feather name="menu" size={18} color="black" />
                        <Image
                            source={{ uri: '' }}
                            style={{ width: 28, height: 28, borderRadius: 8, marginLeft: 10, backgroundColor: 'red' }}
                        />
                    </TouchableOpacity>


                    </View>
                ) : (
                
                <>
                <Link 
                style={styles.createAccountButton}
                href={{ 
                    pathname: '/CreateAnAccount'
                }}
                
                >
                    <Text style={styles.createAccountText}>Create An Account</Text>
                </Link>

                <Link 
                style={styles.signInButton}
                href={{ 
                    pathname: '/SignIn'
                }}
                
                >
                    <Text style={styles.signInText}>Sign In</Text>
                </Link>

                </>
            
                )}
                
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
        backgroundColor: 'white',
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
    menuBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    }

});