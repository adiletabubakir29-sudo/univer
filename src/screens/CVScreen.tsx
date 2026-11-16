import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { student, projects } from "../data/mockData";
import { COLORS } from "../constants/colors";
import { useAppTheme } from "../utils/ThemeContext";

export default function CVScreen() {
  const { colors } = useAppTheme();
  const [skills, setSkills] = useState("React Native, TypeScript, JavaScript, SQL");
  const [about, setAbout] = useState("Ақпараттық технологиялар саласында дамып келе жатқан студент.");

  async function exportPDF() {
    const html = `
      <html><head><meta charset="utf-8"/>
      <style>
        body { font-family: Arial; padding: 38px; color: #172B43; }
        h1 { color: #102D50; font-size: 28px; }
        h2 { color: #174F85; border-bottom: 1px solid #ddd; padding-bottom: 7px; }
        .tag { color: #174F85; font-weight: bold; }
        .box { background: #F1F5F9; padding: 15px; border-radius: 12px; }
      </style></head><body>
        <h1>${student.fullName}</h1>
        <p class="tag">STUDENT • ALT UNIVERSITY</p>
        <div class="box">
          <p>${student.specialty} | ${student.course}-курс</p>
          <p>${student.email}</p>
          <p>GPA: ${student.gpa}</p>
        </div>
        <h2>ABOUT ME</h2><p>${about}</p>
        <h2>SKILLS</h2><p>${skills}</p>
        <h2>PROJECTS</h2>
        ${projects.map(p => `<h3>${p.title}</h3><p>${p.description}</p>`).join("")}
        <p>ALT University Student Portfolio • 2026</p>
      </body></html>
    `;

    try {
      const file = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri);
      } else {
        await Print.printAsync({ html });
      }
    } catch {
      Alert.alert("Қате", "PDF жасау кезінде мәселе пайда болды.");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Digital CV</Text>
      <Text style={{ color: colors.muted, marginTop: 7, marginBottom: 22 }}>
        Кәсіби резюме құрастырыңыз
      </Text>

      <View style={[styles.preview, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={styles.brand}>ALT UNIVERSITY</Text>
        <Text style={[styles.name, { color: colors.text }]}>{student.fullName}</Text>
        <Text style={{ color: colors.muted }}>{student.specialty}</Text>
        <View style={styles.line} />
        <Text style={styles.label}>БІЛІМІ</Text>
        <Text style={{ color: colors.text }}>{student.university} • {student.course}-курс</Text>
        <Text style={styles.label}>GPA</Text>
        <Text style={{ color: colors.text, fontWeight: "900" }}>{student.gpa}</Text>
      </View>

      <Text style={[styles.fieldLabel, { color: colors.text }]}>ӨЗІМ ТУРАЛЫ</Text>
      <TextInput value={about} onChangeText={setAbout} multiline
        style={[styles.input, { color: colors.text, borderColor: colors.border }]} />

      <Text style={[styles.fieldLabel, { color: colors.text }]}>SKILLS</Text>
      <TextInput value={skills} onChangeText={setSkills}
        style={[styles.input, { color: colors.text, borderColor: colors.border }]} />

      <Pressable onPress={exportPDF} style={styles.button}>
        <Text style={styles.buttonText}>PDF жасау және бөлісу</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 27, fontWeight: "900" },
  preview: { padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 20 },
  brand: { color: "#174F85", fontWeight: "900", letterSpacing: 2, fontSize: 11 },
  name: { fontSize: 24, fontWeight: "900", marginTop: 20 },
  line: { height: 1, backgroundColor: "#DCE4ED", marginVertical: 15 },
  label: { color: "#174F85", fontSize: 10, fontWeight: "900", marginTop: 13, marginBottom: 5 },
  fieldLabel: { fontSize: 11, fontWeight: "900", marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 13, minHeight: 48, marginBottom: 8 },
  button: { backgroundColor: "#102D50", padding: 17, borderRadius: 14, alignItems: "center", marginTop: 15 },
  buttonText: { color: "#FFFFFF", fontWeight: "900" },
});
