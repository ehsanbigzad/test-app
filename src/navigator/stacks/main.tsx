import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/home';
import MemoScreen from 'screens/memo';
import PhotoScreen from 'screens/photo';
import CalculatorScreen from 'screens/calculator';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Photo" component={PhotoScreen} />
      <Tab.Screen name="Memo" component={MemoScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
}
