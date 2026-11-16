import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";
import { student } from "../data/mockData";
import { COLORS } from "../constants/colors";

export default function ProfileScreen() {
  return (
    <Screen style={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}><Ionicons name="person" size={42} color={COLORS.primary} /></View>
        <Text style={styles.name}>{student.fullName}</Text>
        <Text style={styles.id}>{student.studentId}</Text>
        <Text style={styles.tag}>СТУДЕНТ</Text>
      </View>
      <SectionTitle title="Жеке ақпарат" />
      <InfoCard title="Университет" subtitle={student.university} />
      <InfoCard title="Факультет" subtitle={student.faculty} />
      <InfoCard title="Мамандық" subtitle={student.specialty} />
      <InfoCard title="Курс / Топ" subtitle={`${student.course}-курс • ${student.group}`} />
      <InfoCard title="Email" subtitle={student.email} />
      <InfoCard title="GPA" subtitle="Академиялық үлгерім" right={String(student.gpa)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20 },
  profileHeader: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 23, padding: 25, borderWidth: 1, borderColor: COLORS.border },
  avatar: { width: 90, height: 90, borderRadius: 30, backgroundColor: COLORS.lightBlue, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 22, fontWeight: "900", color: COLORS.primary, marginTop: 15 },
  id: { color: COLORS.muted, marginTop: 5 },
  tag: { color: COLORS.secondary, backgroundColor: COLORS.lightBlue, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, fontSize: 10, fontWeight: "900", marginTop: 12 },
});
