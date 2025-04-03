import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Switch } from 'react-native-paper';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';


type ControlledInputSwitchProps = {
    name: keyof BrandFormData;
    label: string;
};

function ControlledInputSwitch({name, label}: ControlledInputSwitchProps) {


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

           
                   <Switch
                        value={value}
                        onValueChange={(value) => setField(name, value)}
                        style={styles.input}
                    />
   
           

            </View>

            

        </View>
    );
}

export default ControlledInputSwitch;

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
        marginRight: 5,
    },
    errorText: {
        color: 'red',
    },

});