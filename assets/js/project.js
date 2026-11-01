/* Case study page — rendered from window.PROJECTS using ?p=slug */
(function () {
  const { $, $$, gsap } = window.App;
  const P = window.PROJECTS;
  const main = $("#project");
  const pad = (n) => String(n).padStart(2, "0");
  const slug = new URLSearchParams(location.search).get("p");
  const idx = P.findIndex((x) => x.slug === slug);

  if (idx < 0) {
    main.innerHTML = `<section class="wrap notfound"><span class="label">Case study</span>
      <h1 class="display" data-split>Project not <span class="it">found.</span></h1>
      <a href="work.html" class="btn solid" data-magnetic>See all work <span class="arrow">→</span></a></section>`;
    return;
  }

  const p = P[idx], next = P[(idx + 1) % P.length];
  document.title = `${p.title} — Christine Gabayeron`;
  const disc = p.disciplines.map((d) => `<span style="display:inline-flex;align-items:center;gap:8px;margin-right:12px"><span class="dot ${d}"></span>${window.DISC[d].name}</span>`).join("");

  const cover = p.wire
    ? window.coverHTML(p, true)
    : `<img src="${p.cover}" alt="${p.title}" ${p.coverFit === "contain" ? 'class="contain"' : "data-parallax=\"0.18\""}>`;

  const galleryImgs = p.gallery.map((g) => g.src);
  const gallery = p.gallery.length
    ? p.gallery.map((g, k) => {
        const size = g.size === "full" ? "full" : g.size === "third" ? "third" : "";
        if (g.type === "web") {
          return `<figure class="g-item web ${size}" data-i="${k}" data-cursor="Zoom" data-reveal>
            <div class="browser"><div class="bar"><i></i><i></i><i></i><span>${p.title}</span></div>
            <div class="view"><img src="${g.src}" alt="${p.title} — screen ${k + 1}" loading="lazy"></div></div></figure>`;
        }
        return `<figure class="g-item ${g.type === "pad" ? "pad" : ""} ${size}" data-i="${k}" data-cursor="Zoom" data-reveal>
          <img src="${g.src}" alt="${p.title} — image ${k + 1}" loading="lazy"></figure>`;
      }).join("")
    : `<div class="g-item full" style="cursor:default;padding:clamp(28px,5vw,64px);background:var(--paper);border:1px solid var(--line)" data-reveal>
        <span class="label">Under NDA</span>
        <h3 class="h2" style="margin:18px 0 14px">The real screens stay <span class="it">private.</span></h3>
        <p class="lead" style="margin:0 0 26px">This is an internal company tool, so I can’t publish it. I’m happy to walk you through the process, the problems and the decisions on a call.</p>
        <a href="contact.html" class="btn solid" data-magnetic>Book a walkthrough <span class="arrow">→</span></a></div>`;

  main.innerHTML = `
    <section class="p-hero wrap">
      <a href="work.html" class="back mono link-u">← All work</a>
      <span class="label">Case ${pad(idx + 1)} / ${pad(P.length)} — ${p.type}</span>
      <h1 class="display" data-split style="margin-top:20px">${p.title}</h1>
      <p class="lead" data-reveal style="margin-top:26px">${p.summary}</p>
      <div class="p-meta" data-reveal>
        <div><span class="mono">Discipline</span>${disc}</div>
        <div><span class="mono">Role</span>${p.role}</div>
        <div><span class="mono">Tools</span>${p.tools.join(", ")}</div>
        <div><span class="mono">Type</span>${p.type}</div>
      </div>
      <div class="p-cover crop" data-clip>${cover}</div>
    </section>
    <section class="wrap p-body">
      <h2 class="h2" data-split>The <span class="it">story</span></h2>
      <div class="txt">
        ${p.body.map((t) => `<p data-reveal>${t}</p>`).join("")}
        <h4>What I made</h4>
        <ul data-reveal>${p.points.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
    </section>
    <section class="wrap gallery">${gallery}</section>
    <a href="project.html?p=${next.slug}" class="next-project" data-cursor="Next" data-name="${next.title}">
      <span class="mono muted">Next project — ${pad(((idx + 1) % P.length) + 1)}</span>
      <div class="h1" style="margin-top:14px">${next.title}</div>
    </a>`;

  /* browser frames: scroll the full screenshot on hover */
  $$(".g-item.web").forEach((f) => {
    const img = $("img", f), view = $(".view", f);
    const set = () => f.style.setProperty("--scroll", `-${Math.max(0, img.offsetHeight - view.offsetHeight)}px`);
    img.complete ? set() : img.addEventListener("load", set);
    f.addEventListener("pointerenter", set);
  });

  /* lightbox */
  const lb = $(".lightbox"), lbImg = $("img", lb), lbCount = $(".lb-count", lb);
  let cur = 0;
  function show(i) {
    cur = (i + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[cur];
    lbCount.textContent = `${pad(cur + 1)} / ${pad(galleryImgs.length)}`;
    if (gsap) gsap.fromTo(lbImg, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" });
  }
  function open(i) { lb.classList.add("is-open"); show(i); if (window.App.lenis) window.App.lenis.stop(); $(".lb-close", lb).focus(); }
  function close() { lb.classList.remove("is-open"); if (window.App.lenis) window.App.lenis.start(); }
  $$(".g-item[data-i]").forEach((f) => f.addEventListener("click", () => open(+f.dataset.i)));
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => show(cur - 1));
  $(".lb-next", lb).addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  if (galleryImgs.length < 2) { $(".lb-prev", lb).style.display = "none"; $(".lb-next", lb).style.display = "none"; }
})();
