import axios from "axios";

// MSG91 keys na ho to OTP terminal mein print hoga (sirf testing ke liye)
export async function sendSms(mobile, otp) {
  if (!process.env.MSG91_AUTHKEY) return console.log(`[DEV] OTP for ${mobile}: ${otp}`);
  await axios.post(
    "https://control.msg91.com/api/v5/flow",
    { template_id: process.env.MSG91_TEMPLATE_ID, recipients: [{ mobiles: `91${mobile}`, OTP: otp }] },
    { headers: { authkey: process.env.MSG91_AUTHKEY } }
  );
}
