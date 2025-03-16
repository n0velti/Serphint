import React from 'react';
import { ButtonWithIcon } from '../../../types/types';
import { Pressable, Text } from 'react-native';

function ButtonWithIcon({
    icon,
    label,
    onClick,
    disabled,
    isActive

}: ButtonWithIcon) {
    return (
        <Pressable
            onPress={onClick}
            disabled={disabled}
        >


            <Text>{label}</Text>
        </Pressable>
    );
}

export default ButtonWithIcon;