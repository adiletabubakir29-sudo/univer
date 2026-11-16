import React from "react";
import { View, Text, Switch, StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../utils/ThemeContext";
import { COLORS } from "../constants/colors";
import { clearUser } from "../utils/storage";

export default function SettingsScreen({ navigation }: any) {
  const { dark, toggleTheme, colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Баптаулар</Text>
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="moon-outline" size={23} color={COLORS.secondary} />
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <Pressable style={[styles.row, { backgroundColor: colors.surface }]}
        onPress={() => navigation.navigate("Notifications")}>
        <Ionicons name="notifications-outline" size={23} color={COLORS.secondary} />
        <Text style={[styles.label, { color: colors.text }]}>Хабарландырулар</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </Pressable>
      <Pressable style={[styles.row, { backgroundColor: colors.surface }]}
        onPress={() => navigation.navigate("CV")}>
        <Ionicons name="document-text-outline" size={23} color={COLORS.secondary} />
        <Text style={[styles.label, { color: colors.text }]}>Digital CV және PDF</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </Pressable>
      <Pressable style={[styles.row, { backgroundColor: colors.surface }]}
        onPress={() => navigation.navigate("StudentID")}>
        <Ionicons name="qr-code-outline" size={23} color={COLORS.secondary} />
        <Text style={[styles.label, { color: colors.text }]}>QR Student ID</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </Pressable>
      <Pressable style={[styles.row, { backgroundColor: colors.surface }]}
        onPress={() => Alert.alert("ALT Portfolio", "Студенттің жеке цифрлық портфолиосы.")}>
        <Ionicons name="information-circle-outline" size={23} color={COLORS.secondary} />
        <Text style={[styles.label, { color: colors.text }]}>Қосымша туралы</Text>
      </Pressable>
      <Pressable style={styles.logout} onPress={async () => {
        await clearUser();
        navigation.getParent()?.reset({ index: 0, routes: [{ name: "Login" }] });
      }}>
        <Text style={styles.logoutText}>Жүйеден шығу</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 27, fontWeight: "900", marginBottom: 22 },
  row: { padding: 17, borderRadius: 16, marginBottom: 11, flexDirection: "row", alignItems: "center", gap: 13, borderWidth: 1, borderColor: "#E6ECF2" },
  label: { flex: 1, fontSize: 13, fontWeight: "700" },
  logout: { marginTop: 20, backgroundColor: "#E45C65", padding: 16, borderRadius: 14, alignItems: "center" },
  logoutText: { color: "#FFFFFF", fontWeight: "900" },
});
