/* Contact: rings that react to typing, mailto form */
(function () {
  const { $, $$, EMAIL } = window.App;
  const box = $(".side-gl");
  const rings = window.Rings(box, { dragEl: box, particles: false, camZ: 7.2 });

  const form = $("#contact-form");
  $$("input, textarea", form).forEach((el) => {
    el.addEventListener("input", () => rings.boost());
    el.addEventListener("focus", () => rings.setHighlight(el.type === "checkbox" ? 1 : el.tagName === "TEXTAREA" ? 2 : 0));
    el.addEventListener("blur", () => rings.setHighlight(-1));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    const bad = [];
    if (!name) bad.push(form.name);
    if (!/^\S+@\S+\.\S+$/.test(email)) bad.push(form.email);
    if (!msg) bad.push(form.message);
    $$(".field", form).forEach((f) => (f.style.borderBottomColor = ""));
    if (bad.length) {
      bad.forEach((el) => (el.closest(".field").style.borderBottomColor = "var(--ux)"));
      bad[0].focus();
      window.App.toast("Please fill in your name, a valid email and a message");
      return;
    }
    const types = $$("input[name=type]:checked", form).map((c) => c.value).join(", ") || "—";
    const body = `Hi Christine,\n\n${msg}\n\nLooking for: ${types}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry from " + name)}&body=${encodeURIComponent(body)}`;
    rings.boost(); rings.boost(); rings.boost();
    window.App.toast("Opening your email app…");
  });
})();
