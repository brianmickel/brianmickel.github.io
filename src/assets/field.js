// The name reacts to the cursor: each glyph's weight and width are pulled
// toward a peak as the pointer gets close, with a quadratic falloff so the
// hot zone stays tight. No library; Google Sans Flex does the work.
(() => {
  const el = document.querySelector("[data-field]");
  if (!el) return;

  const REST = { wght: 300, opsz: 144, wdth: 100 };
  const PEAK = { wght: 900, opsz: 144, wdth: 112 };
  const REACH = 240; // px
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noHover = matchMedia("(hover: none)").matches;
  const EASE = reduced ? 1 : 0.16;

  const fmt = (v) => Object.entries(v).map(([k, x]) => `"${k}" ${x.toFixed(2)}`).join(", ");

  // split into one <span> per glyph, keeping the plain name for assistive tech
  const text = el.textContent.trim();
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const chars = [];
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "ch" + (ch === " " ? " sp" : "");
    s.textContent = ch === " " ? " " : ch;
    s.setAttribute("aria-hidden", "true");
    s.style.fontVariationSettings = fmt(REST);
    el.appendChild(s);
    chars.push({ el: s, t: 0, cur: { ...REST } });
  }

  const pointer = { x: -1e4, y: -1e4, active: false };
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { pointer.active = false; });
  addEventListener("blur", () => { pointer.active = false; });

  // no cursor on touch devices: let a slow virtual one wander the name instead
  const wander = noHover && !reduced;
  const t0 = performance.now();
  function virtualPointer(now) {
    const b = el.getBoundingClientRect();
    const s = (now - t0) / 1000;
    pointer.x = b.left + b.width * (0.5 + 0.48 * Math.sin(s * 0.55));
    pointer.y = b.top + b.height * (0.5 + 0.35 * Math.sin(s * 0.9 + 1.3));
    pointer.active = b.bottom > 0 && b.top < innerHeight;
  }

  function frame(now) {
    if (wander) virtualPointer(now);
    const rects = chars.map((c) => c.el.getBoundingClientRect()); // read, then write
    chars.forEach((c, i) => {
      let target = 0;
      if (pointer.active) {
        const b = rects[i];
        const d = Math.hypot(pointer.x - (b.left + b.width / 2), pointer.y - (b.top + b.height / 2));
        const n = Math.max(0, 1 - d / REACH);
        target = n * n;
      }
      c.t += (target - c.t) * EASE;
      if (Math.abs(target - c.t) < 0.002) c.t = target;
      let changed = false; const out = {};
      for (const k in REST) {
        const v = REST[k] + (PEAK[k] - REST[k]) * c.t;
        if (Math.abs(v - c.cur[k]) > 0.01) changed = true;
        out[k] = v;
      }
      if (changed) { c.cur = out; c.el.style.fontVariationSettings = fmt(out); }
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
