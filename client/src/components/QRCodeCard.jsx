import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { SITE_URL, WA_LINK } from "../config.js";

export default function QRCodeCard() {
  const [mode, setMode] = useState("site");
  const box = useRef(null);
  const value = mode === "site" ? SITE_URL : WA_LINK;

  const download = () => {
    const xml = new XMLSerializer().serializeToString(box.current.querySelector("svg"));
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 600;
      const x = c.getContext("2d");
      x.fillStyle = "#fff";
      x.fillRect(0, 0, 600, 600);
      x.drawImage(img, 30, 30, 540, 540);
      const a = document.createElement("a");
      a.download = `fitwithpuneet-${mode}-qr.png`;
      a.href = c.toDataURL();
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(xml);
  };

  return (
    <div className="mx-auto w-full max-w-[16rem] text-center">
      <div className="mb-4 inline-flex rounded-full bg-white/10 p-1">
        {[["site", "Website"], ["wa", "WhatsApp"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            aria-pressed={mode === k}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${mode === k ? "bg-lime text-ink" : "text-cream"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div ref={box} className="inline-block rounded-xl bg-white p-4">
        <QRCode value={value} size={180} />
      </div>
      <button onClick={download} className="mt-4 block w-full rounded-lg border border-cream/30 py-3 text-sm font-semibold">
        Download QR
      </button>
    </div>
  );
}
