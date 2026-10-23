import type { Language } from './translations';

export interface BoutiqueCity {
  id: string;
  countryId: string;
  coordinates: [number, number];
  labels: Record<Language, { city: string; country: string }>;
}

export const BOUTIQUE_CITIES: BoutiqueCity[] = [
  {
    id: 'geneva',
    countryId: '756',
    coordinates: [6.1432, 46.2044],
    labels: {
      EN: { city: 'Geneva', country: 'Switzerland' },
      RU: { city: 'Женева', country: 'Швейцария' },
      FR: { city: 'Genève', country: 'Suisse' },
      AR: { city: 'جنيف', country: 'سويسرا' },
    },
  },
  {
    id: 'dubai',
    countryId: '784',
    coordinates: [55.2708, 25.2048],
    labels: {
      EN: { city: 'Dubai', country: 'United Arab Emirates' },
      RU: { city: 'Дубай', country: 'ОАЭ' },
      FR: { city: 'Dubaï', country: 'Émirats Arabes Unis' },
      AR: { city: 'دبي', country: 'الإمارات' },
    },
  },
  {
    id: 'monaco',
    countryId: '492',
    coordinates: [7.4246, 43.7384],
    labels: {
      EN: { city: 'Monaco', country: 'Monaco' },
      RU: { city: 'Монако', country: 'Княжество Монако' },
      FR: { city: 'Monaco', country: 'Monaco' },
      AR: { city: 'موناكو', country: 'موناكو' },
    },
  },
  {
    id: 'london',
    countryId: '826',
    coordinates: [-0.1276, 51.5072],
    labels: {
      EN: { city: 'London', country: 'United Kingdom' },
      RU: { city: 'Лондон', country: 'Великобритания' },
      FR: { city: 'Londres', country: 'Royaume-Uni' },
      AR: { city: 'لندن', country: 'المملكة المتحدة' },
    },
  },
  {
    id: 'tokyo',
    countryId: '392',
    coordinates: [139.6503, 35.6762],
    labels: {
      EN: { city: 'Tokyo', country: 'Japan' },
      RU: { city: 'Токио', country: 'Япония' },
      FR: { city: 'Tokyo', country: 'Japon' },
      AR: { city: 'طوكيو', country: 'اليابان' },
    },
  },
  {
    id: 'moscow',
    countryId: '643',
    coordinates: [37.6173, 55.7558],
    labels: {
      EN: { city: 'Moscow', country: 'Russia' },
      RU: { city: 'Москва', country: 'Россия' },
      FR: { city: 'Moscou', country: 'Russie' },
      AR: { city: 'موسكو', country: 'روسيا' },
    },
  },
];

export const boutiqueCountryIds = new Set(BOUTIQUE_CITIES.map((city) => city.countryId));
