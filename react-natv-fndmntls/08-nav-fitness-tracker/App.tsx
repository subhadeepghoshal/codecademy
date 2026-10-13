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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();
const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const WorkoutsStackNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{ title: "Workouts" }}
      />
      <WorkoutStack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: "Workout Details" }}
      />
    </WorkoutStack.Navigator>
  );
};

const ProgressStackNavigator = () => {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: "Progress" }}
      />
      <ProgressStack.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ title: "Goals" }}
      />
    </ProgressStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </ProfileStack.Navigator>
  );
};

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="WorkoutsTab"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF6B35",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="WorkoutsTab"
          component={WorkoutsStackNavigator}
          options={{ tabBarLabel: "Workouts" }}
        />
        <Tab.Screen
          name="ProgressTab"
          component={ProgressStackNavigator}
          options={{ tabBarLabel: "Progress" }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{ tabBarLabel: "Profile" }}
        />
      </Tab.Navigator>
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
