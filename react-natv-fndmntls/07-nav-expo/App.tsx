import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import Home from "./components/Home";
import FAQ from "./components/FAQ";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StackParamList,
  ThoughtsNavigator,
} from "./components/ThoughtsNavigatior";

export type BottomTabsParamList = {
  Home: undefined;
  FAQ: undefined;
  ThoughtsNavigator: NavigatorScreenParams<StackParamList>;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="FAQ"
          component={FAQ}
          options={{ tabBarLabel: "Q & A" }}
        />
        <Tab.Screen
          name="ThoughtsNavigator"
          component={ThoughtsNavigator}
          options={{ tabBarLabel: "My Thoughts" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
