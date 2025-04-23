import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductPreview = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        }}
        style={styles.heroImage}
      />

      <View style={styles.infoSection}>
        <Text style={styles.price}>$129.99</Text>
        <Text style={styles.subText}>/ Month</Text>
        <Text style={styles.stockStatus}>In Stock</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Consult a Doctor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoSection: {
    padding: 16,
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  stockStatus: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 10,
    fontWeight: '600',
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});