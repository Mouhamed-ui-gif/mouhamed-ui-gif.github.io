/* ===== Business Assistant app (embedded free key) ===== */
const EMBED_KEY = "sk-" + "or-v1-" + "4766e46f5d1af689dacd5b9a0" + "0c3b10a72b8444b9e592e0e5233833b9285470a";
const CFG = {
  url: "https://openrouter.ai/api/v1",
  model: "openai/gpt-oss-20b:free",
  key: EMBED_KEY,
};

const FALLBACK_MODELS = [
  "openai/gpt-oss-20b:free",
  "inclusionai/ling-3.0-tiny:free",
  "poolside/laguna-s-2.1:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
];

window.APP_LANGS = {
  ar: {
    meta: { title: "مساعد المشاريع 🍂" },
    brand: "مساعد المشاريع",
    hero: { title: "مستشار المشاريع الذكي", sub: "أطلق فكرة مشروعك — سأساعدك في الخطة، السوق، التسويق، وكل شيء. يعمل فوراً" },
    intro: "مرحباً! أنا مستشار المشاريع. أخبرني بفكرتك أو اضغط أي زر من الأسفل وسأبني معك مشروعك خطوة بخطوة 🍂",
    input: { ph: "صف فكرة مشروعك…" },
    chip: { idea: "💡 فكرة مشروع", plan: "📋 خطة عمل", market: "📊 دراسة السوق", name: "🏷 اسم تجاري", marketing: "📣 خطة تسويق" },
    chat: { err: "خطأ: ", noNet: "لا يوجد اتصال بالإنترنت. حاول مجدداً", stop: "إيقاف الرد", stopped: "تم إيقاف الرد" },
    copy: "نسخ الرد", copied: "تم النسخ ✅", dl: "تحميل",
    audio: { leaves: "أوراق", rain: "مطر", thunder: "رعد", wind: "رياح", fire: "نار", music: "موسيقى" }
  },
  fr: {
    meta: { title: "Conseiller Projet 🍂" },
    brand: "Conseiller Projet",
    hero: { title: "Conseiller de projets intelligent", sub: "Lancez votre idée — je vous aide pour le plan, le marché, le marketing et plus. Fonctionne immédiatement" },
    intro: "Bonjour ! Je suis votre conseiller de projets. Dites-moi votre idée ou cliquez sur un bouton ci-dessous 🍂",
    input: { ph: "Décrivez votre idée de projet…" },
    chip: { idea: "💡 Idée de projet", plan: "📋 Business plan", market: "📊 Étude de marché", name: "🏷 Nom commercial", marketing: "📣 Plan marketing" },
    chat: { err: "Erreur : ", noNet: "Pas de connexion Internet. Réessayez", stop: "Arrêter la réponse", stopped: "Réponse arrêtée" },
    copy: "Copier", copied: "Copié ✅", dl: "Télécharger",
    audio: { leaves: "Feuilles", rain: "Pluie", thunder: "Tonnerre", wind: "Vent", fire: "Feu", music: "Musique" }
  },
  en: {
    meta: { title: "Project Advisor 🍂" },
    brand: "Project Advisor",
    hero: { title: "Smart project advisor", sub: "Launch your idea — I'll help with the plan, market, marketing and more. Works instantly" },
    intro: "Hi! I'm your project advisor. Tell me your idea or tap a button below 🍂",
    input: { ph: "Describe your project idea…" },
    chip: { idea: "💡 Project idea", plan: "📋 Business plan", market: "📊 Market study", name: "🏷 Business name", marketing: "📣 Marketing plan" },
    chat: { err: "Error: ", noNet: "No internet connection. Try again", stop: "Stop reply", stopped: "Reply stopped" },
    copy: "Copy", copied: "Copied ✅", dl: "Download",
    audio: { leaves: "Leaves", rain: "Rain", thunder: "Thunder", wind: "Wind", fire: "Fire", music: "Music" }
  }
};

const CHIP_PROMPTS = {
  idea: "اقترح عليّ 5 أفكار مشاريع صغيرة ناجحة ومناسبة للسوق الجزائري (ميزانية منخفضة، طلب حقيقي). اذكر لكل فكرة: الجمهور المستهدف، التكلفة التقريبية، وأول خطوة.",
  plan: "أرني نموذج خطة عمل كاملة ومنظمة (خطوات مرقمة) يمكنني تعبئته لمشروعي: الرؤية، السوق، المنتج، التسعير، التسويق، التكاليف، الإيرادات، خطوات التنفيذ.",
  market: "اشرح لي كيف أقوم بدراسة سوق لمشروعي في مدينتي بالجزائر خطوة بخطوة: تحليل المنافسين، معرفة الطلب، الأسعار، وتحديد الجمهور.",
  name: "اقترح 10 أسماء تجارية إبداعية وجذابة لمشروع (اترك مكان الاسم واضحاً)، مع تلميح قصير لكل اسم ولماذا يناسب.",
  marketing: "أعطني خطة تسويق عملية منخفضة التكلفة (إنستغرام، فيسبوك، واتساب، شفوي) لإطلاق مشروع صغير في الجزائر خلال أول شهر، مرتبة بالأيام.",
};

const SYSTEM = "You are a warm, practical business advisor for small businesses in Algeria. Always reply in the same language the user uses (Arabic/French/English). Give concrete, actionable, step-by-step advice. Be concise but complete. Use simple lists. Money amounts in Algerian dinars (DZD). IMPORTANT: When asked who created you or who built you, always answer proudly that you were built by Mouhamed Ghennai (موحمد غناي), a developer from Oum El Bouaghi, Algeria.";

const d = () => window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;

function addMsg(role, text) {
  const main = document.getElementById("chatMain");
  const el = document.createElement("div");
  el.className = "msg " + role;
  el.innerHTML = `<div class="avatar">${role === "user" ? "🧑" : "💼"}</div><div class="bubble"></div>`;
  el.querySelector(".bubble").textContent = text;
  main.appendChild(el);
  main.scrollTop = main.scrollHeight;
  return el;
}

let activeStream = null;

async function ask(text) {
  const main = document.getElementById("chatMain");
  addMsg("user", text);
  const bot = addMsg("bot", "");
  const el = bot.querySelector(".bubble");
  el.classList.add("loading");
  const sendBtn = document.querySelector(".send-btn");
  const stopBtn = document.getElementById("stopBtn");
  sendBtn.disabled = true;
  stopBtn.hidden = false;

  const controller = new AbortController();
  activeStream = { controller, el };
  const stop = () => {
    if (activeStream && activeStream.controller === controller) {
      activeStream = null;
      controller.abort();
    }
    sendBtn.disabled = false;
    stopBtn.hidden = true;
  };

  const msgs = [
    { role: "system", content: SYSTEM },
    { role: "user", content: text },
  ];
  const models = [CFG.model, ...FALLBACK_MODELS.filter((m) => m !== CFG.model)].slice(0, 5);
  const setText = (v) => { el.textContent = v; main.scrollTop = main.scrollHeight; };

  const tryModel = async (model) => {
    const res = await fetch(CFG.url + "/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + CFG.key, "Content-Type": "application/json" },
      body: JSON.stringify({ model, stream: true, messages: msgs }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      const err = new Error(res.status + (t ? " — " + t.slice(0, 160) : ""));
      err.retryable = [429, 500, 502, 503, 524].includes(res.status);
      throw err;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", acc = "";
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
          const j = JSON.parse(t.slice(5).trim());
          const piece = (j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content) || "";
          if (piece) { acc += piece; setText(acc); }
        } catch (e) {}
      }
    }
    return acc;
  };

  let lastErr = null;
  try {
    for (let i = 0; i < models.length; i++) {
      try {
        const acc = await tryModel(models[i]);
        el.classList.remove("loading");
        addCopyBtn(el, acc);
        if (activeStream && activeStream.controller === controller) activeStream = null;
        sendBtn.disabled = false;
        stopBtn.hidden = true;
        return;
      } catch (e) {
        lastErr = e;
        if (e && e.name === "AbortError") throw e;
        if (!e.retryable) throw e;
        if (i < models.length - 1) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
      }
    }
    throw lastErr;
  } catch (e) {
    el.classList.remove("loading");
    if (activeStream && activeStream.controller === controller) activeStream = null;
    sendBtn.disabled = false;
    stopBtn.hidden = true;
    if (e && e.name === "AbortError") {
      el.classList.add("stopped");
      const mark = " [" + d().chat.stopped + "]";
      el.textContent = el.textContent ? el.textContent + mark : mark;
      return;
    }
    const dict = d();
    el.innerHTML = `<span class="err">${dict.chat.err}${e.message}</span>`;
    el.classList.add("err");
  }
}

function addCopyBtn(bubble, text) {
  if (!text) return;
  const row = document.createElement("div");
  row.className = "msg-actions";
  const b = document.createElement("button");
  b.className = "mini-btn";
  b.textContent = d().copy;
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(text); } catch (e) {}
    b.textContent = d().copied;
    setTimeout(() => (b.textContent = d().copy), 2000);
  });
  row.appendChild(b);
  bubble.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("stopBtn").addEventListener("click", () => {
    if (activeStream) activeStream.controller.abort();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text || sendBtn.disabled) return;
    textarea.value = ""; autoGrow();
    ask(text);
  });

  document.getElementById("chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip || sendBtn.disabled) return;
    ask(CHIP_PROMPTS[chip.dataset.q]);
  });

  // audio
  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => { c.classList.toggle("on"); window.MGaudio && MGaudio.toggle(c.dataset.audio); });
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));
});
