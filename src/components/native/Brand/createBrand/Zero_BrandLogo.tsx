import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useCreateBrand } from '../../../../hooks/useCreateBrand';

import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {Image} from 'expo-image'


type Zero_BrandLogoProps = {
    handleSnapPress: (index: number) => void;
        
    };  

function Zero_BrandLogo({handleSnapPress}: Zero_BrandLogoProps) {

    const {isCreatingBrand, setIsCreatingBrand, currentBrandStep, setBrandCurrentStep, setStepZeroComplete, isStepZeroComplete,
        brandLogoUri,
        setBrandLogoUri,
        validateForm,
        setField, getField, resetForm,
        
    } = useCreateBrand();



    useEffect(() => {
        if(brandLogoUri != ''){
        
            handleBrandLogoUri();
            setStepZeroComplete(true);
        }
    }, [brandLogoUri]);

    const handleBrandLogoUri = () => {
        console.log('Brand Logo Uri:', brandLogoUri);
        handleSnapPress(3);


    }

    const handleCancelBrand = () => {
        handleSnapPress(1);
        setIsCreatingBrand(false);
        setBrandCurrentStep(-1);
        setBrandLogoUri('');
        setStepZeroComplete(false);

    }

    const handleNextStep = () => {
        setField('brandLogoUri', brandLogoUri);
        if(isStepZeroComplete){
            handleSnapPress(5);
            setBrandCurrentStep(1);
        }
    }

    const cancelBtn = () => {
        handleSnapPress(1);
        setIsCreatingBrand(false);
        setBrandCurrentStep(-1);
        setBrandLogoUri('');
        setStepZeroComplete(false);
    }

    const handleChangeLogo = () => {
        setStepZeroComplete(false);
        setBrandLogoUri('');
        handleSnapPress(0);
    }

    return (
        <View style={styles.brandLogoContainer}>
                   <View style={styles.brand0Container}>
                                <View style={styles.header}>
                                <TouchableOpacity onPress={cancelBtn}>
                                    <Text style={styles.cancelText}>Cancel</Text>

                                </TouchableOpacity>

                                <View style={styles.navigationContainer}>
                                    <TouchableOpacity onPress={handleCancelBrand} style={styles.backBtn}>
                                    <Ionicons name="arrow-back-circle" size={34} color="black" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleNextStep} style={[styles.forwardBtn,
                                        {opacity: isStepZeroComplete ? 1 : 0.5}
                                    ]} disabled={!isStepZeroComplete} >
                                    <Ionicons name="arrow-forward-circle" size={34} color="black" />
                                    </TouchableOpacity>
                                </View>
                                </View>

                                {
                                    brandLogoUri !== '' && (
                                        <View style={styles.logoPreviewContainer}>
                                            <Image
                                                source={{uri: brandLogoUri}}
                                                style={styles.logoImage}
                                            />
                                            <TouchableOpacity onPress={handleChangeLogo}>
                                                <Text>Change Logo</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                </View>
        </View>
    );
}

export default Zero_BrandLogo;

const styles = StyleSheet.create({
    brandLogoContainer: {
        
    },
    brand0Container: {
        
        flexDirection: 'column',
        padding: 15,

    },
    addBrandLogoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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

});
