import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";

import { SettingsScreen } from "./components/SettingsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { GoalsScreen } from "./components/GoalsScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { WorkoutDetailScreen } from "./components/WorkoutDetailScreen";
import { WorkoutsScreen } from "./components/WorkoutsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type WorkoutStackParamList = {
  Workouts: undefined;
  WorkoutDetail: { workoutName: string };
};

export type ProgressStackParamList = {
  Progress: undefined;
  Goals: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

type RootTabParamList = {
  WorkoutsTab: NavigatorScreenParams<WorkoutStackParamList>;
  ProgressTab: NavigatorScreenParams<ProgressStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ProfileTab"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF6B35",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      ></Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E5E5E7",
    paddingTop: 5,
  },
});
export default App;
