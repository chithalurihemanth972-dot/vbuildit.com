// Vercel serverless: POST /api/lead
// Env vars (Vercel Dashboard > Settings > Environment Variables):
//   OWNER_EMAIL, SMTP_USER, SMTP_PASS
import nodemailer from 'nodemailer';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'vbuildit8@gmail.com';
const SMTP_USER = process.env.SMTP_USER || 'vbuildit8@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'POST only' });
  }
  const { name, mobile, college, email, branch, year, project, plan } = req.body || {};
  if (!name || !email || !mobile || !college || !branch) {
    return res.status(400).json({ ok: false, error: 'name, email, mobile, college, branch required' });
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

  const projectLine = project || 'Unlock Domains (catalog browse)';
  const ownerText =
    `New lead from website:\n\n` +
    `Name: ${name}\nMobile: ${mobile}\nCollege: ${college}\nEmail: ${email}\n` +
    `Branch: ${branch}\nYear: ${year || '-'}\nProject: ${projectLine}\nPlan: ${plan || '-'}\n\n` +
    `Reply directly to ${email} to contact customer.`;
  const customerText =
    `Hi ${name},\n\n` +
    `This is VBuildIt team. Thanks for reaching out! ` +
    (project ? `You requested: ${project}.\n\n` : `You unlocked our project domains catalog.\n\n`) +
    `We build custom final-year software & hardware projects with clean architecture, viva-ready documents, and delivery in 1-2 weeks.\n\n` +
    `For price range and next steps, just reply to this email or contact us at ${OWNER_EMAIL} with your domain, deadline, and expected outcome.\n\n` +
    `- VBuildIt Team\nTurn your ideas into engineering reality.`;

  try {
    await transporter.sendMail({
      from: `"VBuildIt Website" <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Lead: ${name} - ${projectLine}`,
      text: ownerText,
    });
    await transporter.sendMail({
      from: `"VBuildIt Team" <${SMTP_USER}>`,
      to: email,
      subject: `Thanks ${name}! VBuildIt team will contact you soon`,
      text: customerText,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('Lead send failed:', err);
    return res.status(500).json({ ok: false, error: String((err && err.message) || err) });
  }
}
