import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
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
    <View style={styles.wrapper}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  button: {
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#fff',
  },
});

export default NativeButton;
