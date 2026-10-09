export const WHATSAPP = import.meta.env.VITE_WHATSAPP || "917206032013";
export const EMAIL = "fitwithpuneet@gmail.com";
// QR hamesha usi address ka banta hai jis par site khuli hai (localhost ya deploy wala link)
export const SITE_URL = window.location.origin;
export const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const WA_LINK = waLink("Hi FitWithPuneet, I want to know about membership");
export const CALL_LINK = `tel:+${WHATSAPP}`;
export const MAIL_LINK = /Android|iPhone|iPad/i.test(navigator.userAgent) ? `mailto:${EMAIL}` : `https://mail.google.com/mail/?view=cm&to=${EMAIL}`;
export const MAP_LINK = "https://maps.app.goo.gl/wsV3unZEQo1eFMtk9";
