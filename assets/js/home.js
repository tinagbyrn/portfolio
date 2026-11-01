/* Home: 3D rings choreography, hero intro, word-fill statement, horizontal work, marquee */
(function () {
  const { $, $$, gsap, reduce } = window.App;
  const ST = window.ScrollTrigger;
  const hero = $("#hero");
  const rings = window.Rings($(".gl"), { dragEl: hero });

  /* rings placement per breakpoint */
  const mq = window.matchMedia("(max-width: 860px)");
  function place() {
    if (mq.matches) { rings.setOffset(0, 1.15); rings.setScale(0.62); }
    else { rings.setOffset(2.5, 0.25); rings.setScale(1); }
  }
  place();
  mq.addEventListener ? mq.addEventListener("change", place) : mq.addListener(place);

  /* role pills → highlight a ring */
  $$("[data-ring]").forEach((el) => {
    const i = +el.dataset.ring;
    el.addEventListener("pointerenter", () => rings.setHighlight(i));
    el.addEventListener("pointerleave", () => rings.setHighlight(-1));
    el.addEventListener("focus", () => rings.setHighlight(i));
    el.addEventListener("blur", () => rings.setHighlight(-1));
  });
  $$(".disc").forEach((el, i) => {
    el.addEventListener("pointerenter", () => rings.setHighlight(i));
    el.addEventListener("pointerleave", () => rings.setHighlight(-1));
  });

  $("[data-scroll]").addEventListener("click", (e) => { e.preventDefault(); window.App.scrollTo($("#statement")); });

  /* selected work slides */
  const featured = ["cruz-garcia", "the-hive", "pod", "c-o-sportswear", "mobile-concepts"];
  const track = $("#track");
  track.innerHTML = featured.map((slug, i) => {
    const p = window.PROJECTS.find((x) => x.slug === slug);
    return `<a class="slide" href="project.html?p=${p.slug}" data-cursor="View" data-name="${p.title}">
      <div class="frame">${window.coverHTML(p)}</div>
      <div class="s-meta"><h3>${p.title}</h3><span class="tags">${window.tagsHTML(p)}<span class="mono muted" style="margin-left:6px">0${i + 1}</span></span></div>
      <p class="muted" style="margin:4px 0 0">${p.type}</p>
    </a>`;
  }).join("") + `<div class="slide-end"><a href="work.html" class="circle-btn" data-magnetic>See all<br>${window.PROJECTS.length} projects</a></div>`;
  window.App.magnetic(track);

  /* statement: wrap words for scroll-fill */
  const st = $("[data-words]");
  (function wrapWords(node, hl) {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) return f.appendChild(document.createTextNode(" "));
          const s = document.createElement("span"); s.className = "w" + (hl ? " hl" : ""); s.textContent = w; f.appendChild(s);
        });
        n.replaceWith(f);
      } else if (n.nodeType === 1) wrapWords(n, hl || n.classList.contains("hl"));
    });
  })(st, false);
  const words = $$(".w", st);

  document.addEventListener("app:start", (e) => {
    const d = e.detail.delay || 0;

    /* hero intro */
    const hw = window.App.split($(".hero h1"));
    if (gsap) {
      gsap.timeline({ delay: d })
        .from(hw, { yPercent: 120, rotate: 6, duration: 1.4, ease: "expo.out", stagger: 0.06 })
        .from(".h-in", { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06 }, 0.35);
    }

    if (!gsap || !ST) { words.forEach((w) => w.classList.add("on")); return; }

    /* statement word fill */
    ST.create({
      trigger: st, start: "top 80%", end: "bottom 45%", scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      }
    });

    /* rings: intersect in hero → pull apart over the statement → fade before cards */
    ST.create({
      trigger: "#statement", start: "top bottom", end: "bottom 30%", scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        rings.setSpread(Math.min(1, p * 1.4));
        if (mq.matches) { rings.setOffset(0, 1.15 - p * 0.6); rings.setScale(0.62 - p * 0.22); }
        else { rings.setOffset(2.5 - p * 2.5, 0.25 + p * 0.9); rings.setScale(1 - p * 0.45); }
      }
    });
    ST.create({
      trigger: "#disciplines", start: "top 75%", end: "top 15%", scrub: true,
      onUpdate: (self) => rings.setOpacity(1 - self.progress)
    });

    /* horizontal selected work (desktop only) */
    const mm = gsap.matchMedia();
    mm.add("(min-width: 861px)", () => {
      const dist = () => track.scrollWidth - window.innerWidth + 40;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: "#selected", pin: true, scrub: 1, start: "top top", end: () => "+=" + dist(), invalidateOnRefresh: true }
      });
      gsap.to(".progress-line i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "#selected", start: "top top", end: () => "+=" + dist(), scrub: true } });
      $$(".slide .frame", track).forEach((f) => {
        gsap.fromTo(f, { rotate: 2, y: 30 }, { rotate: 0, y: 0, ease: "none", scrollTrigger: { trigger: f, containerAnimation: tween, start: "left right", end: "center center", scrub: true } });
      });
    });
    mm.add("(max-width: 860px)", () => {
      $$(".slide", track).forEach((s) => gsap.from(s, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 90%" } }));
    });

    /* marquee: drifts on its own, speeds up and flips with scroll direction */
    const mt = $(".marquee-track");
    mt.innerHTML += mt.innerHTML;
    let x = 0, dir = -1, vel = 0;
    ST.create({ trigger: ".marquee", start: "top bottom", end: "bottom top", onUpdate: (self) => { dir = self.direction === 1 ? -1 : 1; vel = Math.min(Math.abs(self.getVelocity()) / 300, 12); } });
    gsap.ticker.add(() => {
      const half = mt.scrollWidth / 2;
      x += dir * (0.6 + vel);
      vel *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      mt.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
})();
