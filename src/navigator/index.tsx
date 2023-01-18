import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import theme from 'styles/theme';
import MainStack from './stacks/main';
import AuthStack from './stacks/auth';
import TestScreen from 'screens/test';
import Loading from 'components/loading';
import useAuthUser from 'hooks/auth-user';
import type {RootStackParamList} from 'types/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  onReady: () => void;
}

export default function RootNavigator({onReady}: RootNavigatorProps) {
  const {user, initializing} = useAuthUser();

  if (initializing) {
    return <Loading />;
  }

  return (
    <NavigationContainer onReady={onReady} theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
