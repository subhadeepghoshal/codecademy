import { Stack } from 'expo-router';

export default function ThoughtsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/index" options={{ title: 'Thought' }} />
    </Stack>
  );
}
