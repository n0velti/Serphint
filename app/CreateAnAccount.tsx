import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { useCreateAccount } from '@/hooks/auth/useCreateAccountForm';

import { signUp, confirmSignUp, autoSignIn } from "aws-amplify/auth"
 
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
    } = useCreateAccount();

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

            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
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
    },
    submitButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 110,
        alignSelf: 'flex-end',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center', 
    },
});
