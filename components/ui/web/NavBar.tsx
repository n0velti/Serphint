import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome6, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import { head } from 'aws-amplify/api';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import { useAccountOperations } from '@/hooks/S3/useAccountOperations';
import { useLocationServices } from '@/hooks/useLocationServices';

type NavBarProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
};

const navBarButtons = [
  { name: 'Home', icon: <Entypo name="home" size={18} color="black" />, route: '/' },
  { name: 'Products and Services', icon: <MaterialIcons name="category" size={18} color="black" />, route: '/ProductsAndServices' },
  { name: 'Specialists', icon: <FontAwesome6 name="user-doctor" size={18} color="black" />,   route: '/Specialists' },
  { name: 'Hospitals and Clinics', icon: <MaterialCommunityIcons name="hospital-box" size={18} color="black" />, route: '/HospitalsAndClinics' },
];

function NavBar({ setIsMenuOpen, isMenuOpen }: NavBarProps) {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [location, setLocation] = useState(null);

  const { getLocation, getReverseGeocode } = useLocationServices();
  const [fontsLoaded] = useFonts({
    '42dotSans-Bold': require('../../../assets/fonts/42dotSans-Bold.ttf'),
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const {getS3ImageUrl} = useAccountOperations();

  const { user } = useAuthProvider();

  useEffect(() => {
    async function fetchLocation() {
      const locationCoords = await getLocation();
      if (!locationCoords) {
        console.warn('Location not available');
        return;
      }
      const location = await getReverseGeocode(locationCoords.coords.latitude, locationCoords.coords.longitude);
      if (location) {
        setLocation(location);
        console.log('Location fetched:', location);
      } else {
        console.warn('Location not found');
      }
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      if (user) {
        const profilePictureUrl = await getS3ImageUrl(user.userAttributes.picture);
        setProfilePicture(profilePictureUrl.href);
      }
    }
    fetchUserProfilePicture();


  }, [user]);


  
  const router = useRouter();

  console.log("User in NavBar:", user);

  const handlePost = () => {
    router.navigate('/NewPost');
  };



  return (
    <View style={styles.container}>
      {/* Left Section */}

      <View style={styles.header}>

      <View style={styles.topHeader}>

          <View style={styles.leftHeader}>

            <Link href="/" style={styles.logo}>
              <Text style={styles.logoTextNow}>Now</Text>
              <Text style={styles.logoTextMed}>Med</Text>
            </Link>

          </View>

        <View style={styles.rightHeader}>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePost}>
                <Ionicons name="create-outline" size={18} color="#007AFF" />
          </TouchableOpacity>

        </View>
      </View>
  
      {/* <TouchableOpacity style={styles.locationBtn}>
        <Entypo name="location-pin" size={18} color="#0000EE" />
          <Text style={styles.locationText}>{location ? location?.address_components[3]?.long_name + ", " + location?.address_components[6]?.long_name : 'Loading...'}</Text>
        </TouchableOpacity> */}
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
           
          {navBarButtons.map((button, index) => (
            <Pressable
            key={index}
            style={hoveredIndex === index
              ? StyleSheet.compose(styles.subNavBarButton, styles.hoveredSubNavBarButton)
              : styles.subNavBarButton
            }
            onPress={() => router.push(button.route)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {button.icon}
            <Text style={styles.subNavBarButtonText}>{button.name}</Text>
          </Pressable>
          ))}
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
                source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>{user?.userAttributes?.preferred_username}</Text>
              <Text style={styles.locationText}>{location ? location?.address_components[3]?.long_name + ", " + location?.address_components[6]?.long_name : 'Loading...'}</Text>

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

  
      backgroundColor: '#f5f5f7',
      paddingVertical: 12,
      paddingHorizontal: 4,



    },
    header: {
      flexDirection: 'column',
      paddingHorizontal: 24,

      
   
      paddingVertical: 12,
    },
    topHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 6,
    },
    logoTextNow: {
      fontSize: 18,
      fontWeight: '600',
      color: 'red',
      fontFamily: '42dotSans-Bold',
    },
    logoTextMed: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
  
    midSection: {
      flex: 1,
      paddingHorizontal: 12,

    
      paddingVertical: 12,
  
    },

    footer: {
      paddingHorizontal: 24,

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
      marginHorizontal: 12,
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
      paddingHorizontal: 12,
      fontSize: 13,
      paddingVertical: 7,
      borderRadius: 6,
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,

    }, 
    hoveredSubNavBarButton: {
      backgroundColor: '#ddd',
      transitionDuration: '0.2s',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-in-out',
    },
    subNavBarButtonText: {
      fontSize: 14,
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

    locationBtn: {
      paddingVertical: 6,

      flexDirection: 'row',
      gap: 1,
      alignItems: 'flex-end',
    },
    locationText: {
      fontSize: 14,
      color: '#0000EE',

    },
    leftHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    },
  });