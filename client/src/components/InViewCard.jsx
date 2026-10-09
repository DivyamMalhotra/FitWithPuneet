import { useEffect, useRef, useState } from "react";

// Jab card screen ke beech mein aata hai tab data-active="true" ho jata hai (phone par hover ki jagah)
export default function InViewCard({ className = "", children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.75 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <article ref={ref} data-active={on} className={className}>{children}</article>;
}
