import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import QRCodeCard from "../components/QRCodeCard.jsx";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import InViewCard from "../components/InViewCard.jsx";
import Marquee from "../components/Marquee.jsx";
import { WA_LINK, CALL_LINK, EMAIL, MAIL_LINK, MAP_LINK } from "../config.js";

const NAV = [["Training", "#training"], ["The gym", "#gym"], ["FAQs", "#faqs"], ["Contact", "#contact"]];

const PILLARS = [
  ["Move with intent", "Goal-oriented training with proper form and technique guidance, so every rep counts."],
  ["Build your routine", "Personalized guidance from certified and experienced trainers."],
  ["Make the first move", "A beginner-friendly, supportive place. Ask us anything on WhatsApp."],
];

const GROUPS = [
  { title: "Equipment", img: "/images/equipment.jpg",
    items: ["High-tech and advanced equipment", "Fully equipped modern gym", "Latest fitness equipment", "Dedicated strength and fitness zone"] },
  { title: "Training", img: "/images/trainers.jpg",
    items: ["Certified and experienced trainers", "Professional and experienced staff", "Personalized training guidance", "Proper form and technique guidance", "Goal-oriented training"] },
  { title: "The space", img: "/images/space.jpg",
    items: ["Premium workout environment", "Spacious and well-maintained workout area", "Clean and hygienic facilities", "Comfortable and positive ambience"] },
  { title: "Community", img: "/images/community.jpg",
    items: ["Beginner-friendly environment", "Friendly and supportive atmosphere", "Motivating fitness community"] },
];

const GALLERY = ["g1", "g2", "g3", "g4", "g5", "g6"].map((n) => `/images/${n}.jpg`);
const POS = { "/images/g1.jpg": "object-[50%_18%]" };

const FAQS = [
  ["I have never trained before. Can I join?", "Yes. FitWithPuneet is a beginner-friendly place, and trainers guide your form and technique from the start."],
  ["Will someone guide me?", "Certified and experienced trainers give personalized, goal-oriented guidance."],
  ["How do I get plans and timings?", "Message us on WhatsApp or call the gym. We will share the current plans and timings."],
  ["What happens to my number?", "Your name and verified mobile are saved so you can sign in as a member."],
];

const lime = "group inline-flex items-center justify-center gap-3 rounded-lg bg-lime px-6 py-4 text-lg font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_rgba(201,246,94,.25)] active:scale-[.98]";
const arrow = "transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1";

export default function Home() {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") setZoom((z) => (z + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setZoom((z) => (z - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <div className="pb-24">
      <div className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-lime" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-cream/15 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-display text-2xl font-bold uppercase"><span className="text-lime">FWP/</span> FitWithPuneet</a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(([l, h]) => <a key={l} href={h} className="text-cream/85 transition hover:text-lime">{l}</a>)}
            <a href={MAP_LINK} target="_blank" rel="noreferrer" className="text-cream/85 transition hover:text-lime">Directions</a>
            {user ? (
              <button onClick={logout} className="rounded-lg border border-cream/30 px-5 py-2.5 font-semibold transition hover:border-lime">Hi, {user.name.split(" ")[0]} · Log out</button>
            ) : (
              <Link to="/login" className="rounded-lg bg-lime px-5 py-2.5 font-semibold text-ink">Member login</Link>
            )}
          </nav>
          <button onClick={() => setMenu(!menu)} aria-expanded={menu} className="rounded-lg border border-cream/30 px-4 py-2 font-semibold lg:hidden">{menu ? "Close" : "Menu"}</button>
        </div>
        {menu && (
          <nav className="flex flex-col gap-1 border-t border-cream/15 px-5 pb-5 pt-3 lg:hidden">
            {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setMenu(false)} className="py-3 text-xl">{l}</a>)}
            <a href={MAP_LINK} target="_blank" rel="noreferrer" onClick={() => setMenu(false)} className="py-3 text-xl">Directions</a>
            {user ? (
              <button onClick={logout} className="mt-2 rounded-lg border border-cream/30 py-3 font-semibold">Log out ({user.name.split(" ")[0]})</button>
            ) : (
              <Link to="/login" className="mt-2 rounded-lg bg-lime py-3 text-center font-semibold text-ink">Member login</Link>
            )}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pt-16">
        <div>
          <p className="rise flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-lime"><span className="h-2.5 w-2.5 bg-lime" />FitWithPuneet / India</p>
          <h1 className="mt-6 text-[17vw] leading-[.88] sm:text-[clamp(4rem,9vw,9rem)]">
            <span className="block overflow-hidden pb-[.06em]"><span className="mask-up block" style={{ animationDelay: ".1s" }}>Show up.</span></span>
            <span className="block overflow-hidden pb-[.06em]"><span className="mask-up block text-lime" style={{ animationDelay: ".28s" }}>Get stronger.</span></span>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg text-cream/70 sm:text-xl" style={{ animationDelay: ".5s" }}>Your next chapter starts with one decision. Explore FitWithPuneet, find your training direction and take the first step.</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: ".65s" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className={lime}>Enquire about membership <span aria-hidden="true" className={arrow}>↗</span></a>
            <a href={MAP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-cream/30 px-6 py-4 text-lg font-semibold transition hover:border-lime hover:text-lime active:border-lime active:text-lime">Get directions <span aria-hidden="true">↗</span></a>
            <a href="#training" className="text-lg font-semibold">Explore training ↓</a>
          </div>
          <p className="rise mt-8 flex items-center gap-2 text-cream/60" style={{ animationDelay: ".8s" }}><span className="h-2 w-2 bg-lime" />India-only member access • Name + mobile • OTP verification</p>
        </div>

        <div className="fx rise relative overflow-hidden rounded-sm border border-cream/15" style={{ animationDelay: ".2s" }}>
          <Photo src="/images/hero.jpg" alt="Cardio floor at FitWithPuneet" className="kenburns aspect-[4/5] w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 font-display text-4xl font-bold uppercase leading-[.95] sm:text-5xl">The real gym.<br /><span className="text-lime">Your next chapter.</span></p>
        </div>
      </section>

      <Marquee />

      {/* Pillars */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
          {PILLARS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <span className="font-display text-xl font-bold text-lime">0{i + 1}</span>
              <h2 className="mt-1 text-4xl sm:text-5xl">{t}</h2>
              <p className="mt-3 text-lg text-cream/65">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Training */}
      <section id="training" className="mx-auto max-w-7xl scroll-mt-20 border-t border-cream/15 pt-16">
        <Reveal>
          <h2 className="px-5 text-5xl sm:text-6xl">What you get</h2>
          <p className="mt-3 px-5 text-lg text-cream/65">Swipe through. Everything here is part of FitWithPuneet.</p>
        </Reveal>
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {GROUPS.map((g) => (
            <InViewCard key={g.title} className="group w-[82%] shrink-0 snap-center overflow-hidden rounded-sm border border-cream/15 bg-panel transition duration-300 hover:-translate-y-1.5 hover:border-lime/70 md:w-auto max-md:data-[active=true]:-translate-y-1.5 max-md:data-[active=true]:border-lime/70">
              <div className="overflow-hidden">
                <Photo src={g.img} alt={g.title} className="aspect-[4/3] w-full transition duration-700 group-hover:scale-110 max-md:group-data-[active=true]:scale-110" />
              </div>
              <div className="p-5">
                <h3 className="text-3xl text-lime">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((t) => (
                    <li key={t} className="flex gap-2.5 leading-snug text-cream/85"><span className="mt-2 h-2 w-2 shrink-0 bg-lime" />{t}</li>
                  ))}
                </ul>
              </div>
            </InViewCard>
          ))}
        </div>
      </section>

      {/* The gym */}
      <section id="gym" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-20">
        <Reveal><h2 className="text-5xl sm:text-6xl">The real gym</h2></Reveal>
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3">
          {GALLERY.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 120}>
              <button onClick={() => setZoom(i)} aria-label={`Open photo ${i + 1}`} className="fx group relative block active:scale-[.97] transition w-full overflow-hidden rounded-sm bg-panel">
                <span className="block pb-[133.33%]" /><Photo src={s} alt="Inside FitWithPuneet" className={`absolute inset-0 h-full w-full ${POS[s] || "object-center"}`} />
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                  <span className="rounded-full bg-lime px-3 py-1 text-sm font-semibold text-ink">View</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="mx-auto max-w-3xl scroll-mt-20 px-5 pt-20">
        <Reveal><h2 className="text-5xl sm:text-6xl">FAQs</h2></Reveal>
        <Reveal delay={100}>
          <div className="mt-8 border-t border-cream/15">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group border-b border-cream/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold transition hover:text-lime active:text-lime">
                  {q}<span className="text-2xl text-lime transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-lg text-cream/70">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-20">
        <Reveal>
          <div className="grid gap-10 border border-lime/60 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl">Make the first move</h2>
              <p className="mt-4 max-w-md text-lg text-cream/70">Talk to the trainer directly for plans, timings and a gym visit.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={WA_LINK} target="_blank" rel="noreferrer" className={lime}>WhatsApp us <span aria-hidden="true" className={arrow}>↗</span></a>
                <a href={CALL_LINK} className="inline-flex items-center justify-center rounded-lg border border-cream/30 px-6 py-4 text-lg font-semibold transition hover:border-lime hover:text-lime active:border-lime active:text-lime">Call the gym</a>
                <a href={MAIL_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg border border-cream/30 px-6 py-4 text-lg font-semibold transition hover:border-lime hover:text-lime active:border-lime active:text-lime">Email us</a>
              </div>
            </div>
            <QRCodeCard />
          </div>
        </Reveal>
        <p className="mt-10 text-center text-sm text-cream/45">FitWithPuneet Gym Studio · {EMAIL}{user?.isAdmin && <> · <Link to="/admin" className="text-lime underline">Admin</Link></>}</p>
      </section>

      {/* Lightbox */}
      {zoom !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95" role="dialog" aria-label="Photo viewer">
          <button onClick={() => setZoom(null)} className="self-end p-5 text-lg font-bold">Close</button>
          <div className="flex flex-1 items-center justify-center px-4" onClick={() => setZoom(null)}>
            <Photo src={GALLERY[zoom]} alt="" className="max-h-[75dvh] max-w-full" />
          </div>
          <div className="flex justify-between p-5 text-lg font-bold">
            <button onClick={() => setZoom((zoom - 1 + GALLERY.length) % GALLERY.length)}>Previous</button>
            <span>{zoom + 1} / {GALLERY.length}</span>
            <button onClick={() => setZoom((zoom + 1) % GALLERY.length)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
