export default function MaterialFallback({ stage = 0 }: { stage?: number }) {
  return (
    <svg
      viewBox="0 0 640 600"
      className="tx-material-fallback"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tx-fabric-shade" x1="0" x2="1" y1="0" y2="0.8">
          <stop stopColor="#202324" />
          <stop offset=".35" stopColor="#787d7b" />
          <stop offset=".6" stopColor="#242827" />
          <stop offset="1" stopColor="#929693" />
        </linearGradient>
      </defs>
      {stage === 0 ? (
        <g transform="rotate(-22 320 300)">
          <path
            d="M100 130C220 245 290 40 430 130L540 440C390 360 300 555 170 420Z"
            fill="url(#tx-fabric-shade)"
          />
          {Array.from({ length: 48 }, (_, i) => (
            <path
              key={i}
              d={`M${100 + i * 1.5} ${130 + i * 6}C${220 + i} ${245 + i * 4} ${290 + i * 1.5} ${40 + i * 7} ${430 + i * 2.3} ${130 + i * 6.5}`}
              stroke={i > 43 ? "#e43a2e" : "#c3c6be"}
              strokeWidth="1"
              fill="none"
              opacity=".55"
            />
          ))}
        </g>
      ) : stage === 1 ? (
        <g
          fill="none"
          stroke="#303734"
          strokeWidth="1.5"
          transform="translate(100 75)"
        >
          <path
            d="M80 50L150 20Q220 80 290 20L360 50L400 170L325 200L320 430H120L115 200L40 170Z"
            fill="#d7d9d1"
          />
          <path
            d="M220 70V420M130 360H310M120 200L150 50M325 200L290 50"
            strokeDasharray="5 5"
          />
          <path d="M60 460H380M60 450V470M380 450V470" stroke="#d93a2c" />
        </g>
      ) : (
        <g stroke="#6b7d8a" fill="none">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <g key={`${row}-${col}`}>
                <path
                  d={`M${120 + col * 130} ${110 + row * 120}L320 300`}
                  opacity=".35"
                />
                <rect
                  x={95 + col * 130}
                  y={85 + row * 120}
                  width="50"
                  height="50"
                  rx="5"
                  fill="#e4e8e4"
                />
              </g>
            )),
          )}
          <rect
            x="275"
            y="255"
            width="90"
            height="90"
            rx="8"
            fill="#e83b2c"
            stroke="none"
          />
        </g>
      )}
    </svg>
  );
}
