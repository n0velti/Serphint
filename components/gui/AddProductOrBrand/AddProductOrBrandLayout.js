import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import AddProduct from './AddProduct/AddProduct';
import AddBrand from './AddBrand/AddBrand';

import PageThreeProduct from './AddProduct/PageThree';
import PageThreeBrand from './AddBrand/PageThree';

import PageTwoProduct from './AddProduct/PageTwo';
import PageTwoBrand from './AddBrand/PageTwo';
import PageTwoRevised from './AddProduct/PageTwoRevised';


function AddProductOrBrandLayout(props) {

    const [modalState, setModalState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleStateChange = (state) => {
        setModalState(state);
        props.onLayoutChange(state);
    };

    return (
        
        <View style={styles.container}>
            {modalState == null &&
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addProductButton} 
                    onPress={() => handleStateChange("addProduct")}
                >
                    <Text style={styles.addProductButtonText}>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addProductButton} 
                    onPress={() => handleStateChange("addBrand")}
                >
                    <Text style={styles.addProductButtonText}>Add Brand</Text>
                </TouchableOpacity>
            </View>
            }

            {modalState == "addProduct" &&
            <View>
                {currentPage == 1 && <AddProduct currentPage={currentPage} setCurrentPage={setCurrentPage}/> }
                {currentPage == 2 && <PageTwoRevised currentPage={currentPage} setCurrentPage={setCurrentPage}/> }

                {currentPage == 3 && <PageTwoProduct currentPage={currentPage} setCurrentPage={setCurrentPage}/> }
                {currentPage == 4 && <PageThreeProduct currentPage={currentPage} setCurrentPage={setCurrentPage}/> }
            </View>
            }

            {modalState == "addBrand" &&
            <View>

                {currentPage == 1 && <AddBrand currentPage={currentPage} setCurrentPage={setCurrentPage}/> }
                {currentPage == 2 && <PageTwoBrand currentPage={currentPage} setCurrentPage={setCurrentPage}/> }
                {currentPage == 3 && <PageThreeBrand currentPage={currentPage} setCurrentPage={setCurrentPage} handleStateChange={handleStateChange} />}

            </View>
            }

        </View>
     
    );
}

export default AddProductOrBrandLayout;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
     
      
 
    
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 10,
    },
    addProductButton: {
        backgroundColor: '#ea1418',
        padding: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    addProductButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});