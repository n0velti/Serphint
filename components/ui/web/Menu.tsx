import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { SimpleLineIcons } from '@expo/vector-icons';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';



type MenuProps = {
    setIsMenuOpen: (isOpen: boolean) => void;   
};

function Menu({setIsMenuOpen}: MenuProps) {
    const router = useRouter();
    const { signOut } = useAuthProvider();


    const handleSignOut = async () => {
        try {
            // Assuming you have a signOut function in your auth module
            await signOut();
            console.log('Successfully signed out');
            setIsMenuOpen(false);
            router.replace('/'); 

        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
                <SimpleLineIcons name="logout" size={16} color="red" />
                <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        right: 0,
        
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    signOutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    menuText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
});