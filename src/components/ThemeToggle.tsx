
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`rounded-full transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-r from-blue-600 to-blue-400 border-blue-500" 
          : "bg-gradient-to-r from-sky-400 to-cyan-300 border-sky-300"
      }`}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-white" />
      ) : (
        <Sun className="h-5 w-5 text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
