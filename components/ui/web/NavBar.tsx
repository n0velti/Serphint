import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome6, Feather, Ionicons } from '@expo/vector-icons';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';

type NavBarProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
};

function NavBar({ setIsMenuOpen, isMenuOpen }: NavBarProps) {
  const { user } = useAuthProvider();
  const router = useRouter();

  const handlePost = () => {
    router.navigate('/NewPost');
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftContainer}>
        <Link href="/" style={styles.logo}>
          <FontAwesome6 name="staff-snake" size={20} color="#000" />
          <Text style={styles.logoText}>Serphint</Text>
        </Link>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={16} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {user ? (
          <View style={styles.authenticatedContainer}>
            <TouchableOpacity onPress={handlePost}>
              <Ionicons name="create-outline" size={24} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Feather name="menu" size={18} color="#000" />
              <Image
                source={{ uri: '' }}
                style={styles.userAvatar}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authButtons}>
            <Link href="/CreateAnAccount" style={styles.createAccountButton}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </Link>

            <Link href="/SignIn" style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </Link>
          </View>
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
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
  
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    logoText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000',
    },
  
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9',
      marginLeft: 16,
    },
    searchInput: {
      paddingVertical: 6,
      paddingHorizontal: 8,
      width: 200,
      fontSize: 14,
    },
    searchButton: {
      marginLeft: 4,
    },
  
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
  
    authButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    createAccountButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#000',
    },
    createAccountText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#000',
    },
  
    signInButton: {
      backgroundColor: '#000',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    signInText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#fff',
    },
  
    authenticatedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    menuBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      paddingHorizontal: 7,
      paddingVertical: 4,
    },
    userAvatar: {
      width: 28,
      height: 28,
      borderRadius: 25,
      marginLeft: 8,
      backgroundColor: '#ccc',
    },
  });