import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendOtp, verifyOtp } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import OtpInput from "../components/OtpInput.jsx";
import Photo from "../components/Photo.jsx";

const WORDS = ["Show up", "Get stronger", "Move with intent", "Build your routine", "Make the first move"];
const delay = (n) => ({ animationDelay: `${n * 80}ms` });

const Eyebrow = ({ children }) => (
  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/65">
    <span className="h-2.5 w-2.5 bg-ink" />{children}
  </p>
);

function Marquee({ dark = true }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden border-y py-3 ${dark ? "border-cream/15" : "border-ink/15"}`} aria-hidden="true">
      <div className={`marquee flex w-max gap-8 whitespace-nowrap font-display text-2xl font-bold uppercase ${dark ? "text-cream/70" : "text-ink/60"}`}>
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8">{w}<span className="text-lime">✦</span></span>
        ))}
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <circle cx="60" cy="60" r="59" fill="#c9f65e" />
        <text fill="#1a1c19" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">
          <textPath href="#ring" textLength="270" lengthAdjust="spacing">SHOW UP • GET STRONGER • TRAIN HARD • </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-ink">FWP</span>
    </div>
  );
}

export default function Login() {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState({});
  const [otp, setOtp] = useState("");
  const [otpTouched, setOtpTouched] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const [welcome, setWelcome] = useState(null);

  useEffect(() => {
    if (wait > 0) {
      const t = setTimeout(() => setWait(wait - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [wait]);

  const nameOk = name.trim().length >= 2;
  const mobileOk = /^[6-9]\d{9}$/.test(mobile);
  const formOk = nameOk && mobileOk && agree;
  const otpOk = otp.length === 6;

  const send = async (e) => {
    e?.preventDefault();
    if (step === 1 && (!formOk || busy)) return;
    setErr("");
    setBusy(true);
    try {
      await sendOtp(name.trim(), mobile);
      setStep(2);
      setOtp("");
      setOtpTouched(false);
      setWait(30);
    } catch (x) {
      setErr(x.response?.data?.message || "Could not send OTP. Try again.");
    }
    setBusy(false);
  };

  const verify = async (e) => {
    e.preventDefault();
    setOtpTouched(true);
    if (!otpOk) return;
    setErr("");
    setBusy(true);
    try {
      const { data } = await verifyOtp(mobile, otp);
      setWelcome(data.user.name.split(" ")[0]);
      setTimeout(() => login({ ...data.user, token: data.token }), 1300);
    } catch (x) {
      setErr(x.response?.data?.message || "Wrong OTP. Try again.");
      setBusy(false);
    }
  };

  const box = (bad) =>
    `flex w-full items-center rounded-lg border bg-white px-4 text-lg text-ink transition focus-within:border-ink focus-within:shadow-[0_0_0_4px_rgba(201,246,94,.75)] ${bad ? "border-red-700" : "border-ink/20"}`;
  const input = "h-14 w-full bg-transparent outline-none";
  const tick = <span className="pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold" aria-hidden="true">✓</span>;
  const cta = "group flex h-14 w-full items-center justify-center gap-3 rounded-lg text-lg font-semibold transition disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-ink/50";
  const arrow = <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>;

  return (
    <main className="min-h-dvh bg-cream text-ink lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* Left panel (laptop) */}
      <div
        className="relative hidden min-h-dvh flex-col justify-between overflow-hidden bg-ink lg:flex"
        style={{ backgroundImage: "linear-gradient(rgba(243,243,236,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(243,243,236,.045) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      >
        <p className="px-10 pt-8 font-display text-2xl font-bold uppercase text-cream"><span className="text-lime">FWP/</span> FitWithPuneet</p>

        <div className="mx-auto w-full max-w-sm px-6 xl:max-w-md">
          <div className="relative">
            <div className="fx overflow-hidden rounded-sm border border-cream/15">
              <Photo src="/images/g1.jpg" alt="FitWithPuneet gym studio storefront" className="kenburns aspect-[4/5] w-full object-[50%_30%]" />
            </div>
            <div className="absolute -right-8 -top-8"><Badge /></div>
            <p className="absolute -bottom-4 left-4 -rotate-3 bg-lime px-3 py-1.5 font-display text-xl font-bold uppercase text-ink">Your first rep starts here</p>
          </div>
          <div className="mt-10 font-display text-5xl font-bold uppercase leading-[.95] text-cream xl:text-6xl">
            <div className="overflow-hidden"><div className="mask-up" style={delay(2)}>The real gym.</div></div>
            <div className="overflow-hidden"><div className="mask-up text-lime" style={delay(4)}>Your next chapter.</div></div>
          </div>
        </div>

        <Marquee />
      </div>

      {/* Right panel (form) */}
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-10 pt-6 lg:px-12">
        <div className="-mx-6 mb-5 lg:hidden">
          <div className="overflow-hidden">
            <Photo src="/images/g1.jpg" alt="FitWithPuneet gym studio" className="kenburns h-44 w-full object-[50%_30%]" />
          </div>
          <Marquee dark={false} />
        </div>

        <header className="flex items-center justify-between pb-4">
          <Link to="/" className="font-display text-3xl font-bold uppercase">FitWithPuneet</Link>
          <span className="text-sm font-semibold uppercase tracking-wide text-ink/60">{step === 1 ? "01 / Login" : "02 / Verify"}</span>
        </header>
        <div className="flex gap-2" aria-hidden="true">
          <div className="h-1 flex-1 bg-ink" />
          <div className={`h-1 flex-1 transition-colors duration-500 ${step === 2 ? "bg-ink" : "bg-ink/15"}`} />
        </div>

        {step === 1 ? (
          <form onSubmit={send} className="mt-10 flex flex-1 flex-col">
            <div className="rise" style={delay(0)}><Eyebrow>India-only member access</Eyebrow></div>
            <h1 className="rise mt-5 text-6xl sm:text-7xl" style={delay(1)}>First, let’s<br />get you in.</h1>
            <p className="rise mt-5 text-lg text-ink/70" style={delay(2)}>Enter your name and Indian mobile number. We’ll send an OTP to verify it.</p>

            <label className="rise mt-8 block" style={delay(3)}>
              <span className="mb-2 block font-semibold">Your name</span>
              <div className={box(touched.name && !nameOk)}>
                <input className={input} value={name} autoComplete="name" onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} />
                {nameOk && tick}
              </div>
              {touched.name && !nameOk && <p role="alert" className="mt-2 text-sm text-red-700">Enter your name.</p>}
            </label>

            <label className="rise mt-6 block" style={delay(4)}>
              <span className="mb-2 block font-semibold">Indian mobile number</span>
              <div className={box(touched.mobile && !mobileOk)}>
                <span className="mr-3 border-r border-ink/20 pr-3 font-semibold">+91</span>
                <input className={input} inputMode="numeric" maxLength={10} autoComplete="tel-national" value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} onBlur={() => setTouched((t) => ({ ...t, mobile: true }))} />
                {mobileOk && tick}
              </div>
              {touched.mobile && !mobileOk && <p role="alert" className="mt-2 text-sm text-red-700">Enter 10 digits. Indian mobile numbers start with 6–9.</p>}
            </label>

            <label className="rise mt-6 flex cursor-pointer items-start gap-3" style={delay(5)}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="peer sr-only" />
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink/40 transition peer-checked:border-ink peer-checked:bg-lime peer-focus-visible:outline peer-focus-visible:outline-2">
                {agree && <span className="pop text-sm font-bold">✓</span>}
              </span>
              <span className="text-ink/75">I agree to use my name and verified mobile for member access. This is not a marketing opt-in.</span>
            </label>

            <details className="rise mt-4" style={delay(6)}>
              <summary className="cursor-pointer font-semibold underline">Privacy &amp; consent</summary>
              <p className="mt-2 text-sm text-ink/70">Your name and mobile number are saved so you can sign in as a member of FitWithPuneet. The OTP only verifies that the number is yours.</p>
            </details>

            {err && <p role="alert" className="mt-4 font-semibold text-red-700">{err}</p>}

            <button disabled={!formOk || busy} className={`${cta} rise mt-8 bg-ink text-cream ${formOk && !busy ? "ready" : ""}`} style={delay(7)}>
              {busy ? "Sending..." : <>Send OTP {arrow}</>}
            </button>
            {!formOk && <p className="mt-4 text-center text-ink/60">Fill your name, number and agree to continue.</p>}

            <p className="mt-auto pt-8 text-sm text-ink/60">OTP verifies your mobile. Your member details are saved for member access.</p>
          </form>
        ) : (
          <form onSubmit={verify} className="mt-8 flex flex-1 flex-col">
            <button type="button" onClick={() => { setStep(1); setErr(""); }} className="rise group flex w-fit items-center gap-2 font-semibold">
              <span className="transition-transform group-hover:-translate-x-1.5">←</span> Back to login
            </button>
            <div className="rise mt-8" style={delay(1)}><Eyebrow>Verify your mobile</Eyebrow></div>
            <h1 className="rise mt-5 text-6xl sm:text-7xl" style={delay(2)}>One code.<br />Then you’re in.</h1>
            <p className="rise mt-5 text-lg text-ink/70" style={delay(3)}>{name.trim().split(" ")[0]}, enter the 6-digit OTP sent to your Indian mobile number.</p>

            <div className="rise mt-6 flex items-center justify-between" style={delay(4)}>
              <span className="font-semibold">+91 ••••• ••{mobile.slice(-3)}</span>
              <button type="button" onClick={() => { setStep(1); setErr(""); }} className="font-semibold underline">Change number</button>
            </div>

            <div className="rise" style={delay(5)}>
              <p className="mb-3 mt-8 font-semibold">One-time password</p>
              <OtpInput value={otp} onChange={setOtp} invalid={otpTouched && !otpOk} />
            </div>
            {otpTouched && !otpOk && <p role="alert" className="mt-3 text-sm text-red-700">Enter all 6 digits to verify your mobile.</p>}
            {err && <p role="alert" className="mt-3 font-semibold text-red-700">{err}</p>}

            <button disabled={!otpOk || busy} className={`${cta} rise mt-8 bg-ink text-cream ${otpOk && !busy ? "ready" : ""}`} style={delay(6)}>
              {busy ? "Checking..." : <>Verify &amp; continue {arrow}</>}
            </button>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-ink/70">Didn’t receive a code?</span>
              <button type="button" disabled={wait > 0 || busy} onClick={send} className="font-semibold underline disabled:no-underline disabled:opacity-50">
                {wait > 0 ? `Resend in ${wait}s` : "Resend OTP"}
              </button>
            </div>

            <p className="mt-auto border-t border-ink/15 pt-6 text-sm text-ink/60">Never share your OTP. After verification, your name and verified mobile are stored for member access.</p>
          </form>
        )}
      </div>

      {welcome && (
        <div className="wipe fixed inset-0 z-[70] flex items-center justify-center bg-lime px-6 text-ink" role="status">
          <div className="overflow-hidden text-center">
            <p className="mask-up font-display text-7xl font-bold uppercase leading-none sm:text-9xl" style={{ animationDelay: ".35s" }}>Welcome, {welcome}.</p>
          </div>
        </div>
      )}
    </main>
  );
}
