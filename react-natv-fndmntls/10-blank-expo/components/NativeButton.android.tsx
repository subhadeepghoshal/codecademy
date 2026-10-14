import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

type NativeButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

function NativeButton(props: NativeButtonProps) {
  const { title, onPress, style } = props;

  return (
    <View style={styles.wrapper}>
      <TouchableNativeFeedback
        accessibilityRole="button"
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          'rgba(255, 255, 255, 0.3)',
          false,
        )}
      >
        <View style={[styles.button, style]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
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
    backgroundColor: '#3F51B5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#fff',
  },
});

export default NativeButton;
