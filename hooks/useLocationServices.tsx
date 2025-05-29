import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export const useLocationServices = () => {
    const getLocation = async () => {
        try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return null;
        }
    
        const location = await Location.getCurrentPositionAsync({});
        return location;
        } catch (error) {
        console.error('Error getting location:', error);
        return null;
        }
    };

    const getReverseGeocode = async (latitude, longitude) => {
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBChI3ZxZYKe0aCPfTHfEr8TyXxbRBzlt0`;
         
            const response = await fetch(url); // this is your current response
            const data = await response.json(); // this gives you the actual geocode result

            return data.results[0];
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            return null;
        }
    }
    
return { getLocation, getReverseGeocode };
};
