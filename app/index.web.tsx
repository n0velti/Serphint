import Feed from '@/components/ui/web/Feed';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  children?: React.ReactNode;
};

function Index(props: Props) {
    const [contentType, setContentType] = useState('Popular');
    const [contentTime, setContentTime] = useState('Recent');
    const [showCategories, setShowCategories] = useState(false);
  
    const categories = [
      {
        subtitle: 'Health Conditions',
        items: ['Hair Loss', 'Erectile Dysfunction', 'Acne'],
      },
      {
        subtitle: 'Lifestyle',
        items: ['Fitness', 'Nutrition', 'Mental Health'],
      },
      {
        subtitle: 'Medications',
        items: ['Finasteride', 'Minoxidil', 'Tretinoin'],
      },
    ];
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowCategories(prev => !prev)}
            style={styles.catBtn}
          >
            <MaterialCommunityIcons name="dots-grid" size={16} color="black" />
            <Text style={styles.categoriesTitle}>Categories</Text>
          </TouchableOpacity>
  
          <View style={styles.pickerRow}>

            <TouchableOpacity style={styles.refreshContainer}>
            <MaterialCommunityIcons name="refresh" size={16} color="black" />
            <Text style={styles.refreshBtnText}>Refresh</Text>
            </TouchableOpacity>
              


            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={contentType}
                onValueChange={setContentType}
                style={styles.picker}
              >
                <Picker.Item label="Popular" value="Popular" />
                <Picker.Item label="Top" value="Top" />
                <Picker.Item label="Rising" value="Rising" />
              </Picker>
            </View>
  
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={contentTime}
                onValueChange={setContentTime}
                style={styles.picker}
                
              >
                <Picker.Item label="Recent" value="Recent" />
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Last 7 Days" value="Last 7 Days" />
                <Picker.Item label="Last 30 Days" value="Last 30 Days" />
                <Picker.Item label="Last 90 Days" value="Last 90 Days" />
                <Picker.Item label="Last Year" value="Last Year" />
                <Picker.Item label="All Time" value="All Time" />
              </Picker>
            </View>
          </View>
        </View>
  
        {/* Overlay menu */}
        {showCategories && (
          <View style={styles.menuOverlay}>
            <View style={styles.menu}>
              {categories.map((group, index) => (
                <View key={index} style={styles.categoryGroup}>
                  <Text style={styles.subtitle}>{group.subtitle}</Text>
                  {group.items.map((item, idx) => (
                    <TouchableOpacity key={idx} style={styles.categoryItem}>
                      <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}
  
        <Feed />
      </View>
    );
  }

export default Index;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
      gap: 12,
      zIndex: 2,
    },
    refreshContainer: {
   
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      
    },

    refreshBtnText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#333',
    },
  
    catBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
  
    categoriesTitle: {
      fontSize: 13,
      fontWeight: '500',
    },
  
    pickerRow: {
      flexDirection: 'row',
      gap: 8,
      marginLeft: 'auto',
    },
  
    pickerWrapper: {
      width: 150,
    },
  
    picker: {
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      paddingVertical: 6,
      paddingHorizontal: 10,
      fontSize: 13,
      fontWeight: '500',
      color: '#333',
   
    },
  
    // Overlay container for categories menu
    menuOverlay: {
      position: 'absolute',
      top: 60,
      left: 16,
      right: 16,
      zIndex: 10,
    },
  
    menu: {
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  
    categoryGroup: {
      marginBottom: 12,
    },
  
    subtitle: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 4,
      color: '#444',
    },
  
    categoryItem: {
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
  
    categoryText: {
      fontSize: 13,
      color: '#333',
    },
  });