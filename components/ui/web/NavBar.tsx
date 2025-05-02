import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome6, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import { head } from 'aws-amplify/api';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';



type NavBarProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
};

function NavBar({ setIsMenuOpen, isMenuOpen }: NavBarProps) {
  const [fontsLoaded] = useFonts({
    '42dotSans-Bold': require('../../../assets/fonts/42dotSans-Bold.ttf'),
  });

  const { user } = useAuthProvider();


  
  const router = useRouter();

  console.log("User in NavBar:", user);

  const handlePost = () => {
    router.navigate('/NewPost');
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.header}>
        <Link href="/" style={styles.logo}>
          <Text style={styles.logoTextNow}>Now</Text>
          <Text style={styles.logoTextMed}>Med</Text>
        </Link>
      <View style={styles.rightHeader}>
        <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePost}>
              <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      </View>

      {/* Middle Section */}

      <View style={styles.midSection}>
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



        <View style={styles.subNavBarLeftContainer}>
                <TouchableOpacity style={styles.subNavBarButton}>
                <Entypo name="home" size={24} color="black" />
                    <Text style={styles.subNavBarButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subNavBarButton}>
                  <MaterialIcons name="category" size={24} color="black" />
                    <Text style={styles.subNavBarButtonText}>Products and Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subNavBarButton}>
                <FontAwesome6 name="user-doctor" size={24} color="black" />
                    <Text style={styles.subNavBarButtonText}>Specialists</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.subNavBarButton}>
                <MaterialCommunityIcons name="hospital-box" size={24} color="black" />
                <Text style={styles.subNavBarButtonText}>Hospitals and Clinics</Text>
                </TouchableOpacity>
            </View>
      </View>


      <View style={styles.footer}>
   
        {user ? (
          <View style={styles.authenticatedContainer}>

              <TouchableOpacity
              style={styles.subNavBarButton}
              onPress={() => router.push('/Profile')}
              >
              <MaterialCommunityIcons name="message-text" size={24} color="black" />
              <Text style={styles.subNavBarButtonText}>Messages</Text>
            </TouchableOpacity>
          
            <TouchableOpacity
              style={styles.subNavBarButton}
              onPress={() => router.push('/Profile')}
              >
              <Ionicons name="bag" size={24} color="black" />
              <Text style={styles.subNavBarButtonText}>Orders and Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <View style={styles.innerMenu}>
              <Image
                source={{ uri: '' }}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>{user.signInDetails.loginId}</Text>
              </View>
              <Feather name="menu" size={18} color="#000" />
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
      flexDirection: 'column',

  
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRightColor: '#ddd',
      borderRightWidth: StyleSheet.hairlineWidth,

    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 12,
    },
    logoTextNow: {
      fontSize: 18,
      fontWeight: '700',
      color: 'red',
      fontFamily: '42dotSans-Bold',
    },
    logoTextMed: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000',
    },
  
    midSection: {
      flex: 1,

    
      paddingVertical: 12,
  
    },

    footer: {

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      marginTop: 8,
    },
    rightHeader: {
      flexDirection: 'row',
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
      marginLeft: 8,
    },
  
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9',
  
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
      flexDirection: 'column',
      flex: 1,
    },
    menuBtn: {
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      paddingVertical: 4,
      flex: 1,

    },
    userAvatar: {
      width: 28,
      height: 28,
      borderRadius: 25,
  
      backgroundColor: '#ccc',
    },
    subNavBarLeftContainer: {
      flexDirection: 'column',
      marginTop: 20,

    },
    subNavBarButton: {
      marginRight: 20,
      fontSize: 16,
      paddingVertical: 8,
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,

    }, 
    subNavBarButtonText: {
      fontSize: 16,
      color: '#000',
    },
    innerMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    userName: {
      fontSize: 13,
      fontWeight: '500',
      color: '#000',
    },
  });