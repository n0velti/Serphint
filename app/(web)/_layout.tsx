import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {Link, Slot, usePathname} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useResponsive } from '../../src/hooks/useResponsive';

const TABS = [
    {
        id: 'request',
        label: 'Request',
        icon: 'home-outline',
        path: '/',
        containerStyle: {
          marginTop: 10,
        
          paddingHorizontal: 16,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          
          gap: 10,
          paddingLeft: 20,   
          paddingVertical: 15,    
        }
      },

    {
      name: 'Brands & Products',
      path: '/BrandsAndProducts',
      icon: 'home-outline',
      activeIcon: 'home',
      label: 'Brands & Products',
      containerStyle: {
        marginTop: 25,  
        padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          
          gap: 10,
          paddingLeft: 20,   
          paddingVertical: 15,    
      }

    },
    
  
    {
      name: 'People',
      path: '/People',
        icon: 'compass-outline',
        activeIcon: 'compass',
        label: 'People',
        containerStyle: {
            padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              
              gap: 10,
              paddingLeft: 20,   
              paddingVertical: 15,    
          }
    },
    {
        name: 'Money',
        path: '/Money',
          icon: 'compass-outline',
          activeIcon: 'compass',
          label: 'Money',
          containerStyle: {
            padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              
              gap: 10,
              paddingLeft: 20,   
              paddingVertical: 15,    
          }
      },
      {
        name: 'Stats',
        path: '/Stats',
          icon: 'compass-outline',
          activeIcon: 'compass',
          label: 'Stats',
          containerStyle: {
            padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              
              gap: 10,
              paddingLeft: 20,   
              paddingVertical: 15,    
          }
      },

      {
        id: 'settings',
        label: 'Settings',
        icon: 'home-outline',
        path: '/Settings',
        containerStyle: {

        
          paddingHorizontal: 16,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          
          gap: 10,
          paddingLeft: 20,   
          paddingVertical: 15,    

         marginTop: 'auto',
   
        
        }
      },
]


function WebLayout(props: any) {

    const {theme} = useTheme();
    const { isPhone, isDesktop, responsive } = useResponsive();
    const pathName = usePathname();


    console.log('pathName', pathName);



    const iconColor = responsive({
        phone: theme.colors.primary,
        desktop: theme.colors.secondary,
        default: theme.colors.primary,
    });

    return (
        <View style={styles.container}>
    

            <View style={styles.sidebar}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>Serphint</Text>
                </View>

               

                <View style={styles.navItems}>
                    {TABS.map(tab => {
                        return (
                        <Link href={tab.path
                        } key={tab.name} asChild>
                            <Pressable
                            style={
                                {
                                    ...tab.containerStyle,
                                    backgroundColor: pathName === tab.path ? 'rgba(0,0,0,0.1)' : 'transparent'
                                }
                            }
                            >

                            
                            <Ionicons 
                                name={tab.icon} 
                                size={24} 
                                color={iconColor} 
                            />


                            <Text style={styles.navItemText}>{tab.label}</Text>
                            </Pressable>
                        </Link>
                        );
                    })}
                        
                
                </View>

           

            </View>


            {/* Content area */}
            <View style={styles.content}>
                <Slot />
            </View>


        </View>
    );
}

export default WebLayout;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        
      },
      sidebar: {
        width: 320,
        borderRightWidth: 1,
        borderRightColor: 'green',

        paddingTop: 20,
        display: 'flex',
  
        flexDirection: 'column',
        height: '100vh',
        zIndex: 1000,
      },
      logoContainer: {
        padding: 20,
        marginTop: 20,
      },
        logo: {
            fontSize: 30,
            color: '#555',
        },
      navItems: {
        
        marginTop: 30,
        flexDirection: 'column',

        flex: 1,
        
       
      },
        topContainer: {
            marginTop: 40,
            flexDirection: 'column',
          
        },
      navItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        
        gap: 10,
        paddingLeft: 20,   
        paddingVertical: 15,    
        
      },
      navItemText: {
        marginLeft: 10,
        fontSize: 20,
        color: '#555',
      }, 

     
     
});