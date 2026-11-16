import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BrandLogo from "../components/BrandLogo";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { saveUser } from "../utils/storage";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Ақпарат қажет", "Email мен құпиясөзді енгізіңіз.");
      return;
    }

    await saveUser({ email });
    navigation.replace("MainTabs");
  }

  return (
    <LinearGradient colors={["#EAF2FA", "#FFFFFF"]} style={styles.container}>
      <View style={styles.card}>
        <BrandLogo />
        <Text style={styles.title}>Қош келдіңіз!</Text>
        <Text style={styles.subtitle}>Студенттік портфолиоға кіру</Text>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="student@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.label}>ҚҰПИЯСӨЗ</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Құпиясөзді енгізіңіз"
          secureTextEntry
          style={styles.input}
        />
        <PrimaryButton title="Жүйеге кіру" onPress={login} />
        <Text style={styles.note}>Демонстрациялық авторизация</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 22 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 25, padding: 25, elevation: 5 },
  title: { color: COLORS.primary, fontSize: 28, fontWeight: "900", marginTop: 35 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 8, marginBottom: 30 },
  label: { color: COLORS.secondary, fontSize: 10, fontWeight: "900", marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 13, padding: 15, marginBottom: 8, color: COLORS.text },
  note: { color: COLORS.muted, fontSize: 10, textAlign: "center", marginTop: 18 },
});
