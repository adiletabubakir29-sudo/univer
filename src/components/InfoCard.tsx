import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function InfoCard({ title, subtitle, right }: {
  title: string;
  subtitle?: string;
  right?: string;
}) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <Text style={styles.right}>{right}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    marginBottom: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: { fontSize: 14, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 12, color: COLORS.muted, marginTop: 5 },
  right: { color: COLORS.secondary, fontWeight: "800", marginLeft: 10 },
});
