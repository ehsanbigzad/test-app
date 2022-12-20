import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainStack from './stacks/main';
import AuthStack from './stacks/auth';

const Stack = createNativeStackNavigator();

interface RootNavigatorProps {
  onReady: () => void;
}

export default function RootNavigator({onReady}: RootNavigatorProps) {
  const isAuth = true;

  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuth ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
