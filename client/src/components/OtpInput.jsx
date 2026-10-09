// Ek hi asli input (invisible) + 6 dikhne wale boxes: paste, autofill aur backspace sab chalta hai
export default function OtpInput({ value, onChange, invalid }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`flex h-14 items-center justify-center rounded-lg border bg-white text-2xl font-semibold text-ink sm:h-16 ${
              invalid && value.length === i ? "border-red-700 ring-2 ring-red-700/20" : value.length === i ? "border-ink ring-2 ring-ink/20" : "border-ink/20"
            }`}
          >
            {value[i] || <span className="text-ink/30">—</span>}
          </div>
        ))}
      </div>
      <input
        autoFocus
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        aria-label="6-digit OTP"
        className="absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
