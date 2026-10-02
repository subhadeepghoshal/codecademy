import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Thoughts from "./Thoughts"
import Thought from "./Thought"

export type StackParamList = {
  Thoughts: undefined,
  Thought: {
    id: string
  }
}

const Stack = createNativeStackNavigator<StackParamList>()

export function ThoughtsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Thoughts">
      <Stack.Screen name="Thoughts" component={Thoughts} options={{ headerShown: false}}/>
      <Stack.Screen name="Thought" component={Thought}  options={{ title: "Thought" }}/>
    </Stack.Navigator>
  )
}
