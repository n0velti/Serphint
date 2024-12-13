import React, {useRef, useCallback, useMemo, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    BottomSheetModal,
    BottomSheetView,
  } from '@gorhom/bottom-sheet';
import AddProductOrBrandLayout from '../../components/gui/AddProductOrBrand/AddProductOrBrandLayout';

export default function ProductsAndBrands() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const products = []; // Replace with your actual products array/state

    const [isOpen, setIsOpen] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const handleAddProductOrBrand = () => {
        handlePresentModalPress();
    }

    const bottomSheetModalRef = useRef(null);
    const [currentSnapPoint, setCurrentSnapPoint] = useState(['26%']);
    
    const handleLayoutChange = (type) => {
        console.log(type);
        if(type == "0"){closeModal();}
        setCurrentSnapPoint(['90%']); // Change to 80% when selection is made
    };

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setIsOpen(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const closeModal = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
        setIsOpen(false);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            setIsOpen(false);
            setCurrentSnapPoint(['30%']); // Change to 80% when selection is made

            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, []);


  return (
   
    <View style={[styles.container, {paddingTop: insets.top}]}>

        {/* Backdrop */}
        {isOpen && (
                <Pressable 
                    onPress={closeModal}
                    style={styles.backdrop}
                >
                    <Animated.View 
                        style={[
                            styles.backdrop,
                            {
                                opacity: fadeAnim
                            }
                        ]}
                    />
                </Pressable>
        )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Products & Brands</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddProductOrBrand}
        >
          <Ionicons name="add" size={24} color="#ea1418" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {products.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              No products or brands added yet
            </Text>
            <TouchableOpacity 
              style={styles.addProductButton}
              onPress={handleAddProductOrBrand}
            >
              <Text style={styles.addProductButtonText}>
                Add Product or Brand
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Your list of products will go here
          <View>
            {/* Product list */}
          </View>
        )}
      </View>
    


            <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={currentSnapPoint}
                        onChange={handleSheetChanges}
                        enablePanDownToClose={true}
                        enableDynamicSizing={true}
                        handleIndicatorStyle={{display: 'none'}}
                        
                    >
            <BottomSheetView style={styles.contentContainer}>
               <AddProductOrBrandLayout onLayoutChange={handleLayoutChange}/>
            </BottomSheetView>
        </BottomSheetModal>
        </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
},
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  addButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  addProductButton: {
    backgroundColor: '#ea1418',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addProductButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  contentContainer: {
    flex: 1,

},
});