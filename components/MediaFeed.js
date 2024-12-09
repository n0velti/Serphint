import React, { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
    FlatList, 
    Dimensions, 
    View,
    StyleSheet 
} from 'react-native';
import { Video } from 'expo-av';
import { Image } from 'expo-image';

const {height : WINDOW_HEIGHT} = Dimensions.get('window');

const MediaFeed = forwardRef((props, ref) => {
    const flatListRef = useRef();
    const [mediaItems, setMediaItems] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const loadedMedia = useRef(new Set());
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const videoRefs = useRef({});

    useImperativeHandle(ref, () => ({
        getCurrentIndex: () => currentItemIndex,
        scrollToIndex: ({ index, animated }) => {
            flatListRef.current?.scrollToIndex({ 
                index, 
                animated,
                viewPosition: 0 
            });
        }
    }));

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 100,
    }).current;

    const [isLoading, setIsLoading] = useState(true);

    const sampleMediaItems = [
        {
            id: '1',
            type: 'image',
            url: require('../assets/images/sample2.jpeg'),
        },
        {
            id: '2',
            type: 'video',
            url: require('../assets/images/sample1.mp4'),
        },
        {
            id: '3',
            type: 'image',
            url: require('../assets/images/sample3.jpeg'),
        },
        {
            id: '4',
            type: 'image',
            url: require('../assets/images/sample4.jpeg'),
        },
    ];

    const fetchMediaItems = useCallback(async (lastKey = null) => {
        setMediaItems(sampleMediaItems);
    }, [loading, hasMore]);

    useEffect(() => {
        fetchMediaItems();
        setIsLoading(false);
    }, [fetchMediaItems]);

    const preloadMedia = useCallback(async (mediaItem) => {
        if(loadedMedia.current.has(mediaItem.url)) return;

        try {
            if(mediaItem.type === 'video') {
                loadedMedia.current.add(mediaItem.url);
            } else {
                await Image.prefetch(mediaItem.url);
                loadedMedia.current.add(mediaItem.url);
            }
        } catch(error) {
            console.log('Error preloading media', error);
        }
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (!viewableItems[0]) return;

        const currentItem = viewableItems[0];
        setCurrentItemIndex(currentItem.index);

        const nextItems = mediaItems.slice(
            currentItem.index + 1, 
            currentItem.index + 3
        );

        nextItems.forEach(item => preloadMedia(item));
    }, [mediaItems, preloadMedia]);

    const renderItem = useCallback(({ item, index }) => {
        const isCurrentItem = index == currentItemIndex;

        if(item.type === 'video'){
            return (
                <View style={styles.mediaContainer}>
                    <Video
                        ref={ref => (videoRefs.current[index] = ref)}
                        source={item.url}
                        style={styles.media}
                        resizeMode="cover"
                        shouldPlay={isCurrentItem}
                        isLooping
                        useNativeControls={false}
                        onError={error => console.error('Video error:', error)}
                        onLoad={() => {
                            if (isCurrentItem && videoRefs.current[index]) {
                                videoRefs.current[index].playAsync();
                            }
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.mediaContainer}>
                    <Image
                        source={item.url}
                        style={styles.media}
                        contentFit="cover"
                        transition={200}
                        cachePolicy="memory"
                    />
                </View>
            );
        }
    }, [currentItemIndex]);

    useEffect(() => {
        Object.entries(videoRefs.current).forEach(([index, ref]) => {
            if (Number(index) === currentItemIndex) {
                ref?.playAsync();
            } else {
                ref?.pauseAsync();
            }
        });
    }, [currentItemIndex]);

    useEffect(() => {
        return () => {
            Object.values(videoRefs.current).forEach(ref => {
                ref?.unloadAsync();
            });
            videoRefs.current = {};
            loadedMedia.current.clear();
        };
    }, []);

    return (
        <FlatList
            ref={flatListRef}
            data={mediaItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(_, index) => ({
                length: WINDOW_HEIGHT,
                offset: WINDOW_HEIGHT * index,
                index,
            })}
            onEndReached={() => fetchMediaItems()}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            maxToRenderPerBatch={3}
            windowSize={5}
            initialNumToRender={2}
            scrollEnabled={props.scrollEnabled}  // Add this line
        />
    );
});

const styles = StyleSheet.create({
    mediaContainer: {
        height: WINDOW_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    media: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        backgroundColor: '#000',
    
        
    }
});

export default MediaFeed;