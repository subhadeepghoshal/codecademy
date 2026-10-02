import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
      <Tabs.Screen name="faq" options={{ tabBarLabel: 'Q & A' }} />
      <Tabs.Screen name="thoughts" options={{ tabBarLabel: 'My Thoughts' }} />
    </Tabs>
  );
}
