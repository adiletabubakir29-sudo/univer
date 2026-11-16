import React from "react";
import { View, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
};

export default function Screen({ children, style, scroll = true }: Props) {
  if (!scroll) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, style]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 35 },
});
