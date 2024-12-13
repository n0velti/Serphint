import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Alert,
    SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useFormContext } from 'react-hook-form';

const PageThree = ({ setCurrentPage }) => {
    
    const [mediaItems, setMediaItems] = useState([]);
    
    // TikTok-like specifications
    const TIKTOK_SPECS = {
        targetWidth: 1080,
        targetHeight: 1920,
        aspectRatio: 9/16,
    };
    
    // Screen dimensions and grid calculations
    const screenWidth = Dimensions.get('window').width;
    const spacing = 8;
    const padding = 16;
    const totalHorizontalPadding = (padding * 2) + (spacing * 2);
    const itemWidth = (screenWidth - totalHorizontalPadding) / 3;
    const itemHeight = itemWidth * (16/9);

    const MAX_MEDIA_ITEMS = 6;

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permissions Required',
                'Please allow access to your media library to use this feature.',
                [{ text: 'OK' }]
            );
        }
    };

    const cropToAspectRatio = async (uri) => {
        try {
            // First get the image dimensions
            const imageSize = await new Promise((resolve) => {
                Image.getSize(uri, (width, height) => {
                    resolve({ width, height });
                });
            });

            let cropWidth = imageSize.width;
            let cropHeight = imageSize.width * (16/9);

            // If the calculated height would be too tall, calculate based on width instead
            if (cropHeight > imageSize.height) {
                cropHeight = imageSize.height;
                cropWidth = imageSize.height * (9/16);
            }

            // Calculate crop coordinates to center the crop
            const originX = (imageSize.width - cropWidth) / 2;
            const originY = (imageSize.height - cropHeight) / 2;

            // Perform the crop
            const manipulateResult = await ImageManipulator.manipulateAsync(
                uri,
                [
                    {
                        crop: {
                            originX,
                            originY,
                            width: cropWidth,
                            height: cropHeight,
                        },
                    },
                    // Resize to target dimensions if needed
                    {
                        resize: {
                            width: TIKTOK_SPECS.targetWidth,
                            height: TIKTOK_SPECS.targetHeight,
                        },
                    },
                ],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );

            return manipulateResult.uri;
        } catch (error) {
            console.error('Error cropping image:', error);
            throw error;
        }
    };

    const pickImage = async () => {
        if (mediaItems.length >= MAX_MEDIA_ITEMS) {
            Alert.alert(
                'Maximum Limit Reached',
                'You can only add up to 6 photos.',
                [{ text: 'OK' }]
            );
            return;
        }

        try {
            // First, pick the image without forcing aspect ratio
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                aspect: [9, 16],           // This forces 9:16 aspect ratio in the crop UI
                presentationStyle: 'fullScreen', // This ensures proper display on iOS
          
            });

            if (!result.canceled && result.assets[0]) {
                // After picking, crop to correct aspect ratio
                const croppedUri = await cropToAspectRatio(result.assets[0].uri);
                
                const newMedia = {
                    id: Date.now(),
                    uri: croppedUri,
                    type: 'image'
                };
                
                setMediaItems(prevItems => [...prevItems, newMedia]);
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'Failed to process image. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };
    const removeMedia = (id) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        setMediaItems(prevItems => prevItems.filter(item => item.id !== id));
                    }
                }
            ]
        );
    };

    const renderMediaItem = (item, index) => (
        <TouchableOpacity 
            key={item.id}
            style={[styles.mediaItem, { width: itemWidth, height: itemHeight }]}
            onLongPress={() => removeMedia(item.id)}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: item.uri }}
                style={styles.mediaImage}
                resizeMode="cover"
            />
            <View style={styles.removeHintContainer}>
                <Text style={styles.removeHintText}>Hold to remove</Text>
            </View>
        </TouchableOpacity>
    );

    const renderGrid = () => {
        const gridItems = [];
        
        // Add existing media items
        mediaItems.forEach((item, index) => {
            gridItems.push(renderMediaItem(item, index));
        });
        
        // Add placeholder button if under the limit
        if (mediaItems.length < MAX_MEDIA_ITEMS) {
            gridItems.push(
                <TouchableOpacity 
                    key="add-button"
                    style={[styles.mediaItem, styles.addButton, { width: itemWidth, height: itemHeight }]}
                    onPress={pickImage}
                    activeOpacity={0.7}
                >
                    <Text style={styles.plusSign}>+</Text>
                </TouchableOpacity>
            );
        }
        
        return gridItems;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Media</Text>
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.mediaGrid}>
                    {renderGrid()}
                </View>
            </ScrollView>

            <View style={styles.navigationContainer}>

            <TouchableOpacity 
                    style={[styles.navigationButton, { backgroundColor: '#EF4444' }]}
                    onPress={() => setCurrentPage(4)}
                >
                    <Text style={styles.navigationButtonText}>Review and Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.navigationButton, { backgroundColor: '#718096' }]}
                    onPress={() => setCurrentPage(2)}
                >
                    <Text style={styles.navigationButtonText}>Back</Text>
                </TouchableOpacity>
                
               
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1A202C',
    },
    scrollView: {
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    mediaGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 8,
    },
    mediaItem: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F7FAFC',
    },
    mediaImage: {
        width: '100%',
        height: '100%',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDF2F7',
    },
    plusSign: {
        fontSize: 40,
        color: '#718096',
        fontWeight: '300',
    },
    removeHintContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 6,
    },
    removeHintText: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    navigationContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 5,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    navigationButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    navigationButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PageThree;