export type Language = 'EN' | 'RU' | 'FR' | 'AR';

export interface Translations {
  tagline: string;
  established: string;
  searchPlaceholder: string;
  allocation: string;
  vipLounge: string;
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  exploreCollection: string;
  privateConcierge: string;
  escrowService: string;
  escrowDesc: string;
  armoredDelivery: string;
  armoredDesc: string;
  lifetimeAuth: string;
  lifetimeDesc: string;
  collectionTitle: string;
  collectionSubtitle: string;
  brand: string;
  material: string;
  sort: string;
  all: string;
  priceAsc: string;
  priceDesc: string;
  newest: string;
  piecesCount: string;
  viewDetails: string;
  quickView: string;
  inquire: string;
  inAllocation: string;
  soldOut: string;
  newArrival: string;
  diameter: string;
  reserve: string;
  waterRes: string;
  caliber: string;
  movement: string;
  year: string;
  condition: string;
  boxPapers: string;
  fullSet: string;
  watchOnly: string;
  complications: string;
  directInquiry: string;
  fullName: string;
  emailAddress: string;
  messagePlaceholder: string;
  sendInquiry: string;
  inquirySent: string;
  inquirySuccessMsg: string;
  allocationList: string;
  piecesSelected: string;
  emptyAllocation: string;
  emptyAllocationDesc: string;
  estimatedTotal: string;
  proceedToCheckout: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  yourDetails: string;
  acquisitionMethod: string;
  armoredCourier: string;
  armoredCourierDesc: string;
  showroomPickup: string;
  showroomPickupDesc: string;
  settlementMethod: string;
  wireTransfer: string;
  wireTransferDesc: string;
  crypto: string;
  cryptoDesc: string;
  privateBanking: string;
  privateBankingDesc: string;
  personalConcierge: string;
  available: string;
  confirmReservation: string;
  disclaimer: string;
  reservationConfirmed: string;
  allocationSecured: string;
  confirmationNotice: string;
  bookingRef: string;
  responseTime: string;
  returnToCollection: string;
  myVault: string;
  ordersHistory: string;
  liveChat: string;
  clientTier: string;
  vaultEmpty: string;
  vaultEmptyDesc: string;
  toastAddedAllocation: string;
  toastAddedVault: string;
  toastRemovedVault: string;
  statusInVault: string;
  statusByAllocation: string;
  statusSoldOut: string;
  statusCertified: string;
  statusUnworn: string;
  statusPreOwned: string;
  acquirePiece: string;
  scrollyHeritage: string;
  scrollyPantheon: string;
  scrollyVaults: string;
  scrollyExplore: string;
}

export const translations: Record<Language, Translations> = {
  EN: {
    tagline: 'Chronos & Co.',
    established: 'Genève · Est. 1884',
    searchPlaceholder: 'Search by brand, model or reference…',
    allocation: 'Allocation',
    vipLounge: 'VIP Lounge',
    heroEyebrow: 'Haute Horlogerie Private Boutique',
    heroTitle1: 'Time Is The Only',
    heroTitle2: 'True',
    heroTitle3: 'Luxury',
    heroSubtitle: "We source and authenticate the world's most coveted timepieces — by appointment, with discretion, for those who understand the difference between a watch and a legacy.",
    exploreCollection: 'Explore Collection',
    privateConcierge: 'Private Concierge',
    escrowService: 'Escrow Service',
    escrowDesc: 'Funds secured until delivery',
    armoredDelivery: 'Armored Delivery',
    armoredDesc: 'Geneva to your door',
    lifetimeAuth: 'Lifetime Authenticity',
    lifetimeDesc: 'Certified by master watchmakers',
    collectionTitle: 'Certified Timepieces',
    collectionSubtitle: 'Each piece is individually authenticated by our master watchmakers and carries lifetime provenance documentation.',
    brand: 'Brand',
    material: 'Material',
    sort: 'Sort',
    all: 'All',
    priceAsc: 'Price ↑',
    priceDesc: 'Price ↓',
    newest: 'Newest',
    piecesCount: 'pieces',
    viewDetails: 'View Details',
    quickView: 'Quick View',
    inquire: 'Inquire',
    inAllocation: 'In Allocation',
    soldOut: 'Sold Out',
    newArrival: 'New Arrival',
    diameter: 'Diameter',
    reserve: 'Reserve',
    waterRes: 'WR',
    caliber: 'Caliber',
    movement: 'Movement',
    year: 'Year',
    condition: 'Condition',
    boxPapers: 'Box & Papers',
    fullSet: 'Full Set · Box & Papers',
    watchOnly: 'Watch Only',
    complications: 'Complications',
    directInquiry: 'Direct Concierge Inquiry',
    fullName: 'Full Legal Name',
    emailAddress: 'Private Email Address',
    messagePlaceholder: 'Any specific questions or acquisition requirements…',
    sendInquiry: 'Send Inquiry',
    inquirySent: 'Inquiry Submitted',
    inquirySuccessMsg: 'Your inquiry has been received. A personal concierge will contact you within 2 hours.',
    allocationList: 'Allocation List',
    piecesSelected: 'pieces selected',
    emptyAllocation: 'Your allocation list is empty',
    emptyAllocationDesc: 'Add timepieces from the collection to begin your acquisition inquiry.',
    estimatedTotal: 'Estimated Total',
    proceedToCheckout: 'Proceed to Concierge',
    checkoutTitle: 'Concierge Checkout',
    checkoutSubtitle: 'Private Acquisition',
    yourDetails: 'Your Details',
    acquisitionMethod: 'Preferred Acquisition Method',
    armoredCourier: 'Armored Courier Delivery',
    armoredCourierDesc: 'Discreet door-to-door via G4S Armored Logistics. Fully insured.',
    showroomPickup: 'Private Showroom Pickup',
    showroomPickupDesc: 'Inspect and finalize in person at our private salon.',
    settlementMethod: 'Settlement Method',
    wireTransfer: 'International Wire Transfer',
    wireTransferDesc: 'SWIFT via correspondent banking with multi-signature escrow.',
    crypto: 'Cryptocurrency',
    cryptoDesc: 'USDT (TRC-20 / ERC-20) or BTC. Rate locked at execution.',
    privateBanking: 'Private Banking',
    privateBankingDesc: 'Wealth management desk financing and discretionary settlement.',
    personalConcierge: 'Your Personal Concierge',
    available: 'Available Now',
    confirmReservation: 'Confirm Private Reservation',
    disclaimer: 'All transactions are subject to escrow verification, source-of-funds clearance, and authentication.',
    reservationConfirmed: 'Reservation Confirmed',
    allocationSecured: 'Your Allocation is Secured',
    confirmationNotice: 'You will receive encrypted confirmation and insurance documentation within 30 minutes.',
    bookingRef: 'Booking Reference',
    responseTime: 'Within 30 min',
    returnToCollection: 'Return to Collection',
    myVault: 'My Vault',
    ordersHistory: 'Inquiries & Orders',
    liveChat: 'Concierge Chat',
    clientTier: 'Private Allocations Tier I',
    vaultEmpty: 'Your Vault is empty',
    vaultEmptyDesc: 'Save coveted timepieces to your private vault for priority allocation.',
    toastAddedAllocation: 'Added to your allocation list',
    toastAddedVault: 'Added to your private vault',
    toastRemovedVault: 'Removed from your vault',
    statusInVault: 'In Vault',
    statusByAllocation: 'By Allocation Only',
    statusSoldOut: 'Sold Out',
    statusCertified: 'Certified Authentic',
    statusUnworn: 'Unworn',
    statusPreOwned: 'Pre-Owned',
    acquirePiece: 'Acquire Piece',
    scrollyHeritage: 'Haute Horlogerie Heritage',
    scrollyPantheon: 'The Pantheon',
    scrollyVaults: 'Global Private Vaults',
    scrollyExplore: 'Enter The Catalogue',
  },
  RU: {
    tagline: 'Chronos & Co.',
    established: 'Женева · Осн. 1884',
    searchPlaceholder: 'Поиск по бренду, модели или референсу…',
    allocation: 'Аллокация',
    vipLounge: 'VIP Lounge',
    heroEyebrow: 'Закрытый бутик Haute Horlogerie',
    heroTitle1: 'Время — Единственная',
    heroTitle2: 'Истинная',
    heroTitle3: 'Роскошь',
    heroSubtitle: 'Мы находим и сертифицируем самые редкие шедевры часового искусства. По записи, в условиях строжайшей конфиденциальности, для тех, кто понимает разницу между часами и наследием.',
    exploreCollection: 'Смотреть коллекцию',
    privateConcierge: 'Персональный консьерж',
    escrowService: 'Эскроу-сервис',
    escrowDesc: 'Средства заморожены до вручения',
    armoredDelivery: 'Бронированная доставка',
    armoredDesc: 'Из Женевы лично в руки',
    lifetimeAuth: 'Пожизненная подлинность',
    lifetimeDesc: 'Сертифицировано мастерами',
    collectionTitle: 'Сертифицированные модели',
    collectionSubtitle: 'Каждый экземпляр проходит индивидуальную экспертизу и сопровождается пожизненным паспортом происхождения.',
    brand: 'Бренд',
    material: 'Материал',
    sort: 'Сортировка',
    all: 'Все',
    priceAsc: 'Цена ↑',
    priceDesc: 'Цена ↓',
    newest: 'Новинки',
    piecesCount: 'моделей',
    viewDetails: 'Детали',
    quickView: 'Быстрый просмотр',
    inquire: 'Забронировать',
    inAllocation: 'В аллокации',
    soldOut: 'Продано',
    newArrival: 'Новое поступление',
    diameter: 'Диаметр',
    reserve: 'Запас хода',
    waterRes: 'Водозащита',
    caliber: 'Калибр',
    movement: 'Механизм',
    year: 'Год',
    condition: 'Состояние',
    boxPapers: 'Комплектация',
    fullSet: 'Полный комплект (Box & Papers)',
    watchOnly: 'Только часы',
    complications: 'Усложнения',
    directInquiry: 'Прямой запрос консьержу',
    fullName: 'Ваше полное имя',
    emailAddress: 'Конфиденциальный Email',
    messagePlaceholder: 'Особые пожелания или требования к сделке…',
    sendInquiry: 'Отправить запрос',
    inquirySent: 'Запрос принят',
    inquirySuccessMsg: 'Запрос зарегистрирован. Ваш персональный консьерж свяжется с вами в течение 2 часов.',
    allocationList: 'Лист ожидания / Аллокация',
    piecesSelected: 'моделей выбрано',
    emptyAllocation: 'Лист аллокации пуст',
    emptyAllocationDesc: 'Добавьте интересующие модели из каталога для формирования приватного заказа.',
    estimatedTotal: 'Ориентировочная сумма',
    proceedToCheckout: 'Перейти к бронированию',
    checkoutTitle: 'VIP Оформление',
    checkoutSubtitle: 'Приобретение в закрытом клубе',
    yourDetails: 'Данные доверенного лица',
    acquisitionMethod: 'Способ получения',
    armoredCourier: 'Бронированный спецкурьер',
    armoredCourierDesc: 'Конфиденциальная доставка спецтранспортом G4S. Страховка на 100% стоимости.',
    showroomPickup: 'Приватный шоурум',
    showroomPickupDesc: 'Личный визит и примерка в закрытом салоне.',
    settlementMethod: 'Способ расчета',
    wireTransfer: 'Международный банковский перевод',
    wireTransferDesc: 'SWIFT через корреспондентский счет с мультиподписным эскроу.',
    crypto: 'Криптовалюта (USDT / BTC)',
    cryptoDesc: 'USDT (TRC-20 / ERC-20) или BTC. Курс фиксируется в момент подтверждения.',
    privateBanking: 'Private Banking',
    privateBankingDesc: 'Оплата через счет доверительного управления или семейный офис.',
    personalConcierge: 'Ваш персональный консьерж',
    available: 'На связи',
    confirmReservation: 'Подтвердить приватную бронь',
    disclaimer: 'Все транзакции подлежат эскроу-проверке, подтверждению источника средств и финальной сертификации.',
    reservationConfirmed: 'Бронь подтверждена',
    allocationSecured: 'Ваша аллокация зарезервирована',
    confirmationNotice: 'Зашифрованное подтверждение и страховые документы будут направлены в течение 30 минут.',
    bookingRef: 'Номер бронирования',
    responseTime: 'До 30 минут',
    returnToCollection: 'Вернуться в каталог',
    myVault: 'Мой Vault',
    ordersHistory: 'История заявок',
    liveChat: 'Чат с консьержем',
    clientTier: 'Private Allocations Tier I',
    vaultEmpty: 'В вашем хранилище пусто',
    vaultEmptyDesc: 'Сохраняйте знаковые модели в Vault для приоритетного резервирования.',
    toastAddedAllocation: 'Добавлено в лист ожидания',
    toastAddedVault: 'Сохранено в ваш личный Vault',
    toastRemovedVault: 'Удалено из Vault',
    statusInVault: 'В хранилище',
    statusByAllocation: 'По аллокации',
    statusSoldOut: 'Продано',
    statusCertified: 'Сертифицировано',
    statusUnworn: 'Новые (Unworn)',
    statusPreOwned: 'Коллекционные',
    acquirePiece: 'Забронировать',
    scrollyHeritage: 'Наследие Высокого Часового Искусства',
    scrollyPantheon: 'Пантеон Мануфактур',
    scrollyVaults: 'Мировая Сеть Приватных Хранилищ',
    scrollyExplore: 'Перейти в Каталог Шедевров',
  },
  FR: {
    tagline: 'Chronos & Co.',
    established: 'Genève · Fondé en 1884',
    searchPlaceholder: 'Rechercher par marque, modèle ou référence…',
    allocation: 'Allocation',
    vipLounge: 'Salon VIP',
    heroEyebrow: 'Haute Horlogerie Boutique Privée',
    heroTitle1: 'Le Temps Est Le Seul',
    heroTitle2: 'Vrai',
    heroTitle3: 'Luxe',
    heroSubtitle: "Nous sourçons et authentifions les garde-temps les plus convoités au monde — sur rendez-vous, avec discrétion, pour ceux qui comprennent la différence entre une montre et un héritage.",
    exploreCollection: 'Explorer la Collection',
    privateConcierge: 'Concierge Privé',
    escrowService: 'Service Escrow',
    escrowDesc: 'Fonds sécurisés jusqu’à la livraison',
    armoredDelivery: 'Livraison Blindée',
    armoredDesc: 'De Genève à votre porte',
    lifetimeAuth: 'Authenticité à Vie',
    lifetimeDesc: 'Certifié par des maîtres horlogers',
    collectionTitle: 'Pièces Certifiées',
    collectionSubtitle: 'Chaque pièce est authentifiée individuellement et pourvue d’un passeport de provenance à vie.',
    brand: 'Marque',
    material: 'Matériau',
    sort: 'Trier',
    all: 'Tous',
    priceAsc: 'Prix ↑',
    priceDesc: 'Prix ↓',
    newest: 'Nouveautés',
    piecesCount: 'pièces',
    viewDetails: 'Détails',
    quickView: 'Aperçu Rapide',
    inquire: 'Réserver',
    inAllocation: 'En Allocation',
    soldOut: 'Épuisé',
    newArrival: 'Nouveauté',
    diameter: 'Diamètre',
    reserve: 'Réserve',
    waterRes: 'Étanchéité',
    caliber: 'Calibre',
    movement: 'Mouvement',
    year: 'Année',
    condition: 'État',
    boxPapers: 'Boîte & Papiers',
    fullSet: 'Set Complet (Boîte & Papiers)',
    watchOnly: 'Montre seule',
    complications: 'Complications',
    directInquiry: 'Demande Directe au Concierge',
    fullName: 'Nom Complet',
    emailAddress: 'Adresse Email Confidentielle',
    messagePlaceholder: 'Questions ou exigences particulières d’acquisition…',
    sendInquiry: 'Envoyer la demande',
    inquirySent: 'Demande enregistrée',
    inquirySuccessMsg: 'Votre demande a bien été reçue. Un concierge dédié vous contactera dans les 2 heures.',
    allocationList: 'Liste d’Allocation',
    piecesSelected: 'pièces sélectionnées',
    emptyAllocation: 'Votre liste est vide',
    emptyAllocationDesc: 'Sélectionnez des garde-temps de la collection pour initier votre réservation privée.',
    estimatedTotal: 'Total Estimé',
    proceedToCheckout: 'Passer au Concierge',
    checkoutTitle: 'Réservation Privée',
    checkoutSubtitle: 'Acquisition Confidentielle',
    yourDetails: 'Vos Coordonnées',
    acquisitionMethod: 'Mode d’Acquisition Souhaité',
    armoredCourier: 'Courrier Blindé Sécurisé',
    armoredCourierDesc: 'Livraison discrète porte-à-porte via logistique blindée G4S. Assurée à 100%.',
    showroomPickup: 'Salon Privé',
    showroomPickupDesc: 'Remise en main propre dans nos salons privés.',
    settlementMethod: 'Mode de Règlement',
    wireTransfer: 'Virement Bancaire International',
    wireTransferDesc: 'SWIFT via compte séquestre multi-signature.',
    crypto: 'Cryptomonnaie',
    cryptoDesc: 'USDT (TRC-20 / ERC-20) ou BTC. Taux fixé à la confirmation.',
    privateBanking: 'Banque Privée',
    privateBankingDesc: 'Règlement via gestion de fortune ou family office.',
    personalConcierge: 'Votre Concierge Dédié',
    available: 'Disponible',
    confirmReservation: 'Confirmer la Réservation Privée',
    disclaimer: 'Toutes les transactions font l’objet d’un protocole séquestre et de certification préalable.',
    reservationConfirmed: 'Réservation Confirmée',
    allocationSecured: 'Votre Allocation est Sécurisée',
    confirmationNotice: 'Vous recevrez les documents d’assurance confidentiels dans les 30 minutes.',
    bookingRef: 'Référence de Réservation',
    responseTime: 'Sous 30 min',
    returnToCollection: 'Retour à la Collection',
    myVault: 'Mon Coffre',
    ordersHistory: 'Historique des Demandes',
    liveChat: 'Chat Concierge',
    clientTier: 'Allocations Privées Niveau I',
    vaultEmpty: 'Votre coffre est vide',
    vaultEmptyDesc: 'Enregistrez des pièces d’exception pour un accès prioritaire.',
    toastAddedAllocation: 'Ajouté à votre liste d’allocation',
    toastAddedVault: 'Ajouté à votre coffre privé',
    toastRemovedVault: 'Retiré de votre coffre',
    statusInVault: 'En Coffre',
    statusByAllocation: 'Sur Allocation',
    statusSoldOut: 'Épuisé',
    statusCertified: 'Certifié Authentique',
    statusUnworn: 'Jamais Porté',
    statusPreOwned: 'Collection',
    acquirePiece: 'Acquérir la Pièce',
    scrollyHeritage: 'Héritage Haute Horlogerie',
    scrollyPantheon: 'Le Panthéon des Manufactures',
    scrollyVaults: 'Réseau Mondial de Coffres Privés',
    scrollyExplore: 'Entrer dans la Collection',
  },
  AR: {
    tagline: 'Chronos & Co.',
    established: 'جنيف · تأسست عام 1884',
    searchPlaceholder: 'ابحث حسب الماركة، الموديل أو المرجع…',
    allocation: 'الحصص المخصصة',
    vipLounge: 'صالة كبار الشخصيات',
    heroEyebrow: 'بوتيك خاص للساعات الفاخرة النادرة',
    heroTitle1: 'الوقت هو الفخامة',
    heroTitle2: 'الحقيقية',
    heroTitle3: 'الوحيدة',
    heroSubtitle: 'نوفر ونوثق أندر الساعات الفاخرة في العالم — بمواعيد خاصة، وبسرية تامة، لمن يدركون الفارق بين مجرد ساعة وإرث يتوارثه الأجيال.',
    exploreCollection: 'استكشف المجموعة',
    privateConcierge: 'المساعد الشخصي الخاص',
    escrowService: 'خدمة الضمان المالي',
    escrowDesc: 'أموال مؤمنة حتى استلام الساعة',
    armoredDelivery: 'توصيل مصفح',
    armoredDesc: 'من جنيف مباشرة إلى بابك',
    lifetimeAuth: 'أصالة مدى الحياة',
    lifetimeDesc: 'معتمدة من كبار صانعي الساعات',
    collectionTitle: 'ساعات موثقة معتمدة',
    collectionSubtitle: 'تخضع كل قطعة لفحص دقيق ومستقل وتأتي مع وثائق إثبات النسب والأصالة مدى الحياة.',
    brand: 'الماركة',
    material: 'المعدن',
    sort: 'ترتيب',
    all: 'الكل',
    priceAsc: 'السعر ↑',
    priceDesc: 'السعر ↓',
    newest: 'الأحدث',
    piecesCount: 'قطع',
    viewDetails: 'التفاصيل',
    quickView: 'نظرة سريعة',
    inquire: 'طلب حجز',
    inAllocation: 'في قائمة الحصص',
    soldOut: 'نفدت الكمية',
    newArrival: 'وصل حديثاً',
    diameter: 'القطر',
    reserve: 'احتياطي الطاقة',
    waterRes: 'مقاومة الماء',
    caliber: 'العيار',
    movement: 'الحركة',
    year: 'السنة',
    condition: 'الحالة',
    boxPapers: 'العلبة والشهادة',
    fullSet: 'طقم كامل (علبة وشهادات)',
    watchOnly: 'الساعة فقط',
    complications: 'التعقيدات الساعاتية',
    directInquiry: 'استفسار مباشر مع المساعد الشخصي',
    fullName: 'الاسم القانوني الكامل',
    emailAddress: 'البريد الإلكتروني الخاص',
    messagePlaceholder: 'أي متطلبات خاصة أو استفسارات للاقتناء…',
    sendInquiry: 'إرسال الاستفسار',
    inquirySent: 'تم استلام الطلب',
    inquirySuccessMsg: 'تم تسجيل طلبك بنجاح. سيتواصل معك المساعد الشخصي في غضون ساعتين.',
    allocationList: 'قائمة التخصيص',
    piecesSelected: 'قطع مختارة',
    emptyAllocation: 'قائمة التخصيص فارغة',
    emptyAllocationDesc: 'اختر الساعات المرغوبة من المجموعة لبدء إجراءات التخصيص.',
    estimatedTotal: 'الإجمالي التقديري',
    proceedToCheckout: 'متابعة مع المساعد الشخصي',
    checkoutTitle: 'إتمام الحجز الخاص',
    checkoutSubtitle: 'اقتناء حصري وفاخر',
    yourDetails: 'بيانات العميل',
    acquisitionMethod: 'طريقة الاستلام المفضلة',
    armoredCourier: 'توصيل مصفح وآمن',
    armoredCourierDesc: 'توصيل سري عبر لوجستيات G4S المصفحة ومؤمنة بالكامل.',
    showroomPickup: 'استلام من صالون خاص',
    showroomPickupDesc: 'المعاينة والاستلام الشخصي في صالوناتنا المغلقة.',
    settlementMethod: 'طريقة التسوية',
    wireTransfer: 'حوالة مصرفية دولية',
    wireTransferDesc: 'تحويل SWIFT عبر حسابات ضمان مصرفية متعددة التوقيع.',
    crypto: 'العملات الرقمية',
    cryptoDesc: 'USDT أو BTC مع تثبيت سعر الصرف فور التأكيد.',
    privateBanking: 'الخدمات المصرفية الخاصة',
    privateBankingDesc: 'تسوية عبر إدارات الثروات والمكاتب العائلية.',
    personalConcierge: 'مساعدك الشخصي الخاص',
    available: 'متصل الآن',
    confirmReservation: 'تأكيد الحجز الخاص',
    disclaimer: 'تخضع جميع المعاملات لبروتوكول الضمان وفحص مصدر الأموال والتوثيق النهائي.',
    reservationConfirmed: 'تم تأكيد الحجز',
    allocationSecured: 'تم تأمين حصتك بنجاح',
    confirmationNotice: 'ستصلك وثائق التأكيد والتأمين المشفرة خلال 30 دقيقة.',
    bookingRef: 'رقم مرجع الحجز',
    responseTime: 'خلال 30 دقيقة',
    returnToCollection: 'العودة إلى المجموعة',
    myVault: 'خزانتي الخاصة',
    ordersHistory: 'سجل الطلبات',
    liveChat: 'محادثة المساعد الشخصي',
    clientTier: 'عضوية كبار المقتنين المستوى الأول',
    vaultEmpty: 'خزانتك الخاصة فارغة',
    vaultEmptyDesc: 'احفظ الساعات النادرة في خزانتك لضمان أولوية التخصيص.',
    toastAddedAllocation: 'تمت الإضافة إلى قائمة التخصيص',
    toastAddedVault: 'تم الحفظ في خزانتك الخاصة',
    toastRemovedVault: 'تمت الإزالة من الخزانة',
    statusInVault: 'في الخزينة',
    statusByAllocation: 'تخصيص خاص فقط',
    statusSoldOut: 'نفدت الكمية',
    statusCertified: 'موثقة أصلية',
    statusUnworn: 'جديدة لم تُرتدَ',
    statusPreOwned: 'مقتناة نادرة',
    acquirePiece: 'حجز الساعة',
    scrollyHeritage: 'تراث صناعة الساعات الراقية',
    scrollyPantheon: 'صناع الزمن الخالدون',
    scrollyVaults: 'شبكة الخزائن الخاصة العالمية',
    scrollyExplore: 'استعراض المجموعة الحصرية',
  },
};
