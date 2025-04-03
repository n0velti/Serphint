import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useCreateBrand } from '../../../../hooks/useCreateBrand';

import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {Image} from 'expo-image'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ControlledInput from '../../Input/ControlledInput';
import ControlledInputSwitch from '../../Input/ControlledInputSwitch';


type Three_BrandPaymentInfoProps = {
    handleSnapPress: (index: number) => void;
    onSubmitBrand: (data: any) => void
        
    };  

function Three_BrandPaymentInfo({handleSnapPress, onSubmitBrand}: Three_BrandPaymentInfoProps) {

    const insets = useSafeAreaInsets(); 

    const {isCreatingBrand, setIsCreatingBrand, currentBrandStep, setBrandCurrentStep, setStepZeroComplete, isStepZeroComplete} = useCreateBrand();


    const handleSkipBtn = () => {
        onSubmitBrand();
    }


    const handleBackBtn = () => {

        setBrandCurrentStep(2);

   

    }

    const handleNextStep = () => {
        console.log('Next Step');
        // if(isStepZeroComplete){
            // handleSnapPress(5);
       
        // }

    
    }

    const cancelBtn = () => {
        handleSnapPress(1);
        setIsCreatingBrand(false);
        setBrandCurrentStep(-1);

        setStepZeroComplete(false);
    }

    return (
        <View style={[styles.brandNameContainer, {paddingTop: insets.top}]}>
                   <View style={styles.brand1Container}>
                                <View style={styles.header}>
                                <TouchableOpacity onPress={cancelBtn}>
                                    <Text style={styles.cancelText}>Cancel</Text>

                                </TouchableOpacity>

                                <View style={styles.navigationContainer}>

                                    <TouchableOpacity onPress={handleBackBtn} style={styles.backBtn}>
                                    <Ionicons name="arrow-back-circle" size={34} color="black" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleNextStep} style={[styles.forwardBtn,
                                        {opacity: isStepZeroComplete ? 1 : 0.5}
                                    ]} disabled={!isStepZeroComplete} >
                                    <Ionicons name="arrow-forward-circle" size={34} color="black" />
                                    </TouchableOpacity>
                                </View>
                                </View>

                                <View style={styles.subHeader}>
                                    <Text style={styles.addBrandLogoText}>Add Brand Payment</Text>

                                    <TouchableOpacity style={styles.skipBtn} onPress={handleSkipBtn}>
                                        <Text style={styles.skipText}>Skip</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.cardContainer}>
                                    <View style={styles.cardView}>
                                    </View>
                                </View>
                         
                                    
                </View>
        </View>
    );
}

export default Three_BrandPaymentInfo;

const styles = StyleSheet.create({
    brandNameContainer: {

       
        
    },
    brandNameInputContainer: {
        marginVertical: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        
    },
    franchiseSwitchContainer: {
   
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        
    },
    brand1Container: {
        
        flexDirection: 'column',
        paddingHorizontal: 15,

    },
    addBrandLogoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backBtn: {

        justifyContent: 'center',
    },
    forwardBtn: {
        justifyContent: 'center',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    cancelText: {   
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    logoPreviewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
    },
    logoImage: {
        width: 200,
        height: 200,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: 'black',
    },
    helperText: {
        fontSize: 13,
        fontWeight: '400',
      
        padding: 10,
    },
    subHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    skipBtn: {
        padding: 10,
       
    },
    skipText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,

    },

    cardView: {
        backgroundColor: 'grey',
        height: 250,
        width: 350,
        borderRadius: 10,
        marginVertical: 10,
    }
});
