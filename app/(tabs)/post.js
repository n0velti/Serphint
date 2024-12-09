import React, {useState, useRef, useMemo, useCallback} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import AntDesign from '@expo/vector-icons/AntDesign';


function Post({navigation}) {
    const insets = useSafeAreaInsets();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);


    const [capturedImage, setCapturedImage] = useState(null);   

 

    if (!permission) {
        return <View />;
    }
    
    if (!permission.granted) {
        return (
          <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function captureImage() {
        if (cameraRef.current) {
            const cameraPhotoOptions = {
                skipProcessing: true,
      
              }
            cameraRef.current.takePictureAsync(cameraPhotoOptions).then(({ uri }) => {
                setCapturedImage(uri);
                navigation.setParams({ hasCapture: true });

                console.log('Picture taken', uri);
            });
        }
    }
    
    return (
    
        <View style={styles.container}>
            {!capturedImage && (
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.bottomCaptureContainer}>
                        <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
                            <Image 
                                source={require('../../assets/images/captureCircle.png')}
                                style={styles.captureButtonImage}
                            />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}

            {capturedImage && (
                <View style={styles.postCaptureView}>
                    <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                    <View style={styles.retakeButtonContainer}>
                        <TouchableOpacity 
                            style={styles.retakeButton} 
                            onPress={() => {
                                setCapturedImage(null);
                                navigation.setParams({ hasCapture: false });
                            }}
                            
                        >
                            <Text style={styles.retakeButtonText}>Retake</Text>
                        </TouchableOpacity>

                        
                    </View>
                    <TouchableOpacity 
                            style={styles.selectProductContainer} 
                            onPress={() => {console.log('Select Product')}}
                        >
                            <Text style={styles.selectProductText}>Select Product...</Text>

                            <AntDesign name="rightcircle" size={24} color="white" style={styles.nextIcon} />
                    </TouchableOpacity>

        
                       
                 


                </View>
                

            )}
        </View>
       
        
    );
}

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomCaptureContainer: {
        position: 'absolute',
        bottom: 75,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        borderRadius: 40,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
       
    },    
    captureButtonImage: {
        width: 64,
        height: 64,
        tintColor: 'white',
    },
    postCaptureView: {
        flex: 1,
        position: 'relative',  // Add this
    },
    previewImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    retakeButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,  // Add this to ensure button appears above image
    },
    retakeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    retakeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    selectProductContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flex: '1',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    selectProductText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
    },
    nextIcon: {
        marginTop: 2,

    },

});