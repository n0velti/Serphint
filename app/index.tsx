import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    children: React.ReactNode;
};

function index(props: Props) {
    return (
        <View>
            <Text>index</Text>
        </View>
    );
}

export default index;