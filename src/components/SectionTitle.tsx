import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 25, marginBottom: 14 },
  title: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 12, color: COLORS.muted, marginTop: 5 },
});
