// src/themeUtils.js

const STORAGE_KEY = "preferred-theme";
const availableSchemes = ["light", "dark"]; // add other variants if you like

export function getPreferredTheme() {
  // 1. If user manually stored a preference, use that:
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && availableSchemes.includes(stored)) {
    return stored;
  }

  // 2. Otherwise, use the OS‐level media query.
  //    matchMedia("(prefers-color-scheme: dark)") → true if user set “dark mode” in OS.
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}

export function setPreferredTheme(theme) {
  if (!availableSchemes.includes(theme)) return;
  document.documentElement.classList.remove(...availableSchemes);
  document.documentElement.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}
