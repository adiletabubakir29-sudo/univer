
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import BrandLogo from "../components/BrandLogo";
import SectionTitle from "../components/SectionTitle";
import StatCard from "../components/StatCard";
import ActionRow from "../components/ActionRow";
import { COLORS } from "../constants/colors";
import { student, projects } from "../data/mockData";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <Screen style={styles.content}>
      <View style={styles.header}>
        <BrandLogo />
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color={COLORS.primary} />
        </View>
      </View>

      <Text style={styles.welcome}>ҚОШ КЕЛДІҢІЗ!</Text>
      <Text style={styles.heading}>
        Сәлем, {student.fullName.split(" ")[0]}! 👋
      </Text>
      <Text style={styles.description}>
        Сіздің академиялық жетістіктеріңіз бен жеке портфолиоңыз бір жерде.
      </Text>

      <LinearGradient
        colors={["#102D50", "#24649B"]}
        style={styles.hero}
      >
        <Text style={styles.heroLabel}>АКАДЕМИЯЛЫҚ ҮЛГЕРІМ</Text>

        <View style={styles.heroRow}>
          <View>
            <Text style={styles.gpa}>{student.gpa.toFixed(2)}</Text>
            <Text style={styles.heroCaption}>GPA көрсеткіші</Text>
          </View>

          <Ionicons name="school" size={49} color="#FFFFFF" />
        </View>

        <View style={styles.heroDivider} />
        <Text style={styles.heroCaption}>2026–2027 оқу жылы</Text>
      </LinearGradient>

      <SectionTitle
        title="Менің көрсеткіштерім"
        subtitle="Портфолио статистикасы"
      />

      <View style={styles.stats}>
        <StatCard title="Пәндер" value="8" icon="book" />
        <StatCard
          title="Жобалар"
          value={String(projects.length)}
          icon="folder-open"
          color="#19A67A"
        />
        <StatCard
          title="Жетістіктер"
          value="3"
          icon="trophy"
          color="#D69A32"
        />
        <StatCard
          title="Сертификаттар"
          value="2"
          icon="ribbon"
          color="#8055C7"
        />
      </View>

      <SectionTitle title="Академиялық бөлімдер" />

      <ActionRow
        title="Оқу үлгерімі"
        icon="school-outline"
        onPress={() => navigation.navigate("Education")}
      />

      <ActionRow
        title="Менің пәндерім"
        icon="book-outline"
        onPress={() => navigation.navigate("Courses")}
      />

      <ActionRow
        title="Жетістіктерім"
        icon="trophy-outline"
        onPress={() => navigation.navigate("Achievements")}
      />

      <ActionRow
        title="Сертификаттар"
        icon="ribbon-outline"
        onPress={() => navigation.navigate("Certificates")}
      />

      <ActionRow
        title="Сабақ кестесі"
        icon="calendar-outline"
        onPress={() => navigation.navigate("Schedule")}
      />

      <ActionRow
        title="Тапсырмалар"
        icon="clipboard-outline"
        onPress={() => navigation.navigate("Assignments")}
      />

      <ActionRow
        title="Статистика"
        icon="stats-chart-outline"
        onPress={() => navigation.navigate("Statistics")}
      />

      <SectionTitle
        title="Қосымша мүмкіндіктер"
        subtitle="Пайдалы сервистер"
      />

      <ActionRow
        title="Алматы ауа райы"
        icon="partly-sunny-outline"
        onPress={() => navigation.navigate("Weather")}
      />

      <Text style={styles.footer}>Білім. Даму. Болашақ.</Text>
      <Text style={styles.copyright}>Student Portfolio • 2026</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#E4EDF7",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  heading: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 8,
  },
  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },
  hero: {
    padding: 22,
    borderRadius: 23,
  },
  heroLabel: {
    color: "#B8D3EF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gpa: {
    color: "#FFFFFF",
    fontSize: 43,
    fontWeight: "900",
  },
  heroCaption: {
    color: "#D4E3F1",
    fontSize: 12,
  },
  heroDivider: {
    height: 1,
    backgroundColor: "#FFFFFF35",
    marginVertical: 16,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  footer: {
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "900",
    marginTop: 28,
    letterSpacing: 1,
  },
  copyright: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 7,
  },
});
