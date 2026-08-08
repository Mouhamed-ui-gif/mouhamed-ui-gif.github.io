/* ===== TimeFlash app ===== */
window.APP_LANGS = {
  ar: {
    meta: { title: "TimeFlash ❄️" },
    brand: "TimeFlash",
    head: { title: "ساعة الوقت الفوري", sub: "كرونومتر، مؤقّت، وبومودورو — بلمسة شتوية" },
    tab: { stopwatch: "كرونومتر", timer: "مؤقّت", pomodoro: "بومودورو" },
    ctl: { reset: "تصفير", start: "بدء", pause: "إيقاف", resume: "متابعة", lap: "لفة" },
    preset: { "1m": "1 دقيقة", "5m": "5 دقائق", "15m": "15 دقيقة", "30m": "30 دقيقة", "60m": "60 دقيقة", custom: "مخصص…" },
    custom: { prompt: "أدخل الوقت بالدقائق:", invalid: "أدخل رقماً صحيحاً" },
    pomo: { work: "وقت العمل 💪", short: "استراحة قصيرة ☕", long: "استراحة طويلة 🌲", done: "دورة مكتملة! خذ استراحة 🌲", session: "دورة مكتملة!", breakOver: "انتهت الاستراحة — عد للعمل!" },
    audio: { snow: "ثلج", wind: "رياح", fire: "نار", music: "موسيقى" }
  },
  fr: {
    meta: { title: "TimeFlash ❄️" },
    brand: "TimeFlash",
    head: { title: "Chronomètre instantané", sub: "Chronomètre, minuteur et pomodoro — touche hivernale" },
    tab: { stopwatch: "Chronomètre", timer: "Minuteur", pomodoro: "Pomodoro" },
    ctl: { reset: "Réinitialiser", start: "Démarrer", pause: "Pause", resume: "Reprendre", lap: "Tour" },
    preset: { "1m": "1 min", "5m": "5 min", "15m": "15 min", "30m": "30 min", "60m": "60 min", custom: "Personnalisé…" },
    custom: { prompt: "Entrez le temps en minutes :", invalid: "Entrez un nombre valide" },
    pomo: { work: "Temps de travail 💪", short: "Pause courte ☕", long: "Longue pause 🌲", done: "Cycle terminé ! Reposez-vous 🌲", session: "Cycle terminé !", breakOver: "Pause terminée — retour au travail !" },
    audio: { snow: "Neige", wind: "Vent", fire: "Feu", music: "Musique" }
  },
  en: {
    meta: { title: "TimeFlash ❄️" },
    brand: "TimeFlash",
    head: { title: "Instant time clock", sub: "Stopwatch, timer and pomodoro — with a winter touch" },
    tab: { stopwatch: "Stopwatch", timer: "Timer", pomodoro: "Pomodoro" },
    ctl: { reset: "Reset", start: "Start", pause: "Pause", resume: "Resume", lap: "Lap" },
    preset: { "1m": "1 min", "5m": "5 min", "15m": "15 min", "30m": "30 min", "60m": "60 min", custom: "Custom…" },
    custom: { prompt: "Enter time in minutes:", invalid: "Enter a valid number" },
    pomo: { work: "Focus time 💪", short: "Short break ☕", long: "Long break 🌲", done: "Cycle complete! Take a rest 🌲", session: "Cycle complete!", breakOver: "Break over — back to work!" },
    audio: { snow: "Snow", wind: "Wind", fire: "Fire", music: "Music" }
  }
};

const MODES = { stopwatch: 0, timer: 1, pomodoro: 2 };
const POMO = { work: 25 * 60, short: 5 * 60, long: 15 * 60, cyclesPerLong: 4 };

let mode = "stopwatch";
let running = false;
let interval = null;
let ms = 0;            // stopwatch elapsed (ms)
let target = 0;        // timer/pomodoro remaining (ms)
let timerTotal = 0;    // timer total (for preset)
let laps = [];
let startTs = 0;
let pomoPhase = "work";
let pomoCount = 0;

const d = () => window.APP_LANGS[document.documentElement.lang] || window.APP_LANGS.ar;

function fmt(msv) {
  const neg = msv < 0;
  const s = Math.abs(msv);
  const h = Math.floor(s / 3600000);
  const m = Math.floor((s % 3600000) / 60000);
  const sec = Math.floor((s % 60000) / 1000);
  const cs = Math.floor((s % 1000) / 10);
  const pad = (n, w) => String(n).padStart(w, "0");
  return (neg ? "-" : "") + (h > 0 ? pad(h, 2) + ":" : "") + pad(m, 2) + ":" + pad(sec, 2) + (mode === "stopwatch" ? "." + pad(cs, 2) : "");
}

function tick() {
  if (!running) return;
  if (mode === "stopwatch") {
    ms = Date.now() - startTs;
    display.textContent = fmt(ms);
  } else {
    target = Math.max(0, timerTotal - (Date.now() - startTs));
    display.textContent = fmt(target);
    if (target <= 0) finishTimer();
  }
}

function finishTimer() {
  running = false;
  clearInterval(interval);
  display.classList.add("alert");
  btnStart.textContent = d().ctl.start;
  btnStart.classList.remove("paused");
  flashDone();
  const dict = d();
  if (mode === "pomodoro") {
    if (pomoPhase === "work") {
      pomoCount++;
      const next = pomoCount % POMO.cyclesPerLong === 0 ? "long" : "short";
      const len = next === "long" ? POMO.long : POMO.short;
      setTimeout(() => {
        setPomodoro(next, len);
        flashDone();
      }, 1500);
    } else {
      setPomodoro("work", POMO.work);
    }
    updatePomoUI();
  } else {
    timerTotal = 0;
    display.textContent = fmt(0);
  }
}

function flashDone() {
  const c = getComputedStyle(document.body).getPropertyValue("--c-accent").trim();
  document.body.style.transition = "box-shadow .2s";
  document.body.style.boxShadow = "inset 0 0 80px " + (c || "#38bdf8");
  setTimeout(() => (document.body.style.boxShadow = "none"), 1200);
}

function setPomodoro(phase, len) {
  pomoPhase = phase;
  timerTotal = len * 1000;
  target = timerTotal;
  startTs = 0;
  running = false;
  clearInterval(interval);
  display.classList.remove("alert");
  display.textContent = fmt(target);
  document.getElementById("pomoPhase").textContent = d().pomo[phase];
  btnStart.textContent = d().ctl.start;
  updatePomoUI();
}

function updatePomoUI() {
  const cycles = document.getElementById("pomoCycles");
  cycles.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const s = document.createElement("span");
    if (i < pomoCount) s.className = "done";
    else if (i === pomoCount && pomoPhase === "work") s.className = "on";
    cycles.appendChild(s);
  }
  document.getElementById("pomoPhase").textContent = d().pomo[pomoPhase];
}

function showMode(m) {
  mode = m;
  running = false;
  clearInterval(interval);
  laps = [];
  pomoPhase = "work";
  pomoCount = 0;
  display.classList.remove("alert", "running");
  document.getElementById("laps").innerHTML = "";
  document.querySelectorAll(".ttab").forEach((b) => b.classList.toggle("on", b.dataset.mode === m));
  document.getElementById("pomoBar").classList.toggle("show", m === "pomodoro");
  document.getElementById("presets").style.display = m === "timer" ? "flex" : "none";
  document.getElementById("btnLap").style.display = m === "stopwatch" ? "" : "none";
  document.getElementById("pomoSessions").hidden = true;
  btnStart.textContent = d().ctl.start;

  if (m === "stopwatch") { ms = 0; display.textContent = fmt(0); }
  else if (m === "timer") { setPreset(5 * 60 * 1000); }
  else { setPomodoro("work", POMO.work); }
}

function setPreset(totalMs) {
  timerTotal = totalMs;
  target = timerTotal;
  startTs = 0;
  running = false;
  clearInterval(interval);
  display.classList.remove("alert");
  display.textContent = fmt(target);
  btnStart.textContent = d().ctl.start;
}

let display, btnStart, btnReset, btnLap;

document.addEventListener("DOMContentLoaded", () => {
  display = document.getElementById("tfDisplay");
  btnStart = document.getElementById("btnStart");
  btnReset = document.getElementById("btnReset");
  btnLap = document.getElementById("btnLap");

  showMode("stopwatch");

  document.getElementById("tfTabs").addEventListener("click", (e) => {
    const b = e.target.closest(".ttab");
    if (b) showMode(b.dataset.mode);
  });

  btnStart.addEventListener("click", () => {
    const dict = d();
    if (running) {
      running = false;
      clearInterval(interval);
      if (mode !== "stopwatch") {
        target = Math.max(0, timerTotal - (Date.now() - startTs));
        display.textContent = fmt(target);
      }
      btnStart.textContent = dict.ctl.resume;
      btnStart.classList.add("paused");
      display.classList.remove("running");
    } else {
      if (mode === "stopwatch") {
        startTs = Date.now() - ms;
      } else {
        if (target <= 0) target = timerTotal;
        startTs = Date.now() - (timerTotal - target);
      }
      running = true;
      interval = setInterval(tick, mode === "stopwatch" ? 10 : 250);
      btnStart.textContent = dict.ctl.pause;
      btnStart.classList.remove("paused");
      display.classList.add("running");
      display.classList.remove("alert");
    }
  });

  btnReset.addEventListener("click", () => {
    if (mode === "stopwatch") { ms = 0; laps = []; display.textContent = fmt(0); }
    else if (mode === "timer") { setPreset(timerTotal); }
    else { setPomodoro("work", POMO.work); pomoCount = 0; updatePomoUI(); document.getElementById("pomoSessions").hidden = true; }
    document.getElementById("laps").innerHTML = "";
    btnStart.textContent = d().ctl.start;
    btnStart.classList.remove("paused");
    display.classList.remove("running", "alert");
  });

  btnLap.addEventListener("click", () => {
    const el = document.createElement("div");
    el.className = "lap-row";
    el.innerHTML = `<span>${d().ctl.lap} ${laps.length + 1}</span><span>${fmt(ms)}</span>`;
    document.getElementById("laps").prepend(el);
    laps.push(ms);
  });

  document.getElementById("presets").addEventListener("click", (e) => {
    const b = e.target.closest(".preset");
    if (!b) return;
    document.querySelectorAll(".preset").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    if (b.dataset.m === "custom") {
      const inp = prompt(d().custom.prompt, "10");
      const mins = parseFloat(inp);
      if (isNaN(mins) || mins <= 0) { alert(d().custom.invalid); return; }
      setPreset(mins * 60 * 1000);
    } else {
      setPreset(+b.dataset.m * 60 * 1000);
    }
  });

  document.getElementById("btnPomoReset").addEventListener("click", () => {
    setPomodoro("work", POMO.work);
    pomoCount = 0;
    updatePomoUI();
    document.getElementById("pomoSessions").hidden = true;
  });

  // audio
  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => { c.classList.toggle("on"); window.MGaudio && MGaudio.toggle(c.dataset.audio); });
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));
});
