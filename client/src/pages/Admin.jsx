import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const fmt = (d) =>
  new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Admin() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [state, setState] = useState("loading");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setState("loading");
    try {
      const { data } = await getUsers(user.token);
      setUsers(data.users);
      setState("ok");
    } catch (e) {
      if (e.response?.status === 401) { logout(); return; }
      setMsg(e.response?.data?.message || "Could not load members.");
      setState("error");
    }
  };
  useEffect(() => { load(); }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? users.filter((u) => u.name.toLowerCase().includes(s) || u.mobile.includes(s)) : users;
  }, [users, q]);

  const stats = useMemo(() => {
    const day = new Date(); day.setHours(0, 0, 0, 0);
    const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return [
      ["Total members", users.length],
      ["Joined today", users.filter((u) => new Date(u.createdAt) >= day).length],
      ["Last 7 days", users.filter((u) => new Date(u.createdAt) >= week).length],
    ];
  }, [users]);

  const csv = () => {
    const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const rows = [["Name", "Mobile", "Joined", "Last login"], ...list.map((u) => [u.name, '="+91' + u.mobile + '"', fmt(u.createdAt), fmt(u.updatedAt)])];
    const blob = new Blob(["\ufeff" + rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `fitwithpuneet-members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const btn = "rounded-lg border border-cream/30 px-4 py-2.5 font-semibold transition hover:border-lime hover:text-lime";

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-6">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 pb-5">
        <h1 className="text-4xl sm:text-5xl"><span className="text-lime">FWP/</span> Members</h1>
        <div className="flex gap-2">
          <Link to="/" className={btn}>Back to site</Link>
          <button onClick={load} className={btn}>Refresh</button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map(([l, n]) => (
          <div key={l} className="border border-cream/15 bg-panel p-4 sm:p-6">
            <p className="font-display text-5xl font-bold text-lime sm:text-6xl">{n}</p>
            <p className="mt-1 text-sm text-cream/70 sm:text-base">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or mobile"
          aria-label="Search members"
          className="h-12 flex-1 rounded-lg border border-cream/25 bg-panel px-4 text-lg outline-none focus:border-lime"
        />
        <button onClick={csv} disabled={!list.length} className="h-12 rounded-lg bg-lime px-6 text-lg font-semibold text-ink disabled:opacity-50">
          Download CSV ({list.length})
        </button>
      </div>

      {state === "loading" && <p className="mt-10 text-cream/70">Loading members...</p>}
      {state === "error" && <p role="alert" className="mt-10 font-semibold text-red-400">{msg}</p>}

      {state === "ok" && (
        <div className="mt-6 border-t border-cream/15">
          <div className="hidden grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-4 border-b border-cream/15 py-3 text-sm font-semibold uppercase tracking-wide text-cream/55 md:grid">
            <span>Name</span><span>Mobile</span><span>Joined</span><span>Last login</span><span className="w-24" />
          </div>
          {list.map((u) => (
            <div key={u._id} className="grid gap-1 border-b border-cream/15 py-4 md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] md:items-center md:gap-4">
              <span className="text-lg font-semibold">{u.name}</span>
              <span>+91 {u.mobile}</span>
              <span className="text-cream/70"><span className="text-cream/45 md:hidden">Joined: </span>{fmt(u.createdAt)}</span>
              <span className="text-cream/70"><span className="text-cream/45 md:hidden">Last login: </span>{fmt(u.updatedAt)}</span>
              <a
                href={`https://wa.me/91${u.mobile}?text=${encodeURIComponent("Hi " + u.name.split(" ")[0] + ", this is FitWithPuneet.")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold text-ink md:mt-0 md:w-24"
              >
                WhatsApp
              </a>
            </div>
          ))}
          {!list.length && <p className="py-10 text-cream/60">{users.length ? "No member matches your search." : "No members yet."}</p>}
        </div>
      )}
    </div>
  );
}
