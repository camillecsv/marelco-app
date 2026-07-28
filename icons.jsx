// icons.jsx — thin-stroke SVG icon set, 1.5px, 24x24
const Icon = ({ d, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.5, children, viewBox = '0 0 24 24', ...rest }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  Home:    (p) => <Icon {...p}><path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.6V20h4.5v-5.5h4V20H18.5V9.6"/></Icon>,
  Bill:    (p) => <Icon {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></Icon>,
  Bolt:    (p) => <Icon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></Icon>,
  Outage:  (p) => <Icon {...p}><path d="M12 3v3M4.2 6.2l2.1 2.1M3 14h3M18 14h3M17.7 6.2l-2.1 2.1"/><path d="M9 19c0-2 1-3 3-3s3 1 3 3v1H9z"/><path d="M12 9a4 4 0 014 4"/></Icon>,
  Coop:    (p) => <Icon {...p}><path d="M12 3l4 3v3M12 3L8 6v3"/><path d="M5 21V11l7-5 7 5v10"/><path d="M10 21v-5h4v5"/></Icon>,
  Bell:    (p) => <Icon {...p}><path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15z"/><path d="M10 21h4"/></Icon>,
  Chat:    (p) => <Icon {...p}><path d="M4 5h16v11H8l-4 4z"/></Icon>,
  Map:     (p) => <Icon {...p}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16M15 6v16"/></Icon>,
  Search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="6" fill="none"/><path d="M20 20l-4-4"/></Icon>,
  Chevron: (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  ChevronL:(p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  Plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Check:   (p) => <Icon {...p}><path d="M5 12.5l4.5 4.5L20 6"/></Icon>,
  X:       (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>,
  Wifi:    (p) => <Icon {...p}><path d="M3 9c5-5 13-5 18 0"/><path d="M6 12c4-4 8-4 12 0"/><path d="M9 15c2-2 4-2 6 0"/><circle cx="12" cy="18" r="0.6" fill="currentColor"/></Icon>,
  WifiOff: (p) => <Icon {...p}><path d="M3 9c2-2 4.5-3.3 7-3.8M14.5 5.4c2.4.5 4.6 1.8 6.5 3.6"/><path d="M9 15c2-2 4-2 6 0"/><circle cx="12" cy="18" r="0.6" fill="currentColor"/><path d="M3 3l18 18" stroke="currentColor"/></Icon>,
  MapPin:  (p) => <Icon {...p}><path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></Icon>,
  Camera:  (p) => <Icon {...p}><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="4"/></Icon>,
  Send:    (p) => <Icon {...p}><path d="M4 12L20 4l-4 16-3-7-7-3z" fill="none"/></Icon>,
  Calendar:(p) => <Icon {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></Icon>,
  Clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></Icon>,
  Spark:   (p) => <Icon {...p}><path d="M5 3h14v8H5z"/><path d="M9 11l-2 4h10l-2-4"/><path d="M12 19v2M9 21h6"/></Icon>,
  Settings:(p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1A2 2 0 114 16.9l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1A2 2 0 117.1 4l.1.1A1.7 1.7 0 009 4.4 1.7 1.7 0 0010 2.9V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1A2 2 0 1119.9 7l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></Icon>,
  Leaf:    (p) => <Icon {...p}><path d="M5 19c1-9 6-14 15-14-1 9-6 14-15 14z"/><path d="M5 19c4-4 8-7 12-9"/></Icon>,
  ArrowUp: (p) => <Icon {...p}><path d="M12 19V5M6 11l6-6 6 6"/></Icon>,
  ArrowDn: (p) => <Icon {...p}><path d="M12 5v14M6 13l6 6 6-6"/></Icon>,
  More:    (p) => <Icon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></Icon>,
  Shield:  (p) => <Icon {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></Icon>,
  Info:    (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8v.5"/></Icon>,
  Coin:    (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5h-3a1.5 1.5 0 100 3h2a1.5 1.5 0 110 3h-3.5M12 7.5v1M12 15.5v1"/></Icon>,
  Receipt: (p) => <Icon {...p}><path d="M5 3h14v18l-2-1.5L15 21l-2-1.5L11 21l-2-1.5L7 21l-2-1.5z"/><path d="M8 8h8M8 12h8M8 16h5"/></Icon>,
  Connect: (p) => <Icon {...p}><path d="M9.5 14.5l5-5"/><path d="M12 7l1-1a3.5 3.5 0 015 5l-2 2"/><path d="M12 17l-1 1a3.5 3.5 0 01-5-5l2-2"/></Icon>,
};

// EcoKo logo lockup — wordmark + leaf-bolt glyph
function EcoKoMark({ size = 28, color = 'currentColor' }) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap: size*0.28, color}}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        {/* leaf with bolt vein */}
        <path d="M5 25c1-12 8-18 22-19-1 12-8 18-22 19z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M19 8l-5 8h4l-3 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span style={{
        fontFamily: 'Instrument Serif, Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: size * 0.95,
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>EcoKo</span>
    </span>
  );
}

window.I = I;
window.Icon = Icon;
window.EcoKoMark = EcoKoMark;
