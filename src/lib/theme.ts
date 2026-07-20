export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "avx-theme";

export function getSystemTheme(): Theme {
  // Prefer a bright default — OS dark mode made the site feel blackish.
  return "light";
}

export function resolveTheme(stored: string | null): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
