/* ===== audio.js — original synthesized ambient sounds (Web Audio API) =====
   All sounds are generated in the browser. No external audio files. 100% royalty-free. */
(function () {
  let ctx = null;
  let master = null;
  let musicGain = null;
  let running = {};
  const SOUNDS = {};

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.8;
      master.connect(ctx.destination);
      musicGain = ctx.createGain();
      musicGain.gain.value = 0.5;
      musicGain.connect(master);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noiseBuffer(type, seconds) {
    const c = ensureCtx();
    const len = Math.floor(c.sampleRate * seconds);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (type === "white") data[i] = w;
      else if (type === "pink") {
        data[i] = last = (last + 0.02 * w) / 1.02;
      } else {
        data[i] = last = (last + 0.08 * w) / 1.08;
      }
    }
    return buf;
  }

  function makeLoopSrc(buffer, rate) {
    const c = ensureCtx();
    const src = c.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.playbackRate.value = rate || 1;
    return src;
  }

  /* ---------- individual sound builders ---------- */
  SOUNDS.rain = function () {
    const c = ensureCtx();
    const src = makeLoopSrc(noiseBuffer("pink", 3));
    const lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 2400; lp.Q.value = 0.4;
    const hp = c.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 300;
    const g = c.createGain(); g.gain.value = 0.5;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.13;
    const lfoG = c.createGain(); lfoG.gain.value = 500;
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(master);
    src.start();
    return { nodes: [src, lfo], stop: () => { try { src.stop(); lfo.stop(); } catch (e) {} } };
  };

  SOUNDS.thunder = function () {
    const c = ensureCtx();
    const nodes = [];
    const schedule = () => {
      const src = c.createBufferSource();
      src.buffer = noiseBuffer("brown", 3);
      const lp = c.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.setValueAtTime(180, c.currentTime);
      lp.frequency.linearRampToValueAtTime(55, c.currentTime + 2.6);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.linearRampToValueAtTime(0.9, c.currentTime + 0.18);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 3.1);
      src.connect(lp); lp.connect(g); g.connect(master);
      src.start();
      nodes.push(src);
    };
    schedule();
    const id = setInterval(() => {
      if (Math.random() > 0.72) schedule();
    }, 6000);
    return { nodes, stop: () => { clearInterval(id); nodes.forEach((n) => { try { n.stop(); } catch (e) {} }); } };
  };

  SOUNDS.wind = function () {
    const c = ensureCtx();
    const src = makeLoopSrc(noiseBuffer("pink", 4), 0.8);
    const bp = c.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 700; bp.Q.value = 1.2;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.05;
    const lfoG = c.createGain(); lfoG.gain.value = 450;
    lfo.connect(lfoG); lfoG.connect(bp.frequency); lfo.start();
    const g = c.createGain(); g.gain.value = 0.42;
    const gLfo = c.createOscillator(); gLfo.frequency.value = 0.09;
    const gLfoG = c.createGain(); gLfoG.gain.value = 0.14;
    gLfo.connect(gLfoG); gLfoG.connect(g.gain); gLfo.start();
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start();
    return { nodes: [src, lfo, gLfo], stop: () => { [src, lfo, gLfo].forEach((n) => { try { n.stop(); } catch (e) {} }); } };
  };

  SOUNDS.birds = function () {
    const c = ensureCtx();
    const id = setInterval(() => {
      if (Math.random() > 0.4) {
        const t0 = c.currentTime + Math.random() * 0.3;
        for (let j = 0; j < 2 + Math.random() * 3; j++) {
          const o = c.createOscillator();
          o.type = "sine";
          const f = 2400 + Math.random() * 2800;
          const t1 = t0 + j * 0.09;
          o.frequency.setValueAtTime(f, t1);
          o.frequency.exponentialRampToValueAtTime(f + (Math.random() * 900 - 450), t1 + 0.07);
          const g = c.createGain();
          g.gain.setValueAtTime(0.0001, t1);
          g.gain.linearRampToValueAtTime(0.12, t1 + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t1 + 0.09);
          o.connect(g); g.connect(master);
          o.start(t1); o.stop(t1 + 0.1);
        }
      }
    }, 1600);
    return { nodes: [], stop: () => clearInterval(id) };
  };

  SOUNDS.leaves = function () {
    const c = ensureCtx();
    const id = setInterval(() => {
      const src = c.createBufferSource();
      src.buffer = noiseBuffer("pink", 0.4);
      const bp = c.createBiquadFilter();
      bp.type = "bandpass"; bp.frequency.value = 1200 + Math.random() * 800;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.linearRampToValueAtTime(0.16, c.currentTime + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.5);
      src.connect(bp); bp.connect(g); g.connect(master);
      src.start();
    }, 500 + Math.random() * 600);
    return { nodes: [], stop: () => clearInterval(id) };
  };

  SOUNDS.fire = function () {
    const c = ensureCtx();
    const src = makeLoopSrc(noiseBuffer("brown", 4));
    const lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 400;
    const g = c.createGain(); g.gain.value = 0.4;
    src.connect(lp); lp.connect(g); g.connect(master);
    src.start();
    const id = setInterval(() => {
      const crack = c.createBufferSource();
      crack.buffer = noiseBuffer("white", 0.04);
      const hp = c.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 3000;
      const cg = c.createGain();
      cg.gain.setValueAtTime(0.22, c.currentTime);
      cg.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05);
      crack.connect(hp); hp.connect(cg); cg.connect(master);
      crack.start();
    }, 260);
    return { nodes: [src], stop: () => { clearInterval(id); try { src.stop(); } catch (e) {} } };
  };

  SOUNDS.waves = function () {
    const c = ensureCtx();
    const src = makeLoopSrc(noiseBuffer("brown", 5), 0.9);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 900;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.08;
    const lfoG = c.createGain(); lfoG.gain.value = 700;
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    const g = c.createGain(); g.gain.value = 0.5;
    const gLfo = c.createOscillator(); gLfo.frequency.value = 0.06;
    const gLfoG = c.createGain(); gLfoG.gain.value = 0.3;
    gLfo.connect(gLfoG); gLfoG.connect(g.gain); gLfo.start();
    src.connect(lp); lp.connect(g); g.connect(master);
    src.start();
    return { nodes: [src, lfo, gLfo], stop: () => { [src, lfo, gLfo].forEach((n) => { try { n.stop(); } catch (e) {} }); } };
  };

  SOUNDS.snow = function () {
    const c = ensureCtx();
    const src = makeLoopSrc(noiseBuffer("pink", 4), 0.7);
    const hp = c.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 1200;
    const g = c.createGain(); g.gain.value = 0.18;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.11;
    const lfoG = c.createGain(); lfoG.gain.value = 0.07;
    lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
    src.connect(hp); hp.connect(g); g.connect(master);
    src.start();
    return { nodes: [src, lfo], stop: () => { [src, lfo].forEach((n) => { try { n.stop(); } catch (e) {} }); } };
  };

  /* ---------- ambient music: slow pentatonic pads ---------- */
  const PENTA = [220, 261.63, 293.66, 329.63, 392, 440, 523.25];
  function startMusic() {
    const c = ensureCtx();
    if (running.music) return;
    const voices = [];
    const arp = [];
    const playNote = (freq, t, dur, gainVal) => {
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = freq;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gainVal, t + dur * 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(musicGain);
      o.start(t); o.stop(t + dur + 0.1);
      return o;
    };
    const loopId = setInterval(() => {
      if (ctx.state !== "running") return;
      const t = c.currentTime;
      const base = PENTA[(Math.random() * PENTA.length) | 0];
      playNote(base / 2, t, 9, 0.05);
      playNote(base * 1.5, t + Math.random() * 2, 7, 0.04);
      playNote(base * 2, t + 1, 8, 0.035);
    }, 5200);
    running.music = { nodes: voices, id: loopId, arp, stop: () => clearInterval(loopId) };
  }

  function stopMusic() {
    if (running.music) {
      running.music.stop();
      delete running.music;
    }
  }

  /* ---------- public API ---------- */
  const api = {
    toggle(soundId) {
      ensureCtx();
      if (soundId === "music") {
        if (running.music) { stopMusic(); return false; }
        startMusic();
        return true;
      }
      if (running[soundId]) { api.stop(soundId); return false; }
      if (SOUNDS[soundId]) {
        running[soundId] = SOUNDS[soundId]();
        return true;
      }
      return false;
    },
    stop(soundId) {
      if (running[soundId]) {
        running[soundId].stop();
        delete running[soundId];
      }
    },
    music() { ensureCtx(); startMusic(); },
    stopMusic() { stopMusic(); },
    stopAll() {
      Object.keys(running).forEach((k) => { try { running[k].stop(); } catch (e) {} });
      running = {};
      stopMusic();
    },
    setVolume(v) {
      if (master) master.gain.value = v;
    },
    unlock() { ensureCtx(); },
  };

  window.MGaudio = api;
})();
