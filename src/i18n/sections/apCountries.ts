interface APCountryI18n {
  description: string
  highlights: readonly string[]
}

const _en: Record<string, APCountryI18n> = {
  '702': {
    description: 'Singapore has transformed itself into Asia\'s premier education hub in a single generation. The National University of Singapore and Nanyang Technological University both rank consistently among the world\'s top 20 universities. The city-state\'s strategic location at the crossroads of global trade, its multicultural English-speaking environment, and its world-class infrastructure make it a uniquely attractive destination for ambitious students. Singapore\'s investment in research and innovation is unmatched in the region.',
    highlights: ['NUS & NTU — Global Top 20', 'Multicultural English-Speaking Environment', 'Asia\'s Technology & Finance Hub'],
  },
  '410': {
    description: 'South Korea has built one of the most impressive higher education systems in the world. Seoul National University, KAIST, Yonsei, and Korea University — collectively known as the "SKY" plus KAIST — produce graduates who lead global technology companies, research institutions, and cultural industries. The country\'s intense academic culture, combined with a booming technology sector and vibrant contemporary culture, creates an environment that rewards ambition and intellectual rigor.',
    highlights: ['SKY Universities & KAIST', 'Global Technology Leadership', 'K-Culture & Global Soft Power'],
  },
  '392': {
    description: 'Japan\'s higher education system combines centuries of intellectual tradition with cutting-edge research in robotics, materials science, and artificial intelligence. The University of Tokyo and Kyoto University have produced more Nobel laureates than any other Asian institutions. Japan\'s unique culture of precision, craftsmanship, and innovation permeates academic life. Students gain access to both world-class research facilities and one of the world\'s most fascinating and livable societies.',
    highlights: ['Most Nobel Laureates in Asia', 'Robotics & AI Research Leader', 'Unparalleled Cultural Immersion'],
  },
  '156': {
    description: 'China has made extraordinary investments in higher education, rapidly ascending global rankings. Tsinghua and Peking Universities now compete with the world\'s best institutions in science, engineering, and technology. Hong Kong\'s universities — the University of Hong Kong and CUHK — offer a unique fusion of East and West, with internationally accredited programs in a common law environment. China\'s scale, economic dynamism, and historical depth offer students an unparalleled window into the defining story of the 21st century.',
    highlights: ['Tsinghua & Peking — World Top 20', 'Hong Kong\'s East-West Fusion', 'Largest STEM Research Output'],
  },
  '036': {
    description: 'Australia offers a rare combination of world-class academic institutions, exceptional quality of life, and one of the most welcoming immigration environments for international graduates. The Group of Eight research universities — led by Melbourne, Sydney, and ANU — are internationally respected in medicine, law, and the sciences. Australia\'s multicultural society, sunshine, and strong labor market for graduates create an ideal environment for building both academic credentials and a professional network.',
    highlights: ['Group of Eight Research Universities', 'Post-Study Work Visa Pathway', 'Exceptional Quality of Life'],
  },
  '554': {
    description: 'New Zealand offers a distinguished academic environment within one of the world\'s most pristine natural settings. The University of Auckland, ranked among the world\'s top 100, provides research-intensive education across a full range of disciplines. New Zealand\'s small population belies its outsized contributions to science, particularly in agriculture, marine biology, and environmental research. Students benefit from a safe, welcoming society with outstanding outdoor recreation and a post-study work pathway.',
    highlights: ['University of Auckland — Global Top 100', 'Environmental & Marine Research', 'Post-Study Work Rights'],
  },
  '356': {
    description: 'India\'s elite institutions — the Indian Institutes of Technology and the Indian Institute of Science — are among the most selective and intellectually rigorous institutions in the world. IIT alumni have founded some of Silicon Valley\'s most significant companies and lead global technology firms. India\'s higher education system is undergoing rapid transformation, with massive government investment in research infrastructure. The country\'s vast talent pool, technological ambition, and cultural richness offer a compelling academic experience.',
    highlights: ['IITs — World\'s Most Selective', 'Silicon Valley Talent Pipeline', 'Rapidly Growing Research Investment'],
  },
}

const _ko: Record<string, APCountryI18n> = {
  '702': {
    description: '싱가포르는 한 세대 만에 아시아 최고의 교육 허브로 변모했습니다. 싱가포르 국립대(NUS)와 난양 공대(NTU)는 세계 20위권 대학에 꾸준히 이름을 올리고 있습니다. 글로벌 무역의 교차점이라는 전략적 위치, 다문화 영어권 환경, 세계 최고 수준의 인프라는 야심 찬 학생들에게 독보적인 매력으로 작용합니다. 싱가포르의 연구·혁신 투자 규모는 아시아에서 비교 대상이 없습니다.',
    highlights: ['NUS · NTU — 세계 20위권', '다문화 영어권 환경', '아시아 기술·금융 허브'],
  },
  '410': {
    description: '대한민국은 세계에서 가장 인상적인 고등 교육 체계를 구축한 국가 중 하나입니다. 서울대, KAIST, 연세대, 고려대 — 통칭 "SKY+KAIST" — 는 글로벌 기술 기업, 연구 기관, 문화 산업을 이끄는 인재들을 배출합니다. 강도 높은 학문 문화와 급성장하는 기술 섹터, 활기찬 현대 문화가 결합되어 야망과 지적 엄격함을 보상하는 환경을 만들어냅니다.',
    highlights: ['SKY 대학 · KAIST', '글로벌 기술 리더십', 'K-컬처와 글로벌 소프트 파워'],
  },
  '392': {
    description: '일본의 고등 교육은 수 세기에 걸친 지적 전통과 로봇공학·재료공학·인공지능 분야의 최첨단 연구를 결합합니다. 도쿄대와 교토대는 아시아의 어떤 대학보다도 많은 노벨상 수상자를 배출했습니다. 정밀함·장인정신·혁신이라는 일본 특유의 문화는 학문 생활 전반에 스며들어 있으며, 학생들은 세계적 수준의 연구 시설과 살기 좋은 사회를 함께 누릴 수 있습니다.',
    highlights: ['아시아 최다 노벨상 수상', '로봇·AI 연구 선도', '독보적인 문화 몰입 환경'],
  },
  '156': {
    description: '중국은 고등 교육에 막대한 투자를 단행하며 세계 랭킹을 빠르게 끌어올렸습니다. 칭화대와 베이징대는 과학·공학·기술 분야에서 세계 최고 수준의 대학들과 경쟁합니다. 홍콩의 홍콩대와 CUHK는 동·서양의 독특한 융합을 제공하며, 보통법 환경에서 국제 인증된 프로그램을 운영합니다. 중국의 규모와 경제적 역동성, 역사적 깊이는 학생들에게 21세기를 정의하는 이야기를 들여다보는 창을 열어줍니다.',
    highlights: ['칭화·베이징대 — 세계 20위권', '홍콩의 동서 융합', '최대 규모의 STEM 연구'],
  },
  '036': {
    description: '호주는 세계 최고 수준의 학문 기관, 뛰어난 삶의 질, 국제 졸업생에게 가장 우호적인 이민 환경을 모두 갖춘 보기 드문 조합을 제공합니다. 멜버른·시드니·ANU를 필두로 한 Group of Eight 연구 중심 대학들은 의학·법학·과학 분야에서 국제적으로 인정받습니다. 다문화 사회와 따뜻한 기후, 졸업생을 위한 강력한 노동 시장은 학문적 성취와 전문 네트워크를 함께 쌓을 이상적인 환경을 만듭니다.',
    highlights: ['Group of Eight 연구 중심 대학', '졸업 후 취업 비자 경로', '뛰어난 삶의 질'],
  },
  '554': {
    description: '뉴질랜드는 세계에서 가장 청정한 자연 환경 속에서 차별화된 학문 환경을 제공합니다. 세계 100위권에 꼽히는 오클랜드 대학은 모든 학문 분야에 걸쳐 연구 중심 교육을 제공합니다. 작은 인구 규모에도 불구하고 농업·해양생물학·환경 연구 분야에서 세계적 기여를 하고 있으며, 학생들은 안전하고 따뜻한 사회와 뛰어난 야외 활동, 그리고 졸업 후 취업 경로의 혜택을 누릴 수 있습니다.',
    highlights: ['오클랜드 대학 — 세계 100위권', '환경·해양 연구 강세', '졸업 후 취업 권한'],
  },
  '356': {
    description: '인도의 명문 기관 — 인도 공과대학(IIT)과 인도 과학원(IISc) — 은 세계에서 가장 선발이 까다롭고 학문적으로 엄격한 기관에 속합니다. IIT 동문들은 실리콘밸리에서 가장 영향력 있는 기업들을 창업했고, 글로벌 기술 기업을 이끌고 있습니다. 인도의 고등 교육 체계는 정부의 대규모 연구 인프라 투자와 함께 빠르게 변화하고 있습니다. 거대한 인재 풀, 기술적 야망, 풍부한 문화는 매력적인 학문 경험을 약속합니다.',
    highlights: ['IIT — 세계 최고의 선발 기준', '실리콘밸리 인재 파이프라인', '빠르게 성장하는 연구 투자'],
  },
}

const _fallback_en: APCountryI18n = {
  description: 'A dynamic academic destination in the Asia-Pacific region.',
  highlights: ['World-Class Research', 'International Community', 'Career Opportunities'],
}

const _fallback_ko: APCountryI18n = {
  description: '아시아·태평양의 역동적인 학문적 거점.',
  highlights: ['세계 수준의 연구', '국제적 커뮤니티', '진로 기회'],
}

export const apCountriesTranslations = {
  en: { apCountries: _en, apCountryFallback: _fallback_en },
  ko: { apCountries: _ko, apCountryFallback: _fallback_ko },
} as const
