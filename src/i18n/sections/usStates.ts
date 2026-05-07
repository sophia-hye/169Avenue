interface USStateI18n {
  description: string
  highlights: readonly string[]
}

const _en: Record<string, USStateI18n> = {
  UT: {
    description: 'Utah is a land of dramatic contrasts — from the red rock canyons of the south to the snow-capped Wasatch Range that frames Salt Lake City. Known for its world-class ski resorts, thriving tech corridor dubbed "Silicon Slopes," and a quality of life that consistently ranks among the highest in the nation. The state offers an extraordinary backdrop for academic pursuits, where students can study amid some of North America\'s most breathtaking natural landscapes.',
    highlights: ['Silicon Slopes Tech Hub', 'World-Class Ski Resorts', 'National Parks & Red Rock Country'],
  },
  CA: {
    description: 'California is the epicenter of global innovation, culture, and academic excellence. Home to Silicon Valley, Hollywood, and some of the world\'s most prestigious research universities, the Golden State offers unparalleled opportunities for scholars. From the fog-draped bridges of San Francisco to the sun-kissed coastline of Southern California, the state provides an environment where intellectual ambition meets creative freedom.',
    highlights: ['Silicon Valley Innovation', 'World-Class Research Institutions', 'Cultural & Creative Capital'],
  },
  MA: {
    description: 'Massachusetts is the intellectual cradle of America. The Greater Boston area houses the highest concentration of elite universities in the world, anchored by Harvard and MIT in Cambridge. With its rich colonial history, vibrant arts scene, and a biotech corridor that rivals any in the world, Massachusetts offers an academic experience steeped in tradition yet relentlessly forward-looking.',
    highlights: ['Highest University Density in the World', 'Biotech & Healthcare Hub', 'Rich Colonial Heritage'],
  },
  NY: {
    description: 'New York is the world\'s cultural and financial capital, offering students access to Wall Street, the United Nations, world-renowned museums, and a creative energy found nowhere else on Earth. From the intellectual intensity of Manhattan\'s research institutions to the serene campuses of upstate New York, the state provides extraordinary breadth for academic and professional growth.',
    highlights: ['Global Financial Capital', 'Unmatched Cultural Scene', 'Diverse Academic Landscape'],
  },
  PA: {
    description: 'Pennsylvania blends historical significance with academic prestige. Philadelphia, the birthplace of American democracy, hosts the University of Pennsylvania and its world-famous Wharton School. Pittsburgh has reinvented itself as a hub for robotics, AI, and healthcare innovation, anchored by Carnegie Mellon. The state\'s rolling hills and charming college towns provide an idyllic setting for scholarly life.',
    highlights: ['Birthplace of American Democracy', 'AI & Robotics Innovation Hub', 'Historic College Towns'],
  },
  TX: {
    description: 'Texas is a state of grand ambitions and vast horizons. Its booming metropolitan areas — Austin, Houston, Dallas — are magnets for technology, energy, aerospace, and medical research. The University of Texas system and Texas A&M are powerhouse institutions producing world-changing research. The Lone Star State\'s entrepreneurial spirit and low cost of living make it an increasingly attractive destination for global scholars.',
    highlights: ['Tech & Energy Capital', 'Aerospace & Medical Research', 'Entrepreneurial Spirit'],
  },
  IL: {
    description: 'Illinois, anchored by the global city of Chicago, is a crossroads of commerce, culture, and academia. The University of Chicago\'s rigorous intellectual tradition, Northwestern\'s interdisciplinary innovation, and UIUC\'s engineering prowess create a diverse academic ecosystem. Chicago\'s world-class architecture, deep-dish culture, and lakefront campus settings offer a uniquely vibrant student experience.',
    highlights: ['Global City of Chicago', 'Rigorous Intellectual Tradition', 'Architecture & Culture Capital'],
  },
  CT: {
    description: 'Connecticut, nestled in the heart of New England, is home to Yale University — one of the oldest and most prestigious institutions in the world. The state\'s charming coastal towns, proximity to both New York and Boston, and its deep roots in American education make it an ideal setting for scholars seeking a classic collegiate experience within reach of major metropolitan centers.',
    highlights: ['Home of Yale University', 'Classic New England Charm', 'Proximity to NYC & Boston'],
  },
  NC: {
    description: 'North Carolina\'s Research Triangle — Raleigh, Durham, and Chapel Hill — is one of America\'s most dynamic academic and innovation corridors. Duke University, UNC Chapel Hill, and NC State form a triumvirate of academic excellence. The state offers everything from the Blue Ridge Mountains to pristine Atlantic beaches, with a cost of living far below the coastal elite hubs.',
    highlights: ['Research Triangle Innovation Corridor', 'Blue Ridge Mountains', 'Exceptional Value'],
  },
  GA: {
    description: 'Georgia, led by the vibrant metropolis of Atlanta, is the economic and cultural engine of the American South. Georgia Tech is a global leader in engineering and computing, while Emory University excels in healthcare and liberal arts. Atlanta\'s position as a major international hub — home to the world\'s busiest airport — gives students unparalleled global connectivity.',
    highlights: ['Atlanta — Gateway to the South', 'Global Connectivity Hub', 'Engineering & Healthcare Excellence'],
  },
  MI: {
    description: 'Michigan is defined by the Great Lakes that shape its distinctive peninsular geography and by the University of Michigan — consistently ranked among the top public universities in the world. Ann Arbor is a quintessential college town, while Detroit\'s renaissance offers students front-row seats to urban innovation and the future of mobility.',
    highlights: ['Great Lakes Natural Beauty', 'Top Public University', 'Detroit Innovation Renaissance'],
  },
  OH: {
    description: 'Ohio sits at the crossroads of the American Midwest, offering a blend of urban energy and pastoral calm. Ohio State University in Columbus is one of the nation\'s largest and most comprehensive research universities, while Case Western Reserve in Cleveland excels in medicine and engineering. The state\'s affordability and central location make it a strategic choice for ambitious scholars.',
    highlights: ['Midwest Crossroads', 'Comprehensive Research University', 'Affordable Excellence'],
  },
  NJ: {
    description: 'New Jersey, the Garden State, punches far above its weight in higher education. Princeton University needs no introduction as one of the world\'s finest institutions. The state\'s position between New York and Philadelphia provides students access to two major metropolitan areas, while its diverse communities and strong pharmaceutical industry create rich opportunities for research and career development.',
    highlights: ['Home of Princeton University', 'NYC & Philadelphia Access', 'Pharmaceutical Industry Hub'],
  },
  FL: {
    description: 'Florida\'s sunshine and diversity create a uniquely dynamic environment for higher education. The University of Florida and University of Miami are rising stars in national rankings, bolstered by the state\'s booming tech sector, world-class healthcare systems, and status as a gateway to Latin America. The state\'s year-round warmth and vibrant multicultural communities attract scholars from across the globe.',
    highlights: ['Gateway to Latin America', 'Year-Round Sunshine', 'Booming Tech & Healthcare'],
  },
  IN: {
    description: 'Indiana offers a distinctly American collegiate experience. Purdue University is a powerhouse in engineering and aerospace — its graduates include Neil Armstrong. The University of Notre Dame carries one of the most storied traditions in American higher education. Indiana\'s welcoming communities, affordable living, and strong STEM focus make it an excellent choice for international scholars.',
    highlights: ['Engineering & Aerospace Legacy', 'Storied Collegiate Traditions', 'Affordable STEM Excellence'],
  },
  VA: {
    description: 'Virginia is where American history and modern innovation converge. The University of Virginia, founded by Thomas Jefferson, embodies the ideal of the scholar-citizen. Virginia Tech drives cutting-edge research in engineering and cybersecurity. The state\'s proximity to Washington, D.C. provides unmatched access to government, policy, and international affairs.',
    highlights: ['Founded by Thomas Jefferson', 'D.C. Proximity & Policy Access', 'Cybersecurity Hub'],
  },
  CO: {
    description: 'Colorado combines outdoor adventure with academic rigor in a setting of unrivaled natural beauty. Boulder, home to the University of Colorado, sits at the foot of the Flatirons, offering a campus experience unlike any other. The state\'s booming aerospace, renewable energy, and outdoor recreation industries create a unique ecosystem for innovation-minded scholars.',
    highlights: ['Rocky Mountain Setting', 'Aerospace & Clean Energy', 'Outdoor Adventure Lifestyle'],
  },
  WA: {
    description: 'Washington State is the Pacific Northwest\'s crown jewel, home to global tech giants Microsoft, Amazon, and Boeing. The University of Washington in Seattle is a world leader in computer science, medicine, and oceanography. The state\'s stunning landscapes — from Puget Sound to Mount Rainier — and its progressive culture create an inspiring environment for academic excellence.',
    highlights: ['Global Tech Capital', 'Pacific Northwest Beauty', 'CS & Medicine Excellence'],
  },
  TN: {
    description: 'Tennessee blends Southern charm with academic ambition. Vanderbilt University in Nashville is one of the nation\'s premier research institutions, while the city itself has emerged as a major hub for healthcare, music, and technology. The state\'s warm hospitality, rich musical heritage, and growing innovation economy offer a distinctive setting for academic life.',
    highlights: ['Music City Nashville', 'Healthcare Innovation Hub', 'Southern Hospitality & Culture'],
  },
  MO: {
    description: 'Missouri, the Gateway to the West, is home to Washington University in St. Louis — a premier research university with particular strengths in medicine, social work, and business. St. Louis\'s iconic Gateway Arch symbolizes the state\'s spirit of exploration and ambition. The city\'s thriving arts scene and affordable cost of living create an accessible path to world-class education.',
    highlights: ['Gateway to the West', 'Medical Research Excellence', 'Affordable World-Class Education'],
  },
}

const _ko: Record<string, USStateI18n> = {
  UT: {
    description: '유타는 남부의 붉은 협곡부터 솔트레이크시티를 감싸는 눈 덮인 워새치 산맥까지, 극적인 대비의 땅입니다. 세계 최고 수준의 스키 리조트와 "실리콘 슬로프스"라 불리는 번창하는 기술 산업 회랑, 그리고 미국 최상위로 꼽히는 삶의 질로 유명합니다. 북미에서 가장 숨막히는 자연 경관 속에서 학업을 이어갈 수 있는 특별한 환경을 제공합니다.',
    highlights: ['실리콘 슬로프스 기술 허브', '세계 최고 수준의 스키 리조트', '국립공원·붉은 바위 지대'],
  },
  CA: {
    description: '캘리포니아는 글로벌 혁신·문화·학문적 우수성의 진원지입니다. 실리콘밸리, 할리우드, 그리고 세계 최고 명문 연구 대학들의 본거지로, 학자들에게 비할 데 없는 기회를 제공합니다. 안개 낀 샌프란시스코의 다리부터 햇살 가득한 남부 해안까지, 지적 야망과 창의적 자유가 만나는 환경을 제공합니다.',
    highlights: ['실리콘밸리 혁신', '세계 수준의 연구 기관', '문화·창작의 수도'],
  },
  MA: {
    description: '매사추세츠는 미국 지성의 요람입니다. 케임브리지의 하버드와 MIT를 중심으로, 그레이터 보스턴 지역에는 세계에서 가장 높은 밀도의 명문 대학들이 자리합니다. 풍부한 식민지 역사, 활기찬 예술 씬, 세계 최고 수준의 바이오테크 회랑이 결합되어 전통과 미래 지향성을 동시에 갖춘 학문 경험을 제공합니다.',
    highlights: ['세계 최고의 대학 밀집도', '바이오·헬스케어 허브', '풍부한 식민지 유산'],
  },
  NY: {
    description: '뉴욕은 세계의 문화·금융 수도로, 학생들에게 월스트리트, UN, 세계적 박물관, 그리고 다른 어디서도 찾을 수 없는 창조적 에너지에 대한 접근을 제공합니다. 맨해튼 연구 기관의 지적 강도부터 업스테이트 뉴욕의 평온한 캠퍼스까지, 학문적·전문적 성장을 위한 비범한 폭을 갖추고 있습니다.',
    highlights: ['글로벌 금융 수도', '비할 데 없는 문화 씬', '다양한 학문 환경'],
  },
  PA: {
    description: '펜실베이니아는 역사적 의미와 학문적 명성을 결합합니다. 미국 민주주의의 발상지인 필라델피아에는 펜실베이니아 대학과 세계적인 와튼 스쿨이 있습니다. 피츠버그는 카네기멜런을 축으로 로봇공학·AI·헬스케어 혁신 허브로 재탄생했습니다. 완만한 구릉과 매력적인 대학 도시들은 학자의 삶에 이상적인 무대를 제공합니다.',
    highlights: ['미국 민주주의의 발상지', 'AI·로봇 혁신 허브', '역사적인 대학 도시'],
  },
  TX: {
    description: '텍사스는 거대한 야망과 광활한 지평선의 주입니다. 오스틴·휴스턴·댈러스는 기술·에너지·항공우주·의학 연구를 끌어들이는 자석입니다. 텍사스 대학 시스템과 텍사스 A&M은 세상을 바꾸는 연구를 만들어내는 강자들입니다. 텍사스의 기업가 정신과 낮은 생활비는 글로벌 학자들에게 점점 더 매력적인 목적지가 되고 있습니다.',
    highlights: ['기술·에너지의 수도', '항공우주·의학 연구', '기업가 정신'],
  },
  IL: {
    description: '글로벌 도시 시카고를 중심으로 한 일리노이는 상업·문화·학문의 교차로입니다. 시카고 대학의 엄격한 지적 전통, 노스웨스턴의 학제 간 혁신, UIUC의 공학 역량이 다양한 학문 생태계를 만들어냅니다. 시카고의 세계적인 건축, 딥디시 문화, 호숫가 캠퍼스는 독특하고 활기찬 학생 경험을 제공합니다.',
    highlights: ['글로벌 도시 시카고', '엄격한 지적 전통', '건축·문화의 수도'],
  },
  CT: {
    description: '뉴잉글랜드의 심장부에 자리잡은 코네티컷은 세계에서 가장 오래되고 명망 있는 대학 중 하나인 예일 대학의 본거지입니다. 매력적인 해안 마을, 뉴욕과 보스턴 모두에 가까운 위치, 그리고 미국 교육에 깊이 뿌리내린 전통은 클래식한 대학 경험을 추구하는 학자들에게 이상적인 환경을 제공합니다.',
    highlights: ['예일 대학의 본거지', '클래식한 뉴잉글랜드 정취', '뉴욕·보스턴 인접'],
  },
  NC: {
    description: '노스캐롤라이나의 리서치 트라이앵글 — 롤리·더럼·채플힐 — 은 미국에서 가장 역동적인 학문·혁신 회랑 중 하나입니다. 듀크, UNC 채플힐, NC 주립대가 학문적 우수성의 삼각 편대를 이룹니다. 블루리지 산맥부터 청정한 대서양 해변까지 모든 것을 갖추면서도, 해안 명문 허브들에 비해 훨씬 낮은 생활비를 제공합니다.',
    highlights: ['리서치 트라이앵글 혁신 회랑', '블루리지 산맥', '뛰어난 가성비'],
  },
  GA: {
    description: '활기찬 대도시 애틀랜타가 이끄는 조지아는 미국 남부의 경제·문화 엔진입니다. 조지아 공대는 공학·컴퓨팅 분야의 글로벌 리더이며, 에모리 대학은 헬스케어와 인문학에서 두각을 나타냅니다. 세계에서 가장 분주한 공항이 있는 애틀랜타의 위치는 학생들에게 비할 데 없는 글로벌 연결성을 제공합니다.',
    highlights: ['애틀랜타 — 남부의 관문', '글로벌 연결 허브', '공학·헬스케어 우수성'],
  },
  MI: {
    description: '미시간은 독특한 반도 지형을 만들어내는 오대호와, 세계 최고 공립대학으로 꾸준히 평가받는 미시간 대학으로 정의됩니다. 앤아버는 전형적인 대학 도시이며, 디트로이트의 부흥은 학생들에게 도시 혁신과 모빌리티의 미래를 가장 가까이서 목격할 기회를 제공합니다.',
    highlights: ['오대호의 자연 미', '최상위 공립대학', '디트로이트 혁신 르네상스'],
  },
  OH: {
    description: '오하이오는 미국 중서부의 교차로에 위치하며, 도시적 에너지와 전원적 평온을 결합합니다. 컬럼버스의 오하이오 주립대는 미국에서 가장 크고 종합적인 연구 중심 대학 중 하나이며, 클리블랜드의 케이스 웨스턴 리저브는 의학·공학에서 두각을 나타냅니다. 합리적인 비용과 중심부 위치는 야심 찬 학자들에게 전략적인 선택지가 됩니다.',
    highlights: ['중서부의 교차로', '종합 연구 중심 대학', '합리적인 비용의 우수성'],
  },
  NJ: {
    description: '가든 스테이트 뉴저지는 고등 교육에서 규모 대비 압도적인 위상을 자랑합니다. 프린스턴 대학은 더 이상의 설명이 필요 없는 세계 최고의 기관입니다. 뉴욕과 필라델피아 사이의 위치는 학생들에게 두 대도시권 모두에 대한 접근을 제공하며, 다양한 커뮤니티와 강력한 제약 산업은 연구·진로 개발에 풍부한 기회를 만들어냅니다.',
    highlights: ['프린스턴 대학의 본거지', '뉴욕·필라델피아 인접', '제약 산업 허브'],
  },
  FL: {
    description: '플로리다의 햇살과 다양성은 고등 교육에 독특하고 역동적인 환경을 만듭니다. 플로리다 대학과 마이애미 대학은 호황을 누리는 기술 섹터, 세계 수준의 헬스케어 시스템, 라틴아메리카로 향하는 관문이라는 위상에 힘입어 전국 랭킹에서 상승세를 보이고 있습니다. 연중 따뜻한 기후와 활기찬 다문화 커뮤니티가 전 세계 학자들을 끌어들입니다.',
    highlights: ['라틴아메리카의 관문', '연중 따뜻한 기후', '호황의 기술·헬스케어'],
  },
  IN: {
    description: '인디애나는 전형적인 미국식 대학 경험을 제공합니다. 퍼듀 대학은 공학·항공우주의 강자로, 닐 암스트롱을 비롯한 졸업생을 배출했습니다. 노트르담 대학은 미국 고등 교육에서 가장 풍부한 전통 중 하나를 이어갑니다. 따뜻한 커뮤니티, 합리적인 생활비, 강력한 STEM 중심성은 국제 학자들에게 훌륭한 선택지가 됩니다.',
    highlights: ['공학·항공우주의 유산', '풍부한 대학 전통', '합리적인 STEM 우수성'],
  },
  VA: {
    description: '버지니아는 미국 역사와 현대 혁신이 만나는 곳입니다. 토머스 제퍼슨이 설립한 버지니아 대학은 시민-학자의 이상을 구현합니다. 버지니아 공대는 공학·사이버보안 분야의 첨단 연구를 이끕니다. 워싱턴 D.C. 근접성은 정부·정책·국제 관계에 대한 비할 데 없는 접근을 제공합니다.',
    highlights: ['토머스 제퍼슨이 설립', 'D.C. 인접·정책 접근', '사이버보안 허브'],
  },
  CO: {
    description: '콜로라도는 비할 데 없는 자연 미 속에서 야외 모험과 학문적 엄격함을 결합합니다. 콜로라도 대학이 자리한 볼더는 플랫아이언스 산자락에 위치해 어디서도 찾기 힘든 캠퍼스 경험을 제공합니다. 호황의 항공우주·재생에너지·아웃도어 레크리에이션 산업은 혁신 지향 학자들에게 독특한 생태계를 만들어냅니다.',
    highlights: ['로키 산맥의 환경', '항공우주·청정 에너지', '아웃도어 라이프스타일'],
  },
  WA: {
    description: '워싱턴 주는 마이크로소프트·아마존·보잉이 자리한 태평양 북서부의 보석입니다. 시애틀의 워싱턴 대학은 컴퓨터 과학·의학·해양학의 세계적 리더입니다. 퓨젯 사운드부터 레이니어 산까지 이어지는 아름다운 풍경과 진보적 문화는 학문적 우수성에 영감을 주는 환경을 만듭니다.',
    highlights: ['글로벌 기술 수도', '태평양 북서부의 미', 'CS·의학 우수성'],
  },
  TN: {
    description: '테네시는 남부의 매력과 학문적 야망을 결합합니다. 내슈빌의 밴더빌트 대학은 미국 최고의 연구 기관 중 하나이며, 도시 자체가 헬스케어·음악·기술의 주요 허브로 떠올랐습니다. 따뜻한 환대, 풍부한 음악 유산, 성장하는 혁신 경제는 학문 생활에 독특한 무대를 제공합니다.',
    highlights: ['음악의 도시 내슈빌', '헬스케어 혁신 허브', '남부의 환대와 문화'],
  },
  MO: {
    description: '서부의 관문 미주리에는 의학·사회복지·경영에서 강점을 보이는 명문 연구 대학 워싱턴 대학 인 세인트루이스가 자리합니다. 세인트루이스의 상징적인 게이트웨이 아치는 탐험과 야망이라는 주의 정신을 상징합니다. 활발한 예술 씬과 합리적인 생활비는 세계 수준의 교육으로 향하는 접근 가능한 길을 제공합니다.',
    highlights: ['서부의 관문', '의학 연구 우수성', '합리적인 세계 수준 교육'],
  },
}

const _fallback_en: USStateI18n = {
  description: 'This state is home to distinguished universities that contribute to America\'s rich tapestry of higher education. With unique regional characteristics and strong academic programs, it offers scholars an environment conducive to both intellectual growth and personal development.',
  highlights: ['Distinguished Academic Programs', 'Unique Regional Character'],
}

const _fallback_ko: USStateI18n = {
  description: '이 주에는 미국의 풍부한 고등 교육 환경에 기여하는 명문 대학들이 자리합니다. 독특한 지역적 특성과 강력한 학문 프로그램은 지적 성장과 개인적 발전 모두에 우호적인 환경을 제공합니다.',
  highlights: ['우수한 학문 프로그램', '독특한 지역적 특성'],
}

export const usStatesTranslations = {
  en: { usStates: _en, usStateFallback: _fallback_en },
  ko: { usStates: _ko, usStateFallback: _fallback_ko },
} as const
