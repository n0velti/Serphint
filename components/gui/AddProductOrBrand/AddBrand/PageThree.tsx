import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFormContext } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { BrandFormData, useBrandOperations } from '@/hooks/useBrandOperations';

interface PageThreeProps {
  setCurrentPage: (page: number) => void;
  handleStateChange: (state: string | null) => void;
}

function PageThree({ setCurrentPage, handleStateChange }: PageThreeProps) {
  const { getValues, setValue, watch } = useFormContext<BrandFormData>();
  const { createBrand, loading, error } = useBrandOperations();
  const logoUri = watch('logoUri');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('logoUri', result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = getValues();
      console.log('Form data:', formData);
      await createBrand(formData);
      handleStateChange(null);
    } catch (err) {
      console.error('Failed to submit brand:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>    
        <Text style={styles.headerText}>Brand Logo</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.logoContainer} onPress={pickImage}>
          {logoUri ? (
            <Image 
              source={{ uri: logoUri }} 
              style={styles.logo}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Click to add logo</Text>
            </View>
          )}
        </TouchableOpacity>
        {error && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={styles.nextBtn} 
          onPress={() => setCurrentPage(2)}
        >
          <Text style={styles.nextBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextBtn, loading && styles.disabledBtn]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.nextBtnText}>
            {loading ? 'Submitting...' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PageThree;


const styles = StyleSheet.create({
    container: {
      
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    headerText: {
        fontSize: 20,
    },
    body: {
        padding: 10,
   
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666',
        fontSize: 16,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    nextBtn: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
    },
    nextBtnText: {
        color: 'white',
    },
    disabledBtn: {
        backgroundColor: '#ccc',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },

});