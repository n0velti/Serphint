import React,{forwardRef, memo}from 'react';
import { ProductData } from '../../../types/types';
import { View, StyleSheet, Text } from 'react-native';

import {
    VideoRef,
    type OnSeekData,
} from 'react-native-video';
import SeekBar from '../SeekBar/SeekBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type HintOverlayProps = {
    currentHint: ProductData;
    HINT_HEIGHT: number;
    currentTime: number;
    duration: number;
    setIsSeeking: (value: boolean) => void;
    isSeeking: boolean;
    isLoading: boolean;

    

};

const _HintOverlay = forwardRef<VideoRef, HintOverlayProps>((props, ref) => {

    const insets = useSafeAreaInsets();

    const { 
        currentHint, 
        HINT_HEIGHT, 
        currentTime, 
        duration,
        setIsSeeking, 
        isSeeking, 
        isLoading
     } = props;
    
    const videoSeek = (position: number) => {
        setIsSeeking(true);
        typeof ref !== 'function' && ref?.current?.seek(position);
      };


    return (
        <View style={[styles.container, {height: HINT_HEIGHT - insets.bottom}]}>


            <View style={styles.seekBar}>
            {/* <SeekBar
                currentTime={currentTime}
                duration={duration}
                videoSeek={prop => videoSeek(prop)}
                isLoading={isLoading}
                isUISeeking={isSeeking}

            /> */}
            </View>
        </View>
    );
})

export const HintOverlay = memo(_HintOverlay);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'transparent',
    },
    seekBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    }
});