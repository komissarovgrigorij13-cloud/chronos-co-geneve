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
  {
    id: 'paris',
    countryId: '250',
    coordinates: [2.3522, 48.8566],
    labels: {
      EN: { city: 'Paris', country: 'France' },
      RU: { city: 'Париж', country: 'Франция' },
      FR: { city: 'Paris', country: 'France' },
      AR: { city: 'باريس', country: 'فرنسا' },
    },
  },
  {
    id: 'new-york',
    countryId: '840',
    coordinates: [-74.006, 40.7128],
    labels: {
      EN: { city: 'New York', country: 'United States' },
      RU: { city: 'Нью-Йорк', country: 'США' },
      FR: { city: 'New York', country: 'États-Unis' },
      AR: { city: 'نيويورك', country: 'الولايات المتحدة' },
    },
  },
  {
    id: 'toronto',
    countryId: '124',
    coordinates: [-79.3832, 43.6532],
    labels: {
      EN: { city: 'Toronto', country: 'Canada' },
      RU: { city: 'Торонто', country: 'Канада' },
      FR: { city: 'Toronto', country: 'Canada' },
      AR: { city: 'تورنتو', country: 'كندا' },
    },
  },
  {
    id: 'sydney',
    countryId: '036',
    coordinates: [151.2093, -33.8688],
    labels: {
      EN: { city: 'Sydney', country: 'Australia' },
      RU: { city: 'Сидней', country: 'Австралия' },
      FR: { city: 'Sydney', country: 'Australie' },
      AR: { city: 'سيدني', country: 'أستراليا' },
    },
  },
  {
    id: 'oslo',
    countryId: '578',
    coordinates: [10.7522, 59.9139],
    labels: {
      EN: { city: 'Oslo', country: 'Norway' },
      RU: { city: 'Осло', country: 'Норвегия' },
      FR: { city: 'Oslo', country: 'Norvège' },
      AR: { city: 'أوسلو', country: 'النرويج' },
    },
  },
  {
    id: 'beijing',
    countryId: '156',
    coordinates: [116.4074, 39.9042],
    labels: {
      EN: { city: 'Beijing', country: 'China' },
      RU: { city: 'Пекин', country: 'Китай' },
      FR: { city: 'Pékin', country: 'Chine' },
      AR: { city: 'بكين', country: 'الصين' },
    },
  },
  {
    id: 'warsaw',
    countryId: '616',
    coordinates: [21.0122, 52.2297],
    labels: {
      EN: { city: 'Warsaw', country: 'Poland' },
      RU: { city: 'Варшава', country: 'Польша' },
      FR: { city: 'Varsovie', country: 'Pologne' },
      AR: { city: 'وارسو', country: 'بولندا' },
    },
  },
  {
    id: 'munich',
    countryId: '276',
    coordinates: [11.582, 48.1351],
    labels: {
      EN: { city: 'Munich', country: 'Germany' },
      RU: { city: 'Мюнхен', country: 'Германия' },
      FR: { city: 'Munich', country: 'Allemagne' },
      AR: { city: 'ميونخ', country: 'ألمانيا' },
    },
  },
  {
    id: 'lisbon',
    countryId: '620',
    coordinates: [-9.1393, 38.7223],
    labels: {
      EN: { city: 'Lisbon', country: 'Portugal' },
      RU: { city: 'Лиссабон', country: 'Португалия' },
      FR: { city: 'Lisbonne', country: 'Portugal' },
      AR: { city: 'لشبونة', country: 'البرتغال' },
    },
  },
  {
    id: 'milan',
    countryId: '380',
    coordinates: [9.19, 45.4642],
    labels: {
      EN: { city: 'Milan', country: 'Italy' },
      RU: { city: 'Милан', country: 'Италия' },
      FR: { city: 'Milan', country: 'Italie' },
      AR: { city: 'ميلانو', country: 'إيطاليا' },
    },
  },
  {
    id: 'doha',
    countryId: '634',
    coordinates: [51.531, 25.2854],
    labels: {
      EN: { city: 'Doha', country: 'Qatar' },
      RU: { city: 'Доха', country: 'Катар' },
      FR: { city: 'Doha', country: 'Qatar' },
      AR: { city: 'الدوحة', country: 'قطر' },
    },
  },
  {
    id: 'istanbul',
    countryId: '792',
    coordinates: [28.9784, 41.0082],
    labels: {
      EN: { city: 'Istanbul', country: 'Turkey' },
      RU: { city: 'Стамбул', country: 'Турция' },
      FR: { city: 'Istanbul', country: 'Turquie' },
      AR: { city: 'إسطنبول', country: 'تركيا' },
    },
  },
  {
    id: 'brasilia',
    countryId: '076',
    coordinates: [-47.8825, -15.7942],
    labels: {
      EN: { city: 'Brasília', country: 'Brazil' },
      RU: { city: 'Бразилиа', country: 'Бразилия' },
      FR: { city: 'Brasília', country: 'Brésil' },
      AR: { city: 'برازيليا', country: 'البرازيل' },
    },
  },
  {
    id: 'shanghai',
    countryId: '156',
    coordinates: [121.4737, 31.2304],
    labels: {
      EN: { city: 'Shanghai', country: 'China' },
      RU: { city: 'Шанхай', country: 'Китай' },
      FR: { city: 'Shanghai', country: 'Chine' },
      AR: { city: 'شنغهاي', country: 'الصين' },
    },
  },
  {
    id: 'washington',
    countryId: '840',
    coordinates: [-77.0369, 38.9072],
    labels: {
      EN: { city: 'Washington, D.C.', country: 'United States' },
      RU: { city: 'Вашингтон', country: 'США' },
      FR: { city: 'Washington', country: 'États-Unis' },
      AR: { city: 'واشنطن', country: 'الولايات المتحدة' },
    },
  },
  {
    id: 'rome',
    countryId: '380',
    coordinates: [12.4964, 41.9028],
    labels: {
      EN: { city: 'Rome', country: 'Italy' },
      RU: { city: 'Рим', country: 'Италия' },
      FR: { city: 'Rome', country: 'Italie' },
      AR: { city: 'روما', country: 'إيطاليا' },
    },
  },
  {
    id: 'barcelona',
    countryId: '724',
    coordinates: [2.1734, 41.3851],
    labels: {
      EN: { city: 'Barcelona', country: 'Spain' },
      RU: { city: 'Барселона', country: 'Испания' },
      FR: { city: 'Barcelone', country: 'Espagne' },
      AR: { city: 'برشلونة', country: 'إسبانيا' },
    },
  },
  {
    id: 'frankfurt',
    countryId: '276',
    coordinates: [8.6821, 50.1109],
    labels: {
      EN: { city: 'Frankfurt am Main', country: 'Germany' },
      RU: { city: 'Франкфурт-на-Майне', country: 'Германия' },
      FR: { city: 'Francfort-sur-le-Main', country: 'Allemagne' },
      AR: { city: 'فرانكفورت', country: 'ألمانيا' },
    },
  },
  {
    id: 'st-petersburg',
    countryId: '643',
    coordinates: [30.3351, 59.9343],
    labels: {
      EN: { city: 'Saint Petersburg', country: 'Russia' },
      RU: { city: 'Санкт-Петербург', country: 'Россия' },
      FR: { city: 'Saint-Pétersbourg', country: 'Russie' },
      AR: { city: 'سانت بطرسبرغ', country: 'روسيا' },
    },
  },
  {
    id: 'singapore',
    countryId: '702',
    coordinates: [103.8198, 1.3521],
    labels: {
      EN: { city: 'Singapore', country: 'Singapore' },
      RU: { city: 'Сингапур', country: 'Сингапур' },
      FR: { city: 'Singapour', country: 'Singapour' },
      AR: { city: 'سنغافورة', country: 'سنغافورة' },
    },
  },
  {
    id: 'zurich',
    countryId: '756',
    coordinates: [8.5417, 47.3769],
    labels: {
      EN: { city: 'Zurich', country: 'Switzerland' },
      RU: { city: 'Цюрих', country: 'Швейцария' },
      FR: { city: 'Zurich', country: 'Suisse' },
      AR: { city: 'زيورخ', country: 'سويسرا' },
    },
  },
  {
    id: 'riga',
    countryId: '428',
    coordinates: [24.1052, 56.9496],
    labels: {
      EN: { city: 'Riga', country: 'Latvia' },
      RU: { city: 'Рига', country: 'Латвия' },
      FR: { city: 'Riga', country: 'Lettonie' },
      AR: { city: 'ريغا', country: 'لاتفيا' },
    },
  },
];

export const boutiqueCountryIds = new Set(BOUTIQUE_CITIES.map((city) => city.countryId));

const cityById = new Map(BOUTIQUE_CITIES.map((city) => [city.id, city]));
const SCROLL_CITY_ORDER = [
  'sydney',
  'singapore',
  'tokyo',
  'shanghai',
  'beijing',
  'dubai',
  'doha',
  'moscow',
  'st-petersburg',
  'istanbul',
  'warsaw',
  'riga',
  'munich',
  'frankfurt',
  'oslo',
  'milan',
  'rome',
  'zurich',
  'monaco',
  'geneva',
  'paris',
  'barcelona',
  'london',
  'lisbon',
  'brasilia',
  'new-york',
  'washington',
  'toronto',
] as const;

export const ORDERED_BOUTIQUE_CITIES = SCROLL_CITY_ORDER
  .map((cityId) => cityById.get(cityId))
  .filter((city): city is BoutiqueCity => Boolean(city));

export function rotationForCity(city: BoutiqueCity): [number, number, number] {
  return [-city.coordinates[0], -city.coordinates[1], 0];
}
