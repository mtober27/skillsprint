export function Icon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...props}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 6-6 2 2-6z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...props}>
          <path d="M8 4h8v4a4 4 0 0 1-8 0z" />
          <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M9 20h6M12 14v3" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
          <circle cx="10" cy="8" r="3" />
          <path d="M20 20v-1.2a3 3 0 0 0-2.2-2.9M16.5 5.2a3 3 0 0 1 0 5.6" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...props}>
          <path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-2 1.2-3.6 2-4.6C10 9 11 10 12 10c0-2.5 0-5 0-7z" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="m5 12 5 5L20 7" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'back':
      return (
        <svg {...props}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
        </svg>
      );
    case 'target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...props}>
          <path d="M4 20h4l10-10-4-4L4 16z" />
          <path d="m12 6 4 4" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <path d="M4 19h16" />
          <path d="M7 16v-4M12 16V7M17 16v-7" />
        </svg>
      );
    default:
      return null;
  }
}
