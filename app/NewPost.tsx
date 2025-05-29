import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { debounce } from 'lodash';
import {useCreatePostForm} from '@/hooks/data/useCreatePostForm';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

import { useProductOperations } from '@/hooks/data/useProductOperations';
import { usePostOperations } from '@/hooks/data/usePostOperations';

import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

type NewPostProps = {
  // You can add props for form submission or customization later
};


const NewPost: React.FC<NewPostProps> = () => {

    const { getProducts} = useProductOperations();
    const { createPost } = usePostOperations();



    const [query, setQuery] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);  
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { setField, getField, getForm } = useCreatePostForm();



     // Debounced version of the API call
     const debouncedSearch = React.useRef(
        debounce(async (text: string) => {
            try {
                

                   const products = await getProducts(text);
                   setSearchResults(products.data);
              
            } catch (error) {
                console.error('Error searching places:', error);
            }
        }, 500)
    ).current;

    useEffect(() => {
      const fetchUser = async () => {
        const user = await getCurrentUser();
        console.log("User:", user);
      }
      fetchUser();
    }, []);

    // Whenever the query changes, perform the search
    useEffect(() => {
        if (query.length > 0) {
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

      const handlePostTitleChange = (text: string) => {
        setPostTitle(text);
        setField("postTitle", text);
      }


      const handleProductPress = (product) => {
        console.log('Selected Product:', product);
        setQuery(product.productName);
        setShowSuggestions(false);
        setField("postProductName", product.productName);
        setField("postProductId", product.id);
      };

      const handleSubmitPress = async () => {
        setField("postUserId", (await getCurrentUser()).userId)
        console.log('Form Data:', getForm());
        const formData = getForm();
        const result = await createPost(formData)

        console.log('Post created successfully:', result);
      }

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

    <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#999"
            onChangeText={handlePostTitleChange}
            value={
                postTitle
            }
          />

           {/* Render search suggestions below input */}
           {showSuggestions && searchResults.length > 0 && (
                    <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => `${item.productName}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleProductPress(item)}>
                        <Text style={styles.resultItem}>{item.productName}</Text>
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
        onChangeText={(text) => setField("postContent", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
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