import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/gui/library/Header';
import LibrarySubHeader from '../../components/gui/library/LibrarySubHeader';
import MyHints from '../../components/gui/library/MyHints';

function Library() {
    const insets = useSafeAreaInsets();


    return (
        <ScrollView style={[styles.container, {paddingTop: insets.top}]}>
            <Header/>   
            <LibrarySubHeader/>
            <MyHints/>
        </ScrollView>
    );
}

export default Library;

const styles = StyleSheet.create({
    container:{
    },
});