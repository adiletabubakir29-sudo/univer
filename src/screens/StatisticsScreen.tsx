import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Polyline, Line } from "react-native-svg";
import { COLORS } from "../constants/colors";
import { useAppTheme } from "../utils/ThemeContext";

const history = [2.8, 3.0, 3.2, 3.1, 3.45, 3.6, 3.75];

export default function StatisticsScreen() {
  const { colors } = useAppTheme();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: false,
    }).start();
  }, []);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, circumference * (1 - 3.75 / 4)],
  });

  const points = history.map((v, i) => {
    const x = 15 + i * 43;
    const y = 105 - (v - 2.5) * 45;
    return `${x},${y}`;
  }).join(" ");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Academic Analytics</Text>
      <Text style={{ color: colors.muted, marginTop: 6 }}>Академиялық көрсеткіштер</Text>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>GPA көрсеткіші</Text>
        <View style={styles.chart}>
          <Svg width="170" height="170" viewBox="0 0 170 170">
            <Circle cx="85" cy="85" r={radius} stroke="#E6ECF2" strokeWidth="12" fill="none" />
            <AnimatedCircle
              cx="85" cy="85" r={radius}
              stroke="#174F85" strokeWidth="12" fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              rotation="-90"
              origin="85, 85"
            />
          </Svg>
          <View style={styles.center}>
            <Text style={[styles.gpa, { color: colors.text }]}>3.75</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>GPA / 4.00</Text>
          </View>
        </View>
        <Text style={styles.good}>Жақсы академиялық нәтиже</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>GPA даму динамикасы</Text>
        <Svg width="100%" height="130" viewBox="0 0 285 125">
          <Line x1="10" y1="25" x2="275" y2="25" stroke="#E6ECF2" />
          <Line x1="10" y1="65" x2="275" y2="65" stroke="#E6ECF2" />
          <Line x1="10" y1="105" x2="275" y2="105" stroke="#E6ECF2" />
          <Polyline points={points} fill="none" stroke="#174F85" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        </Svg>
        <Text style={{ color: colors.muted, fontSize: 11 }}>
          Демонстрациялық семестрлік көрсеткіштер
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={[styles.smallCard, { backgroundColor: colors.surface }]}>
          <Text style={styles.number}>8</Text>
          <Text style={{ color: colors.muted }}>Пәндер</Text>
        </View>
        <View style={[styles.smallCard, { backgroundColor: colors.surface }]}>
          <Text style={styles.number}>3</Text>
          <Text style={{ color: colors.muted }}>Жобалар</Text>
        </View>
      </View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 25, fontWeight: "900" },
  card: { borderRadius: 20, padding: 19, marginTop: 18, alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "900", alignSelf: "flex-start" },
  chart: { width: 170, height: 170, marginTop: 15, justifyContent: "center", alignItems: "center" },
  center: { position: "absolute", alignItems: "center" },
  gpa: { fontSize: 31, fontWeight: "900" },
  good: { color: "#19A67A", fontWeight: "800", fontSize: 12, marginTop: 5 },
  stats: { flexDirection: "row", gap: 12, marginTop: 15 },
  smallCard: { flex: 1, padding: 19, borderRadius: 17 },
  number: { color: COLORS.secondary, fontSize: 25, fontWeight: "900" },
});
