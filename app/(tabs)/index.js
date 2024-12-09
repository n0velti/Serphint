import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import ExpandableMediaFeed from '../../components/ExpandableMediaFeed';   
const HomeScreen = ({ navigation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      // Initially set swipeEnabled to true (can be updated dynamically later)
      navigation.setOptions({
        swipeEnabled: !isExpanded,
      });

    }, [navigation, isExpanded]);
  



    return (
        <View style={styles.container}>
           
            <View style={[styles.headerContainer, {zIndex: isExpanded?0:1}]}>
                <HomeScreenHeader />
            </View>

            <View style={styles.feedContainer}>
                <ExpandableMediaFeed isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        
        elevation: 1, // For Android
    },
    feedContainer: {
        flex: 1,
    },
});