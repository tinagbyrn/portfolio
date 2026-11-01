/* Shared behaviour for every page:
   header/footer, smooth scroll, cursor, magnetic buttons, split text, reveals,
   page transitions, preloader, clock, copy email, grid overlay (press G). */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (gsap && ST) gsap.registerPlugin(ST);
  if (gsap && window.Flip) gsap.registerPlugin(window.Flip);

  const EMAIL = "cgabayeron96@gmail.com";
  const PHONE = "+63 928 701 7913";
  const LINKEDIN = "https://www.linkedin.com/in/christine-gabayeron";
  const page = document.body.dataset.page || "";
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  document.documentElement.classList.add("js");
  if (fine) document.documentElement.classList.add("has-cursor");

  const App = (window.App = { $, $$, reduce, fine, EMAIL, PHONE, LINKEDIN, gsap, lenis: null });

  /* ------------------------------------------------------------------ chrome */
  const NAV = [
    ["index.html", "Home", "home"],
    ["work.html", "Work", "work"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"]
  ];
  const navLinks = NAV.map(([h, n, k], i) =>
    `<a href="${h}" class="${page === k || (page === "project" && k === "work") ? "is-active" : ""}">${n}<sup>0${i + 1}</sup></a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="progress" aria-hidden="true"></div>
    <header class="header">
      <a href="index.html" class="logo" aria-label="Christine Gabayeron — home">
        <span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>Christine G.
      </a>
      <nav class="nav" aria-label="Main">${navLinks}</nav>
      <div class="header-right">
        <span class="status"><span class="pulse"></span>Open to work</span>
        <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </header>
    <div class="mobile-menu" aria-hidden="true">
      ${NAV.map(([h, n], i) => `<a class="big" href="${h}"><sup>0${i + 1}</sup>${n}</a>`).join("")}
      <div class="mm-foot"><a href="mailto:${EMAIL}" class="link-u">${EMAIL}</a><span class="mono muted">Cebu, PH · <span data-clock></span></span></div>
    </div>
    <div class="cursor" aria-hidden="true"><span></span></div><div class="cursor-dot" aria-hidden="true"></div>
    <div class="transition" aria-hidden="true">${"<i></i>".repeat(5)}<div class="t-label"></div></div>
    <div class="grid-overlay" aria-hidden="true"><div>${"<i></i>".repeat(12)}</div></div>
    <div class="toast" role="status" aria-live="polite"></div>
  `);

  if (!document.body.hasAttribute("data-nofooter")) {
    const main = $("main");
    main.insertAdjacentHTML("afterend", `
      <footer class="footer">
        <div class="wrap">
          <span class="label">Next step</span>
          <div class="footer-cta" style="margin-top:28px">
            <h2 data-split>Let’s make<br>something <span class="it">clear.</span></h2>
            <a href="contact.html" class="circle-btn" data-magnetic>Start a<br>project ↗</a>
          </div>
          <button class="copy-email" data-copy>${EMAIL} <small>Click to copy</small></button>
          <div class="footer-row">
            <div><span class="mono">Based in</span>Cebu, Philippines<br><span data-clock></span> local time</div>
            <div><span class="mono">Pages</span>${NAV.map(([h, n]) => `<a href="${h}" class="link-u">${n}</a>`).join("")}</div>
            <div><span class="mono">Elsewhere</span>
              <a href="${LINKEDIN}" target="_blank" rel="noopener" class="link-u">LinkedIn ↗</a>
              <a href="mailto:${EMAIL}" class="link-u">Email</a>
              <a href="tel:${PHONE.replace(/\s/g, "")}" class="link-u">${PHONE}</a>
              <a href="assets/Christine-Gabayeron-Resume.pdf" download class="link-u">Résumé (PDF)</a>
              <a href="assets/Christine-Gabayeron-Portfolio.pdf" download class="link-u">Portfolio (PDF)</a>
            </div>
            <div><span class="mono">© ${new Date().getFullYear()}</span>Designed &amp; built<br>by Christine Gabayeron</div>
          </div>
        </div>
        <div class="footer-giant" aria-hidden="true">Gabayeron</div>
      </footer>`);
  }
  document.body.insertAdjacentHTML("beforeend", `
    <button class="to-top" aria-label="Back to top">↑</button>
    ${fine ? '<div class="kbd-hint mono"><kbd>G</kbd> grid</div>' : ""}`);

  /* ------------------------------------------------------------- mobile menu */
  const menuBtn = $(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
    $(".mobile-menu").setAttribute("aria-hidden", !open);
    if (App.lenis) open ? App.lenis.stop() : App.lenis.start();
    if (open && gsap) gsap.fromTo(".mobile-menu a.big", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.25, duration: 0.8, ease: "expo.out" });
  });

  /* ------------------------------------------------------------ smooth scroll */
  if (window.Lenis && !reduce) {
    App.lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    if (gsap) {
      App.lenis.on("scroll", ST ? ST.update : () => {});
      gsap.ticker.add((t) => App.lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { App.lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  App.scrollTo = (target) => {
    if (App.lenis) App.lenis.scrollTo(target, { duration: 1.6 });
    else (typeof target === "number" ? window.scrollTo({ top: target, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" }));
  };

  /* ---------------------------------------------- header, progress, to-top */
  const header = $(".header"), progress = $(".progress"), toTop = $(".to-top");
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > lastY && y > 300 && !document.body.classList.contains("menu-open"));
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    toTop.classList.toggle("is-on", y > window.innerHeight);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => App.scrollTo(0));

  /* ------------------------------------------------------------------ cursor */
  const cursor = $(".cursor"), dot = $(".cursor-dot"), cLabel = $(".cursor span");
  if (fine && gsap) {
    const cx = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    gsap.set([cursor, dot], { x: -100, y: -100 });
    window.addEventListener("pointermove", (e) => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); }, { passive: true });
    window.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    window.addEventListener("pointerup", () => cursor.classList.remove("is-down"));
    document.addEventListener("mouseleave", () => { cursor.classList.add("is-hidden"); dot.classList.add("is-hidden"); });
    document.addEventListener("mouseenter", () => { cursor.classList.remove("is-hidden"); dot.classList.remove("is-hidden"); });

    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-cursor], a, button, label, input, textarea");
      cursor.classList.remove("is-link", "is-label", "is-hidden");
      if (!el) return;
      if (el.matches("input:not([type=radio]):not([type=checkbox]), textarea")) { cursor.classList.add("is-hidden"); return; }
      if (el.dataset.cursor) { cLabel.textContent = el.dataset.cursor; cursor.classList.add("is-label"); return; }
      cursor.classList.add("is-link");
    });
  }

  /* -------------------------------------------------------------- magnetic */
  App.magnetic = function (root) {
    if (!fine || !gsap || reduce) return;
    $$("[data-magnetic]", root).forEach((el) => {
      if (el._mag) return; el._mag = 1;
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  };

  /* ------------------------------------------------------------ split text */
  // Wraps every word in .wd > span so it can rise from a mask. Keeps nested tags (em, .it, br).
  App.split = function (el) {
    if (el._split) return $$(".wd > span", el);
    el._split = true;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "wd";
            const i = document.createElement("span"); i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
    return $$(".wd > span", el);
  };

  /* ---------------------------------------------------------------- reveals */
  App.reveal = function (root) {
    if (!gsap || !ST) {
      $$("[data-reveal], [data-clip]", root).forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; el.style.clipPath = "none"; });
      return;
    }
    $$("[data-split]:not([data-split-manual])", root).forEach((el) => {
      const words = App.split(el);
      gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    $$("[data-reveal]", root).forEach((el) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay: parseFloat(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 90%" } });
    });
    $$("[data-clip]", root).forEach((el) => {
      gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 88%" } });
      const img = $("img", el);
      if (img) gsap.from(img, { scale: 1.3, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    $$("[data-parallax]", root).forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 0.15;
      gsap.fromTo(el, { yPercent: -amt * 50 }, { yPercent: amt * 50, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$("[data-count]", root).forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => { el.firstChild.nodeValue = Math.round(o.v); } });
    });
  };

  /* ------------------------------------------------------------------ clock */
  function tickClock() {
    let t;
    try { t = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { t = ""; }
    $$("[data-clock]").forEach((el) => (el.textContent = t + " PHT"));
  }
  tickClock(); setInterval(tickClock, 15000);

  /* ---------------------------------------------------------- toast + copy */
  App.toast = function (msg) {
    const t = $(".toast");
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("is-on"), 2200);
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const done = () => App.toast("Email copied — talk soon ✦");
    if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, () => (location.href = "mailto:" + EMAIL));
    else location.href = "mailto:" + EMAIL;
  });

  /* ----------------------------------------------------------- grid overlay */
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "g" || e.key === "G") $(".grid-overlay").classList.toggle("is-on");
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) menuBtn.click();
  });

  /* -------------------------------------------------------- page transition */
  const tr = $(".transition"), trCols = $$(".transition i"), trLabel = $(".t-label");
  const NAMES = { "index.html": "Home", "work.html": "Work", "about.html": "About", "contact.html": "Contact", "project.html": "Case study" };

  function isInternal(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    try {
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin) return false;
      if (u.pathname === location.pathname && u.search === location.search && u.hash) return false;
    } catch (e) { return false; }
    return /\.html($|\?|#)|\/$/.test(href) || !/\.\w+$/.test(href.split("?")[0]);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !isInternal(a)) return;
    if (!gsap) return;
    e.preventDefault();
    const file = (a.getAttribute("href").split("?")[0].split("/").pop() || "index.html");
    trLabel.innerHTML = `<span class="logo-mark"><i></i><i></i><i></i></span>${a.dataset.name || NAMES[file] || ""}`;
    store.set("cg-transit", "1");
    gsap.timeline({ onComplete: () => (location.href = a.href) })
      .set(trCols, { transformOrigin: "bottom" })
      .to(trCols, { scaleY: 1, duration: 0.6, stagger: 0.05, ease: "expo.inOut" })
      .to(trLabel, { opacity: 1, duration: 0.3 }, "-=0.3");
  });

  function transitionIn() {
    if (!gsap || store.get("cg-transit") !== "1") return 0;
    store.set("cg-transit", "0");
    gsap.timeline()
      .set(trCols, { scaleY: 1, transformOrigin: "top" })
      .to(trCols, { scaleY: 0, duration: 0.8, stagger: 0.05, ease: "expo.inOut", delay: 0.1 });
    return 0.45;
  }
  window.addEventListener("pageshow", (e) => { if (e.persisted && gsap) { gsap.set(trCols, { scaleY: 0 }); gsap.set(trLabel, { opacity: 0 }); } });

  /* -------------------------------------------------------------- preloader */
  function preloader() {
    return new Promise((resolve) => {
      if (page !== "home" || !gsap || store.get("cg-loaded")) return resolve(false);
      store.set("cg-loaded", "1");
      document.body.insertAdjacentHTML("beforeend", `
        <div class="preloader" aria-hidden="true">
          <div class="pl-top mono"><span>Christine Gabayeron</span><span>Portfolio ’26</span></div>
          <div class="pl-rings"><i></i><i></i><i></i></div>
          <div class="pl-top mono" style="align-items:flex-end"><span>UI/UX · Graphic · Web Dev</span><span class="pl-count">0</span></div>
        </div>`);
      const pl = $(".preloader"), count = $(".pl-count", pl), rings = $$(".pl-rings i", pl);
      if (App.lenis) App.lenis.stop();
      const o = { v: 0 };
      gsap.timeline({ onComplete: () => { pl.remove(); if (App.lenis) App.lenis.start(); } })
        .from(rings, { scale: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)" })
        .to(o, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => (count.textContent = Math.round(o.v)) }, 0)
        .to(rings[0], { x: -34, duration: 0.7, ease: "expo.inOut" }, 0.9)
        .to(rings[2], { x: 34, duration: 0.7, ease: "expo.inOut" }, 0.9)
        .to(rings, { x: 0, duration: 0.5, ease: "expo.inOut" }, 1.6)
        .add(() => resolve(true), 2.0)
        .to(pl, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, 2.0);
      gsap.set(pl, { clipPath: "inset(0 0 0% 0)" });
    });
  }

  /* -------------------------------------------------------------------- go */
  document.addEventListener("DOMContentLoaded", () => {
    App.magnetic(document);
    const delay = transitionIn();
    preloader().then((hadPreloader) => {
      App.startDelay = hadPreloader ? 0.1 : delay;
      document.dispatchEvent(new CustomEvent("app:start", { detail: { delay: App.startDelay } }));
      App.reveal(document);
      if (ST) { setTimeout(() => ST.refresh(), 300); window.addEventListener("load", () => ST.refresh()); }
    });
  });
})();
