import Feed from '@/components/ui/web/Feed';
import NavBar from '@/components/ui/web/NavBar';
import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Stack } from 'expo-router';

type Props = {
    children: React.ReactNode;
};

function index(props: Props) {
    return (
        <View style={styles.container}>
     

      
            <Feed/>
        </View>
    );
}

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        overflow: 'scroll', 
    },
});