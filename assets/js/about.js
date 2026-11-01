/* About: portrait spotlight reveal, process rail */
(function () {
  const { $, $$, gsap, reduce } = window.App;

  /* move over the portrait → a circle reveals the second photo */
  const pt = $(".portrait"), alt = $(".p-alt", pt);
  if (pt && gsap) {
    const o = { r: 0, x: 50, y: 50 };
    const draw = () => (alt.style.clipPath = `circle(${o.r}px at ${o.x}% ${o.y}%)`);
    pt.addEventListener("pointermove", (e) => {
      const r = pt.getBoundingClientRect();
      gsap.to(o, { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, duration: 0.5, ease: "power3", onUpdate: draw });
    });
    pt.addEventListener("pointerenter", () => gsap.to(o, { r: Math.max(pt.offsetWidth, pt.offsetHeight) * 0.28, duration: 0.7, ease: "expo.out", onUpdate: draw }));
    pt.addEventListener("pointerleave", () => gsap.to(o, { r: 0, duration: 0.6, ease: "expo.out", onUpdate: draw }));
    // touch: tap toggles the full alternate photo
    pt.addEventListener("click", () => gsap.to(o, { r: o.r > 300 ? 0 : 1200, duration: 1, ease: "expo.inOut", onUpdate: draw }));
  }

  /* process rail fills and lights steps as you scroll */
  document.addEventListener("app:start", () => {
    const ST = window.ScrollTrigger;
    const steps = $$(".step");
    if (!gsap || !ST) { steps.forEach((s) => s.classList.add("on")); return; }
    const vertical = window.matchMedia("(max-width: 1024px)").matches;
    ST.create({
      trigger: ".steps", start: "top 75%", end: "bottom 45%", scrub: true,
      onUpdate: (self) => {
        $(".steps .rail i").style.transform = vertical ? `scaleY(${self.progress})` : `scaleX(${self.progress})`;
        steps.forEach((s, i) => s.classList.toggle("on", self.progress >= i / steps.length));
      }
    });
    gsap.from(steps, { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".steps", start: "top 85%" } });
  });
})();
