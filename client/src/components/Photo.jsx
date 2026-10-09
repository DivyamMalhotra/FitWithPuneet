import { useState } from "react";

// Photo na mile to patterned block dikhta hai, us par file ka naam likha hota hai
export default function Photo({ src, alt = "", className = "" }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <div
        className={`flex items-end bg-panel p-3 text-xs text-cream/50 ${className}`}
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 12px, transparent 12px 24px)" }}
      >
        {src.split("/").pop()}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}
