import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import {useSignIn} from '@/hooks/auth/useSignInForm';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';

import { useRouter } from 'expo-router';

type SignInProps = {
    params: {
        productId: string;
        userId: string;
    };
};

function SignIn(props: SignInProps) {
    const router = useRouter();
    const { signInUser } = useAuthProvider();

    const [nextStep, setNextStep] = useState({});

    const [isSignInError, setIsSignInError] = useState(false);

    const {
        setField,
        getField,
        validateForm,
        resetForm,
    } = useSignIn();

    
    const handleSubmit = async () => {
        const result = validateForm();
        if (result.success) {
            console.log('Form data:', result.data);
            try {
               
            // TODO: API call, navigation, etc.
            const {nextStep } = await signInUser(
                result.data.email,
                result.data.password,
            )
           
            setNextStep(nextStep);
  
        } catch (error) {
            console.error('Sign-in error ttt:', error);
            setIsSignInError(true);

            // Handle sign-in error (e.g., show an alert)
        }


        } else {
            console.log('Form validation failed:', result.errors);
            console.log(result.errors); // Optional: log for debugging
        }
    };

    if(nextStep.signInStep === 'DONE') {
        console.log('✅ Sign-in complete.');
        setIsSignInError(false);
        router.replace('/'); // Navigate to the main app
        // You can navigate the user to the main app here
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.signInText}>Sign In</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTextHeader}>Email</Text>
                <TextInput 
                placeholder="Email" 
                style={styles.inputText}
                value={getField('email') || ''}
                onChangeText={(text) => setField('email', text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTextHeader}>Password</Text>
                <TextInput 
                placeholder="Password" 
                secureTextEntry 
                style={styles.inputText}
                value={getField('password') || ''}
                onChangeText={(text) => setField('password', text)}
                />
            </View>

            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            {isSignInError && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                    Sign-in failed. Please check your credentials.
                </Text>
            )}
        </View>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        width: 400,
        alignSelf: 'center',
        backgroundColor: 'white',

    },
    headerTextContainer: {
        marginVertical: 20,
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
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
        gap: 5,
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