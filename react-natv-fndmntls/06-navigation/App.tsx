import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import FAQ from './components/FAQ';
import Thoughts from './components/Thoughts';

export type NativeStackParamList = {
  Home: undefined,
  FAQ: undefined,
  Thoughts: undefined
}

const Stack = createNativeStackNavigator<NativeStackParamList>()



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Home"}}/>
        <Stack.Screen name="FAQ" component={FAQ} options={{ headerTitle: "Q & A"}}/>
        <Stack.Screen name="Thoughts" component={Thoughts} options={{ headerTitle: "My Thoughts"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

