import { useEffect, useRef } from "react";

const INK = "#242025";
const CREAM = "#fffaf3";
const PURPLE = "#9c92ac";

// ---- tuning ----
const SPEED = 800;        // world units per second
const LOOP = 1600;        // world length before it repeats
const GIRL_X = 110;       // her x in the viewBox
const HOP_HEIGHT = 66;    // peak jump height
const HOP_REACH = 60;     // how far (in units) before/after a bug she is airborne
const BUG_W = 30;         // 6 px * scale 5
const MUG_W = 35;         // 7 px * scale 5

// world x positions (left edge) at t = 0
const BUG_XS = [649, 1289];
const MUG_XS = [942, 1022];

// scrolling ground dashes, one 80px pattern repeated so the loop is seamless
const DASHES = Array.from({ length: 8 }).flatMap((_, k) => [
  { x: k * 80 + 10, w: 14 },
  { x: k * 80 + 38, w: 6 },
  { x: k * 80 + 60, w: 10 },
]);

function Mug({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 320) scale(5)`} shapeRendering="crispEdges">
      <g className="mug-steam" fill={CREAM} opacity=".6">
        <rect x="1" y="-8" width="1" height="2" />
        <rect x="3" y="-9" width="1" height="2" />
      </g>
      <rect x="0" y="-5" width="5" height="5" fill={CREAM} />
      <rect x="1" y="-5" width="3" height="1" fill={INK} />
      <rect x="5" y="-4" width="2" height="1" fill={CREAM} />
      <rect x="6" y="-3" width="1" height="2" fill={CREAM} />
      <rect x="5" y="-1" width="2" height="1" fill={CREAM} />
    </g>
  );
}

function Bug({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 320) scale(5)`} shapeRendering="crispEdges">
      <rect x="1" y="-4" width="4" height="1" fill={INK} />
      <rect x="0" y="-3" width="6" height="2" fill={INK} />
      <rect x="5" y="-5" width="1" height="1" fill={INK} />
      <rect x="1" y="-3" width="1" height="1" fill={CREAM} />
      <g className="leg-a" fill={INK}>
        <rect x="0" y="-1" width="1" height="1" />
        <rect x="2" y="-1" width="1" height="1" />
        <rect x="4" y="-1" width="1" height="1" />
      </g>
      <g className="leg-b" fill={INK}>
        <rect x="1" y="-1" width="1" height="1" />
        <rect x="3" y="-1" width="1" height="1" />
        <rect x="5" y="-1" width="1" height="1" />
      </g>
    </g>
  );
}

function Cloud({ y, className }: { y: number; className: string }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <g className={`cloud ${className}`} fill={CREAM} opacity=".5">
        <rect x="10" y="0" width="16" height="8" />
        <rect x="0" y="8" width="44" height="8" />
      </g>
    </g>
  );
}

export default function CoffeeCup() {
  const trackRef = useRef<SVGGElement>(null);
  const hopRef = useRef<SVGGElement>(null);
  const mugRefs = useRef<(SVGGElement | null)[]>([]);
  const popRefs = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      trackRef.current?.setAttribute("transform", "translate(-330 0)");
      return;
    }

    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const offset = (((now - start) / 1000) * SPEED) % LOOP;

      // scroll everything toward her
      trackRef.current?.setAttribute("transform", `translate(${-offset} 0)`);

      // hop: a parabola centred on whichever bug is closest to her
      let hop = 0;
      for (const bx of BUG_XS) {
        const dx = bx - offset + BUG_W / 2 - GIRL_X; // bug centre relative to her
        const k = 1 - (dx / HOP_REACH) ** 2;
        if (k > 0) hop = Math.max(hop, HOP_HEIGHT * k);
      }
      hopRef.current?.setAttribute("transform", `translate(0 ${-hop})`);

      // mugs vanish when she reaches them, then a "+1" floats up
      MUG_XS.forEach((mx, i) => {
        const screenX = mx - offset;
        const collectedAt = GIRL_X + 10;
        mugRefs.current[i]?.setAttribute(
          "visibility",
          screenX > collectedAt ? "visible" : "hidden"
        );

        const age = (collectedAt - screenX) / SPEED; // seconds since collected
        const pop = popRefs.current[i];
        if (pop) {
          if (age >= 0 && age < 0.45) {
            const p = age / 0.45;
            pop.setAttribute("opacity", String(1 - p));
            pop.setAttribute("transform", `translate(0 ${-24 * p})`);
          } else {
            pop.setAttribute("opacity", "0");
          }
        }
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="cup-scene"
      role="img"
      aria-label="Pixel animation of a girl running, collecting mugs and jumping over bugs"
    >
      <svg viewBox="0 0 440 400" preserveAspectRatio="xMidYMax meet" className="cup-svg" aria-hidden="true">
        <Cloud y={70} className="cloud-1" />
        <Cloud y={140} className="cloud-2" />

        {/* ground */}
        <rect className="ground-line" x="0" y="320" width="440" height="4" fill={CREAM} opacity=".6" />
        <g className="ground-dashes" fill={INK} opacity=".3" shapeRendering="crispEdges">
          {DASHES.map((d, i) => (
            <rect key={i} x={d.x} y="334" width={d.w} height="3" />
          ))}
        </g>

        {/* things that scroll toward her */}
        <g ref={trackRef}>
          <Bug x={BUG_XS[0]} />
          <g ref={(el) => { mugRefs.current[0] = el; }}><Mug x={MUG_XS[0]} /></g>
          <g ref={(el) => { mugRefs.current[1] = el; }}><Mug x={MUG_XS[1]} /></g>
          <Bug x={BUG_XS[1]} />
        </g>

        {/* +1 pops */}
        {[0, 1].map((i) => (
          <text
            key={i}
            ref={(el) => { popRefs.current[i] = el; }}
            x="150" y="236" opacity="0"
            fill={CREAM} fontFamily="DM Mono, monospace" fontSize="18" fontWeight="500"
          >
            +1
          </text>
        ))}

        {/* the girl */}
        <g transform="translate(110 320)">
          <g ref={hopRef}>
            <g transform="scale(6)" shapeRendering="crispEdges">
              <g className="runner-bob">
                {/* bow */}
                <rect x="-3" y="-16" width="1" height="2" fill={PURPLE} />
                <rect x="-1" y="-16" width="1" height="2" fill={PURPLE} />
                <rect x="-2" y="-15" width="1" height="1" fill={CREAM} />
                {/* ponytail */}
                <rect x="-3" y="-13" width="1" height="2" fill={INK} />
                <rect x="-4" y="-12" width="1" height="3" fill={INK} />
                <rect x="-5" y="-10" width="1" height="1" fill={INK} />
                {/* head */}
                <rect x="-2" y="-14" width="4" height="4" fill={INK} />
                {/* t-shirt */}
                <rect x="-2" y="-10" width="4" height="4" fill={PURPLE} />
                {/* arms */}
                <rect x="2" y="-10" width="1" height="5" fill={INK} />
                <rect x="-3" y="-10" width="1" height="5" fill={INK} />
              </g>

              {/* legs, two frames */}
              <g className="leg-a">
                <rect x="-2" y="-6" width="2" height="4" fill={CREAM} />
                <rect x="-2" y="-2" width="3" height="2" fill={INK} />
                <rect x="1" y="-6" width="2" height="3" fill={CREAM} />
                <rect x="1" y="-3" width="2" height="2" fill={INK} />
              </g>
              <g className="leg-b">
                <rect x="0" y="-6" width="2" height="4" fill={CREAM} />
                <rect x="0" y="-2" width="2" height="2" fill={INK} />
                <rect x="-2" y="-6" width="2" height="3" fill={CREAM} />
                <rect x="-3" y="-3" width="2" height="2" fill={INK} />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}