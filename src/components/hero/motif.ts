// Motif: NETWORK FLOW (interactive). Particles travel along a set of bezier
// "pipes" across the canvas. The cursor is a live attractor: moving it anywhere
// bends the nearby pipes toward it, accelerates their flow and makes them glow.
// Reads as "data moving through pipelines that follow your attention", fits
// data-engineering work. Contract: see design/motifs/README.md.

export type MotifColors = { accent: string; accent2: string; dim: string };

export function startMotif(canvas: HTMLCanvasElement, colors: MotifColors): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const R = 300;          // cursor influence radius
  const PULL = 0.42;      // how hard a control point bends toward the cursor
  let w = 0, h = 0, dpr = 1, raf = 0, resizeTimer = 0;
  const mouse = { x: -9999, y: -9999, active: false };
  type Pipe = {
    p0: [number, number]; bp1: [number, number]; bp2: [number, number]; p3: [number, number];
    rp1: [number, number]; rp2: [number, number]; parts: number[]; boost: number;
  };
  let pipes: Pipe[] = [];

  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const build = () => {
    pipes = [];
    const n = Math.max(5, Math.round(h / 150));
    for (let i = 0; i < n; i++) {
      const y = h * (0.1 + (0.8 * i) / Math.max(1, n - 1));
      const bend = (Math.random() - 0.5) * h * 0.5;
      const pipe: Pipe = {
        p0: [-40, y + (Math.random() - 0.5) * 60],
        bp1: [w * 0.33, y + bend],
        bp2: [w * 0.66, y - bend],
        p3: [w + 40, y + (Math.random() - 0.5) * 60],
        rp1: [w * 0.33, y + bend],
        rp2: [w * 0.66, y - bend],
        parts: [],
        boost: 0,
      };
      const count = 6 + Math.floor(Math.random() * 4);
      for (let k = 0; k < count; k++) pipe.parts.push(Math.random());
      pipes.push(pipe);
    }
  };

  // Bend a control point toward the cursor, with distance falloff.
  const pull = (px: number, py: number): [number, number] => {
    if (!mouse.active) return [px, py];
    const dx = mouse.x - px, dy = mouse.y - py;
    const d = Math.hypot(dx, dy);
    if (d > R) return [px, py];
    const f = (1 - d / R) * PULL;
    return [px + dx * f, py + dy * f];
  };

  const bez = (p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], u: number): [number, number] => {
    const v = 1 - u;
    const x = v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0];
    const y = v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1];
    return [x, y];
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    // soft glow that follows the cursor
    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130);
      g.addColorStop(0, colors.accent2);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 130, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (const pipe of pipes) {
      const { p0, rp1, rp2, p3 } = pipe;
      // pipe path
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.bezierCurveTo(rp1[0], rp1[1], rp2[0], rp2[1], p3[0], p3[1]);
      ctx.strokeStyle = pipe.boost > 0.2 ? colors.accent2 : colors.dim;
      ctx.globalAlpha = 0.28 + pipe.boost * 0.4;
      ctx.lineWidth = 1 + pipe.boost * 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // particles as short comet dashes
      for (const u of pipe.parts) {
        const [x, y] = bez(p0, rp1, rp2, p3, u);
        const [tx, ty] = bez(p0, rp1, rp2, p3, Math.max(0, u - 0.018));
        ctx.beginPath();
        ctx.moveTo(tx, ty); ctx.lineTo(x, y);
        ctx.strokeStyle = pipe.boost > 0.2 ? colors.accent : colors.accent2;
        ctx.lineWidth = 2 + pipe.boost * 1.5;
        ctx.globalAlpha = 0.85;
        if (pipe.boost > 0.2) { ctx.shadowColor = colors.accent; ctx.shadowBlur = 12; }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }
  };

  const frame = () => {
    for (const pipe of pipes) {
      // recompute rendered control points (cursor attraction), no drift
      pipe.rp1 = pull(pipe.bp1[0], pipe.bp1[1]);
      pipe.rp2 = pull(pipe.bp2[0], pipe.bp2[1]);
      // is the cursor near this (rendered) pipe? sample a few points
      let near = false;
      if (mouse.active) {
        for (let u = 0.05; u < 1 && !near; u += 0.1) {
          const [x, y] = bez(pipe.p0, pipe.rp1, pipe.rp2, pipe.p3, u);
          if ((x - mouse.x) * (x - mouse.x) + (y - mouse.y) * (y - mouse.y) < R * R) near = true;
        }
      }
      pipe.boost += ((near ? 1 : 0) - pipe.boost) * 0.09;
      const speed = 0.0018 + pipe.boost * 0.0055;
      pipe.parts = pipe.parts.map((u) => (u + speed > 1 ? 0 : u + speed));
    }
    draw();
    raf = requestAnimationFrame(frame);
  };

  const onMove = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
  };
  const onLeave = () => { mouse.active = false; };
  const start = () => {
    size(); build();
    for (const pipe of pipes) { pipe.rp1 = pipe.bp1; pipe.rp2 = pipe.bp2; }
    if (reduce) { draw(); } else { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
  };
  const onResize = () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(start, 200); };

  start();
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseout", onLeave, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  return () => {
    cancelAnimationFrame(raf); window.clearTimeout(resizeTimer);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseout", onLeave);
    window.removeEventListener("resize", onResize);
  };
}
