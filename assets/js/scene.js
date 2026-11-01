/* Three rings — UI/UX, Graphic, Web Dev.
   Each ring is a thin solid torus (the build) wrapped in a loose wireframe torus (the blueprint).
   API: setHighlight(i), setSpread(0..1), setOffset(x, y), setScale(s), setOpacity(o), boost() */
(function () {
  const COLORS = [0xe4572e, 0xd99a1e, 0x3d5a80];
  const lerp = (a, b, t) => a + (b - a) * t;

  window.Rings = function (container, opts) {
    opts = Object.assign({ dragEl: null, particles: true, fov: 35, camZ: 9 }, opts || {});
    const THREE = window.THREE;
    const noop = { setHighlight() {}, setSpread() {}, setOffset() {}, setScale() {}, setOpacity() {}, boost() {} };
    if (!THREE) return noop;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { return noop; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(opts.fov, 1, 0.1, 100);
    camera.position.z = opts.camZ;

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe9dfcf, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 5, 6);
    scene.add(key);

    const root = new THREE.Group();
    scene.add(root);

    // Three orthogonal rings: XY, XZ, YZ planes
    const baseRot = [[0, 0, 0], [Math.PI / 2, 0, 0], [0, Math.PI / 2, 0]];
    const rings = COLORS.map((c, i) => {
      const holder = new THREE.Group();
      const spin = new THREE.Group();
      const solidMat = new THREE.MeshStandardMaterial({ color: c, roughness: 0.38, metalness: 0.08, transparent: true });
      const wireMat = new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.16 });
      const solid = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.045, 24, 240), solidMat);
      const wire = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.24, 8, 64), wireMat);
      spin.add(solid, wire);
      spin.rotation.set(...baseRot[i]);
      holder.add(spin);
      root.add(holder);
      return { holder, spin, wire, solid, wireMat, solidMat, hl: 0, dim: 1 };
    });
    root.rotation.set(0.45, -0.5, 0.15);

    // Graph-paper dust
    let dust;
    if (opts.particles) {
      const n = 420, pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = 4 + Math.random() * 7, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(p) * Math.cos(t);
        pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        pos[i * 3 + 2] = r * Math.cos(p) - 3;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      dust = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x171614, size: 0.035, transparent: true, opacity: 0.35 }));
      scene.add(dust);
    }

    // State (targets are lerped every frame)
    const s = { hl: -1, spread: 0, ox: 0, oy: 0, scale: 1, opacity: 1, boost: 0 };
    const cur = { spread: 0, ox: 0, oy: 0, scale: 1, opacity: 1 };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const drag = { on: false, lx: 0, ly: 0, vx: 0, vy: 0, rx: 0, ry: 0 };

    window.addEventListener("pointermove", (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (drag.on) {
        drag.vx = (e.clientX - drag.lx) * 0.006;
        drag.vy = (e.clientY - drag.ly) * 0.006;
        drag.lx = e.clientX; drag.ly = e.clientY;
      }
    }, { passive: true });
    if (opts.dragEl) {
      opts.dragEl.addEventListener("pointerdown", (e) => {
        if (e.target.closest("a, button, input, textarea")) return;
        drag.on = true; drag.lx = e.clientX; drag.ly = e.clientY;
      });
      window.addEventListener("pointerup", () => { drag.on = false; });
    }

    function resize() {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(container);
    else window.addEventListener("resize", resize);

    let visible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(container);
    }

    const clock = new THREE.Clock();
    function tick() {
      requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const speed = (reduce ? 0.5 : 1) * (1 + s.boost * 4);
      s.boost = lerp(s.boost, 0, 0.03);

      mouse.x = lerp(mouse.x, mouse.tx, 0.06);
      mouse.y = lerp(mouse.y, mouse.ty, 0.06);
      cur.spread = lerp(cur.spread, s.spread, 0.08);
      cur.ox = lerp(cur.ox, s.ox, 0.08);
      cur.oy = lerp(cur.oy, s.oy, 0.08);
      cur.scale = lerp(cur.scale, s.scale, 0.08);
      cur.opacity = lerp(cur.opacity, s.opacity, 0.1);

      // drag inertia
      drag.rx += drag.vy; drag.ry += drag.vx;
      if (!drag.on) { drag.vx *= 0.94; drag.vy *= 0.94; }

      root.position.set(cur.ox, cur.oy, 0);
      root.scale.setScalar(cur.scale);
      root.rotation.x = 0.45 + mouse.y * 0.35 + drag.rx + Math.sin(t * 0.3) * 0.05;
      root.rotation.y = -0.5 + mouse.x * 0.5 + drag.ry + t * 0.08 * speed;

      const narrow = camera.aspect < 0.9;
      rings.forEach((r, i) => {
        const k = i - 1;
        // spread: separate along x (or y on narrow screens), un-rotate to face camera a bit
        r.holder.position.x = narrow ? 0 : k * 3.7 * cur.spread;
        r.holder.position.y = narrow ? -k * 3.7 * cur.spread : 0;
        r.spin.rotation.z += dt * (0.25 + i * 0.12) * speed;
        r.spin.rotation.x = baseRot[i][0] * (1 - cur.spread) + Math.sin(t * 0.5 + i) * 0.08;
        r.spin.rotation.y = baseRot[i][1] * (1 - cur.spread * 0.7);

        const on = s.hl === i ? 1 : 0;
        r.hl = lerp(r.hl, on, 0.1);
        const dim = s.hl >= 0 && s.hl !== i ? 0.35 : 1;
        r.dim = lerp(r.dim, dim, 0.1);
        r.solidMat.opacity = cur.opacity * r.dim;
        r.wireMat.opacity = cur.opacity * (0.16 + r.hl * 0.4) * r.dim;
        const sc = 1 + r.hl * 0.08;
        r.holder.scale.setScalar(sc);
        r.wire.rotation.z = -t * 0.2 * speed;
      });
      root.visible = cur.opacity > 0.01;

      if (dust) {
        dust.rotation.y = t * 0.02 + mouse.x * 0.15;
        dust.rotation.x = mouse.y * 0.1;
        dust.material.opacity = 0.35 * cur.opacity;
      }
      renderer.render(scene, camera);
    }
    tick();

    return {
      setHighlight(i) { s.hl = i; },
      setSpread(v) { s.spread = v; },
      setOffset(x, y) { s.ox = x; s.oy = y || 0; },
      setScale(v) { s.scale = v; },
      setOpacity(v) { s.opacity = v; },
      boost() { s.boost = Math.min(s.boost + 0.35, 1.5); },
      camera
    };
  };
})();
