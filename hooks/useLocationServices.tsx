import * as Location from 'expo-location';


export const useLocationServices = () => {
    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

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
        console.log('Google API Key:', GOOGLE_API_KEY);
        try {
            console.log('Reverse geocoding coordinates:', apiKey);
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCSAAYY5wInbtYfo7rZRJoWkC6m6UZ8obA'
`;
         
            const response = await fetch(url);
            const data = await response.json();
            console.log('Reverse geocode data:', data);
            return data.results[0];
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            return null;
        }
    }
    
return { getLocation, getReverseGeocode };
};
