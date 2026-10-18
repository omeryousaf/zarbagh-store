export function GroveScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.22_0.04_130)_0%,oklch(0.28_0.05_90)_42%,oklch(0.38_0.1_70)_72%,oklch(0.55_0.14_55)_100%)]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_80%,oklch(0.7_0.16_55)_0%,transparent_42%),radial-gradient(ellipse_at_80%_30%,oklch(0.45_0.08_140)_0%,transparent_50%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="oklch(0.2 0.05 140)" opacity="0.9">
          <ellipse cx="120" cy="620" rx="220" ry="90" />
          <ellipse cx="480" cy="650" rx="280" ry="100" />
          <ellipse cx="860" cy="630" rx="250" ry="95" />
          <ellipse cx="1120" cy="660" rx="180" ry="80" />
        </g>
        <g fill="oklch(0.27 0.07 140)">
          <circle cx="180" cy="430" r="150" />
          <circle cx="320" cy="390" r="130" />
          <circle cx="560" cy="360" r="170" />
          <circle cx="780" cy="400" r="145" />
          <circle cx="980" cy="370" r="160" />
          <circle cx="1140" cy="430" r="120" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,oklch(0.18_0.04_70_/_0.55)_100%)]" />
    </div>
  );
}
