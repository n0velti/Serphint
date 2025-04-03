import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useCreateBrand } from '../../../../hooks/useCreateBrand';

import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {Image} from 'expo-image'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ControlledInput from '../../Input/ControlledInput';
import ControlledInputSwitch from '../../Input/ControlledInputSwitch';
import ControlledSearchInput from '../../Input/ControlledSearchInput';
import ControlledMultiSelectDropList from '../../Input/ControlledMultiSelectDropList';
import ControlledLargeInput from '../../Input/ControlledLargeInput';

import { BrandCategoryList } from '../../../../utils/BrandCategoryList';
import ControlledButtonInput from '../../Input/ControlledButtonInput';

type Two_BrandDetailsProps = {
    handleSnapPress: (index: number) => void;
        
    };  

function Two_BrandDetails({handleSnapPress}: Two_BrandDetailsProps) {

    const insets = useSafeAreaInsets(); 

    const {isCreatingBrand, setIsCreatingBrand, currentBrandStep, setBrandCurrentStep, setStepZeroComplete, isStepZeroComplete,
        brandLogoUri,
        setBrandLogoUri,
        
    } = useCreateBrand();


    const handleBackBtn = () => {
       // handleSnapPress(1);
        setBrandCurrentStep(1);

   

    }

    const handleNextStep = () => {
        console.log('Next Step');
        // if(isStepZeroComplete){
            // handleSnapPress(5);
            setBrandCurrentStep(3);
        // }
    }

    const cancelBtn = () => {
        handleSnapPress(1);
        setIsCreatingBrand(false);
        setBrandCurrentStep(-1);
        setBrandLogoUri('');
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

                                <Text style={styles.addBrandLogoText}>Add Brand Details</Text>
                            
                                <View style={styles.brandLocationInputContainer}>
                                     <ControlledSearchInput name="brandLocation" label="Brand Location" placeholder="Required" type="location" secureTextEntry={false} keyBoardType="default" />
                                </View>

                                <View style={styles.hideExactLocation}>
                                    <ControlledInputSwitch name="hideExactLocation" label="Hide My Exact Location" />
                                </View>
                                <View style={styles.helperText}>
                                    <Text style={styles.helperText}>This will hide your exact location and show a general area instead</Text>
                                </View>

                                <View style={styles.brandCategoryContainer}>
                                    <ControlledMultiSelectDropList name="brandCategory" label="Brand Category" placeholder="Required" data={BrandCategoryList} />
                                </View>

                                <View style={styles.brandTextDetailContainer}>
                                    <ControlledLargeInput name="brandSlogan" label="Brand Slogan" placeholder="Optional" lineCount={1} />
                                    <View style={styles.seperator}/>
                                    <ControlledLargeInput name="brandDescription" label="Brand Description" placeholder="Optional" lineCount={1} />
                                </View>

                                <View style={styles.timeAvailabilityContainer}>
                                    <ControlledButtonInput name="TimeAvailability" label="Operating Hours" placeholder="Optional" />
                                </View>
                                


                            
                                    
                </View>
        </View>
    );
}

export default Two_BrandDetails;

const styles = StyleSheet.create({
    brandNameContainer: {

       
        
    },
    brandLocationInputContainer: {
        marginVertical: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        
    },
    hideExactLocation: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        
    },
    franchiseSwitchContainer: {
   
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        
    },
    brandCategoryContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 40,
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
   
    brandTextDetailContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 40,
    },
    seperator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        marginLeft: 15, 
    },
    timeAvailabilityContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 40,
    },

});
