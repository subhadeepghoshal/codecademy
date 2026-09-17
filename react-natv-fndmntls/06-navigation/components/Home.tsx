
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<NativeStackParamList>
export default function Home({ navigation } : HomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Thoughts</Text>
      <Text style={styles.description}>
        A place to post short, spontaneous thoughts whenever inspiration strikes.
      </Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => navigation.navigate("FAQ")}>
          <Text style={styles.buttonText}>FAQ</Text>
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
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});