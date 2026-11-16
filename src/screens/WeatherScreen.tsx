
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

type WeatherData = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  is_day: number;
};

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.2389&longitude=76.8897&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=Asia%2FAlmaty";

function getWeatherInfo(code: number, isDay: number) {
  if (code === 0) {
    return { title: "Ашық аспан", icon: isDay ? "☀️" : "🌙" };
  }
  if ([1, 2].includes(code)) {
    return { title: "Ала бұлтты", icon: isDay ? "🌤️" : "☁️" };
  }
  if (code === 3) {
    return { title: "Бұлтты", icon: "☁️" };
  }
  if ([45, 48].includes(code)) {
    return { title: "Тұман", icon: "🌫️" };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { title: "Сіркіреме жаңбыр", icon: "🌦️" };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { title: "Жаңбыр", icon: "🌧️" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { title: "Қар жауып тұр", icon: "❄️" };
  }
  if ([95, 96, 99].includes(code)) {
    return { title: "Найзағай", icon: "⛈️" };
  }
  return { title: "Ауа райы", icon: "🌤️" };
}

export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(WEATHER_URL);

      if (!response.ok) {
        throw new Error("Ауа райы деректерін алу мүмкін болмады.");
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error("Ауа райы деректері табылмады.");
      }

      setWeather(data.current);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Интернет байланысын тексеріңіз."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  const info = weather
    ? getWeatherInfo(weather.weather_code, weather.is_day)
    : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#4B91CC"
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.label}>ALT UNIVERSITY</Text>
        <Text style={styles.heading}>Ауа райы</Text>
        <Text style={styles.subtitle}>
          Қаладағы қазіргі ауа райы
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4B91CC" />
          <Text style={styles.loadingText}>
            Ауа райы жүктелуде...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Деректер жүктелмеді</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retry} onPress={fetchWeather}>
            Қайта жүктеу
          </Text>
        </View>
      ) : weather && info ? (
        <>
          <View style={styles.weatherCard}>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <View>
                <Text style={styles.city}>Алматы</Text>
                <Text style={styles.country}>Қазақстан</Text>
              </View>
            </View>

            <Text style={styles.weatherIcon}>{info.icon}</Text>
            <Text style={styles.temperature}>
              {Math.round(weather.temperature_2m)}°
            </Text>
            <Text style={styles.condition}>{info.title}</Text>
            <Text style={styles.feelsLike}>
              Сезіледі: {Math.round(weather.apparent_temperature)}°
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Ауа райы көрсеткіштері</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💧</Text>
              <Text style={styles.statValue}>
                {weather.relative_humidity_2m}%
              </Text>
              <Text style={styles.statLabel}>Ылғалдылық</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💨</Text>
              <Text style={styles.statValue}>
                {weather.wind_speed_10m} км/сағ
              </Text>
              <Text style={styles.statLabel}>Жел жылдамдығы</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Дереккөз: Open-Meteo
            </Text>
            <Text style={styles.footerText}>
              Жаңарту үшін экранды төмен қарай тартыңыз
            </Text>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  label: {
    color: "#4B91CC",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },
  heading: {
    color: "#14243A",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#7C8A9B",
    fontSize: 14,
    marginTop: 5,
  },
  center: {
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#718096",
    marginTop: 14,
  },
  weatherCard: {
    backgroundColor: "#173B63",
    borderRadius: 26,
    padding: 25,
    alignItems: "center",
    shadowColor: "#173B63",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 7,
  },
  locationRow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 22,
    marginRight: 9,
  },
  city: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  country: {
    color: "#B9CDE2",
    fontSize: 12,
    marginTop: 2,
  },
  weatherIcon: {
    fontSize: 75,
    marginTop: 20,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 76,
    fontWeight: "300",
    marginTop: 2,
  },
  condition: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },
  feelsLike: {
    color: "#C3D4E5",
    fontSize: 13,
    marginTop: 9,
  },
  sectionTitle: {
    color: "#14243A",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    minHeight: 135,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    fontSize: 25,
    marginBottom: 10,
  },
  statValue: {
    color: "#173B63",
    fontSize: 19,
    fontWeight: "800",
  },
  statLabel: {
    color: "#8491A1",
    fontSize: 12,
    marginTop: 5,
  },
  errorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    marginTop: 20,
  },
  errorTitle: {
    color: "#D14343",
    fontWeight: "800",
    fontSize: 17,
  },
  errorText: {
    color: "#718096",
    marginTop: 8,
  },
  retry: {
    color: "#4B91CC",
    fontWeight: "700",
    marginTop: 18,
  },
  footer: {
    alignItems: "center",
    marginTop: 25,
    gap: 6,
  },
  footerText: {
    color: "#98A4B3",
    fontSize: 11,
    textAlign: "center",
  },
});
