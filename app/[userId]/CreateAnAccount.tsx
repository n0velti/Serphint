import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

type CreateAnAccountProps = {
    params: {
        productId: string;
        userId: string;
    };
};

function CreateAnAccount(props: CreateAnAccountProps) {
    return (
        <View style={styles.container}>
            <View style={styles.createAccountTextContainer}>
                <Text style={styles.createAccountText}>Create An Account</Text>
            </View>
            <View style={styles.inputTextContainer}>
                <Text style={styles.inputTextHeader}>Email</Text>
                <TextInput placeholder="Email" style={styles.inputText} />
            </View>
            <View style={styles.inputTextContainer}>
                <Text style={styles.inputTextHeader}>Password</Text>
                <TextInput placeholder="Password" secureTextEntry style={styles.inputText} />
            </View>
            <View style={styles.inputTextContainer}>
                <Text style={styles.inputTextHeader}>Confirm Password</Text>
                <TextInput placeholder="Confirm Password" secureTextEntry style={styles.inputText} />
            </View>

            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton}>
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
