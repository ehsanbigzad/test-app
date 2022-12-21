import React, {type ComponentType} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Camera,
  IconProps,
  Calculator,
  Stickynote,
  DirectNotification,
} from 'iconsax-react-native';

import {colors, font} from 'styles';
import {mScale} from 'styles/mixins';

import HomeScreen from 'screens/home';
import MemoScreen from 'screens/memo';
import PhotoScreen from 'screens/photo';
import CalculatorScreen from 'screens/calculator';
import type {MainStackParamList} from 'types/screens';

const Tab = createBottomTabNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: font.xs,
          fontWeight: '500',
        },
        tabBarInactiveTintColor: colors.primary.t40,
        tabBarActiveTintColor: colors.primary.default,
        tabBarStyle: {
          elevation: 0,
          height: mScale(60),
          paddingTop: mScale(5),
          paddingBottom: mScale(5),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: props => getIcon(props, DirectNotification),
        }}
      />
      <Tab.Screen
        name="Photo"
        component={PhotoScreen}
        options={{
          tabBarIcon: props => getIcon(props, Camera),
        }}
      />
      <Tab.Screen
        name="Memo"
        component={MemoScreen}
        options={{
          tabBarIcon: props => getIcon(props, Stickynote),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: props => getIcon(props, Calculator),
        }}
      />
    </Tab.Navigator>
  );
}

type TabBarProps = {
  size: number;
  color: string;
  focused: boolean;
};

function getIcon(props: TabBarProps, Icon: ComponentType<IconProps>) {
  const {focused} = props;

  return (
    <Icon
      size={mScale(27.5)}
      color={focused ? colors.primary.default : colors.primary.t30}
    />
  );
}
