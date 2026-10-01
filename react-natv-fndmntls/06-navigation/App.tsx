import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import FAQ from "./components/FAQ";
import Thoughts from "./components/Thoughts";
import Thought from "./components/Thought";

export type NativeStackParamList = {
  Home: undefined;
  FAQ: undefined;
  Thoughts: undefined;
  Thought: { id: string };
};

const Stack = createNativeStackNavigator<NativeStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: "Home" }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerTitle: "Q & A" }}
        />
        <Stack.Screen
          name="Thoughts"
          component={Thoughts}
          options={{ headerTitle: "My Thoughts" }}
        />
        <Stack.Screen
          name="Thought"
          component={Thought}
          options={{ headerTitle: "Quick Thought" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
