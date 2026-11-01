/* Work index: filters (with Flip), grid/list toggle, list hover preview */
(function () {
  const { $, $$, gsap, reduce, fine } = window.App;
  const Flip = window.Flip;
  const P = window.PROJECTS;
  const list = $("#work");

  list.innerHTML = P.map((p, i) => `
    <a class="card" href="project.html?p=${p.slug}" data-cursor="View" data-name="${p.title}" data-d="${p.disciplines.join(" ")}" data-img="${p.cover || ""}">
      <div class="frame">${window.coverHTML(p)}</div>
      <div class="c-meta">
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <h3>${p.title}</h3>
        <span class="l-type">${p.type}</span>
        <span class="c-tags">${window.tagsHTML(p)}</span>
      </div>
      <p>${p.summary}</p>
    </a>`).join("");
  const cards = $$(".card", list);

  /* counts */
  $$(".filter").forEach((b) => {
    const f = b.dataset.filter;
    $("sup", b).textContent = f === "all" ? P.length : P.filter((p) => p.disciplines.includes(f)).length;
  });

  function setCount() { $("#count").textContent = cards.filter((c) => c.style.display !== "none").length; }

  function applyFilter(f, animate) {
    $$(".filter").forEach((b) => {
      const on = b.dataset.filter === f;
      b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on);
    });
    if (Flip) Flip.killFlipsOf(cards, true);
    const state = animate && Flip ? Flip.getState(cards, { props: "opacity" }) : null;
    cards.forEach((c) => { c.style.display = f === "all" || c.dataset.d.split(" ").includes(f) ? "" : "none"; });
    setCount();
    if (state) {
      Flip.from(state, {
        duration: 0.8, ease: "expo.inOut", absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
        onComplete: () => { gsap.set(cards, { clearProps: "transform,opacity" }); window.ScrollTrigger && window.ScrollTrigger.refresh(); }
      });
    }
    try { history.replaceState(null, "", f === "all" ? "work.html" : "work.html?f=" + f); } catch (e) {}
  }

  const initial = new URLSearchParams(location.search).get("f");
  applyFilter(["ux", "gfx", "dev"].includes(initial) ? initial : "all", false);
  $$(".filter").forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter, true)));

  /* grid / list */
  function setView(v, animate) {
    $$("[data-view]").forEach((b) => { const on = b.dataset.view === v; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
    try { localStorage.setItem("cg-view", v); } catch (e) {}
    const swap = () => {
      if (Flip) Flip.killFlipsOf(cards, true);
      list.className = v === "list" ? "list-view" : "grid-view";
      gsap && gsap.set(cards, { clearProps: "transform,opacity" });
      window.ScrollTrigger && window.ScrollTrigger.refresh();
    };
    if (!animate || !gsap) return swap();
    gsap.timeline()
      .to(list, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" })
      .add(swap)
      .fromTo(list, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" })
      .from(cards.filter((c) => c.style.display !== "none"), { y: 40, opacity: 0, stagger: 0.05, duration: 0.7, ease: "expo.out" }, "<");
  }
  let saved = "grid";
  try { saved = localStorage.getItem("cg-view") || "grid"; } catch (e) {}
  setView(saved, false);
  $$("[data-view]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view, true)));

  /* list hover preview follows the pointer */
  const prev = $(".hover-preview"), prevImg = $("img", prev);
  if (fine && gsap) {
    const px = gsap.quickTo(prev, "x", { duration: 0.6, ease: "power3" });
    const py = gsap.quickTo(prev, "y", { duration: 0.6, ease: "power3" });
    const rot = gsap.quickTo(prev, "rotate", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    window.addEventListener("pointermove", (e) => {
      px(e.clientX + 30); py(e.clientY - 120);
      rot(Math.max(-12, Math.min(12, (e.clientX - lastX) * 0.6))); lastX = e.clientX;
    }, { passive: true });
    cards.forEach((c) => {
      c.addEventListener("pointerenter", () => {
        if (!list.classList.contains("list-view") || !c.dataset.img) return;
        prevImg.src = c.dataset.img;
        gsap.to(prev, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" });
      });
      c.addEventListener("pointerleave", () => gsap.to(prev, { opacity: 0, scale: 0.6, duration: 0.4, ease: "expo.out" }));
    });
  }

  /* entrance */
  document.addEventListener("app:start", (e) => {
    if (!gsap) return;
    gsap.from(".toolbar", { y: 30, opacity: 0, duration: 1, ease: "expo.out", delay: (e.detail.delay || 0) + 0.3 });
    cards.forEach((c) => {
      gsap.from(c, { y: 80, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 95%" } });
    });
  });
})();
