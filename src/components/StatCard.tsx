import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
};

export default function StatCard({ title, value, icon, color = COLORS.secondary }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "43%",
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  value: { fontSize: 26, fontWeight: "900", color: COLORS.text, marginTop: 12 },
  title: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
});
