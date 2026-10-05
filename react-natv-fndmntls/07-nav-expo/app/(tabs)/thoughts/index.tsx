import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { thoughts } from '../../../data';

export default function Thoughts() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {thoughts.map(({ id, text }) => {
        const preview = text.split(' ').slice(0, 5).join(' ') + '...';
        return (
          <Link href={`/thoughts/${id}`} key={id} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={preview}
              style={styles.thoughtBlock}
            >
              <Text style={styles.thoughtPreview}>{preview}</Text>
            </Pressable>
          </Link>
        );
      })}
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
});
