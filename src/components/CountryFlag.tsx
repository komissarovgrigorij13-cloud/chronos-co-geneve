import { countryNames, getCountryFlagAssetPath } from '../data/flags';

interface CountryFlagProps {
  countryId?: string;
  className?: string;
}

export function CountryFlag({ countryId = '', className = '' }: CountryFlagProps) {
  const label = countryNames[countryId] ?? 'Country flag';

  return (
    <img
      className={`h-5 w-8 shrink-0 overflow-hidden rounded-[4px] border border-white/20 shadow-md shadow-black/30 ${className}`}
      src={getCountryFlagAssetPath(countryId)}
      alt={label}
      role="img"
      loading="lazy"
      decoding="async"
    />
  );
}
