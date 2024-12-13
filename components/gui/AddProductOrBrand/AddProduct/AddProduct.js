import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { Switch } from 'react-native-paper';

function AddProduct(props) {

    const [hasLocation, setHasLocation] = useState(true);

    const toggleLocation = () => {
        setHasLocation(!hasLocation);
    };

    return (
        <View style={styles.conainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Product</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.productNameText}>Product Name</Text>
                    <TextInput style={styles.productNameInput}/>
                </View>

               
            </View>

                <View style={styles.nextBtnContainer}>  
                    <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(2)}>
                        <Text style={styles.nextBtnText}>Next</Text>
                    </TouchableOpacity>
                </View>
        </View>

    );
}

export default AddProduct;

const styles = StyleSheet.create({  
    conainer: {
     },

    header: {
   
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
    productNameContainer: {
        marginBottom: 10,
    },
    productNameText: {
        fontSize: 16,
    },
    productNameInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
   
    nextBtn: {
        backgroundColor: 'red',
        
        padding: 10,
        alignItems: 'center',
    },
    nextBtnText: {
        color: 'white',
        fontSize: 16,
    },
    
});