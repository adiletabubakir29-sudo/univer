import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "alt_student_user";

export async function saveUser(user: object) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
