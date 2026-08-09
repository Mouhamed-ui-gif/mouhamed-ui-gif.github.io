/* ===== Study Zone app — pomodoro + tasks + ambient sounds ===== */
window.APP_LANGS = {
  ar: {
    meta: { title: "ركن المذاكرة 🌙" },
    brand: "ركن المذاكرة",
    hero: { title: "ركن المذاكرة", sub: "أجواء هادئة، أصوات مريحة، وبومودورو ينظّم وقتك — 25 دقيقة تركيز ثم 5 دقائق راحة" },
    stats: { sessions: "جلسات اليوم", focusMin: "دقائق تركيز", tasks: "مهام مكتملة" },
    phase: { work: "وقت التركيز 💪", short: "استراحة قصيرة ☕", long: "استراحة طويلة 🌙" },
    ctl: { start: "بدء", pause: "إيقاف", resume: "متابعة", reset: "تصفير", skip: "تخطّي" },
    set: { work: "تركيز (دق)", short: "راحة قصيرة", long: "راحة طويلة", auto: "بدء تلقائي" },
    pomo: { workDone: "أحسنت! أكملت جلسة تركيز — خذ استراحة ☕", breakDone: "انتهت الاستراحة — عد للتركيز 💪", noFocus: "لا مهمة حالياً" },
    tasks: { title: "المهام", addPh: "أضف مهمة للمذاكرة…", add: "إضافة", empty: "لا مهام بعد — أضف أول مهمة 🌱", focus: "ركّز", doneAll: "أنجزت كل مهامك 🎉" },
    audio: { rain: "مطر", birds: "طيور", fire: "نار", wind: "رياح", waves: "أمواج", snow: "ثلج", music: "موسيقى" }
  },
  fr: {
    meta: { title: "Zone d'étude 🌙" },
    brand: "Zone d'étude",
    hero: { title: "Zone d'étude", sub: "Ambiance calme, sons apaisants et pomodoro qui organise votre temps — 25 min de focus puis 5 min de pause" },
    stats: { sessions: "Séances du jour", focusMin: "Minutes de focus", tasks: "Tâches faites" },
    phase: { work: "Temps de focus 💪", short: "Pause courte ☕", long: "Longue pause 🌙" },
    ctl: { start: "Démarrer", pause: "Pause", resume: "Reprendre", reset: "Réinitialiser", skip: "Passer" },
    set: { work: "Focus (min)", short: "Pause courte", long: "Pause longue", auto: "Démarrage auto" },
    pomo: { workDone: "Bravo ! Séance de focus terminée — prenez une pause ☕", breakDone: "Pause terminée — retour au focus 💪", noFocus: "Aucune tâche" },
    tasks: { title: "Tâches", addPh: "Ajouter une tâche d'étude…", add: "Ajouter", empty: "Aucune tâche — ajoutez la première 🌱", focus: "Focus", doneAll: "Vous avez fini toutes vos tâches 🎉" },
    audio: { rain: "Pluie", birds: "Oiseaux", fire: "Feu", wind: "Vent", waves: "Vagues", snow: "Neige", music: "Musique" }
  },
  en: {
    meta: { title: "Study Zone 🌙" },
    brand: "Study Zone",
    hero: { title: "Study Zone", sub: "Calm vibes, relaxing sounds and a pomodoro that organizes your time — 25 min of focus then 5 min of rest" },
    stats: { sessions: "Today's sessions", focusMin: "Focus minutes", tasks: "Tasks done" },
    phase: { work: "Focus time 💪", short: "Short break ☕", long: "Long break 🌙" },
    ctl: { start: "Start", pause: "Pause", resume: "Resume", reset: "Reset", skip: "Skip" },
    set: { work: "Focus (min)", short: "Short break", long: "Long break", auto: "Auto-start" },
    pomo: { workDone: "Great job! Focus session done — take a break ☕", breakDone: "Break over — back to focus 💪", noFocus: "No task right now" },
    tasks: { title: "Tasks", addPh: "Add a study task…", add: "Add", empty: "No tasks yet — add your first one 🌱", focus: "Focus", doneAll: "You finished all your tasks 🎉" },
    audio: { rain: "Rain", birds: "Birds", fire: "Fire", wind: "Wind", waves: "Waves", snow: "Snow", music: "Music" }
  }
};

const d = () => window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;
const LS = {
  tasks: "mg-study-tasks",
  set: "mg-study-settings",
  stats: "mg-study-stats",
};

function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

/* ================= Pomodoro ================= */
const POMO = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
const CYCLES_PER_LONG = 4;

let phase = "work";
let remaining = POMO.work;
let total = POMO.work;
let running = false;
let interval = null;
let cyclesDone = 0;
let focusTaskId = null;

let elTime, elPhase, elRing, elCycles, elMsg, btnStart, elPomoTask;

function setPhase(p) {
  phase = p;
  total = readDurations()[p] * 60;
  remaining = total;
  renderPhase();
}

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

function renderPhase() {
  const dict = d();
  elPhase.textContent = dict.phase[phase];
  elTime.textContent = fmt(Math.ceil(remaining));
  elRing.style.setProperty("--pct", (remaining / total) * 100 + "%");
  elCycles.innerHTML = "";
  for (let i = 0; i < CYCLES_PER_LONG; i++) {
    const s = document.createElement("span");
    if (i < cyclesDone) s.className = "done";
    else if (i === cyclesDone && phase === "work") s.className = "on";
    elCycles.appendChild(s);
  }
  renderTaskLabel();
}

function renderTaskLabel() {
  const dict = d();
  const task = tasks.find((t) => t.id === focusTaskId);
  elPomoTask.textContent = task && !task.done ? "🎯 " + task.text : dict.pomo.noFocus;
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
      o.type = "sine";
      o.frequency.value = n;
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
    addFocusSession();
    chime([523.25, 659.25, 783.99]);
    const next = cyclesDone % CYCLES_PER_LONG === 0 ? "long" : "short";
    showMsg(dict.pomo.workDone);
    setPhase(next);
    const auto = document.getElementById("setAuto").checked;
    if (auto) setTimeout(() => { if (!running) startTimer(); }, 2500);
  } else {
    chime([659.25, 523.25]);
    showMsg(dict.pomo.breakDone);
    setPhase("work");
    const auto = document.getElementById("setAuto").checked;
    if (auto) setTimeout(() => { if (!running) startTimer(); }, 2500);
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

/* ================= Stats ================= */
function todayKey() {
  const x = new Date();
  return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
}
function readStats() {
  let s = load(LS.stats, null);
  if (!s || s.date !== todayKey()) s = { date: todayKey(), sessions: 0, focusMin: 0, tasksDone: 0 };
  return s;
}
function saveStats(s) {
  s.date = todayKey();
  save(LS.stats, s);
}
function addFocusSession() {
  const s = readStats();
  s.sessions++;
  s.focusMin += readDurations().work;
  saveStats(s);
  renderStats();
}
function renderStats() {
  const s = readStats();
  document.getElementById("statSessions").textContent = s.sessions;
  document.getElementById("statFocus").textContent = s.focusMin;
  document.getElementById("statTasks").textContent = s.tasksDone;
}

/* ================= Tasks ================= */
let tasks = load(LS.tasks, []);

function saveTasks() { save(LS.tasks, tasks); }

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const dict = d();
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = "task-item" + (t.done ? " done" : "") + (t.id === focusTaskId && !t.done ? " focusing" : "");
    li.dataset.id = t.id;

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "task-check";
    check.checked = t.done;
    check.addEventListener("change", () => toggleTask(t.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = t.text;

    const acts = document.createElement("div");
    acts.className = "task-act";

    const focusBtn = document.createElement("button");
    focusBtn.className = "tbtn" + (t.id === focusTaskId && !t.done ? " focus-on" : "");
    focusBtn.textContent = "🎯";
    focusBtn.title = dict.tasks.focus;
    focusBtn.addEventListener("click", () => focusTask(t.id));

    const editBtn = document.createElement("button");
    editBtn.className = "tbtn";
    editBtn.textContent = "✏️";
    editBtn.title = "…";
    editBtn.addEventListener("click", () => startEdit(li, t, span));

    const delBtn = document.createElement("button");
    delBtn.className = "tbtn";
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => deleteTask(t.id));

    acts.append(focusBtn, editBtn, delBtn);
    li.append(check, span, acts);
    list.appendChild(li);
  });

  const empty = document.getElementById("taskEmpty");
  const allDone = tasks.length > 0 && tasks.every((t) => t.done);
  empty.hidden = tasks.length > 0;
  empty.textContent = allDone ? dict.tasks.doneAll : dict.tasks.empty;
}

function startEdit(li, t, span) {
  const inp = document.createElement("input");
  inp.type = "text";
  inp.className = "task-text";
  inp.value = t.text;
  span.replaceWith(inp);
  inp.focus();
  inp.select();
  const commit = () => {
    const v = inp.value.trim();
    if (v) { t.text = v; saveTasks(); }
    renderTasks();
  };
  inp.addEventListener("keydown", (e) => { if (e.key === "Enter") commit(); else if (e.key === "Escape") renderTasks(); });
  inp.addEventListener("blur", commit);
}

function addTask(text) {
  tasks.push({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), text, done: false });
  saveTasks();
  renderTasks();
}
function toggleTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  if (t.done) {
    const s = readStats();
    s.tasksDone++;
    saveStats(s);
    renderStats();
  }
  if (t.done && focusTaskId === id) focusTaskId = null;
  saveTasks();
  renderTasks();
}
function deleteTask(id) {
  tasks = tasks.filter((x) => x.id !== id);
  if (focusTaskId === id) focusTaskId = null;
  saveTasks();
  renderTasks();
  renderTaskLabel();
}
function focusTask(id) {
  focusTaskId = id;
  renderTasks();
  renderTaskLabel();
  stopTimer();
  setPhase("work");
  startTimer();
}

/* ================= Boot ================= */
document.addEventListener("DOMContentLoaded", () => {
  elTime = document.getElementById("pomoTime");
  elPhase = document.getElementById("pomoPhase");
  elRing = document.getElementById("pomoRing");
  elCycles = document.getElementById("pomoCycles");
  elMsg = document.getElementById("pomoMsg");
  elPomoTask = document.getElementById("pomoTask");
  btnStart = document.getElementById("btnStart");

  const savedSet = load(LS.set, null);
  if (savedSet) {
    document.getElementById("setWork").value = savedSet.work || 25;
    document.getElementById("setShort").value = savedSet.short || 5;
    document.getElementById("setLong").value = savedSet.long || 15;
    document.getElementById("setAuto").checked = savedSet.auto !== false;
  }

  setPhase("work");
  renderTasks();
  renderStats();

  btnStart.addEventListener("click", () => {
    if (running) {
      stopTimer();
      btnStart.textContent = d().ctl.resume;
    } else {
      if (remaining <= 0) { remaining = total; }
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

  document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = document.getElementById("taskText");
    const v = inp.value.trim();
    if (!v) return;
    addTask(v);
    inp.value = "";
  });

  document.addEventListener("mg:lang", () => {
    renderPhase();
    renderTasks();
    renderStats();
    if (running) btnStart.textContent = d().ctl.pause;
    else if (remaining < total && remaining > 0 && !running) btnStart.textContent = d().ctl.resume;
    else btnStart.textContent = d().ctl.start;
  });

  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => { c.classList.toggle("on"); window.MGaudio && MGaudio.toggle(c.dataset.audio); });
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));
});
