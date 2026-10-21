// Decorative falling petals. Positions are fixed so server and client render match.
const petals = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 1.3) % 11,
  duration: 9 + ((i * 7) % 8),
  size: 10 + ((i * 5) % 10),
}));

export default function Sakura() {
  return (
    <div className="sakura" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
