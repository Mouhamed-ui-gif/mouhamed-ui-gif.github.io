/* ===== cinema.js — Matrix rain + shooting stars + parallax + reveals ===== */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Matrix rain (hero) ---------- */
  function initMatrix(canvas) {
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    const hero = document.querySelector(".hero");
    const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#$%&";

    let cols, drops, fontSize = 16, running = false, rafId = null;

    function size() {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(rect.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
    }

    function draw() {
      ctx.fillStyle = "rgba(7, 12, 9, 0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.975 ? "#d7ffe8" : "#22d97a";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rafId = requestAnimationFrame(draw);
    }

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible && !running) { running = true; size(); draw(); }
      else if (!visible && running) { running = false; cancelAnimationFrame(rafId); }
    };

    window.addEventListener("resize", () => { if (running) size(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && running) { cancelAnimationFrame(rafId); running = false; }
      else onScroll();
    });
  }

  /* ---------- Shooting stars ---------- */
  function initShootingStars() {
    if (reduced) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    let count = 0;
    const spawn = () => {
      if (count > 3) return;
      const star = document.createElement("div");
      star.className = "shooting-star";
      const top = Math.random() * 45;
      const left = 10 + Math.random() * 70;
      const dur = 1.6 + Math.random() * 2.2;
      star.style.top = top + "%";
      star.style.left = left + "%";
      star.style.setProperty("--sdur", dur + "s");
      hero.appendChild(star);
      count++;
      star.addEventListener("animationend", () => { star.remove(); count--; });
    };
    setInterval(spawn, 2600);
    spawn();
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Hero parallax on mouse ---------- */
  function initMouseParallax() {
    if (reduced) return;
    const hero = document.querySelector(".hero");
    const layers = document.querySelectorAll("[data-depth]");
    if (!hero || !layers.length) return;
    hero.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((layer) => {
        const d = parseFloat(layer.getAttribute("data-depth")) || 0.1;
        layer.style.transform = "translate3d(" + (x * -d * 40) + "px," + (y * -d * 24) + "px,0)";
      });
    });
    hero.addEventListener("mouseleave", () => {
      layers.forEach((layer) => (layer.style.transform = ""));
    });
  }

  /* ---------- Scroll parallax for cinematic sections ---------- */
  function initSectionParallax() {
    const sections = document.querySelectorAll("[data-parallax]");
    if (!sections.length) return;
    const update = () => {
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const speed = parseFloat(sec.getAttribute("data-parallax")) || 0.2;
        const off = (window.innerHeight - rect.top) * -speed;
        const bg = sec.querySelector(".cine-bg");
        if (bg) bg.style.transform = "translateY(" + off.toFixed(1) + "px)";
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Flying real videos: ensure playback ---------- */
  function initFlyingVideos() {
    document.querySelectorAll("video.auto-play").forEach((v) => {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      const p = v.play();
      if (p) p.catch(() => {});
      v.addEventListener("loadeddata", () => {
        const p2 = v.play();
        if (p2) p2.catch(() => {});
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMatrix(document.getElementById("matrix-canvas"));
    initShootingStars();
    initReveals();
    initMouseParallax();
    initSectionParallax();
    initFlyingVideos();
  });
})();
