import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImagesFromStorage();
  }, []);

  const loadImagesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@stored_images');
      if (jsonValue != null) {
        setImages(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load images.', e);
    }
  };

  const saveImagesToStorage = async (newImages) => {
    try {
      const jsonValue = JSON.stringify(newImages);
      await AsyncStorage.setItem('@stored_images', jsonValue);
    } catch (e) {
      console.error('Failed to save images.', e);
    }
  };


  const pickImage = async () => {  
    const permissonResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permissonResult);
    if (!permissonResult.granted) {
      alert("No access");
      return;
    }


 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
    console.log(result.toString());
    saveImagesToStorage(images);
  };

  const deleteImage = async (id) =>{
    setImages(images.filter(item => item !== id))
    try {
      const jsonValue = JSON.stringify(images);
      await AsyncStorage.setItem('@stored_images', jsonValue);
    } catch (e) {
      console.error('Failed to save images.', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Picker App</Text>
      <Button title="Pick Images" onPress={pickImage} />
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((uri, index) => (
          <View 
            key={index}>
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
            
          />
          <Button title="delete" onPress={() => {deleteImage(uri)}}/>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});