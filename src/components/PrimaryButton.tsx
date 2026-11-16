import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function PrimaryButton({ title, onPress }: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  text: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
});
