import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InputTab from "./Tab/InputTab";
import ReportTab from "./Tab/ReportTab";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Input" component={InputTab} />
      <Tab.Screen name="Report" component={ReportTab} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}