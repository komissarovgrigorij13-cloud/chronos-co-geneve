export const countryNames: Record<string, string> = {
  '756': 'Switzerland', '784': 'United Arab Emirates', '492': 'Monaco', '826': 'United Kingdom',
  '392': 'Japan', '643': 'Russia', '250': 'France', '840': 'United States', '124': 'Canada',
  '036': 'Australia', '578': 'Norway', '156': 'China', '616': 'Poland', '276': 'Germany',
  '620': 'Portugal', '380': 'Italy', '634': 'Qatar', '792': 'Turkey', '076': 'Brazil',
  '724': 'Spain', '702': 'Singapore', '428': 'Latvia', '398': 'Kazakhstan', '764': 'Thailand',
  '752': 'Sweden', '410': 'South Korea', '470': 'Malta', '233': 'Estonia', '208': 'Denmark',
};

const star = (cx: number, cy: number, radius: number, fill = '#ffde00') => {
  const points = Array.from({ length: 10 }, (_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI / 5;
    const distance = index % 2 === 0 ? radius : radius * 0.42;
    return `${cx + Math.cos(angle) * distance},${cy + Math.sin(angle) * distance}`;
  }).join(' ');
  return `<polygon points="${points}" fill="${fill}"/>`;
};

export function getCountryFlagMarkup(countryId: string): string {
  switch (countryId) {
    case '756': return '<rect width="32" height="20" fill="#d52b3f"/><path d="M13 4h6v5h5v6h-5v5h-6v-5H8V9h5z" fill="#fff"/>';
    case '784': return '<rect width="8" height="20" fill="#ce1126"/><rect x="8" width="24" height="6.67" fill="#17834b"/><rect x="8" y="6.67" width="24" height="6.66" fill="#fff"/><rect x="8" y="13.33" width="24" height="6.67" fill="#111"/>';
    case '492': return '<rect width="32" height="10" fill="#ce1126"/><rect y="10" width="32" height="10" fill="#fff"/>';
    case '826': return '<rect width="32" height="20" fill="#173f78"/><path d="M0 0 32 20M32 0 0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 32 20M32 0 0 20" stroke="#cf2030" stroke-width="1.5"/><path d="M16 0v20M0 10h32" stroke="#fff" stroke-width="6"/><path d="M16 0v20M0 10h32" stroke="#cf2030" stroke-width="3"/>';
    case '392': return '<rect width="32" height="20" fill="#fff"/><circle cx="16" cy="10" r="5.3" fill="#bc002d"/>';
    case '643': return '<rect width="32" height="6.67" fill="#fff"/><rect y="6.67" width="32" height="6.66" fill="#2455a4"/><rect y="13.33" width="32" height="6.67" fill="#d9363e"/>';
    case '250': return '<rect width="10.67" height="20" fill="#1f4e9b"/><rect x="10.67" width="10.66" height="20" fill="#fff"/><rect x="21.33" width="10.67" height="20" fill="#e23d4f"/>';
    case '840': return '<rect width="32" height="20" fill="#b22234"/><rect y="2" width="32" height="1" fill="#fff"/><rect y="6" width="32" height="1" fill="#fff"/><rect y="10" width="32" height="1" fill="#fff"/><rect y="14" width="32" height="1" fill="#fff"/><rect y="18" width="32" height="1" fill="#fff"/><rect width="14" height="11" fill="#3c3b6e"/><circle cx="3" cy="3" r=".7" fill="#fff"/><circle cx="6" cy="5" r=".7" fill="#fff"/><circle cx="9" cy="3" r=".7" fill="#fff"/><circle cx="12" cy="5" r=".7" fill="#fff"/>';
    case '124': return '<rect width="32" height="20" fill="#fff"/><rect width="8" height="20" fill="#d52b3f"/><rect x="24" width="8" height="20" fill="#d52b3f"/><path d="m16 4 1.2 3.3 3.3-1.1-1.3 3.1 3 1.5-3.2 1 1.2 3.3-3.1-1.5-1.1 3.3-1.2-3.3-3.1 1.5 1.2-3.3-3.2-1 3-1.5-1.3-3.1 3.3 1.1z" fill="#d52b3f"/>';
    case '036': return '<rect width="32" height="20" fill="#132b55"/><rect width="14" height="10" fill="#173f78"/><path d="M0 0 14 10M14 0 0 10" stroke="#fff" stroke-width="2.2"/><path d="M0 0 14 10M14 0 0 10" stroke="#cf2030" stroke-width=".9"/><path d="M7 0v10M0 5h14" stroke="#fff" stroke-width="2.4"/><path d="M7 0v10M0 5h14" stroke="#cf2030" stroke-width="1.1"/><path d="m10 2.1.45 1.15 1.22.06-.94.76.3 1.18-.98-.65-.98.65.3-1.18-.94-.76 1.22-.06zM24 3l.55 1.45 1.55.08-1.2.96.38 1.48-1.28-.8-1.28.8.38-1.48-1.2-.96 1.55-.08zM27.3 9.1l.43 1.08 1.14.06-.88.7.28 1.1-.97-.59-.95.59.27-1.1-.88-.7 1.15-.06zM24.2 14.1l.45 1.12 1.18.06-.9.72.28 1.14-.98-.63-.98.63.28-1.14-.9-.72 1.18-.06zM19 13.3l.38.95 1 .05-.77.61.24.98-.85-.53-.85.53.24-.98-.77-.61 1-.05z" fill="#fff"/>';
    case '578': return '<rect width="32" height="20" fill="#ba0c2f"/><path d="M10 0v20M0 8h32" stroke="#fff" stroke-width="6"/><path d="M10 0v20M0 8h32" stroke="#00205b" stroke-width="3"/>';
    case '156': return `<rect width="32" height="20" fill="#de2910"/>${star(5, 4, 2.4)}${star(13.5, 2.7, .9)}${star(16, 5, .9)}${star(15, 8, .9)}${star(11.5, 9, .9)}`;
    case '616': return '<rect width="32" height="10" fill="#fff"/><rect y="10" width="32" height="10" fill="#dc143c"/>';
    case '276': return '<rect width="32" height="6.67" fill="#111"/><rect y="6.67" width="32" height="6.66" fill="#d00"/><rect y="13.33" width="32" height="6.67" fill="#ffce00"/>';
    case '620': return '<rect width="13" height="20" fill="#006600"/><rect x="13" width="19" height="20" fill="#ff1d25"/><circle cx="13" cy="10" r="4" fill="#ffdf00"/><circle cx="13" cy="10" r="2.8" fill="#fff"/>';
    case '380': return '<rect width="10.67" height="20" fill="#009246"/><rect x="10.67" width="10.66" height="20" fill="#fff"/><rect x="21.33" width="10.67" height="20" fill="#ce2b37"/>';
    case '634': return '<rect width="32" height="20" fill="#8a1538"/><path d="M0 0h9l2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2H0z" fill="#fff"/>';
    case '792': return '<rect width="32" height="20" fill="#e30a17"/><circle cx="14" cy="10" r="5" fill="#fff"/><circle cx="16" cy="10" r="4" fill="#e30a17"/><path d="m22 6 .8 2.2 2.3.1-1.8 1.4.6 2.2-1.9-1.3-1.9 1.3.6-2.2-1.8-1.4 2.3-.1z" fill="#fff"/>';
    case '076': return '<rect width="32" height="20" fill="#009c3b"/><path d="M16 2 29 10 16 18 3 10z" fill="#ffdf00"/><circle cx="16" cy="10" r="4.6" fill="#002776"/>';
    case '724': return '<rect width="32" height="20" fill="#f1c40f"/><rect width="32" height="5" fill="#c60b1e"/><rect y="15" width="32" height="5" fill="#c60b1e"/><rect x="6" y="8" width="2.5" height="4" fill="#c60b1e"/>';
    case '702': return '<rect width="32" height="10" fill="#ed2939"/><rect y="10" width="32" height="10" fill="#fff"/><circle cx="7" cy="5" r="3.2" fill="#fff"/><circle cx="8.2" cy="5" r="2.6" fill="#ed2939"/><circle cx="11.5" cy="2.2" r=".65" fill="#fff"/><circle cx="14.2" cy="4.5" r=".65" fill="#fff"/><circle cx="13" cy="7.5" r=".65" fill="#fff"/><circle cx="10" cy="7.5" r=".65" fill="#fff"/><circle cx="8.8" cy="4.5" r=".65" fill="#fff"/>';
    case '428': return '<rect width="32" height="20" fill="#9e3039"/><rect y="7" width="32" height="6" fill="#fff"/>';
    case '398': return '<rect width="32" height="20" fill="#00afca"/><circle cx="16" cy="10" r="3.8" fill="#f6d24a" opacity=".95"/><path d="M16 2v16M8 10h16" stroke="#f6d24a" stroke-width=".55" opacity=".8"/>';
    case '764': return '<rect width="32" height="20" fill="#a51931"/><rect y="3" width="32" height="14" fill="#f4f5f8"/><rect y="6" width="32" height="8" fill="#2d2a4a"/>';
    case '752': return '<rect width="32" height="20" fill="#006aa7"/><path d="M9 0v20M0 8h32" stroke="#fecc00" stroke-width="4"/>';
    case '410': return '<rect width="32" height="20" fill="#fff"/><circle cx="16" cy="10" r="4.5" fill="#cd2e3a"/><path d="M16 5.5a4.5 4.5 0 0 1 0 9 2.25 2.25 0 0 0 0-4.5 2.25 2.25 0 0 1 0-4.5z" fill="#0047a0"/><path d="m5 4 4 2M23 14l4 2M5 16l4-2M23 6l4-2" stroke="#111" stroke-width="1.1"/>';
    case '470': return '<rect width="16" height="20" fill="#fff"/><rect x="16" width="16" height="20" fill="#cf142b"/><path d="M5 3h3M6.5 1.5v3" stroke="#9b9b9b" stroke-width=".8"/>';
    case '233': return '<rect width="32" height="6.67" fill="#4891d1"/><rect y="6.67" width="32" height="6.66" fill="#111"/><rect y="13.33" width="32" height="6.67" fill="#fff"/>';
    case '208': return '<rect width="32" height="20" fill="#c8102e"/><path d="M10 0v20M0 8h32" stroke="#fff" stroke-width="5"/>';
    default: return '<rect width="32" height="20" fill="#5a6060"/>';
  }
}
