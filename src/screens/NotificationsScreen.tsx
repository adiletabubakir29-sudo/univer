import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useAppTheme } from "../utils/ThemeContext";

const initial = [
  { id: "1", title: "Портфолиоңызды толықтырыңыз", body: "Жобаларыңызға жаңа жұмыстар қосыңыз.", time: "Бүгін", read: false, icon: "folder" },
  { id: "2", title: "Жаңа оқу кезеңі", body: "Академиялық көрсеткіштеріңізді тексеріңіз.", time: "Кеше", read: false, icon: "school" },
  { id: "3", title: "Жетістікке жетіңіз!", body: "Жаңа сертификаттарыңызды портфолиоға енгізіңіз.", time: "12 қараша", read: true, icon: "trophy" },
];

export default function NotificationsScreen() {
  const { colors } = useAppTheme();
  const [data, setData] = useState(initial);

  function markRead(id: string) {
    setData(old => old.map(x => x.id === id ? { ...x, read: true } : x));
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Хабарландырулар</Text>
      <Text style={{ color: colors.muted, marginTop: 5, marginBottom: 20 }}>
        {data.filter(x => !x.read).length} оқылмаған хабарлама
      </Text>

      <FlatList
        data={data}
        keyExtractor={x => x.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => markRead(item.id)}
            style={[styles.card, {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: item.read ? 0.75 : 1
            }]}>
            <View style={styles.icon}>
              <Ionicons name={item.icon as any} size={22} color="#174F85" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.body, { color: colors.muted }]}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {!item.read ? <View style={styles.dot} /> : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 26, fontWeight: "900" },
  card: { padding: 16, borderRadius: 18, borderWidth: 1, marginBottom: 12, flexDirection: "row", gap: 13 },
  icon: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#EAF2FA", alignItems: "center", justifyContent: "center" },
  title: { fontWeight: "800", fontSize: 13 },
  body: { fontSize: 12, lineHeight: 19, marginTop: 5 },
  time: { color: "#174F85", fontSize: 10, marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 5, backgroundColor: "#19A67A" },
});
