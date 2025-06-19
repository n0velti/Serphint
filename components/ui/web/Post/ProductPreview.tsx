import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');
const ProductPreview = () => {
  return (
    <View style={styles.container}>
    

      <View style={styles.infoSection}>

      <Text style={styles.stockStatus}>In Stock</Text>

        <Text style={styles.shippingText}>
          Free Delivery Friday June 25, 2025 to
          <Text style={{ fontWeight: 'bold' }}> 123 Main St, Springfield.</Text>
          Order within 9hrs and 51mins
        </Text>


       <View style={styles.priceLayout}>
        <Text style={styles.dollarSign}>$</Text>
        <Text style={styles.dollarFigure}>134</Text>
        <Text style={styles.centFigure}>99</Text>
        {/* <Text style={styles.perMonth}>/ Month</Text> */}
        <View style={styles.occurenceLayout}>
        <Text style={styles.perMonth}>/ Month</Text>
       </View>
       </View>
    
      </View>

    

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
  
      </View>
    </View>
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height-40,
    width: 300,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 12,

    marginRight: 20,
  },

  infoSection: {
    paddingHorizontal: 16,
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

  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
  },
  priceLayout: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start', // Align children to the top
  },
  dollarSign: {
    marginTop: 6, // Adjust this value to align with the dollar figure
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dollarFigure: {
    marginLeft: 1, // Adjust this value to align with the dollar sign
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  centFigure: {
    marginTop: 6, // Adjust this value to align with the dollar figure

    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 2,
  },
  perMonth: {
    fontSize: 14,
    color: '#777',
    marginLeft: 4,
  },
  occurenceLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 16, // Adjust this value to align with the dollar figure
  },
  moreInfo: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  shippingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});