/* ===== i18n.js — shared, uses global APP_LANGS dict defined per app ===== */
(function () {
  const dirMap = { ar: "rtl", fr: "ltr", en: "ltr" };

  function apply(lang) {
    const dict = (window.APP_LANGS && APP_LANGS[lang]) || (window.APP_LANGS && APP_LANGS.ar) || {};
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dirMap[lang] || "rtl";
    if (dict.meta && dict.meta.title) document.title = dict.meta.title;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const parts = key.split(".");
      let v = dict;
      for (const p of parts) v = v && v[p];
      if (v === undefined) return;
      if (Array.isArray(v)) el.innerHTML = v.map((li) => "<li>" + li + "</li>").join("");
      else el.innerHTML = v;
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      const parts = key.split(".");
      let v = dict;
      for (const p of parts) v = v && v[p];
      if (v !== undefined) el.placeholder = v;
    });

    document.querySelectorAll("option[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const parts = key.split(".");
      let v = dict;
      for (const p of parts) v = v && v[p];
      if (v !== undefined) el.textContent = v;
    });

    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    document.dispatchEvent(new CustomEvent("mg:lang", { detail: { lang } }));
  }

  function init() {
    let saved = "ar";
    try { saved = localStorage.getItem("mg-app-lang") || "ar"; } catch (e) {}
    if (!(window.APP_LANGS && APP_LANGS[saved])) saved = "ar";
    apply(saved);
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.addEventListener("click", () => {
        const l = b.getAttribute("data-lang");
        try { localStorage.setItem("mg-app-lang", l); } catch (e) {}
        apply(l);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
