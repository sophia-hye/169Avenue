export interface StateDetail {
  readonly description: string
  readonly images: readonly string[]
  readonly highlights: readonly string[]
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const STATE_DETAILS: Record<string, StateDetail> = {
  UT: {
    description: 'Utah is a land of dramatic contrasts — from the red rock canyons of the south to the snow-capped Wasatch Range that frames Salt Lake City. Known for its world-class ski resorts, thriving tech corridor dubbed "Silicon Slopes," and a quality of life that consistently ranks among the highest in the nation. The state offers an extraordinary backdrop for academic pursuits, where students can study amid some of North America\'s most breathtaking natural landscapes.',
    images: [
      U('1469854523086-cc02fe5d8800'),
      U('1512100254544-47340ba56b5d'),
      U('1494783367193-149034c05e8f'),
      U('1507003211169-0a1dd7228f2d'),
      U('1501785888041-af3ef285b470'),
    ],
    highlights: ['Silicon Slopes Tech Hub', 'World-Class Ski Resorts', 'National Parks & Red Rock Country'],
  },
  CA: {
    description: 'California is the epicenter of global innovation, culture, and academic excellence. Home to Silicon Valley, Hollywood, and some of the world\'s most prestigious research universities, the Golden State offers unparalleled opportunities for scholars. From the fog-draped bridges of San Francisco to the sun-kissed coastline of Southern California, the state provides an environment where intellectual ambition meets creative freedom.',
    images: [
      U('1449034446853-66c86144b0ad'),
      U('1506905925346-21bda4d32df4'),
      U('1534190760961-74e8c1c5c3da'),
      U('1519046904884-53103b34b206'),
      U('1543007631-283050bb3e8c'),
      U('1565538810643-b5bdb714032a'),
      U('1544735716-392fe2489ffa'),
    ],
    highlights: ['Silicon Valley Innovation', 'World-Class Research Institutions', 'Cultural & Creative Capital'],
  },
  MA: {
    description: 'Massachusetts is the intellectual cradle of America. The Greater Boston area houses the highest concentration of elite universities in the world, anchored by Harvard and MIT in Cambridge. With its rich colonial history, vibrant arts scene, and a biotech corridor that rivals any in the world, Massachusetts offers an academic experience steeped in tradition yet relentlessly forward-looking.',
    images: [
      U('1572120360610-d971b9d7767c'),
      U('1569982175971-d92b01cf8694'),
      U('1543158181-e6f9f6712055'),
      U('1573108724029-4c46571d6490'),
      U('1605117882932-f9e32b03fea9'),
    ],
    highlights: ['Highest University Density in the World', 'Biotech & Healthcare Hub', 'Rich Colonial Heritage'],
  },
  NY: {
    description: 'New York is the world\'s cultural and financial capital, offering students access to Wall Street, the United Nations, world-renowned museums, and a creative energy found nowhere else on Earth. From the intellectual intensity of Manhattan\'s research institutions to the serene campuses of upstate New York, the state provides extraordinary breadth for academic and professional growth.',
    images: [
      U('1496442226666-8d4d0e62e6e9'),
      U('1485871981521-5b1fd3805eee'),
      U('1534430480872-3498386e7856'),
      U('1560717789-0ac7c58ac90a'),
      U('1558981852-426c6c22a060'),
      U('1508739773434-c26b3d09e071'),
    ],
    highlights: ['Global Financial Capital', 'Unmatched Cultural Scene', 'Diverse Academic Landscape'],
  },
  PA: {
    description: 'Pennsylvania blends historical significance with academic prestige. Philadelphia, the birthplace of American democracy, hosts the University of Pennsylvania and its world-famous Wharton School. Pittsburgh has reinvented itself as a hub for robotics, AI, and healthcare innovation, anchored by Carnegie Mellon. The state\'s rolling hills and charming college towns provide an idyllic setting for scholarly life.',
    images: [
      U('1569761316261-9a8696fa2ca3'),
      U('1575503802870-45de6a6217c8'),
      U('1573855619003-97b4799dcd8b'),
      U('1520250497591-112f2f40a3f4'),
      U('1517760444937-f6397edcbbcd'),
    ],
    highlights: ['Birthplace of American Democracy', 'AI & Robotics Innovation Hub', 'Historic College Towns'],
  },
  TX: {
    description: 'Texas is a state of grand ambitions and vast horizons. Its booming metropolitan areas — Austin, Houston, Dallas — are magnets for technology, energy, aerospace, and medical research. The University of Texas system and Texas A&M are powerhouse institutions producing world-changing research. The Lone Star State\'s entrepreneurial spirit and low cost of living make it an increasingly attractive destination for global scholars.',
    images: [
      U('1531218150217-54595bc2b934'),
      U('1570366583862-f91883984fde'),
      U('1547058881-aa0edd92aab3'),
      U('1546156929-a4c0ac411f47'),
      U('1605723517503-3cadb5818a0c'),
      U('1563013544-824ae1b704d3'),
    ],
    highlights: ['Tech & Energy Capital', 'Aerospace & Medical Research', 'Entrepreneurial Spirit'],
  },
  IL: {
    description: 'Illinois, anchored by the global city of Chicago, is a crossroads of commerce, culture, and academia. The University of Chicago\'s rigorous intellectual tradition, Northwestern\'s interdisciplinary innovation, and UIUC\'s engineering prowess create a diverse academic ecosystem. Chicago\'s world-class architecture, deep-dish culture, and lakefront campus settings offer a uniquely vibrant student experience.',
    images: [
      U('1494522855154-9297ac14b55f'),
      U('1477959858617-67f85cf4f1df'),
      U('1524168272322-bf73616d9cb5'),
      U('1507003211169-0a1dd7228f2d'),
      U('1532274402911-5a369e4c4bb5'),
    ],
    highlights: ['Global City of Chicago', 'Rigorous Intellectual Tradition', 'Architecture & Culture Capital'],
  },
  CT: {
    description: 'Connecticut, nestled in the heart of New England, is home to Yale University — one of the oldest and most prestigious institutions in the world. The state\'s charming coastal towns, proximity to both New York and Boston, and its deep roots in American education make it an ideal setting for scholars seeking a classic collegiate experience within reach of major metropolitan centers.',
    images: [
      U('1551524559-8af4e6624178'),
      U('1517935706615-2717063c2225'),
      U('1533104816931-20fa691ff6ca'),
      U('1569982175971-d92b01cf8694'),
    ],
    highlights: ['Home of Yale University', 'Classic New England Charm', 'Proximity to NYC & Boston'],
  },
  NC: {
    description: 'North Carolina\'s Research Triangle — Raleigh, Durham, and Chapel Hill — is one of America\'s most dynamic academic and innovation corridors. Duke University, UNC Chapel Hill, and NC State form a triumvirate of academic excellence. The state offers everything from the Blue Ridge Mountains to pristine Atlantic beaches, with a cost of living far below the coastal elite hubs.',
    images: [
      U('1566438480900-0609be27a4be'),
      U('1502175353174-a7a70e73b362'),
      U('1550850839-8dc894ed385a'),
      U('1517760444937-f6397edcbbcd'),
      U('1543158181-e6f9f6712055'),
    ],
    highlights: ['Research Triangle Innovation Corridor', 'Blue Ridge Mountains', 'Exceptional Value'],
  },
  GA: {
    description: 'Georgia, led by the vibrant metropolis of Atlanta, is the economic and cultural engine of the American South. Georgia Tech is a global leader in engineering and computing, while Emory University excels in healthcare and liberal arts. Atlanta\'s position as a major international hub — home to the world\'s busiest airport — gives students unparalleled global connectivity.',
    images: [
      U('1555396273-367ea4eb4db5'),
      U('1570554886111-e80fcca6a029'),
      U('1564013799919-ab600027ffc6'),
      U('1573108724029-4c46571d6490'),
    ],
    highlights: ['Atlanta — Gateway to the South', 'Global Connectivity Hub', 'Engineering & Healthcare Excellence'],
  },
  MI: {
    description: 'Michigan is defined by the Great Lakes that shape its distinctive peninsular geography and by the University of Michigan — consistently ranked among the top public universities in the world. Ann Arbor is a quintessential college town, while Detroit\'s renaissance offers students front-row seats to urban innovation and the future of mobility.',
    images: [
      U('1564013799919-ab600027ffc6'),
      U('1502175353174-a7a70e73b362'),
      U('1507003211169-0a1dd7228f2d'),
      U('1517935706615-2717063c2225'),
      U('1550850839-8dc894ed385a'),
    ],
    highlights: ['Great Lakes Natural Beauty', 'Top Public University', 'Detroit Innovation Renaissance'],
  },
  OH: {
    description: 'Ohio sits at the crossroads of the American Midwest, offering a blend of urban energy and pastoral calm. Ohio State University in Columbus is one of the nation\'s largest and most comprehensive research universities, while Case Western Reserve in Cleveland excels in medicine and engineering. The state\'s affordability and central location make it a strategic choice for ambitious scholars.',
    images: [
      U('1571019613454-1cb2f99b2d8b'),
      U('1506905925346-21bda4d32df4'),
      U('1573855619003-97b4799dcd8b'),
      U('1532274402911-5a369e4c4bb5'),
    ],
    highlights: ['Midwest Crossroads', 'Comprehensive Research University', 'Affordable Excellence'],
  },
  NJ: {
    description: 'New Jersey, the Garden State, punches far above its weight in higher education. Princeton University needs no introduction as one of the world\'s finest institutions. The state\'s position between New York and Philadelphia provides students access to two major metropolitan areas, while its diverse communities and strong pharmaceutical industry create rich opportunities for research and career development.',
    images: [
      U('1555396273-367ea4eb4db5'),
      U('1571019613454-1cb2f99b2d8b'),
      U('1502175353174-a7a70e73b362'),
      U('1543158181-e6f9f6712055'),
      U('1520250497591-112f2f40a3f4'),
    ],
    highlights: ['Home of Princeton University', 'NYC & Philadelphia Access', 'Pharmaceutical Industry Hub'],
  },
  FL: {
    description: 'Florida\'s sunshine and diversity create a uniquely dynamic environment for higher education. The University of Florida and University of Miami are rising stars in national rankings, bolstered by the state\'s booming tech sector, world-class healthcare systems, and status as a gateway to Latin America. The state\'s year-round warmth and vibrant multicultural communities attract scholars from across the globe.',
    images: [
      U('1535498730771-e735b998cd64'),
      U('1514214246283-d427a95c5d2f'),
      U('1548574505-5e239809ee19'),
      U('1546156929-a4c0ac411f47'),
      U('1605723517503-3cadb5818a0c'),
    ],
    highlights: ['Gateway to Latin America', 'Year-Round Sunshine', 'Booming Tech & Healthcare'],
  },
  IN: {
    description: 'Indiana offers a distinctly American collegiate experience. Purdue University is a powerhouse in engineering and aerospace — its graduates include Neil Armstrong. The University of Notre Dame carries one of the most storied traditions in American higher education. Indiana\'s welcoming communities, affordable living, and strong STEM focus make it an excellent choice for international scholars.',
    images: [
      U('1502175353174-a7a70e73b362'),
      U('1564013799919-ab600027ffc6'),
      U('1507003211169-0a1dd7228f2d'),
      U('1573855619003-97b4799dcd8b'),
    ],
    highlights: ['Engineering & Aerospace Legacy', 'Storied Collegiate Traditions', 'Affordable STEM Excellence'],
  },
  VA: {
    description: 'Virginia is where American history and modern innovation converge. The University of Virginia, founded by Thomas Jefferson, embodies the ideal of the scholar-citizen. Virginia Tech drives cutting-edge research in engineering and cybersecurity. The state\'s proximity to Washington, D.C. provides unmatched access to government, policy, and international affairs.',
    images: [
      U('1569982175971-d92b01cf8694'),
      U('1502175353174-a7a70e73b362'),
      U('1550850839-8dc894ed385a'),
      U('1533104816931-20fa691ff6ca'),
      U('1543158181-e6f9f6712055'),
    ],
    highlights: ['Founded by Thomas Jefferson', 'D.C. Proximity & Policy Access', 'Cybersecurity Hub'],
  },
  CO: {
    description: 'Colorado combines outdoor adventure with academic rigor in a setting of unrivaled natural beauty. Boulder, home to the University of Colorado, sits at the foot of the Flatirons, offering a campus experience unlike any other. The state\'s booming aerospace, renewable energy, and outdoor recreation industries create a unique ecosystem for innovation-minded scholars.',
    images: [
      U('1501785888041-af3ef285b470'),
      U('1469854523086-cc02fe5d8800'),
      U('1506905925346-21bda4d32df4'),
      U('1494783367193-149034c05e8f'),
      U('1507003211169-0a1dd7228f2d'),
      U('1565538810643-b5bdb714032a'),
    ],
    highlights: ['Rocky Mountain Setting', 'Aerospace & Clean Energy', 'Outdoor Adventure Lifestyle'],
  },
  WA: {
    description: 'Washington State is the Pacific Northwest\'s crown jewel, home to global tech giants Microsoft, Amazon, and Boeing. The University of Washington in Seattle is a world leader in computer science, medicine, and oceanography. The state\'s stunning landscapes — from Puget Sound to Mount Rainier — and its progressive culture create an inspiring environment for academic excellence.',
    images: [
      U('1502175353174-a7a70e73b362'),
      U('1469854523086-cc02fe5d8800'),
      U('1506905925346-21bda4d32df4'),
      U('1519046904884-53103b34b206'),
      U('1543007631-283050bb3e8c'),
    ],
    highlights: ['Global Tech Capital', 'Pacific Northwest Beauty', 'CS & Medicine Excellence'],
  },
  TN: {
    description: 'Tennessee blends Southern charm with academic ambition. Vanderbilt University in Nashville is one of the nation\'s premier research institutions, while the city itself has emerged as a major hub for healthcare, music, and technology. The state\'s warm hospitality, rich musical heritage, and growing innovation economy offer a distinctive setting for academic life.',
    images: [
      U('1570554886111-e80fcca6a029'),
      U('1555396273-367ea4eb4db5'),
      U('1502175353174-a7a70e73b362'),
      U('1563013544-824ae1b704d3'),
    ],
    highlights: ['Music City Nashville', 'Healthcare Innovation Hub', 'Southern Hospitality & Culture'],
  },
  MO: {
    description: 'Missouri, the Gateway to the West, is home to Washington University in St. Louis — a premier research university with particular strengths in medicine, social work, and business. St. Louis\'s iconic Gateway Arch symbolizes the state\'s spirit of exploration and ambition. The city\'s thriving arts scene and affordable cost of living create an accessible path to world-class education.',
    images: [
      U('1502175353174-a7a70e73b362'),
      U('1477959858617-67f85cf4f1df'),
      U('1564013799919-ab600027ffc6'),
      U('1573855619003-97b4799dcd8b'),
      U('1532274402911-5a369e4c4bb5'),
    ],
    highlights: ['Gateway to the West', 'Medical Research Excellence', 'Affordable World-Class Education'],
  },
}

export const DEFAULT_STATE_DETAIL: StateDetail = {
  description: 'This state is home to distinguished universities that contribute to America\'s rich tapestry of higher education. With unique regional characteristics and strong academic programs, it offers scholars an environment conducive to both intellectual growth and personal development.',
  images: [
    U('1541339907198-e08756dedf3f'),
    U('1507003211169-0a1dd7228f2d'),
    U('1502175353174-a7a70e73b362'),
  ],
  highlights: ['Distinguished Academic Programs', 'Unique Regional Character'],
}

export function getStateDetail(code: string): StateDetail {
  return STATE_DETAILS[code] || DEFAULT_STATE_DETAIL
}
