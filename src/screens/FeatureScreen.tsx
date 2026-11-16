import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  right?: string;
};

export default function FeatureScreen({ title, description, items = [] }: {
  title: string;
  description: string;
  items?: Item[];
}) {
  return (
    <Screen style={styles.content}>
      <Text style={styles.eyebrow}>ALT UNIVERSITY • PORTFOLIO</Text>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <SectionTitle title="Ақпарат" subtitle="Сіздің жеке мәліметтеріңіз" />
      {items.map((item) => (
        <InfoCard
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          right={item.right}
        />
      ))}
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Әзірге ақпарат жоқ</Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 21 },
  eyebrow: { color: COLORS.secondary, fontSize: 10, fontWeight: "900", letterSpacing: 1.5 },
  heading: { color: COLORS.primary, fontSize: 28, fontWeight: "900", marginTop: 12 },
  description: { color: COLORS.muted, fontSize: 13, lineHeight: 21, marginTop: 8 },
  empty: { padding: 30, alignItems: "center" },
  emptyText: { color: COLORS.muted },
});
