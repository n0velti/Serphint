import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';

function PageTwo(props) {
    const [unitCost, setUnitCost] = useState('');
    const [hintValue, setHintValue] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        calculateTotalCost();
    }, [unitCost, hintValue]);

    const calculateTotalCost = () => {  
        if (unitCost && hintValue) {
            const cost = parseFloat(unitCost);
            const hint = parseFloat(hintValue);
            
            if (!isNaN(cost) && !isNaN(hint)) {
                const hintAmount = cost * (hint / 100);
                const total = cost + hintAmount;
                setTotalCost(total.toFixed(2));
            } else {
                setTotalCost(0);
            }
        } else {
            setTotalCost(0);
        }
    }

    const handleUnitCostChange = (text) => {
        // Only allow numbers and decimal point
        const filtered = text.replace(/[^0-9.]/g, '');
        setUnitCost(filtered);
    };

    const handleHintValueChange = (text) => {
        // Only allow numbers and decimal point
        const filtered = text.replace(/[^0-9.]/g, '');
        setHintValue(filtered);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <View style={styles.container}>

            <View style={styles.header}>
            <Text style={styles.headerText}>Details</Text>
            </View>

            <View style={styles.body}>

            <View style={styles.unitCostContainer}>
                <Text style={styles.label}>Unit Cost</Text>
                <TextInput style={styles.input} 
                value={unitCost}
                onChangeText={handleUnitCostChange}
                keyboardType="decimal-pad"/>
            </View>

            <View style={styles.hintValue}>
                <Text style={styles.label}>Hint Value</Text>
                <View style={styles.hintValueInput}>
                    <TextInput style={[styles.input, {flex:1,}]}
                    value={hintValue}
                    onChangeText={handleHintValueChange}
                    keyboardType="decimal-pad"
                    defaultValue='0'
                    />
                    <Text style={styles.label}>%</Text>
                </View>
            </View>

            <View style={styles.totalCostPreview}>
                <Text style={styles.label}>Total Cost Preview</Text>
                <Text style={styles.totalCostValue}>
                        <Text>$</Text>
                        <Text>{totalCost}</Text>
                    </Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.label} onPress={dismissKeyboard}>Description</Text>
                <TextInput style={styles.descriptionInput} multiline/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.setCurrentPage(4)}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.setCurrentPage(2)}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

export default PageTwo;

const styles = StyleSheet.create({
    container: {
    },
    header: {
   
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    headerText: {
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: 'white',
    },
    body: {
        padding: 10,
    },
    unitCostContainer: {
        marginBottom: 10,
    },
    descriptionContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        height: 100,
    },
    hintValue: {
        marginBottom: 10,
    },
    hintValueInput: {
   
     
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
       
    },
    totalCostPreview: {
        marginBottom: 10,
    },
    totalCostValue: {
        fontSize: 20,
    },



});
