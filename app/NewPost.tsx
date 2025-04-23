import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { debounce } from 'lodash';
import {useCreatePostForm} from '@/hooks/data/useCreatePostForm';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
const client = generateClient<Schema>();

type NewPostProps = {
  // You can add props for form submission or customization later
};


const NewPost: React.FC<NewPostProps> = () => {

    

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);  
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { setField, getField } = useCreatePostForm();



     // Debounced version of the API call
     const debouncedSearch = React.useRef(
        debounce(async (text: string) => {
            try {
                console.log('Text input changed:', text);


          
                    const { data: products, errors } = await client.models.Product.list({
                        filter: {
                         productName: {
                            contains: text
                          }
                        }
                      });

                

                      
                      console.log('Search results:', products);
                      console.log('Errors:', errors);
                    
                    setSearchResults(products);
                    // setSearchResults(brandsWithLogos);
                    // console.log('Search results:', brandsWithLogos);
            } catch (error) {
                console.error('Error searching places:', error);
            }
        }, 500)
    ).current;

    // Whenever the query changes, perform the search
    useEffect(() => {
        if (query.length > 0) {
            console.log('Query:', query);
            debouncedSearch(query);
        } else {
            setSearchResults([]);
        }
    }, [query]);


    const handleValueChange = (text: string) => {
        setShowSuggestions(true);
        setQuery(text);
        setField("postProductName", text);
      };


      const handleLocationPress = (product) => {
        setQuery(product);
        setShowSuggestions(false);
        setField("postProductName", product);
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Pick Product"
        placeholderTextColor="#999"
        onChangeText={handleValueChange}
        value={
            query
        }
      />

           {/* Render search suggestions below input */}
           {showSuggestions && searchResults.length > 0 && (
                    <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => `${item.postProductName}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleLocationPress(item)}>
                        <Text style={styles.resultItem}>{item.postProductName}</Text>
                        </TouchableOpacity>
                    )}
                    />
                )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your content here..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default NewPost;