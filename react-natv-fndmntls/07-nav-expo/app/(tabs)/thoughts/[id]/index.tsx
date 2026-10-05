import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { thoughts } from '../../../../data';
import { useLocalSearchParams } from 'expo-router';

export default function Thought() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const thought = thoughts.find(t => t.id === id)

  if(!thought) {
    return (
      <View>
        <Text>No thought!</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.fullText}>{thought.text}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fullText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
  },
})
