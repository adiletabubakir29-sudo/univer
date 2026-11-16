import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function BrandLogo() {
  return (
    <View>
      <Text style={styles.logo}>ALT UNIVERSITY</Text>
      <Text style={styles.caption}>STUDENT PORTFOLIO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 1,
  },
  caption: {
    fontSize: 9,
    color: COLORS.muted,
    letterSpacing: 2,
    marginTop: 4,
  },
});
