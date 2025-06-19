import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome6, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';



import { useAccountOperations } from '@/hooks/S3/useAccountOperations';
import { useLocationServices } from '@/hooks/useLocationServices';
import AntDesign from '@expo/vector-icons/AntDesign';


type NavBarProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  navBarCollapsed: boolean;
  setNavBarCollapsed: (collapsed: boolean) => void;
};

const navBarButtons = [
  { name: 'Home', icon: <Entypo name="home" size={19} color="black" />, route: '/' },
  { name: 'Products and Services', icon: <MaterialIcons name="category" size={19} color="black" />, route: '/ProductsAndServices' },
  { name: 'Specialists', icon: <FontAwesome6 name="user-doctor" size={19} color="black" />,   route: '/Specialists' },

];

const bottomNavBarButtons = [
  { name: 'Messages', icon: <Ionicons name="chatbubble-ellipses" size={18} color="black" />, route: '/Messages' },
  { name: 'Orders & Bookings', icon: <Ionicons name="bag" size={18} color="black" />, route: '/Orders' },
  { name: 'Profile', icon: null, route: '/Profile' }
]

const menuItems = [
  { name: 'View Profile', key: 0,  icon: null, route: '/Profile' },
  { name: 'Calendar', key: 1,  icon:<AntDesign name="calendar" size={18} color="black" />, route: '/Settings' },
  { name: 'Settings', key: 2,  icon:<Ionicons name="settings-outline" size={18} color="black" />, route: '/Settings' },
  { name: 'Log Out', key: 3,  icon: <MaterialIcons name="logout" size={18} color="black" />, route: null},
  { name: 'Cancel', key: 4,  icon: <MaterialIcons name="cancel" size={18} color="#EA2027" />, route: '/Help' },


]

const NAVBAR_WIDTH = Platform.OS === 'web' && 74;

function NavBar({ setIsMenuOpen, isMenuOpen, navBarCollapsed, setNavBarCollapsed }: NavBarProps) {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bottomHoveredIndex, setBottomHoveredIndex] = useState<number | null>(null);
  const [menuHoverIndex, setMenuHoverIndex] = useState<number | null>(null);

  const [location, setLocation] = useState(null);

  const { user, signOut } = useAuthProvider();


  const { getLocation, getReverseGeocode } = useLocationServices();
  const [fontsLoaded] = useFonts({
    '42dotSans-Bold': require('../../../assets/fonts/42dotSans-Bold.ttf'),
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const {getS3ImageUrl} = useAccountOperations();


  // useEffect(() => {
  //   async function fetchLocation() {
  //     const locationCoords = await getLocation();
  //     if (!locationCoords) {
  //       console.warn('Location not available');
  //       return;
  //     }
  //     const location = await getReverseGeocode(locationCoords.coords.latitude, locationCoords.coords.longitude);
  //     if (location) {
  //       setLocation(location);
  //       console.log('Location fetched:', location);
  //     } else {
  //       console.warn('Location not found');
  //     }
  //   }
  //   fetchLocation();
  // }, []);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      if (user) {
        const profilePictureUrl = await getS3ImageUrl(user.userAttributes?.picture);
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

  const handleRoutePress = async (item: { route: string; key: number; name: string; icon?: React.ReactNode }) => {
    if(item.key === 3) {  
      await signOut();
      setIsMenuOpen(false); // Close the menu after navigation
      router.push('/');
      return;
    }
  }


  const handleNavigation = (route: string) => {
    if (route === '/') {
      setNavBarCollapsed(false);  // Home -> Expand
    } else {
      setNavBarCollapsed(false);   // All others -> Collapse (keep FALSE for now)
    }
    router.push(route);
  };
  return (
    <View style={[styles.container, {width: navBarCollapsed && NAVBAR_WIDTH }]}>
      {/* Left Section */}

      <View style={styles.header}>

    {      !navBarCollapsed && (
      <View style={styles.topHeader}>

          <View style={styles.leftHeader}>

            <Link href="/" style={styles.logo}>
              <Text style={styles.logoTextNow}>Now</Text>
              <Text style={styles.logoTextMed}>Med</Text>
            </Link>

          </View>

        <View style={styles.rightHeader}>
{/* 
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={18} color="black" />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={handlePost}>
          <Ionicons name="create-outline" size={19.5} color="black" />
          </TouchableOpacity>

        </View>
      </View>
    )}
  

      </View>



      

      <View style={styles.midSection}>
        {!navBarCollapsed && (
        <View style={styles.searchContainer}>
          
            <Feather name="search" size={16} color="#555" />
        
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
        
          />
         
        </View>
        )}



        <View style={[styles.subNavBarLeftContainer, { alignItems: navBarCollapsed ? 'center' : 'flex-start' }]}>
            {navBarButtons.map((button, index) => (
              <Pressable
                key={index}
                style={hoveredIndex === index
                  ? StyleSheet.compose(styles.subNavBarButton, styles.hoveredSubNavBarButton)
                  : styles.subNavBarButton
                }
                onPress={() => handleNavigation(button.route)}
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


                { !isMenuOpen ? (
                  bottomNavBarButtons.map((button, index) => (
                    
                    index !== 2 ? (
                    <Pressable
                    key={index}
                    style={bottomHoveredIndex === index
                      ? StyleSheet.compose(styles.subNavBarButton, styles.hoveredSubNavBarButton)
                      : styles.subNavBarButton
                    }
                    onPress={() => handleNavigation(button.route)}
                    onMouseEnter={() => setBottomHoveredIndex(index)}
                    onMouseLeave={() => setBottomHoveredIndex(null)}
                  >
                      {button.icon}
                      <Text style={styles.subNavBarButtonText}>{button.name}</Text>
                    </Pressable>
            
                  )
                  : 
                  
                  (
                    <Pressable
                    key={index}
                    style={bottomHoveredIndex === index
                      ? StyleSheet.compose(styles.subNavBarButton, styles.hoveredSubNavBarButton)
                      : styles.subNavBarButton
                    }
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    onMouseEnter={() => setBottomHoveredIndex(index)}
                    onMouseLeave={() => setBottomHoveredIndex(null)}
                  >
                      <View style={styles.innerMenu}>

                        <View style={styles.titleArea}>
                        <Image
                          source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
                          style={styles.userAvatar}
                        />
                        <View style={styles.innerTitleArea}>
                          <Text style={styles.userName}>{user?.userAttributes?.name || 'Profile'}</Text>
                          {/* <Text style={styles.locationText}>{location ? location?.address_components[3]?.long_name + ", " + location?.address_components[6]?.long_name : 'Loading...'}</Text> */}
                        </View>
                        </View>
                    


                        <Entypo name="dots-three-horizontal" size={18} color="black" />
                      </View>
                    </Pressable>
                )
                  ))
                ) : (

                  <View style={styles.menuView}>
                    {
                      menuItems.map((item, index) => (

                        


                        index !== 4 ? (
                        <Pressable
                          key={index}
                          style={menuHoverIndex === index
                            ? StyleSheet.compose(styles.menuBtn, styles.hoveredSubNavBarButton)
                            : styles.menuBtn
                          }
                          onMouseEnter={() => setMenuHoverIndex(index)}
                          onMouseLeave={() => setMenuHoverIndex(null)}
                          onPress={() => handleRoutePress(item)}
                        >
                

                          {index === 0 ? (
                           <Image
                           source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
                           style={styles.userAvatar}
                         />
                          ) : (
                            item.icon && item.icon
                          )  
                          }
                          <Text style={styles.subNavBarButtonText}>{item.name}</Text>
                        </Pressable>
                      )
                        :
                      (
                        <Pressable
                          key={index}
                          style={menuHoverIndex === index
                            ? StyleSheet.compose(styles.menuBtnCancel, styles.hoveredSubNavBarButton)
                            : styles.menuBtnCancel
                          }
                          onMouseEnter={() => setMenuHoverIndex(index)}
                          onMouseLeave={() => setMenuHoverIndex(null)}
                          onPress={() => {
                            handleNavigation(item.route);
                            setIsMenuOpen(false);
                          }}
                        >
                          {item.icon && item.icon}
                          <Text style={styles.subNavBarButtonTextCancel}>{item.name}</Text>
                        </Pressable>
                      )
                      ))
                    }
                
                  </View>

                 
                )}


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



      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: '#ddd',
      height: '100%',


    },
    header: {
      flexDirection: 'column',
      padding: 19,
    },
    topHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

    },
    logoTextNow: {
      fontSize: 17.5,
      fontWeight: '600',
      color: '#EA2027',
      fontFamily: '42dotSans-Bold',
    },
    logoTextMed: {
      fontSize: 17.5,
      fontWeight: '600',
      color: '#000',
    },
  
    midSection: {
      flex: 1,
      
  
    
      
  
    },

    footer: {
      

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,

    },
    rightHeader: {
      flexDirection: 'row',
   
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
      marginTop: 2,
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#f0f0f0',
      borderRadius: 5,
      paddingHorizontal: 8,
      gap: 1,
      backgroundColor: '#f9f9f9',
  
    },
    searchInput: {
      paddingVertical: 6,
      paddingHorizontal: 8,
      width: 200,
      fontSize: 14,
    },
 
   
  
    authButtons: {
      flexDirection: 'row',
      gap: 11,
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
      paddingHorizontal: 15,
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
      marginTop: 30,
      paddingHorizontal : 15,

    },
    subNavBarButton: {
      paddingHorizontal: 10,
      paddingVertical: 9,
      
      borderRadius: 6,

      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap:11,
      minHeight: 45,
    },
    hoveredSubNavBarButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',

      transitionDuration: '0.25s',
      transitionProperty: 'background-color',
      
      transitionTimingFunction: 'ease-in-out',
      
    },
    subNavBarButtonText: {
      fontSize: 13,
      fontFamily: '42dotSans-Bold',
      color: '#000',
    },
    subNavBarButtonTextCancel: {
      fontSize: 13,
      fontFamily: '42dotSans-Bold',
      color: '#EA2027',
    },
    innerMenu: {
      flexDirection: 'row',
      alignItems: 'center',
   
      justifyContent: 'space-between',
      width: '100%',

    },
    titleArea: {
      flexDirection: 'row',
      alignItems: 'center',
 
    },
    userName: {
      fontSize: 13,
      fontWeight: '500',
      color: '#000',

    },
    innerTitleArea: {
      flexDirection: 'column',
      gap: 2,
      marginLeft: 8,  

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
    menuBtnCancel: {
        
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  
      paddingVertical: 4,
      marginTop: 8,
      flex: 1,
    }
  });