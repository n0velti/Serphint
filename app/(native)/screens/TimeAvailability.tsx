import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

function TimeAvailability(props) {
    return (
        <View>
            <Stack.Screen
                options={{
                    title: '',
                    headerBackTitle: 'Back',
                }}
            />
            <Text>Time Availability</Text>
        </View>
    );
}

export default TimeAvailability;