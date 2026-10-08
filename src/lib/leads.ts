
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';

export type LeadPayload = {
  name: string;
  mobile: string;
  college: string;
  email: string;
  branch: string;
  year?: string;
  project?: string;
  plan?: string;
};

const buildAutoResponse = (payload: LeadPayload) => {
  const projectLine = payload.project
    ? `You requested: ${payload.project}.`
    : `You unlocked our project domains catalog.`;
  return `Hi ${payload.name || 'there'},

This is VBuildIt team. Thanks for reaching out! ${projectLine}

We build custom final-year software & hardware projects with clean architecture, viva-ready documents, and delivery in 1-2 weeks.

For price range and next steps, just reply to this email or contact us at ${CONFIG.email} with your domain, deadline, and expected outcome.

- VBuildIt Team
Turn your ideas into engineering reality.`;
};

export const submitLead = async (payload: LeadPayload) => {
  console.log('Submitting lead:', payload);

  // Save to localStorage as backup
  try {
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    existingLeads.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem('leads', JSON.stringify(existingLeads));
  } catch {
    // ignore storage errors
  }

  // 1) Try SMTP: same-origin /api first (works on Vercel deployment),
  //    then local backend http://localhost:3001 (works in local dev).
  // Backend sends: (a) full details to vbuildit8@gmail.com
  //                (b) auto-reply "Hi Name, This is VBuildIt team..." to customer
  const postLead = async (url: string) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok === true;
  };

  let smtpOk = false;
  for (const url of ['/api/lead', 'http://localhost:3001/api/lead']) {
    try {
      if (await postLead(url)) {
        smtpOk = true;
        break;
      }
    } catch {
      // try next endpoint
    }
  }
  if (!smtpOk) console.warn('SMTP endpoints failed, fallback to FormSubmit');

  // 2) Fallback: FormSubmit (free, no backend needed) — same 2 mails
  if (!smtpOk) {
    try {
      await fetch(`https://formsubmit.co/ajax/${CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: payload.name,
          Mobile: payload.mobile,
          College: payload.college,
          Email: payload.email,
          Branch: payload.branch,
          Year: payload.year || '-',
          Project: payload.project || 'Unlock Domains (catalog browse)',
          Plan: payload.plan || '-',
          _subject: `New Lead: ${payload.name} - ${payload.project || 'Unlock Domains'}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: payload.email,
          _autoresponse: buildAutoResponse(payload),
        }),
      });
    } catch (err) {
      console.warn('Lead email failed, kept in localStorage backup:', err);
    }
  }

  // Celebration + resolve (keep old 1.5s feel but non-blocking)
  await new Promise((resolve) => setTimeout(resolve, 1200));
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0A84FF', '#BF5AF2', '#64D2FF'],
  });
  return { success: true };
};
