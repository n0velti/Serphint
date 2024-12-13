import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { Switch } from 'react-native-paper';

function PageTwoRevised(props) {

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
         
                <View style={styles.productBrandContainer}>
                    <Text style={styles.productBrandText}>Brand</Text>
                    <TextInput style={styles.productBrandInput}/>
                </View>

                <View style={styles.productLocationContainer}>
                    <Text style={styles.productLocationText}>Location</Text>
                    <TextInput style={styles.productLocationInput} />

                    <View style={styles.hasLocationContainer}>
                        <Text style={styles.hasLocationText}>Has Location</Text>
                        <Switch
                            style={styles.hasLocationSwitch}
                            onValueChange={toggleLocation}
                            value={hasLocation}
                        />
                    </View>

                </View>

                <View style={styles.nextBtnContainer}>  
                    <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(3)}>
                        <Text style={styles.nextBtnText}>Next</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(1)}>
                        <Text style={styles.nextBtnText}>Back</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default PageTwoRevised;

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
  
    productBrandContainer: {
        marginBottom: 10,
    },
    productBrandText: {
        fontSize: 16,
    },
    productBrandInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    productLocationContainer: {
        marginBottom: 10,
    },
    productLocationText: {
        fontSize: 16,
    },
    productLocationInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    nextBtnContainer: {
        marginTop: 10,
        gap: 10,
    },
    hasLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    hasLocationText: {
        fontSize: 16,
    },
    hasLocationSwitch: {
        transform: [{ scaleX: .7 }, { scaleY: .7 }],
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