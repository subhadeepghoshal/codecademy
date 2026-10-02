import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { thoughts } from '../data';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from './ThoughtsNavigatior';


type ThoughtProp = RouteProp<StackParamList, "Thought">
export default function Thought() {
  const route = useRoute<ThoughtProp>()
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
