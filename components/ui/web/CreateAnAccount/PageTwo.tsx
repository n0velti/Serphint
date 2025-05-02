import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PageTwo(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>Create An Account - Page Two</Text>
  
        </View>
    );
}

export default PageTwo;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        marginVertical: 20,
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});