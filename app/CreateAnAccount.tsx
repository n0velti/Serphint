import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useCreateAccount } from '@/hooks/auth/useCreateAccountForm';

import { signUp, confirmSignUp, autoSignIn } from "aws-amplify/auth"
import * as ImagePicker from 'expo-image-picker';
type CreateAnAccountProps = {
    params: {
        productId: string;
        userId: string;
    };
};

function CreateAnAccount(props: CreateAnAccountProps) {

    const [nextStep, setNextStep] = useState({});

    const {
        setField,
        getField,
        validateForm,
        resetForm,
        setCurrentPage,
        currentPage
    } = useCreateAccount();


    const pickImage = async () => {
        // Request permission (especially for mobile)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
        }

        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
        });

        if (!result.canceled) {
        setField('profilePictureUri', result.assets[0].uri);
        }
    };

    useEffect(() => {
        const tryAutoSignIn = async () => {
            if (nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
                try {
                    const { nextStep: signInStep } = await autoSignIn();
                    if (signInStep.signInStep === 'DONE') {
                        console.log('✅ Auto sign-in complete.');
                        // You can navigate the user to the main app here
                    }
                } catch (err) {
                    console.error("❌ Auto sign-in failed:", err);
                }
            }
        };
    
        tryAutoSignIn();
    }, [nextStep]);

    const handleSubmit = async () => {

        if(currentPage === 0) {
            setCurrentPage(1);
            return;
        }


        const result = validateForm();
        if (result.success) {
            console.log('Form data:', result.data);
            // TODO: API call, navigation, etc.
            const {nextStep } = await signUp({
                username: result.data.email,
                password: result.data.password,
                    attributes: {
                        email: result.data.email,
                        phone_number: result.data.phone_number,
                        'custom:userName': result.data.userName,
                        'custom:firstName': result.data.firstName,
                        'custom:lastName': result.data.lastName,
                        'custom:profilePictureUri': result.data.profilePictureUri,
                
                    },
            })

            setNextStep(nextStep);


        } else {
        
            console.log(result.errors); // Optional: log for debugging
        }
    };

    const handleConfirmationCode = async () => {
        const {nextStep} = await confirmSignUp({
            username: getField('email'),
            confirmationCode: getField('confirmationCode'),
        });
        setNextStep(nextStep);
        console.log(nextStep);
    }

    

    if(nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        return (
            <View style={styles.container}>
                <Text>Confirm Sign Up</Text>
                <TextInput
                    placeholder="Confirmation Code"
                    style={styles.inputText}
                    onChangeText={(text) => setField('confirmationCode', text)}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleConfirmationCode}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if(nextStep.signUpStep === 'DONE') {
        return (
            <View style={styles.container}>
                <Text>Account Created Successfully!</Text>
            
            </View>
        )
    }

  
    return (
        <View style={styles.container}>
            <View style={styles.createAccountTextContainer}>
                <Text style={styles.createAccountText}>Create An Account</Text>
            </View>


            {currentPage === 0 && (
            <View style={styles.pageOneContainer}>
               
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextHeader}>Email</Text>
                        <TextInput 
                        placeholder="Email" 
                        style={styles.inputText} 
                        value={getField('email') || ''}
                        onChangeText={(text) => setField('email', text)}
                        />
                    </View>
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextHeader}>Password</Text>
                        <TextInput 
                        placeholder="Password" 
                        secureTextEntry 
                        style={styles.inputText}
                        value={getField('password') || ''}
                        onChangeText={(text) => setField('password', text)}
                        />
                    </View>
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextHeader}>Confirm Password</Text>
                        <TextInput 
                        placeholder="Confirm Password" 
                        secureTextEntry 
                        style={styles.inputText}
                        value={getField('confirmPassword') || ''}
                        onChangeText={(text) => setField('confirmPassword', text)}
                        />
                    </View>
            </View>
            )}

            {currentPage === 1 && (
            <View style={styles.pageTwoContainer}>

                    <View style={styles.inputProfilePicContainer}>
                    <Text style={styles.inputTextHeader}>Profile Picture</Text>
                    <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    {getField('profilePictureUri') ? (
                    <Image source={{ uri: getField('profilePictureUri')}} style={styles.image} />
                    ) : (
                    <Text style={styles.placeholderText}>Pick profile picture</Text>
                    )}
                </TouchableOpacity>
                    </View>



                    <View style={styles.inputTextContainer}>
                    <Text style={styles.inputTextHeader}>Username</Text>
                    <TextInput
                    placeholder="Username"
                    style={styles.inputText}
                    value={getField('userName') || ''}
                    onChangeText={(text) => setField('userName', text)}
                    />
                </View>
                <View style={styles.inputTextContainer}>
                    <Text style={styles.inputTextHeader}>First Name</Text>
                    <TextInput 
                    placeholder="First Name" 
                    style={styles.inputText}
                    value={getField('firstName') || ''}
                    onChangeText={(text) => setField('firstName', text)}
                    />
                </View>
                <View style={styles.inputTextContainer}>
                    <Text style={styles.inputTextHeader}>Last Name</Text>
                    <TextInput 
                    placeholder="Last Name" 
                    style={styles.inputText}
                    value={getField('lastName') || ''}
                    onChangeText={(text) => setField('lastName', text)}
                    />
                </View>
            
                    
            
            </View>
            )}

            <View style={styles.submitContainer}>
                {currentPage !== 0 && (
                       <TouchableOpacity style={styles.backBtn} onPress={() => {setCurrentPage(0)}}>
                       <Text style={styles.submitButtonText}>Back</Text>
                   </TouchableOpacity>
                )}
            

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{currentPage === 1 ? 'Submit' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CreateAnAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        width: 400,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    createAccountTextContainer: {
        marginVertical: 20,
    },
    createAccountText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputTextContainer: {
        marginVertical: 10,
        gap: 5,
    },
    inputTextHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    submitContainer: {
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end', 
    },
    submitButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 110,
        alignSelf: 'flex-end',
    },
    backBtn: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 110,
 
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      placeholderText: {
        textAlign: 'center',
        color: '#555',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
});
