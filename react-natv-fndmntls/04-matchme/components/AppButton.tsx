import React from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { globalStyles } from "../theme";

export interface AppButton extends Omit<PressableProps, "children"> {
  label: string
}
export function AppButton({ label, ...rest }: AppButton) {
  return (
    // Task 6: Improve the accessibility of this Pressable element
    <Pressable
      style={({ pressed }) => [globalStyles.button, rest.disabled && globalStyles.disabled, { width: "100%" }, pressed && globalStyles.pressed]}
      {...rest}
    >
      <Text style={globalStyles.buttonText}>{label}</Text>
    </Pressable>
  )
}