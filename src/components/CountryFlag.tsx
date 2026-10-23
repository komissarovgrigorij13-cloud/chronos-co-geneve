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
      {!countryNames[countryId] && <rect width="32" height="20" fill="#5a6060" />}
    </svg>
  );
}
