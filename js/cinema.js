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

  /* ---------- 3D tilt for the intro card ---------- */
  function initIntroTilt() {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const card = document.querySelector(".intro-card");
    if (!card) return;
    const range = 6;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        "perspective(1200px) rotateX(" + (-py * range).toFixed(2) +
        "deg) rotateY(" + (px * range).toFixed(2) + "deg)";
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveals();
    initMouseParallax();
    initFlyingVideos();
    initIntroTilt();
  });
})();
