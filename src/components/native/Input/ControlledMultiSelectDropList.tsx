import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useCreateBrand } from '../../../hooks/useCreateBrand';
import { BrandFormData } from '../../../schemas/BrandFormSchema';


type ControlledMultiSelectDropListProps = {
    name: keyof BrandFormData;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyBoardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    data: any;
};

function ControlledMultiSelectDropList({name, label, placeholder, secureTextEntry, keyBoardType, data}: ControlledMultiSelectDropListProps) {

    const [open, setOpen] = useState(false);
    const [valueDropDown, setValueDropDown] = useState<string[]>([]);

    const {
        validateForm,
        setField,
        getField,
    
      
     } = useCreateBrand();
     const value = getField(name);

    const dropdownItems = data.map((item: any) => ({
        label: `Class ${item.classNumber} – ${item.title}`,
        value: `${item.classNumber}`, // value must be string or number
      }));    
      
      useEffect(() => {
        if (value) setValueDropDown(value); // initialize
      }, []);
      
      useEffect(() => {
        setField(name, valueDropDown); // keep Zustand in sync
      }, [valueDropDown]);
      
      return (
        <View style={styles.container}>

            <View style={styles.innerContainer}>
            
            <DropDownPicker
                open={open}
                value={valueDropDown}
                items={dropdownItems}
                setOpen={setOpen}
                setValue={setValueDropDown}
                setItems={() => {}}
                multiple={true}
                min={0}
                max={45}
                placeholder={label}
                style={{width: '100%', borderWidth: 0,}}
                mode="BADGE"
                
                placeholderStyle={{
                    fontSize: 14,
                    fontWeight: '600',
       
                }}

                />

            </View>


    

            

        </View>
    );
}

export default ControlledMultiSelectDropList;

const styles = StyleSheet.create({

    container: {
  
    },

    innerContainer:{
        flexDirection: 'column',
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