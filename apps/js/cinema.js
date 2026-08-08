/* ===== cinema.js — particles, reveals, parallax, nav (shared) ===== */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function particles() {
    const wrap = document.querySelector(".season-particles");
    if (!wrap || reduced) return;
    const season = document.body.getAttribute("data-season") || "autumn";
    const glyphs = {
      autumn: ["🍂", "🍁", "🍃"],
      winter: ["❄", "❅", "✦"],
      spring: ["🌸", "🌷", "🍃", "🌼"],
      summer: ["☀", "🌊", "⛅", "✨"],
    }[season] || ["✦"];
    const count = Math.min(26, Math.floor(window.innerWidth / 55));
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      p.style.left = Math.random() * 100 + "%";
      p.style.fontSize = 14 + Math.random() * 22 + "px";
      p.style.opacity = .35 + Math.random() * .4;
      p.style.animationDuration = 9 + Math.random() * 14 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      wrap.appendChild(p);
    }
  }

  function reveals() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
  }

  function nav() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const overlay = document.querySelector(".nav-overlay");
    const close = () => { nav && nav.classList.remove("open"); overlay && overlay.classList.remove("open"); };
    burger && burger.addEventListener("click", () => {
      nav && nav.classList.toggle("open");
      overlay && overlay.classList.toggle("open");
    });
    overlay && overlay.addEventListener("click", close);
    nav && nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  document.addEventListener("DOMContentLoaded", () => {
    particles();
    reveals();
    nav();
    document.querySelectorAll("video.season-video").forEach((v) => {
      const p = v.play();
      if (p) p.catch(() => {});
    });
  });
})();
