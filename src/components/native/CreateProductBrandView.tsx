import React, {useMemo, useCallback, useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

import {useCreateBrand} from '../../hooks/useCreateBrand';

import Zero_BrandLogo from './Brand/createBrand/Zero_BrandLogo';
import One_BrandName from './Brand/createBrand/One_BrandName';

import Two_BrandDetails from './Brand/createBrand/Two_BrandDetails';
import Three_BrandPaymentInfo from './Brand/createBrand/Three_BrandPaymentInfo';

import {BrandBankAccount, Location} from '../../types/types';

import { Alert } from 'react-native';

import { useBrandQueries } from '../../hooks/DynamoDB/useDataBrandQueries';
import { BrandFormData } from '../../schemas/BrandFormSchema';

type CreateProductBrandViewProps = {
    setOpenProductBrand : (open: boolean) => void;
};  


type FormValues = {
    brandLogoUri: string;
    brandName: string;
    brandLocation: Location;
    isFranchiseLocation: boolean;
    hideExactLocation: boolean;
    brandCategory: string[];
    brandSlogan: string;
    brandDescription: string;
    brandBankAccount: BrandBankAccount;
  };

function CreateProductBrandView({setOpenProductBrand}: CreateProductBrandViewProps) {

    const {isCreatingBrand, setIsCreatingBrand, currentBrandStep, setBrandCurrentStep
        , validateForm,
        setField, getField, resetForm,
    } = useCreateBrand();


    // const methods = useForm<FormValues>({
    //     defaultValues: {
    //         brandLogoUri: '',
    //         brandName: '',
    //         isFranchiseLocation: false,
    //         brandLocation: {
    //             city: '',
    //             country: '',
    //             latitude: 0,
    //             longitude: 0,
    //             streetNumber: '',
    //             streetName: '',
    //             zipCode: '',
    //             miniDisplayName: '',
    //             fullDisplayName: '',
    //         },
    //         hideExactLocation: false,
    //         brandCategory: [],
    //         brandSlogan: '',
    //         brandDescription: '',
    //         brandBankAccount: {
    //             brandid: '',
    //             accountHolderName: '',
    //             currency: '',
    //             country: '',
    //             accountNumber: '',
    //             accountType: '',
    //             bankName: '',
    //             routingNumber: '',
    //         },
    //     }
    // });

    const { createBrand } = useBrandQueries();


    const brandProductSheet = useRef<any>(null);

    const snapPoints = useMemo(() => ["10%", "30%", "50%", "60%", "80%", "100%"], []);

    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
        if(index === -1) {
            setOpenProductBrand(false);
        }
    }, []);

    const handleSheetClose = useCallback(() => {    
        brandProductSheet.current?.close();
     
    }, []);

    const handleSnapPress = useCallback((index) => {
        brandProductSheet.current?.snapToIndex(index);
    }, []);




    const handleCreateBrand = useCallback(() => {
        setIsCreatingBrand(true);
        handleSnapPress(0);
        setBrandCurrentStep(0);

    }, []);

    const handleCreateProduct = useCallback(() => {
        console.log("Create Product");
    }, []);

    const onSubmitBrand = () => {
        const result = validateForm();
    
        if (result.success) {
            const formData: BrandFormData = result.data;
            console.log("✅ Form data:", formData);
            createBrand(formData)
        } else {
          console.log("❌ Validation errors:", result.errors);
          Alert.alert("Error", "Please fix validation errors.");
        }
      };

    return (
        <BottomSheet    
            ref={brandProductSheet}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            index={1}
            enableDynamicSizing={false}
            enableHandlePanningGesture={false}
            enablePanDownToClose={false}
            enableContentPanningGesture={false}
            handleComponent={() => null}
            >
                <BottomSheetView>
                    {!isCreatingBrand && (
                        <>
                        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 20}}>
                    <TouchableOpacity onPress={handleSheetClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    </View>

                    <View style={{paddingHorizontal: 20}}>    
                    <TouchableOpacity onPress={handleCreateBrand} style={styles.addBrandButton}>
                        <Text style={styles.createBrandText}>Create Brand</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCreateProduct} style={styles.addProductButton}>
                        <Text style={styles.createProductText}>Create Product</Text>
                    </TouchableOpacity>
                    </View>


                    </>
                    )}

                    {
                        //Add Brand Media Page
                        currentBrandStep === 0 && <Zero_BrandLogo handleSnapPress={handleSnapPress} />
                    }

                    {
                        //Add Brand Media Page
                        currentBrandStep === 1 && <One_BrandName handleSnapPress={handleSnapPress} />
                    }

                    {
                        //Add Brand Media Page
                        currentBrandStep === 2 && <Two_BrandDetails handleSnapPress={handleSnapPress} />
                    }

                    {
                        //Add Brand Media Page
                        currentBrandStep === 3 && <Three_BrandPaymentInfo handleSnapPress={handleSnapPress} onSubmitBrand={onSubmitBrand} />
                    }


            


                </BottomSheetView>
            </BottomSheet>
    );
}

export default CreateProductBrandView;

const styles = StyleSheet.create({

    addBrandButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 99,
        margin: 5,
        alignItems: 'center',
    },
    createBrandText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addProductButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 99,
        margin: 5,
        alignItems: 'center',
    },
    createProductText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addBrandLogoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
     

    },
    cancelBtn: {
       

        justifyContent: 'center',
     
    },
    cancelText: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
    brand0Container: {
        alignContent: 'center',
        
        flexDirection: 'row',
       padding: 20,
        justifyContent: 'space-between',
    }
});