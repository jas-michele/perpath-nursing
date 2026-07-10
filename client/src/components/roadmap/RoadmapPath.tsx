function RoadmapPath() {
  return (
    <svg
      className="roadmap-path"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="roadmapGradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <path
        d="
          M100 520
          C220 470 280 430 360 390
          S520 300 610 250
          S780 170 900 80
        "
        fill="none"
        stroke="url(#roadmapGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default RoadmapPath;