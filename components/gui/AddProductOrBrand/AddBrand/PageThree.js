import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function PageThree(props) {
    const [brandLogo, setBrandLogo] = useState(null);

    const pickImage = async () => {
        // Request permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setBrandLogo(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>    
                <Text style={styles.headerText}>Brand Logo</Text>
            </View>

            <View style={styles.body}>
                <TouchableOpacity style={styles.logoContainer} onPress={pickImage}>
                    {brandLogo ? (
                        <Image 
                            source={{ uri: brandLogo }} 
                            style={styles.logo}
                        />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>Click to add logo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(2)}>
                    <Text style={styles.nextBtnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.handleStateChange("null")}>
                    <Text style={styles.nextBtnText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PageThree;

const styles = StyleSheet.create({
    container: {
      
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
   
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666',
        fontSize: 16,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    nextBtn: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
    },
    nextBtnText: {
        color: 'white',
    },
});