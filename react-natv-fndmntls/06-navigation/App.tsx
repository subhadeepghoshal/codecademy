import React from 'react';
import Home from './components/Home';
import FAQ from './components/FAQ';
import Thoughts from './components/Thoughts';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

export type NativeStackParamList = {
  Home: undefined,
  FAQ: undefined,
  Thoughts: undefined
}

const Tab = createBottomTabNavigator<NativeStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel:'Home'}}/>
        <Tab.Screen name="FAQ" component={FAQ} options={{tabBarLabel:'Q & A'}}/>
        <Tab.Screen name="Thoughts" component={Thoughts} options={{tabBarLabel:'My Thoughts'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}