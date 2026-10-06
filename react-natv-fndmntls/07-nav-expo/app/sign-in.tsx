import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSession } from '../auth/session';

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Thoughts</Text>
      <Text style={styles.description}>Sign in to read and post your thoughts.</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Log In</Text>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
