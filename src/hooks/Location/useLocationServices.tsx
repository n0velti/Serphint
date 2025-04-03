import * as Location from 'expo-location';
import env from '../../../env';
import { Location as CustomLocation } from '../../types/types'; // adjust path as needed



export const getCurrentLocation = async () => { 
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
            }

        let location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (error) {
        console.log('Error getting location', error);
    }
}

export const startLocationTracking = async (
    setLocationCoords: (location: Location.LocationObject) => void,
    setErrorMsg: (msg: string) => void,
    setSubscription: (sub: Location.LocationSubscription) => void

) => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        const sub = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High, // High accuracy but you can tweak it
                timeInterval: 5000, // Update every 5 seconds (adjustable)
                distanceInterval: 10, // Update if the user moves 10 meters
            },
            (newLocation) => {
                setLocationCoords(newLocation);
            }
        );

        setSubscription(sub);
    } catch (error) {
        setErrorMsg('Error getting location');
        console.error(error);
    }
};


export const searchPlaces = async (query: string): Promise<CustomLocation[]> => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?` + 
            `input=${encodeURIComponent(query)}` +
            `&types=geocode` +
            `&key=${env.GOOGLE_MAPS_API_KEY}`
        );
        
        const data = await response.json();
        if (data.predictions) {
            const detailedResults: CustomLocation[] = await Promise.all(
                data.predictions.map(async (prediction): Promise<CustomLocation> => {
                    const details = await getPlaceDetails(prediction.place_id);
                    console.log('Details:', details.displayAddress);
                    return {
                        fullDisplayName: details.formatted_address,
                        miniDisplayName: prediction.structured_formatting.main_text,
                        streetNumber: findAddressComponent(details.address_components, 'street_number'),
                        streetName: findAddressComponent(details.address_components, 'route'),
                        city: findAddressComponent(details.address_components, 'locality'),
                        state: findAddressComponent(details.address_components, 'administrative_area_level_1'),
                        province: findAddressComponent(details.address_components, 'administrative_area_level_1'), // optional redundancy
                        country: findAddressComponent(details.address_components, 'country'),
                        zipCode: findAddressComponent(details.address_components, 'postal_code'),
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    };
                })
            );
            return detailedResults;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error searching places:', error);
        return [];
    }
};

const getPlaceDetails = async (placeId: string): Promise<any> => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${placeId}` +
        `&fields=formatted_address,geometry,address_components` +
        `&key=${env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    return data.result;
};

const findAddressComponent = (components: any[], type: string): string => {
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
};