// Vercel serverless: POST /api/idea (owner ONLY, no auto-reply)
const nodemailer = require('nodemailer');

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'vbuildit8@gmail.com';
const SMTP_USER = process.env.SMTP_USER || 'vbuildit8@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'POST only' });
  }
  const { name, email, mobile, college, branch, year, idea } = req.body || {};
  if (!name || !email || !idea) {
    return res.status(400).json({ ok: false, error: 'name, email, idea required' });
  }
  if (!SMTP_PASS || SMTP_PASS.includes('PASTE_')) {
    return res.status(500).json({ ok: false, error: 'SMTP not configured on server' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"VBuildIt Website" <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Custom Idea from ${name}`,
      text:
        `New custom idea from website:\n\n` +
        `Name: ${name}\nEmail: ${email}\nMobile: ${mobile || '-'}\n` +
        `College: ${college || '-'}\nBranch: ${branch || '-'}\nYear: ${year || '-'}\n\n` +
        `Idea:\n${idea}\n\nReply directly to ${email} to contact customer.`,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('Idea send failed:', err);
    return res.status(500).json({ ok: false, error: String((err && err.message) || err) });
  }
};
