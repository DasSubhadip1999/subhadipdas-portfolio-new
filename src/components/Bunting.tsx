const COLORS = ["#FFC72C", "#C8321F", "#00796B", "#1F4FA3", "#C2185B", "#2E7D32"];
const N = 28;
const W = 1400;
const SAG = 26;

// Paper bunting strung across the street between sections.
export function Bunting({ offset = 0 }: { offset?: number }) {
  const y = (t: number) => 6 + SAG * 4 * t * (1 - t);
  return (
    <div aria-hidden className="pointer-events-none overflow-hidden">
      <svg viewBox={`0 0 ${W} 74`} className="block h-auto w-full min-w-[720px]" preserveAspectRatio="xMidYMin slice">
        <path d={`M0 6 Q ${W / 2} ${6 + SAG * 2} ${W} 6`} fill="none" stroke="#5f686d" strokeWidth="2" />
        {Array.from({ length: N }, (_, i) => {
          const t = (i + 0.5) / N;
          const x = t * W;
          return (
            <polygon
              key={i}
              className="flag"
              style={{ animationDelay: `${-(i % 7) * 0.45}s` }}
              points={`${x - 19},${y(t)} ${x + 19},${y(t)} ${x},${y(t) + 40}`}
              fill={COLORS[(i + offset) % COLORS.length]}
            />
          );
        })}
      </svg>
    </div>
  );
}
