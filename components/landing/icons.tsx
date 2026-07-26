export function IconCreate({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

export function IconExplore({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
    </svg>
  );
}

export function IconChat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  );
}

export function ChatMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      className={className}
    >
      <rect width="320" height="280" rx="16" fill="#0a0a0a" />
      <rect x="12" y="12" width="296" height="256" rx="12" fill="#111" />

      <rect x="16" y="20" width="8" height="8" rx="2" fill="#ef4444" />
      <rect x="30" y="20" width="8" height="8" rx="2" fill="#eab308" />
      <rect x="44" y="20" width="8" height="8" rx="2" fill="#22c55e" />

      <rect x="80" y="54" width="160" height="36" rx="10" fill="#60a5fa" />
      <text
        x="92" y="76"
        fill="white"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        Tell me a story
      </text>

      <rect x="80" y="100" width="140" height="28" rx="10" fill="#60a5fa" opacity="0.7" />
      <text
        x="92" y="118"
        fill="white"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        about the stars?
      </text>

      <rect x="30" y="144" width="200" height="44" rx="10" fill="#1e1e1e" stroke="#333" strokeWidth="0.5" />
      <text
        x="44" y="164"
        fill="#e2e8f0"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        The stars have been telling
      </text>
      <text
        x="44" y="180"
        fill="#e2e8f0"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        stories for billions of years...
      </text>

      <rect x="80" y="200" width="120" height="28" rx="10" fill="#60a5fa" />
      <text
        x="92" y="218"
        fill="white"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        Tell me more
      </text>
    </svg>
  );
}
