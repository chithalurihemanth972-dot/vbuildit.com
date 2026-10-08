// VBuildIt SMTP backend — Gmail + Nodemailer
// 1) Copy .env.example -> .env and put your Gmail App Password in SMTP_PASS
// 2) Run: npm install && npm start  (runs on http://localhost:3001)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'vbuildit8@gmail.com';
const SMTP_USER = process.env.SMTP_USER || 'vbuildit8@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

function isSmtpConfigured() {
  return Boolean(SMTP_PASS) && !SMTP_PASS.includes('PASTE_');
}

function getTransporter() {
  if (!isSmtpConfigured()) {
    throw new Error('SMTP_PASS missing in backend/.env — put Gmail App Password there.');
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, owner: OWNER_EMAIL, smtpConfigured: isSmtpConfigured() });
});

app.post('/api/lead', async (req, res) => {
  const { name, mobile, college, email, branch, year, project, plan } = req.body || {};

  if (!name || !email || !mobile || !college || !branch) {
    return res.status(400).json({ ok: false, error: 'name, email, mobile, college, branch required' });
  }

  let transporter;
  try {
    transporter = getTransporter();
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err.message);
    return res.status(500).json({ ok: false, error: 'SMTP not configured: ' + err.message });
  }

  const projectLine = project || 'Unlock Domains (catalog browse)';

  // 1) Mail to YOU (owner) with full lead details
  const ownerSubject = `New Lead: ${name} - ${projectLine}`;
  const ownerText =
    `New lead from website:\n\n` +
    `Name: ${name}\nMobile: ${mobile}\nCollege: ${college}\nEmail: ${email}\n` +
    `Branch: ${branch}\nYear: ${year || '-'}\nProject: ${projectLine}\nPlan: ${plan || '-'}\n\n` +
    `Reply directly to ${email} to contact customer.`;

  // 2) Auto-reply to CUSTOMER from vbuildit8@gmail.com
  const customerSubject = `Thanks ${name}! VBuildIt team will contact you soon`;
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
      subject: ownerSubject,
      text: ownerText,
    });

    await transporter.sendMail({
      from: `"VBuildIt Team" <${SMTP_USER}>`,
      to: email,
      subject: customerSubject,
      text: customerText,
    });

    console.log(`Lead mails sent: owner(${OWNER_EMAIL}) + customer(${email})`);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Send failed:', err);
    return res.status(500).json({ ok: false, error: String(err.message || err) });
  }
});

// Custom idea — owner ONLY (no auto-reply to customer, as requested)
app.post('/api/idea', async (req, res) => {
  const { name, email, mobile, college, branch, year, idea } = req.body || {};

  if (!name || !email || !idea) {
    return res.status(400).json({ ok: false, error: 'name, email, idea required' });
  }

  let transporter;
  try {
    transporter = getTransporter();
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err.message);
    return res.status(500).json({ ok: false, error: 'SMTP not configured: ' + err.message });
  }

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
    console.log(`Idea mail sent to owner(${OWNER_EMAIL}) from ${email}`);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Idea send failed:', err);
    return res.status(500).json({ ok: false, error: String(err.message || err) });
  }
});

app.listen(PORT, () => {
  console.log(`VBuildIt SMTP backend running on http://localhost:${PORT}`);
  console.log(`Owner inbox: ${OWNER_EMAIL} | SMTP user: ${SMTP_USER} | configured: ${Boolean(SMTP_PASS)}`);
});
