import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { thoughts } from '../../data';
import { useSession } from '../../auth/session';

function randomIndex(size: number) {
  return Math.floor(Math.random() * size)
}
export default function Home() {
  const router = useRouter()
  const { signOut } = useSession()
  const randomThoughtId = thoughts[randomIndex(thoughts.length)].id

  function onPressRandomThoughtHandler() {
    router.push(`/thoughts/${randomThoughtId}`)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Thoughts</Text>
      <Text style={styles.description}>
        A place to post short, spontaneous thoughts whenever inspiration strikes.
      </Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={onPressRandomThoughtHandler}>
        <Text style={styles.buttonText}>Random Thought</Text>
      </Pressable>
      <Pressable accessibilityRole="button" style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,

  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});