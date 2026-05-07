interface EUCountryI18n {
  description: string
  highlights: readonly string[]
}

const _en: Record<string, EUCountryI18n> = {
  '250': {
    description: 'France is the intellectual heart of continental Europe. Paris alone hosts more than a dozen world-class institutions, from the grandes ecoles that train the nation\'s elite to the ancient Sorbonne. French higher education uniquely blends rigorous academic theory with an emphasis on art, philosophy, and the pleasures of civilized life. INSEAD, HEC Paris, and Sciences Po are globally recognized pillars of business and political science education.',
    highlights: ['Home of the Grandes Ecoles', 'Global Business Education Hub', 'Art, Philosophy & Culture Capital'],
  },
  '276': {
    description: 'Germany is Europe\'s largest economy and a powerhouse of engineering, automotive innovation, and scientific research. Its universities — many tuition-free even for international students — combine theoretical depth with practical training through close ties to industry. TU Munich, Heidelberg University, and Humboldt University in Berlin represent centuries of academic tradition alongside cutting-edge research in AI, quantum computing, and sustainable energy.',
    highlights: ['Tuition-Free Education', 'Engineering & Automotive Excellence', 'Leading AI & Quantum Research'],
  },
  '756': {
    description: 'Switzerland punches far above its weight in global higher education. ETH Zurich consistently ranks among the world\'s top five universities for science and technology, while EPFL in Lausanne is a European beacon of innovation. The country\'s multilingual culture, political neutrality, and exceptional quality of life create an ideal environment for focused academic work. Switzerland also hosts major international organizations, offering unique networking opportunities.',
    highlights: ['ETH Zurich — Top 5 Globally', 'Multilingual Culture', 'International Organizations Hub'],
  },
  '380': {
    description: 'Italy is where Western civilization\'s intellectual traditions were born. The University of Bologna, founded in 1088, is the oldest university in the world. Today, Italy excels in design, fashion, architecture, and business education. Bocconi University in Milan is one of Europe\'s premier business schools, while Politecnico di Milano leads in engineering and design. Studying in Italy means immersing yourself in a living museum of art, history, and culinary excellence.',
    highlights: ['Oldest University in the World', 'Design & Fashion Capital', 'Business Education Excellence'],
  },
  '528': {
    description: 'The Netherlands is one of Europe\'s most international academic destinations. Nearly all master\'s programs are taught in English, and Dutch universities consistently rank among the world\'s best. The University of Amsterdam and TU Delft are global leaders in their fields. The country\'s cycling culture, open-minded society, and central European location make it an exceptionally welcoming place for international scholars.',
    highlights: ['English-Taught Programs', 'World-Leading Research', 'Most International Student Body'],
  },
  '056': {
    description: 'Belgium sits at the crossroads of Europe, hosting both NATO and the European Union. KU Leuven is consistently ranked the most innovative university in Europe, with particular strengths in biomedical sciences, engineering, and theology. Belgium\'s bilingual culture, central location, and thriving international community make it an ideal base for scholars interested in European policy and cross-cultural exchange.',
    highlights: ['Most Innovative University in Europe', 'EU & NATO Headquarters', 'Biomedical Sciences Leader'],
  },
  '724': {
    description: 'Spain combines Mediterranean warmth with academic rigor. IE Business School in Madrid is one of the world\'s top MBA destinations, while the University of Barcelona excels in arts, sciences, and medicine. Spain\'s vibrant culture, affordable cost of living, and growing startup ecosystem — particularly in Barcelona and Madrid — make it an increasingly popular choice for international scholars seeking both academic excellence and quality of life.',
    highlights: ['Top MBA Destination', 'Growing Startup Ecosystem', 'Mediterranean Quality of Life'],
  },
  '752': {
    description: 'Sweden is a global leader in innovation, sustainability, and social progress. The Karolinska Institute in Stockholm is one of the world\'s foremost medical universities, responsible for selecting the Nobel Prize in Physiology or Medicine. Swedish universities emphasize collaborative learning, critical thinking, and a flat academic hierarchy that encourages open dialogue between students and professors.',
    highlights: ['Nobel Prize Selection Institution', 'Innovation & Sustainability Leader', 'Collaborative Learning Culture'],
  },
  '208': {
    description: 'Denmark consistently ranks among the happiest and most livable countries on Earth. The University of Copenhagen, founded in 1479, is Scandinavia\'s oldest and largest university, with particular strengths in health sciences, natural sciences, and humanities. Denmark\'s emphasis on work-life balance, design thinking, and green innovation creates a unique environment for scholars who value both intellectual rigor and personal wellbeing.',
    highlights: ['Happiest Country on Earth', 'Scandinavia\'s Oldest University', 'Green Innovation Pioneer'],
  },
  '040': {
    description: 'Austria\'s intellectual heritage spans from Mozart and Freud to the Vienna Circle that revolutionized philosophy and science. The University of Vienna, founded in 1365, is one of the oldest and largest universities in the German-speaking world. Vienna itself has been voted the world\'s most livable city multiple times. Austria\'s central European location makes it a gateway to both Western and Eastern European academic networks.',
    highlights: ['World\'s Most Livable City', 'Rich Intellectual Heritage', 'Gateway to Central Europe'],
  },
}

const _ko: Record<string, EUCountryI18n> = {
  '250': {
    description: '프랑스는 유럽 대륙의 지적 중심지입니다. 파리에만 그랑제콜에서 유서 깊은 소르본까지 세계적 수준의 기관이 십수 곳에 달합니다. 프랑스 고등 교육은 엄격한 학문 이론과 예술·철학·문명적 삶의 즐거움을 독특하게 결합합니다. INSEAD, HEC Paris, Sciences Po는 경영학과 정치학 교육의 세계적 기둥으로 인정받습니다.',
    highlights: ['그랑제콜의 본거지', '글로벌 경영 교육 허브', '예술·철학·문화 수도'],
  },
  '276': {
    description: '독일은 유럽 최대 경제 대국이자 공학·자동차 혁신·과학 연구의 강국입니다. 국제 학생에게도 무료 등록금을 적용하는 대학이 많으며, 산업계와 긴밀히 연결된 실무 교육과 이론적 깊이를 결합합니다. 뮌헨 공대, 하이델베르크 대학, 베를린 훔볼트 대학은 수 세기 학문 전통과 함께 AI·양자 컴퓨팅·지속가능 에너지의 최첨단 연구를 대표합니다.',
    highlights: ['무료 등록금 교육', '공학·자동차 우수성', 'AI·양자 연구 선도'],
  },
  '756': {
    description: '스위스는 글로벌 고등 교육에서 규모 대비 압도적 위상을 자랑합니다. ETH 취리히는 과학·기술 분야에서 세계 5위권에 꾸준히 이름을 올리며, 로잔의 EPFL은 유럽 혁신의 등대입니다. 다국어 문화, 정치적 중립성, 뛰어난 삶의 질은 집중적인 학문 작업에 이상적인 환경을 만듭니다. 주요 국제기구가 위치해 독특한 네트워킹 기회도 제공합니다.',
    highlights: ['ETH 취리히 — 세계 5위권', '다국어 문화', '국제기구 허브'],
  },
  '380': {
    description: '이탈리아는 서구 문명의 지적 전통이 태어난 곳입니다. 1088년 설립된 볼로냐 대학은 세계에서 가장 오래된 대학입니다. 오늘날 이탈리아는 디자인·패션·건축·경영 교육에서 두각을 나타냅니다. 밀라노의 보코니 대학은 유럽 최고의 경영대학원 중 하나이며, 폴리테크니코 디 밀라노는 공학·디자인 분야를 선도합니다. 이탈리아에서 공부한다는 것은 예술·역사·미식의 살아 있는 박물관에 몰입하는 일입니다.',
    highlights: ['세계 최고(古) 대학', '디자인·패션 수도', '경영 교육 우수성'],
  },
  '528': {
    description: '네덜란드는 유럽에서 가장 국제적인 학문적 거점 중 하나입니다. 거의 모든 석사 과정이 영어로 진행되며, 네덜란드 대학들은 세계 최고 수준에 꾸준히 이름을 올립니다. 암스테르담 대학과 TU Delft는 각자의 분야에서 세계를 선도합니다. 자전거 문화, 개방적인 사회, 유럽 중앙의 위치는 국제 학자들에게 특별히 우호적인 환경을 제공합니다.',
    highlights: ['영어 강의 프로그램', '세계 선도 연구', '가장 국제적인 학생 구성'],
  },
  '056': {
    description: '벨기에는 유럽의 교차로에 위치하며 NATO와 EU 본부를 모두 두고 있습니다. KU Leuven은 유럽에서 가장 혁신적인 대학으로 꾸준히 평가받으며, 생의학·공학·신학 분야에서 강점을 보입니다. 이중 언어 문화, 중심부 위치, 활발한 국제 커뮤니티는 유럽 정책과 다문화 교류에 관심 있는 학자들에게 이상적인 거점이 됩니다.',
    highlights: ['유럽 최고 혁신 대학', 'EU·NATO 본부 소재', '생의학 분야 선도'],
  },
  '724': {
    description: '스페인은 지중해의 따뜻함과 학문적 엄격함을 결합합니다. 마드리드의 IE Business School은 세계 최고의 MBA 목적지 중 하나이며, 바르셀로나 대학은 예술·과학·의학 분야에서 두각을 나타냅니다. 활기찬 문화, 합리적인 생활비, 빠르게 성장하는 스타트업 생태계 — 특히 바르셀로나와 마드리드 — 는 학문적 우수성과 삶의 질을 함께 추구하는 국제 학자들에게 점점 매력적인 선택이 되고 있습니다.',
    highlights: ['최상위 MBA 목적지', '성장하는 스타트업 생태계', '지중해의 삶의 질'],
  },
  '752': {
    description: '스웨덴은 혁신·지속가능성·사회적 진보의 글로벌 리더입니다. 스톡홀름의 카롤린스카 연구소는 세계 최고의 의과대학 중 하나로, 노벨 생리·의학상 선정을 담당합니다. 스웨덴 대학은 협력 학습, 비판적 사고, 그리고 학생과 교수 사이의 열린 대화를 장려하는 평평한 학문적 위계를 강조합니다.',
    highlights: ['노벨상 선정 기관', '혁신·지속가능성 리더', '협력 학습 문화'],
  },
  '208': {
    description: '덴마크는 지구상에서 가장 행복하고 살기 좋은 나라로 꾸준히 꼽힙니다. 1479년 설립된 코펜하겐 대학은 스칸디나비아에서 가장 오래되고 큰 대학으로, 보건과학·자연과학·인문학에서 강점을 보입니다. 일과 삶의 균형, 디자인 사고, 친환경 혁신을 중시하는 덴마크는 학문적 엄격함과 개인의 안녕을 모두 중요하게 여기는 학자들에게 독특한 환경을 제공합니다.',
    highlights: ['세계에서 가장 행복한 나라', '스칸디나비아 최고(古) 대학', '친환경 혁신 선도'],
  },
  '040': {
    description: '오스트리아의 지적 유산은 모차르트와 프로이트에서부터 철학과 과학을 혁신한 빈학파까지 이어집니다. 1365년 설립된 빈 대학은 독일어권에서 가장 오래되고 큰 대학 중 하나입니다. 빈 자체가 세계에서 가장 살기 좋은 도시로 여러 차례 선정되었습니다. 중부 유럽이라는 위치는 서·동유럽 학문 네트워크 모두를 아우르는 관문이 됩니다.',
    highlights: ['세계 최고의 살기 좋은 도시', '풍부한 지적 유산', '중부 유럽의 관문'],
  },
}

const _fallback_en: EUCountryI18n = {
  description: 'This country is home to distinguished universities contributing to Europe\'s rich academic tradition.',
  highlights: ['Distinguished Academic Programs', 'European Academic Tradition'],
}

const _fallback_ko: EUCountryI18n = {
  description: '이 국가는 유럽의 풍부한 학문 전통에 기여하는 명문 대학들을 보유하고 있습니다.',
  highlights: ['우수한 학문 프로그램', '유럽의 학문 전통'],
}

export const euCountriesTranslations = {
  en: { euCountries: _en, euCountryFallback: _fallback_en },
  ko: { euCountries: _ko, euCountryFallback: _fallback_ko },
} as const
