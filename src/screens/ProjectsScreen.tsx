import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, Pressable, StyleSheet,
  FlatList, Alert, Modal, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { projects as initialProjects } from "../data/mockData";
import { useAppTheme } from "../utils/ThemeContext";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
};

const KEY = "alt_portfolio_projects";

export default function ProjectsScreen() {
  const { colors } = useAppTheme();
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(saved => {
      setItems(saved ? JSON.parse(saved) : initialProjects);
    });
  }, []);

  async function persist(data: Project[]) {
    setItems(data);
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  }

  function openNew() {
    setEditing(null);
    setTitle("");
    setDescription("");
    setTechnology("");
    setModal(true);
  }

  function openEdit(item: Project) {
    setEditing(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setTechnology(item.technologies.join(", "));
    setModal(true);
  }

  async function save() {
    if (!title.trim()) {
      Alert.alert("Қате", "Жоба атауын енгізіңіз.");
      return;
    }

    const project: Project = {
      id: editing || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category: "Student Project",
      status: "Жасалуда",
      technologies: technology.split(",").map(x => x.trim()).filter(Boolean),
    };

    const next = editing
      ? items.map(x => x.id === editing ? project : x)
      : [project, ...items];

    await persist(next);
    setModal(false);
  }

  function remove(id: string) {
    const action = async () => {
      await persist(items.filter(x => x.id !== id));
    };

    if (Platform.OS === "web") {
      if (window.confirm("Бұл жобаны өшіргіңіз келе ме?")) action();
    } else {
      Alert.alert("Жобаны өшіру", "Сенімдісіз бе?", [
        { text: "Болдырмау", style: "cancel" },
        { text: "Өшіру", style: "destructive", onPress: action },
      ]);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headingRow}>
        <View>
          <Text style={[styles.heading, { color: colors.text }]}>Менің жобаларым</Text>
          <Text style={{ color: colors.muted, marginTop: 5 }}>
            {items.length} жоба портфолиода
          </Text>
        </View>
        <Pressable style={styles.addButton} onPress={openNew}>
          <Ionicons name="add" color="#FFFFFF" size={23} />
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={x => x.id}
        contentContainerStyle={{ paddingBottom: 35 }}
        renderItem={({ item }) => (
          <View style={[styles.card, {
            backgroundColor: colors.surface,
            borderColor: colors.border
          }]}>
            <View style={styles.cardTop}>
              <View style={styles.projectIcon}>
                <Ionicons name="folder-open" size={23} color={COLORS.secondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={{ color: colors.muted, fontSize: 11 }}>{item.category}</Text>
              </View>
              <Pressable onPress={() => openEdit(item)} style={styles.iconButton}>
                <Ionicons name="create-outline" size={21} color={COLORS.secondary} />
              </Pressable>
              <Pressable onPress={() => remove(item.id)} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={21} color="#E45C65" />
              </Pressable>
            </View>

            <Text style={[styles.description, { color: colors.muted }]}>
              {item.description}
            </Text>

            <View style={styles.tags}>
              {item.technologies.map((t, i) => (
                <Text key={i} style={styles.tag}>{t}</Text>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: colors.muted, marginTop: 60 }}>
            Әзірге жобалар жоқ
          </Text>
        }
      />

      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.overlay}>
          <View style={[styles.modal, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editing ? "Жобаны өңдеу" : "Жаңа жоба"}
            </Text>

            <TextInput
              placeholder="Жоба атауы"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
            <TextInput
              placeholder="Жоба сипаттамасы"
              placeholderTextColor={colors.muted}
              value={description}
              onChangeText={setDescription}
              multiline
              style={[styles.input, { color: colors.text, borderColor: colors.border, height: 90 }]}
            />
            <TextInput
              placeholder="Технологиялар: React, TypeScript"
              placeholderTextColor={colors.muted}
              value={technology}
              onChangeText={setTechnology}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />

            <Pressable style={styles.saveButton} onPress={save}>
              <Text style={styles.saveText}>Сақтау</Text>
            </Pressable>
            <Pressable onPress={() => setModal(false)} style={{ padding: 12 }}>
              <Text style={{ color: colors.muted, textAlign: "center" }}>Болдырмау</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  heading: { fontSize: 25, fontWeight: "900" },
  addButton: { backgroundColor: "#174F85", width: 46, height: 46, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  card: { padding: 17, borderRadius: 19, marginBottom: 13, borderWidth: 1 },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 9 },
  projectIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#EAF2FA", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 15, fontWeight: "900" },
  iconButton: { padding: 5 },
  description: { fontSize: 12, lineHeight: 19, marginTop: 13 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 13 },
  tag: { color: "#174F85", backgroundColor: "#EAF2FA", padding: 7, borderRadius: 8, fontSize: 10 },
  overlay: { flex: 1, backgroundColor: "#0009", justifyContent: "center", padding: 20 },
  modal: { borderRadius: 24, padding: 22 },
  modalTitle: { fontSize: 22, fontWeight: "900", marginBottom: 18 },
  input: { borderWidth: 1, borderRadius: 12, padding: 13, marginBottom: 12 },
  saveButton: { backgroundColor: "#102D50", borderRadius: 13, padding: 16, alignItems: "center" },
  saveText: { color: "#FFFFFF", fontWeight: "800" },
});
