// src/js/main.js
import { setLocale, getInitialLocale } from "./i18n.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Determine & apply the initial locale
  const initialLocale = getInitialLocale();
  await setLocale(initialLocale);

  // 2. Wire up any “change language” buttons
  document.querySelectorAll("button[data-locale]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const newLocale = btn.getAttribute("data-locale");
      await setLocale(newLocale);
    });
  });

  // 3. (Optional) If you have other UI initialization—e.g. setting up event
  //    listeners on forms or modals—you can do that here as well.
});
