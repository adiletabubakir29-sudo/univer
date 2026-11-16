import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
  };
};

const light = {
  background: "#F4F7FB",
  surface: "#FFFFFF",
  text: "#172B43",
  muted: "#7B899A",
  border: "#E6ECF2",
  primary: "#102D50",
};

const darkColors = {
  background: "#0B1422",
  surface: "#152338",
  text: "#F0F5FC",
  muted: "#A0AEC0",
  border: "#263950",
  primary: "#80B9F0",
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleTheme: () => {},
  colors: light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alt_dark_mode").then(value => {
      setDark(value === "true");
    });
  }, []);

  const toggleTheme = async () => {
    const next = !dark;
    setDark(next);
    await AsyncStorage.setItem("alt_dark_mode", String(next));
  };

  return (
    <ThemeContext.Provider value={{
      dark,
      toggleTheme,
      colors: dark ? darkColors : light,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
