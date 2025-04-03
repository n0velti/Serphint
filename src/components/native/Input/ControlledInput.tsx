import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';


type ControlledInputProps = {
    name: keyof BrandFormData;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyBoardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

function ControlledInput({name, label, placeholder, secureTextEntry, keyBoardType}: ControlledInputProps) {

    const {
        validateForm,
        setField,
        getField,

    } = useCreateBrand();
    const value = getField(name);



    return (
        <View style={styles.container}>

            <View style={styles.innerContainer}>

            {label && <Text style={styles.label}>{label}</Text>}

    
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setField(name, text)}
                        value={value || ''}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyBoardType}
                    />
            
          

            </View>
            

        </View>
    );
}

export default ControlledInput;

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

});