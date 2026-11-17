const INK = "#242025";
const CREAM = "#fffaf3";
const PURPLE = "#9c92ac";

// scrolling ground dashes, one 80px pattern repeated so the loop is seamless
const DASHES = Array.from({ length: 8 }).flatMap((_, k) => [
  { x: k * 80 + 10, w: 14 },
  { x: k * 80 + 38, w: 6 },
  { x: k * 80 + 60, w: 10 },
]);

function Mug({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 320) scale(5)`} shapeRendering="crispEdges">
      {/* steam */}
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
  return (
    <div
      className="cup-scene"
      role="img"
      aria-label="Pixel animation of a girl running, collecting mugs and jumping over bugs"
    >
      <svg viewBox="0 0 440 400" className="cup-svg" aria-hidden="true">
        <Cloud y={70} className="cloud-1" />
        <Cloud y={140} className="cloud-2" />

        {/* ground */}
        <rect x="0" y="320" width="440" height="4" fill={CREAM} opacity=".6" />
        <g className="ground-dashes" fill={INK} opacity=".3" shapeRendering="crispEdges">
          {DASHES.map((d, i) => (
            <rect key={i} x={d.x} y="334" width={d.w} height="3" />
          ))}
        </g>

        {/* things that scroll toward her */}
        <g className="runner-track">
          <Bug x={462} />
          <g className="mug-1"><Mug x={640} /></g>
          <g className="mug-2"><Mug x={720} /></g>
          <Bug x={910} />
        </g>

        {/* +1 pops */}
        <text className="pop pop-1" x="150" y="236" fill={CREAM} fontFamily="DM Mono, monospace" fontSize="18" fontWeight="500">+1</text>
        <text className="pop pop-2" x="150" y="236" fill={CREAM} fontFamily="DM Mono, monospace" fontSize="18" fontWeight="500">+1</text>

      {/* the girl */}
        {/* the girl */}
<g transform="translate(110 320)">
  <g className="runner-hop">
    <g transform="scale(6)" shapeRendering="crispEdges">

      {/* upper body bobs with each step */}
      <g className="runner-bob">
        {/* bow */}
        <rect x="-3" y="-16" width="1" height="2" fill={PURPLE} />
        <rect x="-1" y="-16" width="1" height="2" fill={PURPLE} />
        <rect x="-2" y="-15" width="1" height="1" fill={CREAM} />

        {/* ponytail (static) */}
        <rect x="-3" y="-13" width="1" height="2" fill={INK} />
        <rect x="-4" y="-12" width="1" height="3" fill={INK} />
        <rect x="-5" y="-10" width="1" height="1" fill={INK} />

        {/* head / face  */}
        <rect x="-2" y="-14" width="4" height="4" fill={INK} />
        {/* <rect x="1" y="-13" width="1" height="1" fill={CREAM} /> */}

        {/* t-shirt */}
        <rect x="-2" y="-10" width="4" height="4" fill={PURPLE} />

{/* arms: straight and static */}
        <g>
          <rect x="2" y="-10" width="1" height="5" fill={INK} />
          <rect x="-3" y="-10" width="1" height="5" fill={INK} />
        </g>
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