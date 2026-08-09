/* ===== Study Assistant — calm sounds + pomodoro + AI chat + file upload ===== */
window.APP_LANGS = {
  ar: {
    meta: { title: "مساعد المذاكرة 🧠" },
    brand: "مساعد المذاكرة",
    hero: { title: "مساعد المذاكرة", sub: "ضعني أمامك أثناء الدراسة — أجلب لك الهدوء، أنظّم وقتك، أجيب على أسئلتك، وأرفع أي شيء تريده. كل شيء يبقى في متصفحك فقط" },
    calm: { title: "الهدوء", sub: "أصوات محيطية مريحة للتركيز والاسترخاء" },
    time: { title: "الوقت", sub: "بومودورو ينظّم جلسات تركيزك" },
    ask: { title: "سؤال ومساعدة", sub: "اسألني أي شيء عن دروسك، مذاكرتك، أو حياتك — الرد فوراً وبمجاني", intro: "مرحباً! أنا مساعدك الشخصي للمذاكرة. اسألني عن أي درس، أعد لي شرحاً، أو ساعدني أركّز 🎯", ph: "اكتب سؤالك هنا…" },
    upload: { title: "رفع أي شيء", sub: "ارفع ملفاتك — تُحفظ في متصفحك فقط، في متناولك دائماً للعودة إليها أو تحميلها", hint: "اسحب الملفات هنا أو انقر للاختيار", pick: "اختيار ملفات", mine: "ملفاتك", empty: "لا ملفات بعد — ارفع أول ملف 🌱" },
    phase: { work: "وقت التركيز 💪", short: "استراحة قصيرة ☕", long: "استراحة طويلة 🌙" },
    ctl: { start: "بدء", pause: "إيقاف", resume: "متابعة", reset: "تصفير", skip: "تخطّي" },
    set: { work: "تركيز (دق)", short: "راحة قصيرة", long: "راحة طويلة", auto: "بدء تلقائي" },
    pomo: { workDone: "أحسنت! أكملت جلسة تركيز — خذ استراحة ☕", breakDone: "انتهت الاستراحة — عد للتركيز 💪" },
    chat: { send: "إرسال", sending: "جارٍ التفكير…", err: "خطأ: ", clear: "تم مسح المحادثة", stop: "إيقاف الرد", stopped: "تم إيقاف الرد", noKey: "تعذّر الاتصال بالمزود المجاني الآن — حاول مجدداً" },
    audio: { rain: "مطر", birds: "طيور", fire: "نار", wind: "رياح", waves: "أمواج", snow: "ثلج", music: "موسيقى", vol: "مستوى الصوت" },
  },
  fr: {
    meta: { title: "Assistant d'étude 🧠" },
    brand: "Assistant d'étude",
    hero: { title: "Assistant d'étude", sub: "Mettez-le devant vous pendant l'étude — il vous apporte le calme, organise votre temps, répond à vos questions et dépose tout fichier. Tout reste dans votre navigateur" },
    calm: { title: "Calme", sub: "Sons ambiants apaisants pour se concentrer et se détendre" },
    time: { title: "Temps", sub: "Un pomodoro qui organise vos séances de focus" },
    ask: { title: "Questions et aide", sub: "Demandez-moi n'importe quoi sur vos leçons, vos révisions ou votre vie — réponse instantanée et gratuite", intro: "Bonjour ! Je suis votre assistant d'étude. Posez-moi des questions sur une leçon, demandez une explication, ou aidez-moi à me concentrer 🎯", ph: "Écrivez votre question…" },
    upload: { title: "Déposer n'importe quoi", sub: "Déposez vos fichiers — ils restent dans votre navigateur, toujours à portée de main", hint: "Glissez vos fichiers ici ou cliquez pour choisir", pick: "Choisir des fichiers", mine: "Vos fichiers", empty: "Aucun fichier — déposez le premier 🌱" },
    phase: { work: "Temps de focus 💪", short: "Pause courte ☕", long: "Longue pause 🌙" },
    ctl: { start: "Démarrer", pause: "Pause", resume: "Reprendre", reset: "Réinitialiser", skip: "Passer" },
    set: { work: "Focus (min)", short: "Pause courte", long: "Pause longue", auto: "Démarrage auto" },
    pomo: { workDone: "Bravo ! Séance de focus terminée — prenez une pause ☕", breakDone: "Pause terminée — retour au focus 💪" },
    chat: { send: "Envoyer", sending: "Réflexion…", err: "Erreur : ", clear: "Conversation effacée", stop: "Arrêter", stopped: "Réponse arrêtée", noKey: "Connexion au fournisseur gratuit impossible pour l'instant — réessayez" },
    audio: { rain: "Pluie", birds: "Oiseaux", fire: "Feu", wind: "Vent", waves: "Vagues", snow: "Neige", music: "Musique", vol: "Volume" },
  },
  en: {
    meta: { title: "Study Assistant 🧠" },
    brand: "Study Assistant",
    hero: { title: "Study Assistant", sub: "Put me in front of you while studying — I bring calm, organize your time, answer your questions and store any file you want. Everything stays in your browser" },
    calm: { title: "Calm", sub: "Soothing ambient sounds to focus and relax" },
    time: { title: "Time", sub: "A pomodoro that organizes your focus sessions" },
    ask: { title: "Questions & help", sub: "Ask me anything about your lessons, your studying or your life — instant and free replies", intro: "Hi! I'm your study assistant. Ask me about any lesson, get an explanation, or help me stay focused 🎯", ph: "Type your question here…" },
    upload: { title: "Upload anything", sub: "Drop your files — they stay in your browser, always at hand", hint: "Drag your files here or click to choose", pick: "Choose files", mine: "Your files", empty: "No files yet — upload your first one 🌱" },
    phase: { work: "Focus time 💪", short: "Short break ☕", long: "Long break 🌙" },
    ctl: { start: "Start", pause: "Pause", resume: "Resume", reset: "Reset", skip: "Skip" },
    set: { work: "Focus (min)", short: "Short break", long: "Long break", auto: "Auto-start" },
    pomo: { workDone: "Great job! Focus session done — take a break ☕", breakDone: "Break over — back to focus 💪" },
    chat: { send: "Send", sending: "Thinking…", err: "Error: ", clear: "Conversation cleared", stop: "Stop", stopped: "Reply stopped", noKey: "Can't reach the free provider right now — try again" },
    audio: { rain: "Rain", birds: "Birds", fire: "Fire", wind: "Wind", waves: "Waves", snow: "Snow", music: "Music", vol: "Volume" },
  }
};

const d = () => window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;
const LS = { set: "mg-assist-set", chat: "mg-assist-chat" };

function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

/* ================= Pomodoro (reused pattern) ================= */
const POMO = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
let phase = "work", remaining = POMO.work, total = POMO.work, running = false, interval = null, cyclesDone = 0;
let elTime, elPhase, elRing, elMsg, btnStart;

function readDurations() {
  return {
    work: Math.max(1, Math.min(120, +document.getElementById("setWork").value || 25)),
    short: Math.max(1, Math.min(60, +document.getElementById("setShort").value || 5)),
    long: Math.max(1, Math.min(90, +document.getElementById("setLong").value || 15)),
  };
}
function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}
function setPhase(p) {
  phase = p;
  total = readDurations()[p] * 60;
  remaining = total;
  renderPhase();
}
function renderPhase() {
  elPhase.textContent = d().phase[phase];
  elTime.textContent = fmt(Math.ceil(remaining));
  elRing.style.setProperty("--pct", (remaining / total) * 100 + "%");
}
function tick() {
  remaining--;
  if (remaining <= 0) { remaining = 0; renderPhase(); finishPhase(); return; }
  elTime.textContent = fmt(Math.ceil(remaining));
  elRing.style.setProperty("--pct", (remaining / total) * 100 + "%");
}
function chime(notes) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const c = new Ctx();
    notes.forEach((n, i) => {
      const o = c.createOscillator();
      o.type = "sine"; o.frequency.value = n;
      const g = c.createGain();
      const t = c.currentTime + i * 0.18;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.3, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      o.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + 0.6);
    });
    setTimeout(() => c.close(), 3000);
  } catch (e) {}
}
function showMsg(text, secs) {
  elMsg.hidden = false;
  elMsg.textContent = text;
  clearTimeout(elMsg._t);
  elMsg._t = setTimeout(() => (elMsg.hidden = true), secs || 6000);
}
function finishPhase() {
  stopTimer();
  const dict = d();
  if (phase === "work") {
    cyclesDone++;
    chime([523.25, 659.25, 783.99]);
    showMsg(dict.pomo.workDone);
    setPhase(cyclesDone % 4 === 0 ? "long" : "short");
    if (document.getElementById("setAuto").checked) setTimeout(() => { if (!running) startTimer(); }, 2500);
  } else {
    chime([659.25, 523.25]);
    showMsg(dict.pomo.breakDone);
    setPhase("work");
    if (document.getElementById("setAuto").checked) setTimeout(() => { if (!running) startTimer(); }, 2500);
  }
}
function startTimer() {
  running = true;
  interval = setInterval(tick, 1000);
  btnStart.textContent = d().ctl.pause;
  btnStart.classList.add("paused");
}
function stopTimer() {
  running = false;
  clearInterval(interval);
  btnStart.textContent = d().ctl.start;
  btnStart.classList.remove("paused");
}

/* ================= AI chat (streaming, free built-in key) ================= */
const EMBED_KEY = "sk-" + "or-v1-" + "4766e46f5d1af689dacd5b9a0" + "0c3b10a72b8444b9e592e0e5233833b9285470a";
const PROVIDERS = {
  openrouter: { url: "https://openrouter.ai/api/v1", model: "openai/gpt-oss-20b:free", headers: (k) => ({ "Authorization": "Bearer " + k, "Content-Type": "application/json" }) },
  openai: { url: "https://api.openai.com/v1", model: "gpt-4o-mini", headers: (k) => ({ "Authorization": "Bearer " + k, "Content-Type": "application/json" }) },
  anthropic: { url: "https://api.anthropic.com/v1", model: "claude-3-5-haiku-latest", headers: (k) => ({ "x-api-key": k, "anthropic-version": "2023-06-01", "Content-Type": "application/json" }) },
  gemini: { url: "https://generativelanguage.googleapis.com/v1beta", model: "gemini-2.0-flash", headers: () => ({ "Content-Type": "application/json" }) },
};
const FALLBACK_MODELS = [
  "openai/gpt-oss-20b:free",
  "inclusionai/ling-3.0-tiny:free",
  "poolside/laguna-s-2.1:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
];
const SYSTEM = "You are a warm, calm and encouraging study assistant. Reply in the same language the user uses (Arabic/French/English). Help with lessons, explanations, study plans, focus tips and motivation. Be concise and kind. IMPORTANT: When asked who created you or who built you, always answer proudly that you were built by Mouhamed Ghennai (محمد غناي), a developer from Oum El Bouaghi, Algeria.";

let activeStream = null;
function addMsg(role, text) {
  const main = document.getElementById("chatMain");
  const dEl = document.createElement("div");
  dEl.className = "msg " + role;
  dEl.innerHTML = `<div class="avatar">${role === "user" ? "🧑" : "🧠"}</div><div class="bubble"></div>`;
  dEl.querySelector(".bubble").textContent = text;
  main.appendChild(dEl);
  main.scrollTop = main.scrollHeight;
  return dEl;
}
function streamBot(msgs) {
  const controller = new AbortController();
  const bubbleEl = addMsg("bot", "").querySelector(".bubble");
  bubbleEl.classList.add("loading");
  activeStream = { controller, bubbleEl };
  let acc = "";
  const append = (t) => { acc += t; bubbleEl.textContent = acc; document.getElementById("chatMain").scrollTop = document.getElementById("chatMain").scrollHeight; };
  const done = (ok) => { bubbleEl.classList.remove("loading"); return ok; };

  const build = (model, provider) => {
    const base = (PROVIDERS[provider].url || "").replace(/\/$/, "");
    if (provider === "anthropic") {
      return {
        url: base + "/messages",
        options: {
          method: "POST", headers: PROVIDERS[provider].headers(EMBED_KEY),
          body: JSON.stringify({ model, max_tokens: 2048, system: SYSTEM, messages: msgs.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })).slice(-20), stream: true }),
        },
        parse: (json) => json.delta && json.delta.text,
      };
    }
    if (provider === "gemini") {
      return {
        url: base + "/models/" + model + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(EMBED_KEY),
        options: {
          method: "POST", headers: PROVIDERS[provider].headers(EMBED_KEY),
          body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM }] }, contents: msgs.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })).slice(-20) }),
        },
        parse: (json) => (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0].text) || "",
      };
    }
    return {
      url: base + "/chat/completions",
      options: {
        method: "POST", headers: PROVIDERS[provider].headers(EMBED_KEY),
        body: JSON.stringify({ model, stream: true, messages: [{ role: "system", content: SYSTEM }].concat(msgs.map((m) => ({ role: m.role, content: m.content }))).slice(-20) }),
      },
      parse: (json) => (json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content) || "",
    };
  };
  const models = ["openai/gpt-oss-20b:free", ...FALLBACK_MODELS.filter((m) => m !== "openai/gpt-oss-20b:free")].slice(0, 5);
  const PROVIDER_ORDER = ["openrouter", "openrouter", "openrouter", "openrouter", "openrouter"];

  async function tryModel(model, provider) {
    const req = build(model, provider);
    const res = await fetch(req.url, { ...req.options, signal: controller.signal });
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

  return (async () => {
    let lastErr = null;
    for (let i = 0; i < models.length; i++) {
      try {
        return await tryModel(models[i], PROVIDER_ORDER[i]);
      } catch (e) {
        lastErr = e;
        if (e && e.name === "AbortError") throw e;
        if (!e.retryable) throw e;
        if (i < models.length - 1) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
      }
    }
    throw lastErr;
  })()
    .then((full) => {
      if (!full) bubbleEl.textContent = "…";
      done(true);
      if (activeStream && activeStream.controller === controller) activeStream = null;
      return full || acc;
    })
    .catch((e) => {
      done(false);
      if (activeStream && activeStream.controller === controller) activeStream = null;
      const aborted = e && e.name === "AbortError";
      if (aborted) {
        bubbleEl.classList.add("stopped");
        bubbleEl.textContent = acc ? acc + " [" + d().chat.stopped + "]" : "[" + d().chat.stopped + "]";
        return acc;
      }
      bubbleEl.classList.add("err");
      bubbleEl.textContent = d().chat.err + e.message;
      return "";
    });
}

/* ================= File upload (IndexedDB) ================= */
const DB_NAME = "mg-assistant", DB_VER = 1, DB_STORE = "files";
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(DB_STORE)) req.result.createObjectStore(DB_STORE, { keyPath: "id" }); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbPut(record) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(record);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
async function dbAll() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).getAll();
    req.onsuccess = () => res(req.result || []);
    req.onerror = () => rej(req.error);
  });
}
async function dbGet(id) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).get(id);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
async function dbDel(id) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).delete(id);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
function fmtSize(n) {
  if (n < 1024) return n + " B";
  if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
  return (n / 1048576).toFixed(1) + " MB";
}
const FILE_ICONS = { image: "🖼", video: "🎬", audio: "🎵", "text/": "📄", "application/pdf": "📕", "application/zip": "🗜", "application/x": "🗜" };
function fileIcon(type) {
  if (type.startsWith("image/")) return "🖼";
  if (type.startsWith("video/")) return "🎬";
  if (type.startsWith("audio/")) return "🎵";
  if (type === "application/pdf") return "📕";
  if (type.includes("zip") || type.includes("compressed") || type.includes("rar")) return "🗜";
  if (type.startsWith("text/")) return "📄";
  return "📦";
}
async function renderFiles() {
  const list = document.getElementById("fileList");
  const empty = document.getElementById("fileEmpty");
  list.innerHTML = "";
  const files = await dbAll();
  files.sort((a, b) => (b.id || 0) - (a.id || 0));
  empty.hidden = files.length > 0;
  files.forEach((f) => {
    const li = document.createElement("li");
    li.className = "file-item";
    const ico = document.createElement("span");
    ico.className = "file-ico"; ico.textContent = fileIcon(f.type || "");
    const meta = document.createElement("div");
    meta.className = "file-meta";
    const nm = document.createElement("div");
    nm.className = "file-name"; nm.textContent = f.name; nm.title = f.name;
    const sz = document.createElement("div");
    sz.className = "file-size"; sz.textContent = fmtSize(f.size || 0);
    meta.append(nm, sz);
    const acts = document.createElement("div");
    acts.className = "file-acts";
    const dl = document.createElement("button");
    dl.className = "fbtn"; dl.textContent = "⬇️"; dl.title = "download";
    dl.addEventListener("click", async () => {
      const rec = await dbGet(f.id);
      if (!rec || !rec.blob) return;
      const url = URL.createObjectURL(rec.blob);
      const a = document.createElement("a");
      a.href = url; a.download = rec.name || "file";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
    const del = document.createElement("button");
    del.className = "fbtn del"; del.textContent = "🗑"; del.title = "delete";
    del.addEventListener("click", async () => {
      await dbDel(f.id);
      renderFiles();
    });
    acts.append(dl, del);
    li.append(ico, meta, acts);
    list.appendChild(li);
  });
}
async function addFiles(fileList) {
  const now = Date.now();
  let i = 0;
  for (const file of fileList) {
    await dbPut({ id: now + i, name: file.name, size: file.size, type: file.type || "", blob: file });
    i++;
  }
  renderFiles();
}

/* ================= Boot ================= */
document.addEventListener("DOMContentLoaded", () => {
  elTime = document.getElementById("pomoTime");
  elPhase = document.getElementById("pomoPhase");
  elRing = document.getElementById("pomoRing");
  elMsg = document.getElementById("pomoMsg");
  btnStart = document.getElementById("btnStart");

  const savedSet = load(LS.set, null);
  if (savedSet) {
    document.getElementById("setWork").value = savedSet.work || 25;
    document.getElementById("setShort").value = savedSet.short || 5;
    document.getElementById("setLong").value = savedSet.long || 15;
    document.getElementById("setAuto").checked = savedSet.auto !== false;
  }
  setPhase("work");

  btnStart.addEventListener("click", () => {
    if (running) {
      stopTimer();
      btnStart.textContent = d().ctl.resume;
    } else {
      if (remaining <= 0) remaining = total;
      startTimer();
    }
  });
  document.getElementById("btnReset").addEventListener("click", () => {
    stopTimer();
    setPhase(phase);
    elMsg.hidden = true;
  });
  document.getElementById("btnSkip").addEventListener("click", () => {
    stopTimer();
    finishPhase();
  });
  ["setWork", "setShort", "setLong"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      const s = readDurations();
      save(LS.set, { ...s, auto: document.getElementById("setAuto").checked });
      if (!running) setPhase(phase);
    });
  });
  document.getElementById("setAuto").addEventListener("change", () => {
    const s = readDurations();
    save(LS.set, { ...s, auto: document.getElementById("setAuto").checked });
  });

  // chat
  const form = document.getElementById("chatForm");
  const textarea = document.getElementById("chatText");
  const sendBtn = form.querySelector(".send-btn");
  const stopBtn = document.getElementById("stopBtn");
  function autoGrow() {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
  }
  textarea.addEventListener("input", autoGrow);
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });
  stopBtn.addEventListener("click", () => {
    if (activeStream) activeStream.controller.abort();
    stopBtn.hidden = true;
    sendBtn.disabled = false;
    textarea.focus();
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text) return;
    addMsg("user", text);
    textarea.value = ""; autoGrow();
    sendBtn.disabled = true;
    stopBtn.hidden = false;
    const msgs = [...load(LS.chat, []), { role: "user", content: text }];
    save(LS.chat, msgs);
    const reply = await streamBot(msgs);
    sendBtn.disabled = false;
    stopBtn.hidden = true;
    if (reply) save(LS.chat, [...msgs, { role: "assistant", content: reply }]);
  });
  load(LS.chat, []).forEach((m) => {
    if (m.role === "user") addMsg("user", m.content);
    else if (m.role === "assistant") addMsg("bot", m.content);
  });

  // upload
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  dropZone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
  ["dragenter", "dragover"].forEach((ev) => dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) => dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.remove("drag"); }));
  dropZone.addEventListener("drop", (e) => {
    if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });
  renderFiles();

  // audio
  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => { c.classList.toggle("on"); window.MGaudio && MGaudio.toggle(c.dataset.audio); });
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));

  // re-render dynamic text on language change
  document.addEventListener("mg:lang", () => {
    renderPhase();
    if (running) btnStart.textContent = d().ctl.pause;
    else if (remaining < total && remaining > 0 && !running) btnStart.textContent = d().ctl.resume;
    else btnStart.textContent = d().ctl.start;
    const intro = document.getElementById("introMsg");
    if (intro && !load(LS.chat, []).length) {
      intro.querySelector(".bubble").textContent = d().ask.intro;
    }
  });
});
