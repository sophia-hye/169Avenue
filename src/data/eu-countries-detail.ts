export interface CountryDetail {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly images: readonly string[]
  readonly highlights: readonly string[]
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const EU_COUNTRY_DETAILS: Record<string, CountryDetail> = {
  '250': {
    code: '250',
    name: 'France',
    description: 'France is the intellectual heart of continental Europe. Paris alone hosts more than a dozen world-class institutions, from the grandes ecoles that train the nation\'s elite to the ancient Sorbonne. French higher education uniquely blends rigorous academic theory with an emphasis on art, philosophy, and the pleasures of civilized life. INSEAD, HEC Paris, and Sciences Po are globally recognized pillars of business and political science education.',
    images: [
      U('1502602898657-3e91760cbb34'),
      U('1499856871958-5b9627545d1a'),
      U('1507003211169-0a1dd7228f2d'),
      U('1551524559-8af4e6624178'),
      U('1543158181-e6f9f6712055'),
    ],
    highlights: ['Home of the Grandes Ecoles', 'Global Business Education Hub', 'Art, Philosophy & Culture Capital'],
  },
  '276': {
    code: '276',
    name: 'Germany',
    description: 'Germany is Europe\'s largest economy and a powerhouse of engineering, automotive innovation, and scientific research. Its universities — many tuition-free even for international students — combine theoretical depth with practical training through close ties to industry. TU Munich, Heidelberg University, and Humboldt University in Berlin represent centuries of academic tradition alongside cutting-edge research in AI, quantum computing, and sustainable energy.',
    images: [
      U('1467269204594-9661b134dd2b'),
      U('1534430480872-3498386e7856'),
      U('1519046904884-53103b34b206'),
      U('1544735716-392fe2489ffa'),
      U('1573108724029-4c46571d6490'),
    ],
    highlights: ['Tuition-Free Education', 'Engineering & Automotive Excellence', 'Leading AI & Quantum Research'],
  },
  '756': {
    code: '756',
    name: 'Switzerland',
    description: 'Switzerland punches far above its weight in global higher education. ETH Zurich consistently ranks among the world\'s top five universities for science and technology, while EPFL in Lausanne is a European beacon of innovation. The country\'s multilingual culture, political neutrality, and exceptional quality of life create an ideal environment for focused academic work. Switzerland also hosts major international organizations, offering unique networking opportunities.',
    images: [
      U('1506905925346-21bda4d32df4'),
      U('1501785888041-af3ef285b470'),
      U('1507003211169-0a1dd7228f2d'),
      U('1565538810643-b5bdb714032a'),
    ],
    highlights: ['ETH Zurich — Top 5 Globally', 'Multilingual Culture', 'International Organizations Hub'],
  },
  '380': {
    code: '380',
    name: 'Italy',
    description: 'Italy is where Western civilization\'s intellectual traditions were born. The University of Bologna, founded in 1088, is the oldest university in the world. Today, Italy excels in design, fashion, architecture, and business education. Bocconi University in Milan is one of Europe\'s premier business schools, while Politecnico di Milano leads in engineering and design. Studying in Italy means immersing yourself in a living museum of art, history, and culinary excellence.',
    images: [
      U('1534190760961-74e8c1c5c3da'),
      U('1543007631-283050bb3e8c'),
      U('1555396273-367ea4eb4db5'),
      U('1549989476-69a92fa57c36'),
      U('1532274402911-5a369e4c4bb5'),
    ],
    highlights: ['Oldest University in the World', 'Design & Fashion Capital', 'Business Education Excellence'],
  },
  '528': {
    code: '528',
    name: 'Netherlands',
    description: 'The Netherlands is one of Europe\'s most international academic destinations. Nearly all master\'s programs are taught in English, and Dutch universities consistently rank among the world\'s best. The University of Amsterdam and TU Delft are global leaders in their fields. The country\'s cycling culture, open-minded society, and central European location make it an exceptionally welcoming place for international scholars.',
    images: [
      U('1558981852-426c6c22a060'),
      U('1534430480872-3498386e7856'),
      U('1560717789-0ac7c58ac90a'),
      U('1543158181-e6f9f6712055'),
    ],
    highlights: ['English-Taught Programs', 'World-Leading Research', 'Most International Student Body'],
  },
  '056': {
    code: '056',
    name: 'Belgium',
    description: 'Belgium sits at the crossroads of Europe, hosting both NATO and the European Union. KU Leuven is consistently ranked the most innovative university in Europe, with particular strengths in biomedical sciences, engineering, and theology. Belgium\'s bilingual culture, central location, and thriving international community make it an ideal base for scholars interested in European policy and cross-cultural exchange.',
    images: [
      U('1491557345352-5929e343eb89'),
      U('1519046904884-53103b34b206'),
      U('1507003211169-0a1dd7228f2d'),
    ],
    highlights: ['Most Innovative University in Europe', 'EU & NATO Headquarters', 'Biomedical Sciences Leader'],
  },
  '724': {
    code: '724',
    name: 'Spain',
    description: 'Spain combines Mediterranean warmth with academic rigor. IE Business School in Madrid is one of the world\'s top MBA destinations, while the University of Barcelona excels in arts, sciences, and medicine. Spain\'s vibrant culture, affordable cost of living, and growing startup ecosystem — particularly in Barcelona and Madrid — make it an increasingly popular choice for international scholars seeking both academic excellence and quality of life.',
    images: [
      U('1543007631-283050bb3e8c'),
      U('1534190760961-74e8c1c5c3da'),
      U('1555396273-367ea4eb4db5'),
      U('1563013544-824ae1b704d3'),
      U('1532274402911-5a369e4c4bb5'),
    ],
    highlights: ['Top MBA Destination', 'Growing Startup Ecosystem', 'Mediterranean Quality of Life'],
  },
  '752': {
    code: '752',
    name: 'Sweden',
    description: 'Sweden is a global leader in innovation, sustainability, and social progress. The Karolinska Institute in Stockholm is one of the world\'s foremost medical universities, responsible for selecting the Nobel Prize in Physiology or Medicine. Swedish universities emphasize collaborative learning, critical thinking, and a flat academic hierarchy that encourages open dialogue between students and professors.',
    images: [
      U('1523292562811-8fa7962a78c8'),
      U('1506905925346-21bda4d32df4'),
      U('1507003211169-0a1dd7228f2d'),
    ],
    highlights: ['Nobel Prize Selection Institution', 'Innovation & Sustainability Leader', 'Collaborative Learning Culture'],
  },
  '208': {
    code: '208',
    name: 'Denmark',
    description: 'Denmark consistently ranks among the happiest and most livable countries on Earth. The University of Copenhagen, founded in 1479, is Scandinavia\'s oldest and largest university, with particular strengths in health sciences, natural sciences, and humanities. Denmark\'s emphasis on work-life balance, design thinking, and green innovation creates a unique environment for scholars who value both intellectual rigor and personal wellbeing.',
    images: [
      U('1530841377377-3ff06c0ca713'),
      U('1519046904884-53103b34b206'),
      U('1543158181-e6f9f6712055'),
    ],
    highlights: ['Happiest Country on Earth', 'Scandinavia\'s Oldest University', 'Green Innovation Pioneer'],
  },
  '040': {
    code: '040',
    name: 'Austria',
    description: 'Austria\'s intellectual heritage spans from Mozart and Freud to the Vienna Circle that revolutionized philosophy and science. The University of Vienna, founded in 1365, is one of the oldest and largest universities in the German-speaking world. Vienna itself has been voted the world\'s most livable city multiple times. Austria\'s central European location makes it a gateway to both Western and Eastern European academic networks.',
    images: [
      U('1516550893923-42d28e5677af'),
      U('1519046904884-53103b34b206'),
      U('1507003211169-0a1dd7228f2d'),
    ],
    highlights: ['World\'s Most Livable City', 'Rich Intellectual Heritage', 'Gateway to Central Europe'],
  },
}

export const DEFAULT_COUNTRY_DETAIL: CountryDetail = {
  code: '',
  name: '',
  description: 'This country is home to distinguished universities contributing to Europe\'s rich academic tradition.',
  images: [
    U('1541339907198-e08756dedf3f'),
    U('1507003211169-0a1dd7228f2d'),
    U('1502175353174-a7a70e73b362'),
  ],
  highlights: ['Distinguished Academic Programs', 'European Academic Tradition'],
}

export function getCountryDetail(countryId: string): CountryDetail {
  return EU_COUNTRY_DETAILS[countryId] || DEFAULT_COUNTRY_DETAIL
}
