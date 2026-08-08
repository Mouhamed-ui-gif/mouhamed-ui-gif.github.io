/* ===== main.js — interactions ===== */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const overlay = document.querySelector(".nav-overlay");

    const closeNav = () => {
      if (nav) nav.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
    };

    if (burger) {
      burger.addEventListener("click", () => {
        if (nav) nav.classList.toggle("open");
        if (overlay) overlay.classList.toggle("open");
      });
    }
    if (overlay) overlay.addEventListener("click", closeNav);
    nav && nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

    document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

    const links = nav ? Array.from(nav.querySelectorAll("a")) : [];
    const sections = links
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current = links[0];
      sections.forEach((sec, i) => {
        if (sec.offsetTop <= pos) current = links[i];
      });
      links.forEach((l) => l.classList.remove("active"));
      current && current.classList.add("active");
    };

    if (sections.length) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const counters = document.querySelectorAll("[data-count]");
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const dur = 1200;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach((c) => io.observe(c));
    } else {
      counters.forEach(animateCount);
    }
  });
})();
