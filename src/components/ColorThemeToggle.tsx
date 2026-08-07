import { useColorTheme, type ColorTheme } from "@/components/ColorThemeProvider";

const THEMES: { id: ColorTheme; label: string; swatch: string }[] = [
  { id: "purple", label: "Purple", swatch: "bg-gradient-to-br from-fuchsia-400 to-violet-600" },
  { id: "blue", label: "Blue", swatch: "bg-gradient-to-br from-sky-400 to-blue-600" },
];

export function ColorThemeToggle() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div className="flex items-center justify-center gap-3" role="group" aria-label="Color theme">
      {THEMES.map((t) => {
        const active = colorTheme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setColorTheme(t.id)}
            aria-label={`${t.label} theme`}
            aria-pressed={active}
            className={`h-8 w-8 rounded-full ${t.swatch} transition-transform duration-200 ${
              active
                ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-lg"
                : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
          />
        );
      })}
    </div>
  );
}
