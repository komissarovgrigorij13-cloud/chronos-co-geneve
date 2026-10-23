import { countryNames, getCountryFlagMarkup } from '../data/flags';

interface CountryFlagProps {
  countryId?: string;
  className?: string;
}

export function CountryFlag({ countryId = '', className = '' }: CountryFlagProps) {
  const label = countryNames[countryId] ?? 'Country flag';

  return (
    <svg
      className={`h-5 w-8 shrink-0 overflow-hidden rounded-[4px] border border-white/20 shadow-md shadow-black/30 ${className}`}
      viewBox="0 0 32 20"
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: getCountryFlagMarkup(countryId) }}
    />
  );
}
