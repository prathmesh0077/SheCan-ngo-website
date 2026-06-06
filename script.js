/* ============================================================
   SHE CAN FOUNDATION — script.js
   ============================================================ */

"use strict";

/* ---------- Theme ---------- */
(function initTheme() {
  const saved = localStorage.getItem("scf-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("scf-theme", next);
  // Update icon
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.textContent = next === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      next === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}

/* ---------- Loader ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 1900);
  // Set theme icon after load
  const theme = document.documentElement.getAttribute("data-theme");
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  });
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Highlight current page
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (currentPage === "index.html" && href === "index.html")
    ) {
      a.classList.add("active");
    }
  });

  // Scroll
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true },
  );
}

/* ---------- Mobile Nav ---------- */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    hamburger.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Scroll Reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Animated Counter ---------- */
function animateCounter(el, target, duration = 2000) {
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const value = Math.floor(ease * target);
    el.textContent = prefix + value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.count);
          animateCounter(e.target, target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => io.observe(el));
}

/* ---------- Typing Effect ---------- */
function initTyping() {
  const el = document.querySelector(".typing-text");
  if (!el) return;
  const words = ["Communities", "Futures", "Leaders", "Dreams"];
  let wi = 0,
    ci = 0,
    deleting = false;
  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 110);
  }
  tick();
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ---------- Progress Bar ---------- */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  window.addEventListener(
    "scroll",
    () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${window.scrollY / docH})`;
    },
    { passive: true },
  );
}

/* ---------- Mouse Glow ---------- */
function initMouseGlow() {
  const glow = document.getElementById("mouse-glow");
  if (!glow) return;
  window.addEventListener(
    "mousemove",
    (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    },
    { passive: true },
  );
}

/* ---------- Ripple Buttons ---------- */
function initRipple() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const r = document.createElement("span");
      r.classList.add("ripple");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      this.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    });
  });
}

/* ---------- Parallax Hero ---------- */
function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > window.innerHeight) return;
      const blobs = hero.querySelectorAll(".blob");
      blobs.forEach((b, i) => {
        b.style.transform = `translateY(${window.scrollY * (0.15 + i * 0.08)}px)`;
      });
    },
    { passive: true },
  );
}

/* ---------- Volunteer Form ---------- */
function initVolunteerForm() {
  const form = document.getElementById("volunteer-form");
  if (!form) return;

  const textarea = form.querySelector("textarea");
  const charCount = form.querySelector(".char-count");
  if (textarea && charCount) {
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      charCount.textContent = `${len}/500 characters`;
      charCount.style.color = len > 450 ? "var(--orange)" : "";
    });
  }

  function validateField(input) {
    const group = input.closest(".form-group");
    if (!group) return true;
    const val = input.value.trim();
    let ok = true;
    if (input.required && !val) ok = false;
    if (
      input.type === "email" &&
      val &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    )
      ok = false;
    if (input.type === "tel" && val && !/^\+?[\d\s\-()]{8,}$/.test(val))
      ok = false;
    group.classList.toggle("has-error", !ok);
    group.classList.toggle("has-success", ok && !!val);
    return ok;
  }

  form.querySelectorAll(".form-control").forEach((inp) => {
    inp.addEventListener("blur", () => validateField(inp));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allOk = true;
    form.querySelectorAll(".form-control").forEach((inp) => {
      if (!validateField(inp)) allOk = false;
    });
    if (!allOk) return;
    // Store data
    const data = Object.fromEntries(new FormData(form));
    const submissions = JSON.parse(
      localStorage.getItem("scf-volunteers") || "[]",
    );
    submissions.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem("scf-volunteers", JSON.stringify(submissions));
    // Show success
    form.style.display = "none";
    document.getElementById("vol-success").style.display = "block";
  });

  const resetBtn = form.querySelector(".btn-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      form.querySelectorAll(".form-group").forEach((g) => {
        g.classList.remove("has-error", "has-success");
      });
      if (charCount) charCount.textContent = "0/500 characters";
    });
  }
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function validateField(input) {
    const group = input.closest(".form-group");
    if (!group) return true;
    const val = input.value.trim();
    let ok = true;
    if (input.required && !val) ok = false;
    if (
      input.type === "email" &&
      val &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    )
      ok = false;
    group.classList.toggle("has-error", !ok);
    group.classList.toggle("has-success", ok && !!val);
    return ok;
  }

  form.querySelectorAll(".form-control").forEach((inp) => {
    inp.addEventListener("blur", () => validateField(inp));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allOk = true;
    form.querySelectorAll(".form-control").forEach((inp) => {
      if (!validateField(inp)) allOk = false;
    });
    if (!allOk) return;
    form.style.display = "none";
    document.getElementById("contact-success").style.display = "block";
  });
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = form.querySelector(".newsletter-input");
      if (inp && inp.value) {
        inp.value = "✓ Subscribed! Thank you.";
        inp.disabled = true;
        form.querySelector(".newsletter-btn").disabled = true;
      }
    });
  });
}

/* ---------- Page Transitions ---------- */
function initPageTransitions() {
  const overlay = document.querySelector(".page-transition");
  if (!overlay) return;
  // Fade in on load
  overlay.classList.add("leave");
  setTimeout(() => {
    overlay.style.display = "none";
    overlay.classList.remove("leave");
  }, 400);

  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      href.startsWith("http")
    )
      return;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.style.display = "block";
      overlay.classList.add("enter");
      setTimeout(() => {
        window.location = href;
      }, 380);
    });
  });
}

/* ---------- Float CTA ---------- */
function initFloatCTA() {
  const btn = document.getElementById("float-cta");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      const heroH = document.querySelector(".hero")?.offsetHeight || 300;
      btn.style.opacity = window.scrollY > heroH ? "1" : "0";
      btn.style.pointerEvents = window.scrollY > heroH ? "auto" : "none";
    },
    { passive: true },
  );
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileNav();
  initReveal();
  initCounters();
  initTyping();
  initBackToTop();
  initProgressBar();
  initMouseGlow();
  initRipple();
  initParallax();
  initVolunteerForm();
  initContactForm();
  initNewsletter();
  initPageTransitions();
  initFloatCTA();

  // Theme toggles
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
    const t = document.documentElement.getAttribute("data-theme");
    btn.textContent = t === "dark" ? "☀️" : "🌙";
  });
});
