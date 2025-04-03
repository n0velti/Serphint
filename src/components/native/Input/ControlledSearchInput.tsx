import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {searchPlaces} from '../../../hooks/Location/useLocationServices';
import debounce from 'lodash.debounce';

import {Location} from '../../../types/types';
import { AntDesign } from '@expo/vector-icons';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';

type ControlledSearchInputProps = {
    name: keyof BrandFormData;
    label: string;
    placeholder?: string;
    type: string;
    secureTextEntry?: boolean;
    keyBoardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

function ControlledSearchInput({name, label, placeholder,type, secureTextEntry, keyBoardType}: ControlledSearchInputProps) {


    const { 
        validateForm,
        setField,
        getField,
    
      
     } = useCreateBrand();
     const value = getField(name);

    const [searchResults, setSearchResults] = useState<Location[]>([]);  
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [isLocationFocused, setIsLocationFocused] = useState(false);
  
    const [query, setQuery] = useState('');

    // Debounced version of the API call
    const debouncedSearch = React.useRef(
        debounce(async (text: string) => {
            try {
                const results = await searchPlaces(text);
                setSearchResults(results); // store JSON results
                console.log('Search results:', results);
            } catch (error) {
                console.error('Error searching places:', error);
            }
        }, 500)
    ).current;

    // Whenever the query changes, perform the search
    useEffect(() => {
        if (query.length > 1) {
            console.log('Query:', query);
            debouncedSearch(query);
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const handleValueChange = (text: string) => {
        setShowSuggestions(true);
        setQuery(text);
        setField(name, text);
      };

    const handleLocationPress = (location: Location) => {
        setQuery(location.fullDisplayName);
        setShowSuggestions(false);
        if (type === "location") {
          setField(name, location); 
        }
      };

    const handleLocationClear = () => {
        setQuery('');
        setField(name, {});
        setShowSuggestions(false);
    }



    return (
        <View style={styles.container}>

            <View style={styles.innerContainer}>

            {label && <Text style={styles.label}>{label}</Text>}

           
            <TextInput
                style={styles.input}
                onChangeText={handleValueChange}
        
                onBlur={() => setIsLocationFocused(false)}
                onFocus={() => setIsLocationFocused(true)}
                value={
                    typeof value === 'object' && value !== null
                    ? value.fullDisplayName
                    : query
                }
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyBoardType}
            />

                {isLocationFocused && (
                <TouchableOpacity style={{ backgroundColor: 'white', paddingHorizontal: 5 }} onPress={handleLocationClear}>
                    <AntDesign name="closecircle" size={18} color="black" />
                </TouchableOpacity>
                )}

            </View>


                {/* Render search suggestions below input */}
                {showSuggestions && searchResults.length > 0 && (
                    <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => `${item.fullDisplayName}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleLocationPress(item)}>
                        <Text style={styles.resultItem}>{item.fullDisplayName}</Text>
                        </TouchableOpacity>
                    )}
                    />
                )}

            

        </View>
    );
}

export default ControlledSearchInput;

const styles = StyleSheet.create({

    container: {
        padding: 5,
  
    },

    innerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    input: {
        padding: 10,
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
    },
    errorText: {
        color: 'red',
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    }

});