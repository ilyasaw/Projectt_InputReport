import React, { useState, useEffect } from 'react';
import {Text, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const ReportTab = () => {
    const [calculations, setCalculations] = useState([]);

    useEffect(() => {
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
  
        tx.executeSql('SELECT * FROM Calculations;', [], (_, { rows }) => {
          const data = rows.raw();
          setCalculations(data);
        });
      });
    }, []); // Empty dependency array to ensure useEffect runs only once
  
    return (
        <View>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
          Input History:
        </Text>
        {calculations.map((calculation) => (
          <Text key={calculation.id} style={{ color: 'black' }}>
            {calculation.value}
          </Text>
        ))}
      </View>
    );
  };

export default ReportTab;