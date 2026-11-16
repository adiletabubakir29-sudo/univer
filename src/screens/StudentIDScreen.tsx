import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { student } from "../data/mockData";
import { useAppTheme } from "../utils/ThemeContext";

export default function StudentIDScreen() {
  const { colors } = useAppTheme();

  const studentData = JSON.stringify({
    university: student.university,
    studentId: student.studentId,
    name: student.fullName,
    specialty: student.specialty,
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={styles.brand}>ALT UNIVERSITY</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>DIGITAL STUDENT ID</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.fullName.split(" ").map(x => x[0]).join("")}
          </Text>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{student.fullName}</Text>
        <Text style={{ color: colors.muted, marginTop: 5 }}>{student.specialty}</Text>

        <View style={styles.qr}>
          <QRCode value={studentData} size={190} color="#102D50" backgroundColor="#FFFFFF" />
        </View>

        <Text style={[styles.id, { color: colors.text }]}>{student.studentId}</Text>
        <Text style={[styles.caption, { color: colors.muted }]}>
          Студенттің демонстрациялық цифрлық идентификаторы
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { width: "100%", maxWidth: 380, borderRadius: 25, padding: 25, alignItems: "center", elevation: 5 },
  brand: { color: "#174F85", fontWeight: "900", fontSize: 19, letterSpacing: 1.5 },
  subtitle: { fontSize: 10, letterSpacing: 2, marginTop: 5 },
  avatar: { width: 68, height: 68, borderRadius: 23, backgroundColor: "#EAF2FA", justifyContent: "center", alignItems: "center", marginTop: 24 },
  avatarText: { color: "#174F85", fontSize: 23, fontWeight: "900" },
  name: { fontSize: 20, fontWeight: "900", marginTop: 13 },
  qr: { padding: 15, backgroundColor: "#FFFFFF", borderRadius: 17, marginTop: 25 },
  id: { fontSize: 15, fontWeight: "900", letterSpacing: 2, marginTop: 18 },
  caption: { textAlign: "center", fontSize: 10, marginTop: 10 },
});
