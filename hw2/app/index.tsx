import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
 
export default function () {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [filters, setFilterBankList] = useState([
    { text: "Low", id: 1 },
    { text: "Medium", id: 2 },
    { text: "High", id: 3 },
  ]);
  const [bankName, setBankName] = useState("");
  const [selectedButton, setSelectedButton] = useState(1);
 
  const onBankSelected = (value = "") => {
    setCurrentCategory(value);
  };
  console.log(todos)
  function handleToggleComplete(id = 0) {
    const newList = todos.map((item) => {
      if (item.id == id) {
        const updatedItem = {
          ...item,
          isCompleted: !item.isCompleted,
        };
 
        return updatedItem;
      }
 
      return item;
    });
    console.log(id);
    setTodos(newList);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.add}>
        <TextInput
          style={styles.input}
          placeholder="Enter Tasks"
          value={task}
          onChangeText={setTask}
        />
 
        <View style={styles.categories}>
          {filters.map((item) => (
            <TouchableOpacity
              style={
                selectedButton === item.id
                  ? styles.activeCategory
                  : styles.category
              }
              key={item.id}
              onPress={() => {
                onBankSelected(item.text);
                setSelectedButton(item.id);
              }}
            >
              <Text>{item.text || ""}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.button}>
          <Button
            title="Add"
            onPress={() => {
              if (task.trim() !== "") {
                setTodos([
                  ...todos,
                  {
                    id: Date.now().toString(),
                    text: task,
                    category: currentCategory,
                    isCompleted: false,
                  },
                ]);
                setTask("");
              }
            }}
          />
        </View>
      </View>
      <Text style={styles.title}>TASKS TO BE DONE</Text>
      <View style={styles.list}>
        {todos
          .filter(
            (t) => t.category === currentCategory && t.isCompleted === false
          )
          .map((item) => (
            <View style={styles.add1} key={item.id}>
              <TouchableOpacity
                style={[styles.item,{flex:6}]}
                onLongPress={() => {
                  setTodos(todos.filter((t) => t.id !== item.id));
                }}
              >
                <Text >{item.text}</Text>
              </TouchableOpacity>
              <View style={{flex:1}}>
              <Button 
                title="IsCompleted"
                onPress={() => {
                  console.log(item.id);
                  handleToggleComplete(item.id);
                }}
              />
              </View>
            </View>
          ))}
      </View>
      <Text style={styles.title}>DONE TASKS</Text>
      <View style={styles.list}>
        {todos
          .filter(
            (t) => t.category === currentCategory && t.isCompleted === true
          )
          .map((item) => (
            <View style={styles.add1} key={item.id}>
              <TouchableOpacity
                style={[styles.item,{flex:6}]}
                onLongPress={() => {
                  setTodos(todos.filter((t) => t.id !== item.id));
                }}
              >
                <Text>{item.text}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "#D9B99B",
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#D9B99B",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 900,
    textAlign: "center",
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff0db",
  },
  list: {
    gap: 20,
    marginTop: 10,
  },
  add: {
    padding: 50,
    backgroundColor: "#E4D5B7",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  add1:{
    padding: 50,
    backgroundColor: "#E4D5B7",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection:'row'
  },
  item: {
    padding: 10,
    backgroundColor: "#fff0db",
    borderRadius: 5,
  },
  activeCategory: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#faf0e6",
  },
  category: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff0db",
  },
  categories: {
    flex: 1,
    gap: 20,
    display: "flex",
    flexDirection: "row",
  },
});