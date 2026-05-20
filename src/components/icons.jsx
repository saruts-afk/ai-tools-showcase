export function IconLive({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="16" r="1.8" fill={color} stroke="none" />
      <path d="M9 13a4.5 4.5 0 0 1 6 0" />
      <path d="M5.5 9.5a9 9 0 0 1 13 0" />
    </svg>
  )
}

export function IconBug({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13.5" rx="3" ry="4.5" />
      <path d="M10 8.5V7a2 2 0 0 1 4 0v1.5" />
      <path d="M9 9.5l-2.5-2M15 9.5l2.5-2" />
      <path d="M6 12.5H4M20 12.5h-2" />
      <path d="M6 16H4M20 16h-2" />
    </svg>
  )
}

export function IconSurvey({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="9.5" y="7" width="4" height="14" rx="1" />
      <rect x="16" y="3" width="4" height="18" rx="1" />
    </svg>
  )
}

export function IconElo({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v11a6 6 0 0 1-12 0z" />
      <path d="M6 7H3v4a3 3 0 0 0 3 3M18 7h3v4a3 3 0 0 1-3 3" />
      <path d="M12 17v4M9 21h6" />
    </svg>
  )
}

export const ICONS = {
  livestream: IconLive,
  bug: IconBug,
  survey: IconSurvey,
  elo: IconElo,
}
