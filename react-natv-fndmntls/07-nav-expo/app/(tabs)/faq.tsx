import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function FAQ() {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Frequently Asked Questions</Text>

      <View style={styles.qaBlock}>
        <Text style={styles.question}>How many thoughts can I have?</Text>
        <Text style={styles.answer}>
          As many as you like! There’s no hard limit—share every burst of inspiration.
        </Text>
      </View>

      <View style={styles.qaBlock}>
        <Text style={styles.question}>How long can a thought be?</Text>
        <Text style={styles.answer}>
          Keep it short and sweet—think micro‑blog style. We recommend staying under 300 characters.
        </Text>
      </View>

      <View style={styles.qaBlock}>
        <Text style={styles.question}>Can I edit a thought after posting it?</Text>
        <Text style={styles.answer}>
          Right now, no. Quick Thoughts is meant to capture ideas in the moment — no editing, just posting.
        </Text>
      </View>
      

      <Link href="/thoughts" asChild>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>View Thoughts</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  qaBlock: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  answer: {
    fontSize: 15,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
