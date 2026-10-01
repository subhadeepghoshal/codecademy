import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { NativeStackParamList } from '../App';
import { thoughts } from '../data';

type ThoughtsProps = NativeStackNavigationProp<NativeStackParamList, 'Thoughts'>;

export default function Thoughts() {
  const navigation = useNavigation<ThoughtsProps>()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {thoughts.map(({ id, text }) => {
        const preview = text.split(' ').slice(0, 5).join(' ') + '...';
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={preview}
            key={id}
            style={styles.thoughtBlock}
            onPress={() => navigation.navigate('Thought', { id })}
          >
            <Text style={styles.thoughtPreview}>{preview}</Text>
          </Pressable>
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
