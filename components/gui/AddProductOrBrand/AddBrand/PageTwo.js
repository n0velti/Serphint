import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
function PageTwo(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>    
                <Text style={styles.headerText}>Details</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.sloganContainer}>
                    <Text style={styles.label}>Slogan</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.locationContainer}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} />
                </View>

            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(3)}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.setCurrentPage(1)}>
                    <Text style={styles.nextBtnText}>Back</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default PageTwo;

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
    },
    sloganContainer: {
        marginBottom: 10,
    },
    locationContainer: {
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
    
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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