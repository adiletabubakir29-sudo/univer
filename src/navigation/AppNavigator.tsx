
import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Негізгі экрандар
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Академиялық экрандар
import EducationScreen from "../screens/EducationScreen";
import CoursesScreen from "../screens/CoursesScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import CertificatesScreen from "../screens/CertificatesScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import AssignmentsScreen from "../screens/AssignmentsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CVScreen from "../screens/CVScreen";
import StudentIDScreen from "../screens/StudentIDScreen";

// Ауа райы
import WeatherScreen from "../screens/WeatherScreen";

import { COLORS } from "../constants/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName = "home-outline";

        if (route.name === "Басты бет") {
          iconName = "home-outline";
        } else if (route.name === "Профиль") {
          iconName = "person-outline";
        } else if (route.name === "Жобалар") {
          iconName = "folder-outline";
        } else if (route.name === "Баптаулар") {
          iconName = "settings-outline";
        }

        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#929EAD",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "700",
            marginBottom: 5,
          },
          tabBarStyle: {
            height: 68,
            paddingTop: 8,
            paddingBottom: 7,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E8EDF3",
            elevation: 10,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIcon : undefined}>
              <Ionicons
                name={iconName as any}
                size={size + 2}
                color={color}
              />
            </View>
          ),
        };
      }}
    >
      <Tab.Screen
        name="Басты бет"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
      />

      <Tab.Screen
        name="Жобалар"
        component={ProjectsScreen}
      />

      <Tab.Screen
        name="Баптаулар"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={{ title: "Оқу үлгерімі" }}
      />

      <Stack.Screen
        name="Courses"
        component={CoursesScreen}
        options={{ title: "Менің пәндерім" }}
      />

      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{ title: "Жетістіктерім" }}
      />

      <Stack.Screen
        name="Certificates"
        component={CertificatesScreen}
        options={{ title: "Сертификаттар" }}
      />

      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: "Сабақ кестесі" }}
      />

      <Stack.Screen
        name="Assignments"
        component={AssignmentsScreen}
        options={{ title: "Тапсырмалар" }}
      />

      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "Статистика" }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Хабарламалар" }}
      />

      <Stack.Screen
        name="CV"
        component={CVScreen}
        options={{ title: "Менің түйіндемем" }}
      />

      <Stack.Screen
        name="StudentID"
        component={StudentIDScreen}
        options={{ title: "Студенттік билет" }}
      />

      <Stack.Screen
        name="Weather"
        component={WeatherScreen}
        options={{ title: "Алматы ауа райы" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: "#EAF2FA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
