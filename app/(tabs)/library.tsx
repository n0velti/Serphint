import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Library() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text>Library</Text>
        </View>
    );
}

export default Library;

const styles = StyleSheet.create({
    container:{

    },
});