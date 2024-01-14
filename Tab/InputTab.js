import React, { useState } from 'react';
import {TextInput, View, Button, StyleSheet,TouchableOpacity, Text} from 'react-native';
import SQLite from 'react-native-sqlite-storage';


const InputTab = () => {
    const [inputValue, setInputValue] = useState('');
    const [isEditable, setIsEditable] = useState(true);
  
    const handleButtonPress = (value) => {
      setInputValue((prevValue) => prevValue + value);
    };
  
    const handleSaveToDatabase = () => {
      const db = SQLite.openDatabase(
        {
          name: 'CalculatorDB',
          location: 'default',
        },
        () => console.log('Database opened'),
        (error) => console.log('Error opening database: ', error)
      );
  
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Calculations (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);'
        );
  
        tx.executeSql('INSERT INTO Calculations (value) VALUES (?);', [inputValue]);
      });
    };
  
    const handleClear = () => {
      setInputValue('');
    };
  
    const renderNumericButtons = () => {
      const numericRows = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0],
      ];
  
      return numericRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.button}
              onPress={() => handleButtonPress(`${num}`)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ));
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter a number"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          editable={isEditable}
          style={[styles.input, { color: 'black' }]}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          />
        {renderNumericButtons()}
        <View style={styles.row}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={handleSaveToDatabase}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={handleClear}
            >
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.additionalText, { marginTop: 20 }]}>
          Group 3 - Mobile Programing
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'gray',
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    additionalText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
  
export default InputTab;