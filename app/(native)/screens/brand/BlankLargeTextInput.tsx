import { Stack } from 'expo-router';
import React, {useEffect, useState, useRef} from 'react';
import { TextInput, TouchableOpacity, Keyboard, View, Text, StyleSheet} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useCreateBrand } from '../../../../src/hooks/useCreateBrand'
import { BrandFormData } from '../../../../src/schemas/BrandFormSchema';



function BlankLargeTextInput() {

    const inputRef = useRef<TextInput>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { name, placeholder } = useLocalSearchParams<{
        name: keyof BrandFormData; 
        placeholder: string;
      }>();
      
    const {
        validateForm,
        setField,
        getField,
      } = useCreateBrand();
      const value = getField(name);
    


    useEffect(() => {
        console.log('BlankLargeTextInput:', name, placeholder);
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(false);
    

          }, 500);
      
          return () => clearTimeout(timer); // cleanup
    }, [isTyping]);

    const handleHeaderRightPress = () => {
        if (isFocused) {
            Keyboard.dismiss();
        } else {
            inputRef.current?.focus();
         
        }
    };



    const headerRight = () => (


        <View style={styles.headerRight}>

        <View style={styles.autSaveContainer}>
        <Ionicons name="checkmark-circle-sharp" size={16} color={
            !isTyping ? 'green' : 'lightgrey'
        } />            
        <Text style={[styles.autoSaveText, {
            color: !isTyping ? 'green' : 'lightgrey',
        }]}>Auto Saved</Text>
        </View>

        <TouchableOpacity onPress={handleHeaderRightPress}>
            <Text style={styles.cancelText}>{
                isFocused ? 'Done' : 'Edit'
            }</Text>
        </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen
                  options={{
                    headerBackTitle: 'Back',
                    headerTitle: '',
                    headerRight: headerRight,
                  }}
            />

            <TextInput 
            ref={inputRef}
            placeholder={placeholder}
            multiline={true} 
            style={styles.input} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            onChangeText={(text) => {
                setIsTyping(true);
                setField(name, text);
             }
            }
            />
            

        </View>
    );
}

export default BlankLargeTextInput;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 20,
    },
    autoSaveText: {

        fontSize: 12,
        fontWeight: 'bold',
    },

    autSaveContainer: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    cancelText: {   
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 20,
        padding: 10,
        height: '100%',
    },
});