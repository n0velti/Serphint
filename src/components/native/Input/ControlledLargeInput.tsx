import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';

type ControlledLargeInputProps = {
    name: keyof BrandFormData;
    label: string;
    placeholder?: string;
    lineCount: number;
};

function ControlledLargeInput({name, label, placeholder, lineCount}: ControlledLargeInputProps) {

    const router = useRouter();


    const {
        validateForm,
        setField,
        getField,
    
      } = useCreateBrand();
      const value = getField(name);

      // Function to handle the press event
    const handlePress = () => {
        router.push({
          pathname: '/screens/brand/BlankLargeTextInput',
          params: {
            name: name,
            placeholder: label,
          },
        });
      };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>

            <View style={styles.innerContainer}>

            <View style={styles.innerContainerTwo}>
            {label && <Text style={styles.label}>{label}</Text>}

           <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{placeholder}</Text>
                <Entypo name="chevron-right" size={24} color="black" />
            </View>

            </View>
            
            <Text style={styles.textPreview} numberOfLines={lineCount}>
                {value}
            </Text>


            </View>



            

        </TouchableOpacity>
    );
}

export default ControlledLargeInput;

const styles = StyleSheet.create({

    container: {
        padding: 5,
  
    },

    innerContainer:{
        justifyContent: 'space-between',
  
    },
    innerContainerTwo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textPreview: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        fontSize: 12,
        fontWeight: '400',
   

    },
    

    label: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        padding: 10,
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
    },
  

});