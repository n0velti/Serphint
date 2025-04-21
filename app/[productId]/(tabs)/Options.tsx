import React from 'react';
import { View, Text } from 'react-native';

type OptionsProps = {
    productId: string;
};

function Options(props: OptionsProps) {
    return (
        <View>
            <Text>Options</Text>
        </View>
    );
}

export default Options;