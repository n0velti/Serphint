import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFormContext } from 'react-hook-form';

function AddBrand(props) {
    const { register, formState: { errors }, watch, setValue } = useFormContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Brand</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.brandNameContainer}>
                <Text style={styles.brandNameText}>Brand Name</Text>
                <TextInput
                    style={[
                    styles.brandNameInput,
                    errors.brandName && styles.inputError
                    ]}
                    onChangeText={(text) => setValue('brandName', text)}
                    value={watch('brandName')}
                />
                {errors.brandName && (
                    <Text style={styles.errorText}>{errors.brandName.message}</Text>
                )}
                </View>
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(2)}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
}

export default AddBrand;

const styles = StyleSheet.create({  
    conainer: {
     },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            padding: 10,    
            borderBottomWidth: 1,
            borderBottomColor: 'black',
        },
        headerText: {
            fontSize: 20,
        },
        body: {
            padding: 10,
        },
        brandNameContainer: {
            marginBottom: 10,
        },
        brandNameText: {
            fontSize: 16,
        },
        brandNameInput: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 5,
        },
        brandLocationContainer: {
            marginBottom: 10,
        },
        brandLocationText: {
            fontSize: 16,
        },
        brandLocationInput: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 5,
        },
        navigationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
        },
        nextBtn: {
            backgroundColor: 'red',
            padding: 10,
        },
        nextBtnText: {
            color: 'white',
        },
       
});
