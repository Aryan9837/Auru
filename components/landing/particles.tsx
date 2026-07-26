const particles = [
  { left: "8%", size: 2, duration: 14, delay: 0 },
  { left: "22%", size: 4, duration: 20, delay: 3 },
  { left: "38%", size: 3, duration: 16, delay: 1 },
  { left: "52%", size: 5, duration: 24, delay: 5 },
  { left: "68%", size: 2, duration: 12, delay: 2 },
  { left: "82%", size: 4, duration: 18, delay: 7 },
  { left: "92%", size: 3, duration: 22, delay: 4 },
  { left: "15%", size: 3, duration: 15, delay: 6 },
  { left: "45%", size: 2, duration: 19, delay: 8 },
  { left: "75%", size: 5, duration: 13, delay: 1 },
  { left: "30%", size: 4, duration: 21, delay: 9 },
  { left: "60%", size: 2, duration: 17, delay: 3 },
  { left: "88%", size: 3, duration: 25, delay: 6 },
  { left: "12%", size: 5, duration: 11, delay: 0 },
  { left: "55%", size: 3, duration: 23, delay: 2 },
  { left: "35%", size: 2, duration: 14, delay: 5 },
  { left: "70%", size: 4, duration: 20, delay: 8 },
  { left: "48%", size: 3, duration: 16, delay: 4 },
  { left: "95%", size: 4, duration: 18, delay: 1 },
  { left: "5%", size: 2, duration: 22, delay: 7 },
];

export function Particles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: "rgba(250, 204, 21, 0.15)",
            boxShadow:
              p.size > 4 ? "0 0 8px rgba(250, 204, 21, 0.08)" : "none",
          }}
        />
      ))}
    </div>
  );
}
