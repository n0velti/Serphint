import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';

type ControlledButtonInputProp = {
    name: keyof BrandFormData;
    label: string;
    placeholder?: string;

};

function ControlledButtonInput({name, label, placeholder}: ControlledButtonInputProp) {

    const router = useRouter();


    const {
        validateForm,
        setField,
        getField,

      } = useCreateBrand();
      const value = getField(name);




    const handlePress = () => {
        router.push({
          pathname: '/screens/TimeAvailability',
          params: {
            name: name,
            placeholder: label,
          },
        });
      };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>

            <View style={styles.innerContainer}>

            {label && <Text style={styles.label}>{label}</Text>}

           <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{placeholder}</Text>
                <Entypo name="chevron-right" size={24} color="black" />
            </View>



            </View>


            

        </TouchableOpacity>
    );
}

export default ControlledButtonInput;

const styles = StyleSheet.create({

    container: {
        padding: 5,
  
    },

    innerContainer:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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