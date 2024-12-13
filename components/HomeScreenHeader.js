import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

function HomeScreenHeader(props) {
    const insets = useSafeAreaInsets();

    const [fontsLoaded] = useFonts({
        'CustomFont': require('../assets/fonts/Poppins-SemiBold.otf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <View style={styles.headerTopContainer}>
               
                <Text style={styles.locationText}>Montreal</Text>
            
            <View style={styles.headerBottomContainer}>
                <Text style={styles.locationDistance}>Apple</Text>
            </View>

        </View>
            
        </View>
    );
}

export default HomeScreenHeader;

const styles = StyleSheet.create({
    container: {
     
        marginLeft: 20,
        marginTop: 15,
  

    },
    brandLogoHeader: {
        
        width: 22,
        height: 22,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    locationText: {
        fontSize: 27,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'CustomFont',
        borderBottomWidth: 1,
        borderBottomColor: 'white',

    },
    headerTopContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        
    },
    headerBottomContainer: {
        flexDirection: 'row',
        gap: 5,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        flexWrap: 'wrap',
        borderRadius: 5,
        alignSelf: 'flex-end', 

    },
    locationDistance: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'CustomFont',
    }

});