interface CountryFlagProps {
  countryId?: string;
  className?: string;
}

const countryNames: Record<string, string> = {
  '756': 'Switzerland',
  '784': 'United Arab Emirates',
  '492': 'Monaco',
  '826': 'United Kingdom',
  '392': 'Japan',
  '643': 'Russia',
  '250': 'France',
  '840': 'United States',
  '124': 'Canada',
  '036': 'Australia',
  '578': 'Norway',
  '156': 'China',
  '616': 'Poland',
  '276': 'Germany',
  '620': 'Portugal',
  '380': 'Italy',
  '634': 'Qatar',
  '792': 'Turkey',
  '076': 'Brazil',
  '724': 'Spain',
  '702': 'Singapore',
  '428': 'Latvia',
  '398': 'Kazakhstan',
  '764': 'Thailand',
  '752': 'Sweden',
  '410': 'South Korea',
  '470': 'Malta',
  '233': 'Estonia',
  '208': 'Denmark',
};

export function CountryFlag({ countryId = '', className = '' }: CountryFlagProps) {
  const label = countryNames[countryId] ?? 'Country flag';

  return (
    <svg className={`h-5 w-8 shrink-0 overflow-hidden rounded-[4px] border border-white/20 shadow-md shadow-black/30 ${className}`} viewBox="0 0 32 20" role="img" aria-label={label}>
      {countryId === '756' && (
        <>
          <rect width="32" height="20" fill="#d52b3f" />
          <path d="M13 4h6v5h5v6h-5v5h-6v-5H8V9h5z" fill="#fff" />
        </>
      )}
      {countryId === '784' && (
        <>
          <rect width="8" height="20" fill="#ce1126" />
          <rect x="8" width="24" height="6.67" fill="#17834b" />
          <rect x="8" y="6.67" width="24" height="6.66" fill="#fff" />
          <rect x="8" y="13.33" width="24" height="6.67" fill="#111" />
        </>
      )}
      {countryId === '492' && (
        <>
          <rect width="32" height="10" fill="#ce1126" />
          <rect y="10" width="32" height="10" fill="#fff" />
        </>
      )}
      {countryId === '826' && (
        <>
          <rect width="32" height="20" fill="#173f78" />
          <path d="M0 0 32 20M32 0 0 20" stroke="#fff" strokeWidth="4" />
          <path d="M0 0 32 20M32 0 0 20" stroke="#cf2030" strokeWidth="1.5" />
          <path d="M16 0v20M0 10h32" stroke="#fff" strokeWidth="6" />
          <path d="M16 0v20M0 10h32" stroke="#cf2030" strokeWidth="3" />
        </>
      )}
      {countryId === '392' && (
        <>
          <rect width="32" height="20" fill="#fff" />
          <circle cx="16" cy="10" r="5.3" fill="#bc002d" />
        </>
      )}
      {countryId === '643' && (
        <>
          <rect width="32" height="6.67" fill="#fff" />
          <rect y="6.67" width="32" height="6.66" fill="#2455a4" />
          <rect y="13.33" width="32" height="6.67" fill="#d9363e" />
        </>
      )}
      {countryId === '250' && (
        <>
          <rect width="10.67" height="20" fill="#1f4e9b" />
          <rect x="10.67" width="10.66" height="20" fill="#fff" />
          <rect x="21.33" width="10.67" height="20" fill="#e23d4f" />
        </>
      )}
      {countryId === '840' && (
        <>
          <rect width="32" height="20" fill="#b22234" />
          {[1, 3, 5, 7, 9].map((row) => <rect key={row} y={row * 2} width="32" height="1" fill="#fff" />)}
          <rect width="14" height="11" fill="#3c3b6e" />
          <circle cx="3" cy="3" r="0.7" fill="#fff" />
          <circle cx="6" cy="5" r="0.7" fill="#fff" />
          <circle cx="9" cy="3" r="0.7" fill="#fff" />
          <circle cx="12" cy="5" r="0.7" fill="#fff" />
        </>
      )}
      {countryId === '124' && (
        <>
          <rect width="32" height="20" fill="#fff" />
          <rect width="8" height="20" fill="#d52b3f" />
          <rect x="24" width="8" height="20" fill="#d52b3f" />
          <path d="m16 4 1.2 3.3 3.3-1.1-1.3 3.1 3 1.5-3.2 1 1.2 3.3-3.1-1.5-1.1 3.3-1.2-3.3-3.1 1.5 1.2-3.3-3.2-1 3-1.5-1.3-3.1 3.3 1.1z" fill="#d52b3f" />
        </>
      )}
      {countryId === '036' && (
        <>
          <rect width="32" height="20" fill="#132b55" />
          <rect width="14" height="10" fill="#173f78" />
          <path d="M0 0 14 10M14 0 0 10" stroke="#fff" strokeWidth="2.2" />
          <path d="M0 0 14 10M14 0 0 10" stroke="#cf2030" strokeWidth="0.9" />
          <path d="M7 0v10M0 5h14" stroke="#fff" strokeWidth="2.4" />
          <path d="M7 0v10M0 5h14" stroke="#cf2030" strokeWidth="1.1" />
          <path d="m10 2.1.45 1.15 1.22.06-.94.76.3 1.18-.98-.65-.98.65.3-1.18-.94-.76 1.22-.06z" fill="#fff" />
          <path d="m24 3 .55 1.45 1.55.08-1.2.96.38 1.48-1.28-.8-1.28.8.38-1.48-1.2-.96 1.55-.08z" fill="#fff" />
          <path d="m27.3 9.1.43 1.08 1.14.06-.88.7.28 1.1-.97-.59-.95.59.27-1.1-.88-.7 1.15-.06z" fill="#fff" />
          <path d="m24.2 14.1.45 1.12 1.18.06-.9.72.28 1.14-.98-.63-.98.63.28-1.14-.9-.72 1.18-.06z" fill="#fff" />
          <path d="m19 13.3.38.95 1 .05-.77.61.24.98-.85-.53-.85.53.24-.98-.77-.61 1-.05z" fill="#fff" />
          <path d="m7 13.2.55 1.4 1.5.08-1.16.92.36 1.43-1.25-.77-1.25.77.36-1.43-1.16-.92 1.5-.08z" fill="#fff" />
        </>
      )}
      {countryId === '578' && (
        <>
          <rect width="32" height="20" fill="#ba0c2f" />
          <path d="M10 0v20M0 8h32" stroke="#fff" strokeWidth="6" />
          <path d="M10 0v20M0 8h32" stroke="#00205b" strokeWidth="3" />
        </>
      )}
      {countryId === '156' && (
        <>
          <rect width="32" height="20" fill="#de2910" />
          <path d="m5 3 1 2.1 2.3.2-1.8 1.5.6 2.2L5 7.8 3 9l.6-2.2L1.8 5.3l2.3-.2z" fill="#ffde00" />
          <circle cx="10" cy="3" r="0.9" fill="#ffde00" /><circle cx="12" cy="5" r="0.9" fill="#ffde00" /><circle cx="11" cy="8" r="0.9" fill="#ffde00" />
        </>
      )}
      {countryId === '616' && (
        <><rect width="32" height="10" fill="#fff" /><rect y="10" width="32" height="10" fill="#dc143c" /></>
      )}
      {countryId === '276' && (
        <>
          <rect width="32" height="6.67" fill="#111" /><rect y="6.67" width="32" height="6.66" fill="#d00" /><rect y="13.33" width="32" height="6.67" fill="#ffce00" />
        </>
      )}
      {countryId === '620' && (
        <><rect width="13" height="20" fill="#006600" /><rect x="13" width="19" height="20" fill="#ff1d25" /><circle cx="13" cy="10" r="4" fill="#ffdf00" /><circle cx="13" cy="10" r="2.8" fill="#fff" /></>
      )}
      {countryId === '380' && (
        <><rect width="10.67" height="20" fill="#009246" /><rect x="10.67" width="10.66" height="20" fill="#fff" /><rect x="21.33" width="10.67" height="20" fill="#ce2b37" /></>
      )}
      {countryId === '634' && (
        <><rect width="32" height="20" fill="#8a1538" /><path d="M0 0h9l2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2H0z" fill="#fff" /></>
      )}
      {countryId === '792' && (
        <>
          <rect width="32" height="20" fill="#e30a17" /><circle cx="14" cy="10" r="5" fill="#fff" /><circle cx="16" cy="10" r="4" fill="#e30a17" />
          <path d="m22 6 .8 2.2 2.3.1-1.8 1.4.6 2.2-1.9-1.3-1.9 1.3.6-2.2-1.8-1.4 2.3-.1z" fill="#fff" />
        </>
      )}
      {countryId === '076' && (
        <><rect width="32" height="20" fill="#009c3b" /><path d="M16 2 29 10 16 18 3 10z" fill="#ffdf00" /><circle cx="16" cy="10" r="4.6" fill="#002776" /></>
      )}
      {countryId === '724' && (
        <>
          <rect width="32" height="20" fill="#f1c40f" />
          <rect width="32" height="5" fill="#c60b1e" />
          <rect y="15" width="32" height="5" fill="#c60b1e" />
          <rect x="6" y="8" width="2.5" height="4" fill="#c60b1e" />
        </>
      )}
      {countryId === '702' && (
        <>
          <rect width="32" height="10" fill="#ed2939" />
          <rect y="10" width="32" height="10" fill="#fff" />
          <circle cx="7" cy="5" r="3.2" fill="#fff" />
          <circle cx="8.2" cy="5" r="2.6" fill="#ed2939" />
          {[0, 1, 2, 3, 4].map((star) => {
            const angle = (star * Math.PI * 2) / 5 - Math.PI / 2;
            const x = 11.5 + Math.cos(angle) * 2.8;
            const y = 5 + Math.sin(angle) * 2.8;
            return <circle key={star} cx={x} cy={y} r="0.65" fill="#fff" />;
          })}
        </>
      )}
      {countryId === '428' && (
        <>
          <rect width="32" height="20" fill="#9e3039" />
          <rect y="7" width="32" height="6" fill="#fff" />
        </>
      )}
      {countryId === '398' && (
        <>
          <rect width="32" height="20" fill="#00afca" />
          <circle cx="16" cy="10" r="3.8" fill="#f6d24a" opacity="0.95" />
          <path d="M16 2v16M8 10h16" stroke="#f6d24a" strokeWidth="0.55" opacity="0.8" />
          <path d="M4 4 7 6M28 4l-3 2M4 16l3-2M28 16l-3-2" stroke="#f6d24a" strokeWidth="0.75" />
        </>
      )}
      {countryId === '764' && (
        <>
          <rect width="32" height="20" fill="#a51931" />
          <rect y="3" width="32" height="14" fill="#f4f5f8" />
          <rect y="6" width="32" height="8" fill="#2d2a4a" />
        </>
      )}
      {countryId === '752' && (
        <>
          <rect width="32" height="20" fill="#006aa7" />
          <path d="M9 0v20M0 8h32" stroke="#fecc00" strokeWidth="4" />
        </>
      )}
      {countryId === '410' && (
        <>
          <rect width="32" height="20" fill="#fff" />
          <circle cx="16" cy="10" r="4.5" fill="#cd2e3a" />
          <path d="M16 5.5a4.5 4.5 0 0 1 0 9 2.25 2.25 0 0 0 0-4.5 2.25 2.25 0 0 1 0-4.5z" fill="#0047a0" />
          <path d="m5 4 4 2M23 14l4 2M5 16l4-2M23 6l4-2" stroke="#111" strokeWidth="1.1" />
        </>
      )}
      {countryId === '470' && (
        <>
          <rect width="16" height="20" fill="#fff" />
          <rect x="16" width="16" height="20" fill="#cf142b" />
          <path d="M5 3h3M6.5 1.5v3" stroke="#9b9b9b" strokeWidth="0.8" />
        </>
      )}
      {countryId === '233' && (
        <>
          <rect width="32" height="6.67" fill="#4891d1" />
          <rect y="6.67" width="32" height="6.66" fill="#111" />
          <rect y="13.33" width="32" height="6.67" fill="#fff" />
        </>
      )}
      {countryId === '208' && (
        <>
          <rect width="32" height="20" fill="#c8102e" />
          <path d="M10 0v20M0 8h32" stroke="#fff" strokeWidth="5" />
        </>
      )}
      {!countryNames[countryId] && <rect width="32" height="20" fill="#5a6060" />}
    </svg>
  );
}
