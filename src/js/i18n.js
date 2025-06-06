const AVAILABLE_LOCALES = Object.freeze(["en", "es"]);
const cache = new Map();

const isSupported = (c) => AVAILABLE_LOCALES.includes(c);

/* 1. Best-guess user locale */
function getSavedLocale() {
  const stored = localStorage.getItem("locale");
  if (stored && isSupported(stored)) return stored;

  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return isSupported(nav) ? nav : "en";
}

/* 2. Load (and cache) translations – uses Vite’s import of JSON */
async function loadTranslations(code) {
  if (!isSupported(code)) code = "en";
  if (cache.has(code)) return cache.get(code);

  try {
    const mod = await import(`./i18n/${code}.json`);
    cache.set(code, mod.default);
    return mod.default;
  } catch (err) {
    console.error(`⚠️ i18n: failed to load ${code}.json`, err);
    return {};
  }
}

/* 3. Swap strings */
function applyTranslations(t, fallback = {}) {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    const key = el.dataset.i18n;
    const txt = t[key] ?? fallback[key] ?? key; // visible if missing
    if (el.tagName === "TITLE") document.title = txt;
    else if (el.dataset.i18nAttr) el.setAttribute(el.dataset.i18nAttr, txt);
    else el.textContent = txt;
  }

  formatDynamicValues(document.documentElement.lang);
}

/* Optional extract for date/number formatting */
function formatDynamicValues(locale) {
  const df = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateSpan = document.getElementById("current-date");
  if (dateSpan) {
    dateSpan.textContent = df.format(new Date());
  }

  const nf = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });

  const balanceSpan = document.getElementById("formatted-balance");
  if (balanceSpan) {
    balanceSpan.textContent = nf.format(12_345.67);
  }
}

/* 4. Public API */
export async function setLocale(code) {
  if (!isSupported(code)) {
    console.warn(`Unsupported locale "${code}", defaulting to "en".`);
    code = "en";
  }
  document.documentElement.lang = code;
  localStorage.setItem("locale", code);

  // 1) Always load the requested locale first
  const t = await loadTranslations(code);

  // 2) If it’s English, reuse t; otherwise load English separately
  const fallback = code === "en" ? t : await loadTranslations("en");

  applyTranslations(t, fallback);
  document.dispatchEvent(new CustomEvent("i18n:applied", { detail: code }));
}

/* 5. Helper for bootstrap */
export const getInitialLocale = getSavedLocale;
