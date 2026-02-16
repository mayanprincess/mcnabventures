'use client';

import { useState, useRef } from 'react';

const INPUT_STYLE =
  'w-full rounded-xl bg-[#F8F6F1] px-4 py-3 font-work-sans text-navy placeholder:text-navy/50 focus:outline-none focus:ring-2 focus:ring-turquoise/50';
const LABEL_STYLE = 'font-fustat-medium text-[#1E1C1A] text-sm block mb-2';
const SECTION_TITLE = 'font-fustat-extrabold text-[#1E1C1A] text-base mb-4';

// Resume upload security (client-side). Server MUST re-validate and apply mitigations (see docs/apply-now-upload-security.md).
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46]; // %PDF
const ZIP_SIGNATURE = [0x50, 0x4b, 0x03, 0x04]; // PK..
const ZIP_EMPTY = [0x50, 0x4b, 0x05, 0x06]; // empty ZIP
const DOC_OLECFB = [0xd0, 0xcf, 0x11, 0xe0]; // legacy .doc

function matchesSignature(bytes, sig) {
  return sig.every((b, i) => bytes[i] === b);
}

function isAllowedResumeSignature(bytes) {
  if (bytes.length < 4) return false;
  return (
    matchesSignature(bytes, PDF_SIGNATURE) ||
    matchesSignature(bytes, ZIP_SIGNATURE) ||
    matchesSignature(bytes, ZIP_EMPTY) ||
    matchesSignature(bytes, DOC_OLECFB)
  );
}

function readFileMagic(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(new Uint8Array(fr.result).subarray(0, 4));
    fr.onerror = () => reject(new Error('Could not read file'));
    fr.readAsArrayBuffer(file.slice(0, 4));
  });
}

const DEPARTMENTS = [
  'Select a department',
  'Engineering',
  'Operations',
  'Hospitality',
  'Finance',
  'Marketing',
  'Other',
];

export default function ApplyNow() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    linkedin: '',
    portfolio: '',
    resume: null,
    coverLetter: '',
    agreeTerms: false,
  });
  const [coverLength, setCoverLength] = useState(0);
  const [resumeError, setResumeError] = useState(null);
  const resumeInputRef = useRef(null);
  const MAX_COVER = 1000;

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'coverLetter') {
      setCoverLength(value.length);
      setForm((prev) => ({ ...prev, [name]: value.slice(0, MAX_COVER) }));
      return;
    }
    if (name === 'resume' && type === 'file') {
      const file = files?.[0] ?? null;
      setResumeError(null);
      if (!file) {
        setForm((prev) => ({ ...prev, resume: null }));
        return;
      }
      if (file.size > MAX_RESUME_BYTES) {
        setResumeError('File is too large. Maximum size is 5MB.');
        setForm((prev) => ({ ...prev, resume: null }));
        if (resumeInputRef.current) resumeInputRef.current.value = '';
        return;
      }
      try {
        const magic = await readFileMagic(file);
        if (!isAllowedResumeSignature(magic)) {
          setResumeError('Invalid file type. Only PDF or DOC/DOCX are allowed.');
          setForm((prev) => ({ ...prev, resume: null }));
          if (resumeInputRef.current) resumeInputRef.current.value = '';
          return;
        }
        setForm((prev) => ({ ...prev, resume: file }));
      } catch {
        setResumeError('Could not verify file. Please try another file.');
        setForm((prev) => ({ ...prev, resume: null }));
        if (resumeInputRef.current) resumeInputRef.current.value = '';
      }
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? (files?.[0] ?? null) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API or form service
  };

  const handleClear = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      linkedin: '',
      portfolio: '',
      resume: null,
      coverLetter: '',
      agreeTerms: false,
    });
    setCoverLength(0);
    setResumeError(null);
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-[100px] bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[720px]">
          {/* Header */}
          <h2 className="font-literata-light text-navy text-[28px] sm:text-[32px] lg:text-[36px] font-semibold mb-2">
            Job Application
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base mb-8">
            Fill out the form below to apply for a position at our company. All fields marked with{' '}
            <span className="text-red-500">*</span> are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className={SECTION_TITLE}>Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={LABEL_STYLE}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={LABEL_STYLE}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Marston"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL_STYLE}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL_STYLE}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+504 3312-1212"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={INPUT_STYLE}
                  />
                </div>
              </div>
            </div>

            {/* Position Information */}
            <div>
              <h3 className={SECTION_TITLE}>Position Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className={LABEL_STYLE}>
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className={`${INPUT_STYLE} appearance-none bg-[#F8F6F1] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23005B7F'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" }}
                  >
                    {DEPARTMENTS.map((opt) => (
                      <option key={opt} value={opt === 'Select a department' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="position" className={LABEL_STYLE}>
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    value={form.position}
                    onChange={handleChange}
                    required
                    className={INPUT_STYLE}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className={SECTION_TITLE}>Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="linkedin" className={LABEL_STYLE}>
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/johndoe"
                    value={form.linkedin}
                    onChange={handleChange}
                    className={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className={LABEL_STYLE}>
                    Portfolio/Website
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://johndoe.com"
                    value={form.portfolio}
                    onChange={handleChange}
                    className={INPUT_STYLE}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={LABEL_STYLE}>
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-turquoise text-turquoise font-fustat-medium text-sm px-4 py-3 cursor-pointer hover:bg-turquoise/5 transition-colors w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Choose File
                    <input
                      ref={resumeInputRef}
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  {form.resume && !resumeError && (
                    <span className="text-[#6B7280] text-sm">{form.resume.name}</span>
                  )}
                </div>
                <p className="text-[#6B7280] text-xs mt-1.5">PDF or DOC/DOCX, max 5MB. Only document formats are accepted.</p>
                {resumeError && (
                  <p className="text-red-500 text-xs mt-1.5" role="alert">
                    {resumeError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="coverLetter" className={LABEL_STYLE}>
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Tell us why you're interested in this position..."
                  value={form.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  maxLength={MAX_COVER}
                  className={`${INPUT_STYLE} resize-y min-h-[120px]`}
                />
                <p className="text-[#6B7280] text-xs mt-1.5">
                  {coverLength}/{MAX_COVER} characters
                </p>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={form.agreeTerms}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 rounded border-navy text-turquoise focus:ring-turquoise"
              />
              <label htmlFor="agreeTerms" className="text-sm text-[#1E1C1A]">
                I agree with{' '}
                <a href="/terms" className="text-turquoise underline hover:text-navy">
                  Terms of use
                </a>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end sm:gap-4 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-turquoise text-turquoise font-fustat-medium text-sm px-6 py-3 hover:bg-turquoise/10 transition-colors"
              >
                Clear Form
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white font-fustat-medium text-sm px-6 py-3 hover:bg-navy/90 transition-colors"
              >
                Submit Application
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </form>
      </div>
    </section>
  );
}
