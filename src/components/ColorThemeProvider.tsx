import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "blue" | "purple";

type ColorThemeState = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  toggleColorTheme: () => void;
};

const ColorThemeContext = createContext<ColorThemeState | undefined>(undefined);

const STORAGE_KEY = "where-my-pix-color-theme";

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null;
      if (stored === "blue" || stored === "purple") return stored;
    }
    return "purple";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-color-theme", colorTheme);
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    setColorThemeState(theme);
  };

  const toggleColorTheme = () => {
    setColorTheme(colorTheme === "purple" ? "blue" : "purple");
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, toggleColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext);
  if (!ctx) throw new Error("useColorTheme must be used within ColorThemeProvider");
  return ctx;
}
