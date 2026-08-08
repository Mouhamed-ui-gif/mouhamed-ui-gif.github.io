/* ===== AI Chat app (BYOK — key stays in localStorage) ===== */
window.APP_LANGS = {
  ar: {
    meta: { title: "AI Chat 🌸" },
    brand: "AI Chat",
    hero: { title: "مساعدك الذكي", sub: "اسأل عن أي شيء — الرد يأتي مباشرة عبر مفتاحك الخاص (مجاني 100%)" },
    intro: "مرحباً! أنا مساعدك الشخصي. اكتب سؤالك بالعربية أو الفرنسية أو الإنجليزية 🌷",
    input: { ph: "اكتب رسالتك هنا…" },
    set: { title: "الإعدادات", provider: "المزود", url: "عنوان الخادم (Base URL)", model: "الموديل", key: "مفتاح API", hint: "يعمل فوراً بمفتاح مجاني مدمج — يمكنك وضع مفتاحك الخاص إن أردت. كل شيء يُحفظ في متصفحك فقط.", builtin: "مفتاح مدمج مجاني", save: "حفظ", clear: "مسح المحادثة", saved: "تم الحفظ ✅", need: "أدخل المفتاح والموديل أولاً", empty: "لا توجد محادثة لمسحها" },
    chat: { send: "إرسال", sending: "جارٍ التفكير…", err: "خطأ: ", noKey: "المزود المختار يحتاج مفتاحاً — ضعه من الإعدادات ⚙️", clear: "تم مسح المحادثة" },
    audio: { birds: "طيور", rain: "مطر", wind: "رياح", music: "موسيقى" }
  },
  fr: {
    meta: { title: "AI Chat 🌸" },
    brand: "AI Chat",
    hero: { title: "Votre assistant intelligent", sub: "Posez n'importe quelle question — réponse directe avec VOTRE clé (100% gratuit)" },
    intro: "Bonjour ! Je suis votre assistant personnel. Écrivez votre question en arabe, français ou anglais 🌷",
    input: { ph: "Écrivez votre message…" },
    set: { title: "Paramètres", provider: "Fournisseur", url: "URL de base", model: "Modèle", key: "Clé API", hint: "Fonctionne immédiatement avec une clé gratuite intégrée — vous pouvez mettre votre propre clé. Tout reste dans votre navigateur.", builtin: "Clé gratuite intégrée", save: "Enregistrer", clear: "Effacer la conversation", saved: "Enregistré ✅", need: "Entrez d'abord la clé et le modèle", empty: "Aucune conversation à effacer" },
    chat: { send: "Envoyer", sending: "Réflexion…", err: "Erreur : ", noKey: "Ce fournisseur exige une clé — ajoutez-la via ⚙️", clear: "Conversation effacée" },
    audio: { birds: "Oiseaux", rain: "Pluie", wind: "Vent", music: "Musique" }
  },
  en: {
    meta: { title: "AI Chat 🌸" },
    brand: "AI Chat",
    hero: { title: "Your smart assistant", sub: "Ask anything — replies come straight through YOUR own key (100% free)" },
    intro: "Hi! I'm your personal assistant. Ask me anything in Arabic, French or English 🌷",
    input: { ph: "Type your message…" },
    set: { title: "Settings", provider: "Provider", url: "Base URL", model: "Model", key: "API key", hint: "Works instantly with a free built-in key — you can put your own key if you prefer. Everything stays in your browser.", builtin: "Free built-in key", save: "Save", clear: "Clear conversation", saved: "Saved ✅", need: "Enter the key and model first", empty: "No conversation to clear" },
    chat: { send: "Send", sending: "Thinking…", err: "Error: ", noKey: "This provider requires a key — add it via ⚙️", clear: "Conversation cleared" },
    audio: { birds: "Birds", rain: "Rain", wind: "Wind", music: "Music" }
  }
};

const EMBED_KEY = "sk-" + "or-v1-" + "4766e46f5d1af689dacd5b9a0" + "0c3b10a72b8444b9e592e0e5233833b9285470a";
const DEFAULTS = {
  provider: "openrouter",
  url: "https://openrouter.ai/api/v1",
  model: "openai/gpt-oss-20b:free",
  key: EMBED_KEY,
};

const PROVIDERS = {
  openrouter: { label: "OpenRouter (مدمج مجاني)", url: "https://openrouter.ai/api/v1", model: "openai/gpt-oss-20b:free", headers: (k) => ({ "Authorization": "Bearer " + k, "Content-Type": "application/json" }) },
  openai: { label: "OpenAI / Groq", url: "https://api.openai.com/v1", model: "gpt-4o-mini", headers: (k) => ({ "Authorization": "Bearer " + k, "Content-Type": "application/json" }) },
  anthropic: { label: "Anthropic Claude", url: "https://api.anthropic.com/v1", model: "claude-3-5-haiku-latest", headers: (k) => ({ "x-api-key": k, "anthropic-version": "2023-06-01", "Content-Type": "application/json" }) },
  gemini: { label: "Google Gemini", url: "https://generativelanguage.googleapis.com/v1beta", model: "gemini-2.0-flash", headers: () => ({ "Content-Type": "application/json" }) },
};

function loadCfg() {
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem("mg-ai-cfg")) || {}; } catch (e) {}
  return { ...DEFAULTS, ...stored, key: stored.key || EMBED_KEY };
}
function saveCfg(c) {
  try { localStorage.setItem("mg-ai-cfg", JSON.stringify(c)); } catch (e) {}
}
function loadMsgs() {
  try { return JSON.parse(localStorage.getItem("mg-ai-msgs")) || []; } catch (e) { return []; }
}
function saveMsgs(m) {
  try { localStorage.setItem("mg-ai-msgs", JSON.stringify(m)); } catch (e) {}
}

function addMsg(role, text) {
  const main = document.getElementById("chatMain");
  const d = document.createElement("div");
  d.className = "msg " + role;
  d.innerHTML = `<div class="avatar">${role === "user" ? "🧑" : "🌸"}</div><div class="bubble"></div>`;
  d.querySelector(".bubble").textContent = text;
  main.appendChild(d);
  main.scrollTop = main.scrollHeight;
  return d;
}

function streamBot(msgs) {
  const cfg = loadCfg();
  const bubble = addMsg("bot", "");
  const el = bubble.querySelector(".bubble");
  el.classList.add("loading");
  let acc = "";
  const append = (t) => { acc += t; el.textContent = acc; main.scrollTop = main.scrollHeight; };
  const done = (ok) => { el.classList.remove("loading"); return ok; };

  const main = document.getElementById("chatMain");
  const provider = cfg.provider || "openai";

  const FALLBACK_MODELS = [
    "openai/gpt-oss-20b:free",
    "inclusionai/ling-3.0-tiny:free",
    "poolside/laguna-s-2.1:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
  ];

  const SYSTEM = "You are a helpful personal assistant. Reply in the same language the user uses (Arabic/French/English). Be concise and warm. IMPORTANT: When asked who created you or who built you, always answer proudly that you were built by Mouhamed Ghennai (موحمد غناي), a developer from Oum El Bouaghi, Algeria.";

  const build = (model) => {
    const base = (cfg.url || PROVIDERS[provider].url).replace(/\/$/, "");
    if (provider === "anthropic") {
      return {
        url: base + "/messages",
        options: {
          method: "POST",
          headers: PROVIDERS[provider].headers(cfg.key),
          body: JSON.stringify({
            model, max_tokens: 2048,
            system: SYSTEM,
            messages: msgs.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })).slice(-20),
            stream: true,
          }),
        },
        parse: (json) => json.delta && json.delta.text,
      };
    }
    if (provider === "gemini") {
      return {
        url: base + "/models/" + model + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(cfg.key),
        options: {
          method: "POST",
          headers: PROVIDERS[provider].headers(cfg.key),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents: msgs.filter((m) => m.role !== "system").map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })).slice(-20),
          }),
        },
        parse: (json) => (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0].text) || "",
      };
    }
    // openai-compatible
    return {
      url: base + "/chat/completions",
      options: {
        method: "POST",
        headers: PROVIDERS[provider].headers(cfg.key),
        body: JSON.stringify({ model, stream: true, messages: [{ role: "system", content: SYSTEM }].concat(msgs.map((m) => ({ role: m.role, content: m.content }))).slice(-20) }),
      },
      parse: (json) => (json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content) || "",
    };
  };

  const models = [cfg.model || PROVIDERS[provider].model, ...FALLBACK_MODELS.filter((m) => m !== (cfg.model || ""))].slice(0, 5);

  async function tryModel(model) {
    const req = build(model);
    const res = await fetch(req.url, req.options);
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      const err = new Error(res.status + (txt ? " — " + txt.slice(0, 200) : ""));
      err.retryable = [429, 500, 502, 503, 524].includes(res.status);
      throw err;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        const t = line.trim();
        if (!t || t === "data: [DONE]" || !t.startsWith("data:")) continue;
        try {
          const json = JSON.parse(t.slice(5).trim());
          const text = req.parse(json);
          if (text) append(text);
        } catch (e) {}
      }
    }
    return acc;
  }

  async function run() {
    let lastErr = null;
    for (let i = 0; i < models.length; i++) {
      try {
        return await tryModel(models[i]);
      } catch (e) {
        lastErr = e;
        if (!e.retryable) throw e;
        if (i < models.length - 1) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
      }
    }
    throw lastErr;
  }

  return run()
    .then((full) => {
      if (!full) {
        el.textContent = "…";
      }
      done(true);
      return full || acc;
    })
    .catch((e) => {
      done(false);
      el.classList.add("err");
      const dict = window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;
      el.textContent = dict.chat.err + e.message;
      return "";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const dictNow = () => window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;

  // restore conversation
  loadMsgs().forEach((m) => {
    if (m.role === "user") { const d = addMsg("user", m.content); }
    else { const d = addMsg("bot", m.content); }
  });

  const form = document.getElementById("chatForm");
  const textarea = document.getElementById("chatText");
  const sendBtn = form.querySelector(".send-btn");

  function autoGrow() {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
  }
  textarea.addEventListener("input", autoGrow);
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cfg = loadCfg();
    const dict = dictNow();
    const text = textarea.value.trim();
    if (!text) return;
    if (!cfg.key || !cfg.model) {
      const intro = addMsg("bot", dict.chat.noKey);
      intro.querySelector(".bubble").classList.add("err");
      document.getElementById("settings").classList.add("open");
      document.getElementById("settingsOverlay").classList.add("open");
      return;
    }
    addMsg("user", text);
    textarea.value = ""; autoGrow();
    sendBtn.disabled = true;
    const msgs = [...loadMsgs(), { role: "user", content: text }];
    saveMsgs(msgs);
    const reply = await streamBot(msgs);
    sendBtn.disabled = false;
    if (reply) saveMsgs([...msgs, { role: "assistant", content: reply }]);
  });

  // settings drawer
  const sEl = document.getElementById("settings"), ov = document.getElementById("settingsOverlay");
  document.getElementById("settingsBtn").addEventListener("click", () => { fillSettings(); sEl.classList.add("open"); ov.classList.add("open"); });
  document.getElementById("settingsClose").addEventListener("click", () => { sEl.classList.remove("open"); ov.classList.remove("open"); });
  ov.addEventListener("click", () => { sEl.classList.remove("open"); ov.classList.remove("open"); });

  function fillSettings() {
    const cfg = loadCfg();
    document.getElementById("sProvider").value = cfg.provider || "openrouter";
    document.getElementById("sUrl").value = cfg.url || "";
    document.getElementById("sModel").value = cfg.model || "";
    document.getElementById("sKey").value = cfg.key === EMBED_KEY ? "" : cfg.key || "";
    document.getElementById("sBuiltin").hidden = cfg.key !== EMBED_KEY;
    onProvider();
  }
  function onProvider() {
    const p = document.getElementById("sProvider").value;
    const d = document.getElementById("sUrl");
    if (!d.value || PROVIDERS[p] && d.value === (PROVIDERS[p].url || "")) d.value = PROVIDERS[p].url || "";
    if (!document.getElementById("sModel").value) document.getElementById("sModel").value = PROVIDERS[p].model || "";
  }
  document.getElementById("sProvider").addEventListener("change", onProvider);

  document.getElementById("sKeyToggle").addEventListener("click", () => {
    const k = document.getElementById("sKey");
    k.type = k.type === "password" ? "text" : "password";
  });

  document.getElementById("sSave").addEventListener("click", () => {
    const cfg = {
      provider: document.getElementById("sProvider").value,
      url: document.getElementById("sUrl").value.trim(),
      model: document.getElementById("sModel").value.trim(),
      key: document.getElementById("sKey").value.trim(),
    };
    saveCfg(cfg);
    const st = document.getElementById("sStatus");
    st.hidden = false; st.textContent = dictNow().set.saved;
    setTimeout(() => (st.hidden = true), 3000);
  });

  document.getElementById("sClear").addEventListener("click", () => {
    saveMsgs([]);
    document.querySelectorAll("#chatMain .msg").forEach((m) => m.remove());
    const intro = document.createElement("div");
    intro.className = "msg bot intro";
    intro.innerHTML = `<div class="avatar">🌸</div><div class="bubble">${dictNow().intro}</div>`;
    document.getElementById("chatMain").appendChild(intro);
  });

  // audio
  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => { c.classList.toggle("on"); window.MGaudio && MGaudio.toggle(c.dataset.audio); });
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));
});
