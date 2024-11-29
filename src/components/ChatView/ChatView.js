import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native-web';
import MessageArea from './MessageArea';

function ChatView(props) {

    const [isRunning, setIsRunning] = useState(false);
    const [sentMessage, setSentMessage] = useState(' ');

    return (
        <View style={styles.chatViewContainer}>

            <View style={styles.header}>
                <Text style={styles.headerText}>{sentMessage}</Text>
            </View>

            <MessageArea isRunning={isRunning} setIsRunning={setIsRunning} setSentMessage={setSentMessage}/>
        </View>
    );
}

export default ChatView;

const styles = StyleSheet.create({
    chatViewContainer: {
        flex: 1,
        padding: 10,
        height: '100%',  // Ensure container fills height
        position: 'relative'  // For absolute positioned MessageArea
    },
    header: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 10
    },
    headerText: {
        fontSize: 16,
        color: '#333'
    }
});