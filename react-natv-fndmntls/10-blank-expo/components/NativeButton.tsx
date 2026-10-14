import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <></>
  );
}

const styles = StyleSheet.create({
  button: {
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
