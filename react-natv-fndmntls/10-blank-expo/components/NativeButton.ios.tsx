import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

type NativeButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

function NativeButton(props: NativeButtonProps) {
  const { title, onPress } = props;

  return (
    <></>
  );
}

const styles = StyleSheet.create({
  button: {
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#fff',
  },
});

export default NativeButton;
