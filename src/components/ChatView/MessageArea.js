import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native-web';

import playButton from '../../../public/assets/play-button.png';
import pauseButton from '../../../public/assets/pause-button.png';

function MessageArea(props) {

    const [message, setMessage] = useState('');


    

    const sendMessage = () => {
        props.setIsRunning(!props.isRunning);
        props.setSentMessage(message);

        const number = parseInt(message); //missing .value for now
        console.log('Sending number:', typeof number, number);
        window.electron.send('add-number', number);


        setMessage(' ');
    }

    return (
        <View style={styles.messageArea}>
            <View style={styles.messageTextContainer}>
            <TextInput
                placeholder="Type a message..."
                style={styles.messageTextInput}
                onChangeText={setMessage}
                value={message}
                />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Image 
                source={props.isRunning ? pauseButton : playButton}
                style={{width: 30, height: 30}}
                />
            </TouchableOpacity>
        </View>
        </View>
    );
}

export default MessageArea;

const styles = StyleSheet.create({
    messageArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    messageTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,  // Space between input and button
    },
    messageTextInput: {
        flex: 1,  // Takes up remaining space
        height: 50,
        padding: 10,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        
    },
    sendButton: {
        // Remove position: absolute
        justifyContent: 'center',
        alignItems: 'center',
    }
});