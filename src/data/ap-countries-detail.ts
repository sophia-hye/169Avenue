export interface APCountryDetail {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly images: readonly string[]
  readonly highlights: readonly string[]
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const AP_COUNTRY_DETAILS: Record<string, APCountryDetail> = {
  '702': {
    code: '702',
    name: 'Singapore',
    description: 'Singapore has transformed itself into Asia\'s premier education hub in a single generation. The National University of Singapore and Nanyang Technological University both rank consistently among the world\'s top 20 universities. The city-state\'s strategic location at the crossroads of global trade, its multicultural English-speaking environment, and its world-class infrastructure make it a uniquely attractive destination for ambitious students. Singapore\'s investment in research and innovation is unmatched in the region.',
    images: [
      U('1525625293386-3f8f99389edd'),
      U('1508964942454-1a175dead949'),
      U('1565967511849-76a60a516170'),
      U('1555400038-63f5ba517a47'),
    ],
    highlights: ['NUS & NTU — Global Top 20', 'Multicultural English-Speaking Environment', 'Asia\'s Technology & Finance Hub'],
  },
  '410': {
    code: '410',
    name: 'South Korea',
    description: 'South Korea has built one of the most impressive higher education systems in the world. Seoul National University, KAIST, Yonsei, and Korea University — collectively known as the "SKY" plus KAIST — produce graduates who lead global technology companies, research institutions, and cultural industries. The country\'s intense academic culture, combined with a booming technology sector and vibrant contemporary culture, creates an environment that rewards ambition and intellectual rigor.',
    images: [
      U('1538669715315-155098f0fb1d'),
      U('1583418855-2cb3a4f218c9'),
      U('1598935888644-bc8e25a8e976'),
      U('1517154421773-0855ebe9289a'),
    ],
    highlights: ['SKY Universities & KAIST', 'Global Technology Leadership', 'K-Culture & Global Soft Power'],
  },
  '392': {
    code: '392',
    name: 'Japan',
    description: 'Japan\'s higher education system combines centuries of intellectual tradition with cutting-edge research in robotics, materials science, and artificial intelligence. The University of Tokyo and Kyoto University have produced more Nobel laureates than any other Asian institutions. Japan\'s unique culture of precision, craftsmanship, and innovation permeates academic life. Students gain access to both world-class research facilities and one of the world\'s most fascinating and livable societies.',
    images: [
      U('1480796927426-194544c49b37'),
      U('1540959733332-eab4deabeeaf'),
      U('1578469645742-4a05b2b1d27c'),
      U('1528360983277-13d401cdc186'),
    ],
    highlights: ['Most Nobel Laureates in Asia', 'Robotics & AI Research Leader', 'Unparalleled Cultural Immersion'],
  },
  '156': {
    code: '156',
    name: 'China',
    description: 'China has made extraordinary investments in higher education, rapidly ascending global rankings. Tsinghua and Peking Universities now compete with the world\'s best institutions in science, engineering, and technology. Hong Kong\'s universities — the University of Hong Kong and CUHK — offer a unique fusion of East and West, with internationally accredited programs in a common law environment. China\'s scale, economic dynamism, and historical depth offer students an unparalleled window into the defining story of the 21st century.',
    images: [
      U('1508804185872-d7badad172e7'),
      U('1547981609-4b6bfe67ca0b'),
      U('1570168007204-dfb528c6958f'),
      U('1491975474562-1f4e8fa9b40a'),
    ],
    highlights: ['Tsinghua & Peking — World Top 20', 'Hong Kong\'s East-West Fusion', 'Largest STEM Research Output'],
  },
  '036': {
    code: '036',
    name: 'Australia',
    description: 'Australia offers a rare combination of world-class academic institutions, exceptional quality of life, and one of the most welcoming immigration environments for international graduates. The Group of Eight research universities — led by Melbourne, Sydney, and ANU — are internationally respected in medicine, law, and the sciences. Australia\'s multicultural society, sunshine, and strong labor market for graduates create an ideal environment for building both academic credentials and a professional network.',
    images: [
      U('1506973035872-a4ec16b8e8d9'),
      U('1523482580672-f109ba8cb9be'),
      U('1549180030-48bf079fb38a'),
      U('1513635269975-59663e0ac1ad'),
    ],
    highlights: ['Group of Eight Research Universities', 'Post-Study Work Visa Pathway', 'Exceptional Quality of Life'],
  },
  '554': {
    code: '554',
    name: 'New Zealand',
    description: 'New Zealand offers a distinguished academic environment within one of the world\'s most pristine natural settings. The University of Auckland, ranked among the world\'s top 100, provides research-intensive education across a full range of disciplines. New Zealand\'s small population belies its outsized contributions to science, particularly in agriculture, marine biology, and environmental research. Students benefit from a safe, welcoming society with outstanding outdoor recreation and a post-study work pathway.',
    images: [
      U('1469521669194-babb45599def'),
      U('1507699622979-0db42d853c60'),
      U('1531366936337-7c912a4589a7'),
    ],
    highlights: ['University of Auckland — Global Top 100', 'Environmental & Marine Research', 'Post-Study Work Rights'],
  },
  '356': {
    code: '356',
    name: 'India',
    description: 'India\'s elite institutions — the Indian Institutes of Technology and the Indian Institute of Science — are among the most selective and intellectually rigorous institutions in the world. IIT alumni have founded some of Silicon Valley\'s most significant companies and lead global technology firms. India\'s higher education system is undergoing rapid transformation, with massive government investment in research infrastructure. The country\'s vast talent pool, technological ambition, and cultural richness offer a compelling academic experience.',
    images: [
      U('1524492412937-b28074a5d7da'),
      U('1585212547778-028e56ee3a6b'),
      U('1567306301408-9b74779a11af'),
      U('1532375810709-75b1da00537c'),
    ],
    highlights: ['IITs — World\'s Most Selective', 'Silicon Valley Talent Pipeline', 'Rapidly Growing Research Investment'],
  },
}

export function getAPCountryDetail(countryId: string): APCountryDetail {
  return AP_COUNTRY_DETAILS[countryId] ?? {
    code: countryId,
    name: 'Asia-Pacific',
    description: 'A dynamic academic destination in the Asia-Pacific region.',
    images: [U('1525625293386-3f8f99389edd')],
    highlights: ['World-Class Research', 'International Community', 'Career Opportunities'],
  }
}
