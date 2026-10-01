import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NativeStackParamList } from '../App';
import { thoughts } from '../data';



type ThoughtProps = NativeStackScreenProps<NativeStackParamList, 'Thought'>

export default function Thought({ route }: ThoughtProps) {
  const id = route.params.id

  const thought = thoughts.find(t => t.id === id)

  if(!thought) {
    return <View>No thought!</View>
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
