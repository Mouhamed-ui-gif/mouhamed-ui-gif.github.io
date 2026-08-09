/* ===== cinema.js — parallax + reveals + flying video playback ===== */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    initReveals();
    initMouseParallax();
    initSectionParallax();
    initFlyingVideos();
  });
})();
