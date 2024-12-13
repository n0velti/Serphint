import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { useFonts } from 'expo-font';

function Header(props) {


    const [fontsLoaded] = useFonts({
        'CustomFont': require('../../../assets/fonts/Poppins-SemiBold.otf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }


    return (
        <View style={styles.header}>
            <View style={styles.leftHeaderContainer}>
                <Text style={styles.headerText}>Library</Text>
            </View>

            <View style={styles.rightHeaderContainer}>
               <Image 
                    style={styles.headerProfileImage}
                    source={require('../../../assets/images/profile-user.png')}
                />  
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        
    },
    
    leftHeaderContainer: {
    },
    headerText: {
       fontSize: 30,
        color: 'black',
        fontFamily: 'CustomFont',
        
    },
    rightHeaderContainer: {
       
    },
    headerProfileImage: {
        width: 30,
        height: 30,
    },

});