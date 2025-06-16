import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <Button title="Click me" onPress={() => setCount(count + 1)} />
      </View>

      <Text style={styles.title}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Reset" color="red" onPress={() => setCount(0)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
  },
});