const WORDS = ["Show up", "Get stronger", "Move with intent", "Build your routine", "Make the first move"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden bg-lime py-3.5 text-ink" aria-hidden="true">
      <div className="marquee flex w-max gap-8 whitespace-nowrap font-display text-3xl font-bold uppercase">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8">{w}<span>✦</span></span>
        ))}
      </div>
    </div>
  );
}
