import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

type Thought = {
  id: string;
  text: string;
};

const sampleThoughts: Thought[] = [
  { id: '1', text: 'Today I learned about React Native hooks and how they simplify state management.' },
  { id: '2', text: 'Just had the best coffee ever at the new café downtown!' },
  { id: '3', text: 'Thinking about starting a mini-project on TypeScript and mobile apps.' },
];

export default function Thoughts() {
  const navigation = useNavigation()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sampleThoughts.map(({ id, text }) => {
        const preview = text.split(' ').slice(0, 5).join(' ') + '...';
        return (
          <View key={id} style={styles.thoughtBlock}>
            <Text style={styles.thoughtPreview}>{preview}</Text>
          </View>
        );
      })}
      <Pressable accessibilityRole="button" style={styles.button} onPress={()=>navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  thoughtBlock: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  thoughtPreview: {
    fontSize: 16,
    color: '#333',
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
    alignSelf: "center"
  },
});
