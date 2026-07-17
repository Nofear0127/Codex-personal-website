type MascotProps = { className?: string; size?: number };

export default function Mascot({ className = "", size = 112 }: MascotProps) {
  return (
    <svg className={`signal-mascot ${className}`} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle className="mascot-orbit" cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 8" />
      <ellipse cx="60" cy="60" rx="52" ry="20" stroke="currentColor" strokeWidth="1.5" opacity=".34" transform="rotate(-18 60 60)" />
      <rect x="31" y="34" width="58" height="51" rx="17" fill="rgba(255,255,255,.045)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M43 86v9M77 86v9M38 96h12M70 96h12M60 34V24M55 24h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle className="mascot-eye mascot-eye-a" cx="49" cy="57" r="4" />
      <circle className="mascot-eye mascot-eye-b" cx="71" cy="57" r="4" />
      <path d="M48 72c7 5 17 5 24 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".62" />
      <circle className="mascot-signal" cx="60" cy="21" r="3.5" />
    </svg>
  );
}
