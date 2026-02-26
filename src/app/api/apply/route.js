import { NextResponse } from 'next/server';

// ── Limits & whitelists ───────────────────────────────────────────────────────

const MAX_FILE_BYTES   = 5 * 1024 * 1024; // 5 MB
const MAX_COVER_CHARS  = 1000;
const MAX_TEXT_CHARS   = 200;
const MAX_URL_CHARS    = 500;

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const ALLOWED_DEPARTMENTS = new Set([
  'Engineering',
  'Operations',
  'Hospitality',
  'Finance',
  'Marketing',
  'Other',
]);

// ── Magic-byte signatures ─────────────────────────────────────────────────────

const MAGIC_SIGNATURES = [
  [0x25, 0x50, 0x44, 0x46], // %PDF
  [0x50, 0x4b, 0x03, 0x04], // PK.. — DOCX / ZIP
  [0x50, 0x4b, 0x05, 0x06], // PK   — empty ZIP (some DOCX)
  [0xd0, 0xcf, 0x11, 0xe0], // OLE CF — legacy .doc
];

function hasTrustedMagic(buf) {
  return MAGIC_SIGNATURES.some((sig) => sig.every((b, i) => buf[i] === b));
}

// ── Sanitization helpers ──────────────────────────────────────────────────────

function sanitize(value, max = MAX_TEXT_CHARS) {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidUrl(url) {
  if (!url) return true;
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Best-effort on serverless (per-instance). For multi-region production,
// replace with a Redis/KV-backed solution.

const rateMap = new Map(); // ip → { count, resetAt }
const RATE_LIMIT      = 3;
const RATE_WINDOW_MS  = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip) {
  const now   = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Brevo HTTP helper ─────────────────────────────────────────────────────────

async function sendBrevoEmail(payload) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key':      process.env.BREVO_API_KEY ?? '',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '(no body)');
    throw new Error(`Brevo ${res.status}: ${text}`);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

// ── POST /api/apply ───────────────────────────────────────────────────────────

export async function POST(request) {
  // ── Origin guard ──────────────────────────────────────────────────────────
  const origin  = request.headers.get('origin') ?? '';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');

  if (
    process.env.NODE_ENV === 'production' &&
    siteUrl &&
    origin &&
    !origin.startsWith(siteUrl)
  ) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  // ── Rate limit ────────────────────────────────────────────────────────────
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  // ── Parse multipart form data ─────────────────────────────────────────────
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  // ── Extract & sanitize text fields ────────────────────────────────────────
  const firstName   = sanitize(formData.get('firstName')   ?? '');
  const lastName    = sanitize(formData.get('lastName')    ?? '');
  const email       = sanitize(formData.get('email')       ?? '', 254);
  const phone       = sanitize(formData.get('phone')       ?? '');
  const department  = sanitize(formData.get('department')  ?? '');
  const position    = sanitize(formData.get('position')    ?? '');
  const linkedin    = sanitize(formData.get('linkedin')    ?? '', MAX_URL_CHARS);
  const portfolio   = sanitize(formData.get('portfolio')   ?? '', MAX_URL_CHARS);
  const coverLetter = sanitize(formData.get('coverLetter') ?? '', MAX_COVER_CHARS);
  const agreeTerms  = formData.get('agreeTerms');
  const resumeFile  = formData.get('resume');

  // ── Field validation ──────────────────────────────────────────────────────
  const errors = [];

  if (!firstName)                             errors.push('First name is required.');
  if (!lastName)                              errors.push('Last name is required.');
  if (!email || !isValidEmail(email))         errors.push('A valid email address is required.');
  if (!phone)                                 errors.push('Phone number is required.');
  if (!department || !ALLOWED_DEPARTMENTS.has(department))
                                              errors.push('A valid department selection is required.');
  if (!position)                              errors.push('Position is required.');
  if (linkedin  && !isValidUrl(linkedin))     errors.push('LinkedIn URL is not valid.');
  if (portfolio && !isValidUrl(portfolio))    errors.push('Portfolio URL is not valid.');
  if (agreeTerms !== 'true')                  errors.push('You must agree to the terms.');
  if (!resumeFile || typeof resumeFile === 'string')
                                              errors.push('A resume file is required.');

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 422 });
  }

  // ── File validation ───────────────────────────────────────────────────────
  const file = /** @type {File} */ (resumeFile);

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: 'Resume must be 5 MB or smaller.' },
      { status: 422 },
    );
  }

  const ext = `.${file.name.split('.').pop().toLowerCase()}`;
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: 'Only PDF, DOC, or DOCX files are accepted.' },
      { status: 422 },
    );
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'File MIME type is not allowed.' },
      { status: 422 },
    );
  }

  // Magic-bytes — server-side re-validation regardless of client check
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  if (!hasTrustedMagic(fileBuffer)) {
    return NextResponse.json(
      { error: 'File content does not match its declared type.' },
      { status: 422 },
    );
  }

  // ── Build email content ───────────────────────────────────────────────────
  const fullName     = `${firstName} ${lastName}`;
  const fileBase64   = fileBuffer.toString('base64');
  const senderConfig = {
    name:  process.env.BREVO_FROM_NAME  ?? 'McNab Ventures Careers',
    email: process.env.BREVO_FROM_EMAIL ?? '',
  };

  const optionalRows = [
    linkedin    && `<tr><td style="padding:4px 12px 4px 0"><strong>LinkedIn</strong></td><td><a href="${escapeHtml(linkedin)}">${escapeHtml(linkedin)}</a></td></tr>`,
    portfolio   && `<tr><td style="padding:4px 12px 4px 0"><strong>Portfolio</strong></td><td><a href="${escapeHtml(portfolio)}">${escapeHtml(portfolio)}</a></td></tr>`,
    coverLetter && `<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>Cover Letter</strong></td><td>${escapeHtml(coverLetter).replace(/\n/g, '<br>')}</td></tr>`,
  ].filter(Boolean).join('');

  const hrEmailHtml = `
    <h2 style="font-family:sans-serif;color:#005B7F">New Job Application</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Department</strong></td><td>${escapeHtml(department)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Position</strong></td><td>${escapeHtml(position)}</td></tr>
      ${optionalRows}
    </table>
  `;

  const confirmationHtml = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#005B7F">We received your application!</h2>
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>
        Thank you for applying for the <strong>${escapeHtml(position)}</strong> position
        in our <strong>${escapeHtml(department)}</strong> team at McNab Ventures.
      </p>
      <p>
        We've received your application and our team will review it carefully.
        If your profile matches what we're looking for, we'll reach out to you soon.
      </p>
      <br>
      <p style="color:#6B7280;font-size:13px">
        Best regards,<br>
        <strong>McNab Ventures Careers Team</strong>
      </p>
    </div>
  `;

  // ── Send emails via Brevo ─────────────────────────────────────────────────
  try {
    await sendBrevoEmail({
      sender:     senderConfig,
      to:         [{ email: process.env.APPLY_TO_EMAIL ?? '', name: 'McNab Ventures HR' }],
      replyTo:    { email, name: fullName },
      subject:    `New Application: ${position} — ${fullName}`,
      htmlContent: hrEmailHtml,
      attachment:  [{ content: fileBase64, name: file.name }],
    });

    await sendBrevoEmail({
      sender:      senderConfig,
      to:          [{ email, name: fullName }],
      subject:     'We received your application — McNab Ventures',
      htmlContent: confirmationHtml,
    });
  } catch (err) {
    console.error('[apply] Brevo send failed:', err);
    return NextResponse.json(
      { error: 'Failed to submit your application. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
