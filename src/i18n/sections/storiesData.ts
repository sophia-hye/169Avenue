interface StoryI18n {
  classYear: string
  quote: string
  description: string
  fullNarrative: string
}

const _en: Record<string, StoryI18n> = {
  'julian-thorne': {
    classYear: 'Class of 2028',
    quote: '"In the silence of the library, I found my own voice, not just the echoes of the masters."',
    description: 'Julian\'s journey wasn\'t about perfect scores, but about his inquiry into the intersections of classical philosophy and modern ethics.',
    fullNarrative: 'Julian\'s journey wasn\'t about perfect scores, but about his inquiry into the intersections of classical philosophy and modern ethics. We helped him weave a narrative that proved to Harvard that he wasn\'t just a student, but a contributor to the global discourse.\n\nGrowing up in a small coastal town, Julian found solace in the works of Aristotle and Kant. But it was his volunteer work at a local refugee center that transformed his academic interest into a lived philosophy. He began to see ethics not as abstract theory, but as the framework through which communities navigate their most pressing challenges.\n\nOur team worked with Julian to articulate this unique intersection. Rather than presenting a conventional application focused on grades and test scores, we helped him craft a narrative that wove together his philosophical inquiry with his community engagement. The result was an application that Harvard\'s admissions committee described as "refreshingly authentic."\n\nToday, Julian is pursuing a joint concentration in Philosophy and Government, and has already published his first paper on ethical frameworks for refugee policy in the Harvard Political Review.',
  },
  'eleanor-vance': {
    classYear: 'Class of 2027',
    quote: '"Language is not just communication — it is the architecture of thought itself."',
    description: 'Redefining the boundaries of theoretical linguistics through a focus on endangered dialects in the digital age.',
    fullNarrative: 'Eleanor\'s fascination with language began when her grandmother, a native speaker of a dying Welsh dialect, passed away. The realization that an entire way of thinking could vanish with a single generation sparked a mission that would define her academic trajectory.\n\nAt 16, Eleanor had already documented three endangered dialects in rural Wales using a methodology she developed herself — combining traditional linguistic fieldwork with machine learning pattern recognition. Her approach caught the attention of several leading sociolinguists.\n\nOur role was to help Eleanor position her work not merely as academic research, but as a form of cultural preservation with implications for cognitive science, AI development, and human rights. We guided her in presenting her narrative to Oxford\'s Faculty of Linguistics, emphasizing how her interdisciplinary approach aligned with the university\'s commitment to bridging traditional scholarship with modern technology.\n\nEleanor is now reading Linguistics and Philology at Magdalen College, where she has secured funding for a digital archive of endangered Celtic languages.',
  },
  'mateo-rossi': {
    classYear: 'Class of 2026',
    quote: '"Every machine I build is a conversation between human intention and physical law."',
    description: 'How a childhood fascination with mechanism transformed into a breakthrough approach to sustainable robotics.',
    fullNarrative: 'Mateo grew up in his father\'s watch repair shop in Milan, where he learned that every mechanism tells a story of intention and precision. By age 14, he had built his first autonomous robot from recycled watch parts — a small device that could sort recyclable materials.\n\nWhat set Mateo apart was not just his technical skill, but his philosophical approach to engineering. He saw robotics not as a field of pure technology, but as a discipline that must answer to environmental and ethical imperatives. His project "Horologia Verde" — robots designed with planned obsolescence in reverse — won Italy\'s Young Innovator Prize.\n\nWe helped Mateo craft an application that positioned him at the intersection of Stanford\'s world-class engineering program and its sustainability initiatives. His essay connected the patience of horology to the urgency of climate action, creating a narrative that was both deeply personal and globally relevant.\n\nAt Stanford, Mateo is already collaborating with the Sustainability Lab, developing biodegradable robotic components that decompose into nutrient-rich material after their operational life.',
  },
  'clara-chen': {
    classYear: 'Class of 2027',
    quote: '"Memory is not nostalgia — it is the raw material of identity."',
    description: 'A literary exploration of diaspora identity that bridged the gap between personal memory and academic rigor.',
    fullNarrative: 'Clara Chen grew up between two worlds: the bustling streets of Taipei, where she spent summers with her grandparents, and the quiet suburbs of Connecticut, where she attended school. This duality was not a source of confusion but of creative power.\n\nBy her junior year of high school, Clara had completed a collection of short stories that explored the immigrant experience through the lens of food, language, and silence. Her writing was featured in three national literary journals — an unusual achievement for a high school student.\n\nOur approach with Clara was to position her not merely as a talented writer, but as a scholar of diaspora studies who used fiction as her primary research methodology. We helped her articulate how her creative work was, in fact, a rigorous exploration of cultural theory, drawing connections to the works of Maxine Hong Kingston and Homi Bhabha.\n\nYale\'s English department was particularly moved by Clara\'s supplementary essay, which analyzed her own fiction through the framework of postcolonial theory. She is now pursuing a double major in English and East Asian Studies, and her debut novel is already under consideration by a major publisher.',
  },
  'siddharth-mehta': {
    classYear: 'Class of 2027',
    quote: '"Finance without conscience is just arithmetic. I wanted to make it poetry."',
    description: 'Synthesizing social impact metrics with traditional venture capital frameworks for a new era of finance.',
    fullNarrative: 'Siddharth Mehta\'s awakening came at age 15, when he visited his family\'s ancestral village in Rajasthan. Despite decades of charitable donations from the diaspora community, the village lacked basic infrastructure. The disconnect between capital flow and actual impact haunted him.\n\nRather than accepting the status quo, Siddharth began developing a quantitative framework for measuring the true social return on investment. His model, which he called "Impact Yield," integrated traditional financial metrics with social indicators drawn from development economics. By his senior year, a local microfinance institution had adopted his framework.\n\nOur team recognized that Siddharth\'s story was not about rejecting finance — it was about reimagining it. We positioned his application to Wharton around the idea of "conscious capital," connecting his technical sophistication with his deep personal motivation.\n\nAt Wharton, Siddharth has already launched a student fund that uses his Impact Yield methodology to evaluate investments, and he was invited to present his framework at the World Economic Forum\'s Young Leaders Summit.',
  },
  'alexandros-kyros': {
    classYear: 'Class of 2028',
    quote: '"Bach wrote the original algorithms. I just translated them into Python."',
    description: 'Applying the mathematical principles of music theory to optimize complex data infrastructure.',
    fullNarrative: 'Alexandros Kyros is a concert-level pianist and a self-taught programmer — a combination that might seem unusual until you hear him explain how a Bach fugue is essentially a masterclass in parallel processing.\n\nGrowing up in Athens, Alexandros trained at the conservatory while simultaneously competing in international mathematics olympiads. But it was during a performance of Debussy\'s "La Mer" that he had his breakthrough insight: the way orchestral voices interact is structurally identical to how distributed computing systems manage data flow.\n\nHe developed an algorithm inspired by contrapuntal music theory that improved data processing efficiency by 23% in benchmark tests. The paper he co-authored with his computer science teacher was accepted at a regional IEEE conference.\n\nOur challenge was to present Alexandros not as a prodigy in two fields, but as a singular thinker who had found a genuine bridge between them. We helped him craft a narrative that MIT\'s admissions team described as "the most original intellectual framework we\'ve seen this cycle."\n\nAlexandros is now in MIT\'s Computer Science and Engineering program, where he continues to develop music-inspired algorithms for quantum computing applications.',
  },
  'sofia-dubois': {
    classYear: 'Class of 2026',
    quote: '"Cities are living organisms. Urban planning is their medicine."',
    description: 'A comparative study of urban planning and its psychological impact on diverse metropolitan communities.',
    fullNarrative: 'Sofia Dubois spent her childhood moving between Paris, Lagos, and Sao Paulo as the daughter of a French diplomat. Each city taught her a different lesson about how urban spaces shape human behavior, community bonds, and mental health.\n\nIn Lagos, she observed how informal market spaces created stronger social networks than any planned community center. In Sao Paulo, she studied the psychological impact of gated communities on both residents and those excluded. In Paris, she questioned why the grand boulevards that tourists admire were originally designed as instruments of state control.\n\nBy age 17, Sofia had completed a comparative study of public space design across three continents, incorporating methodologies from urban planning, psychology, and anthropology. Her work was cited by a UN-Habitat report on inclusive urban development.\n\nWe helped Sofia present her application to Columbia as a story of intellectual synthesis — someone who could bring together the university\'s strengths in urban studies, psychology, and international affairs. Her interdisciplinary approach resonated deeply with Columbia\'s commitment to global scholarship.\n\nSofia is now studying Urban Studies with a concentration in Environmental Psychology, and she has already secured an internship with the city of New York\'s planning department.',
  },
}

const _ko: Record<string, StoryI18n> = {
  'julian-thorne': {
    classYear: '2028년 입학',
    quote: '"도서관의 침묵 속에서, 거장들의 메아리가 아닌 나만의 목소리를 찾았습니다."',
    description: '줄리언의 여정은 완벽한 성적이 아니라, 고전 철학과 현대 윤리의 교차점을 탐구한 이야기였습니다.',
    fullNarrative: '줄리언의 여정은 완벽한 성적이 아니라, 고전 철학과 현대 윤리의 교차점을 탐구한 이야기였습니다. 우리는 하버드에 단순한 학생이 아닌 글로벌 담론의 기여자임을 증명하는 서사를 함께 엮어냈습니다.\n\n작은 해안 마을에서 자란 줄리언은 아리스토텔레스와 칸트의 저작에서 위안을 얻었습니다. 그러나 그의 학문적 관심을 살아 있는 철학으로 바꾼 것은 지역 난민 센터에서의 봉사 활동이었습니다. 그는 윤리를 추상적 이론이 아니라, 공동체가 가장 절박한 도전을 헤쳐나가는 틀로 보기 시작했습니다.\n\n우리 팀은 줄리언과 함께 이 독특한 교차점을 명확히 표현했습니다. 성적과 시험 점수에 초점을 맞춘 전형적인 지원서가 아니라, 철학적 탐구와 공동체 참여를 엮어낸 서사를 만들었습니다. 그 결과물은 하버드 입학사정관들에게 "신선할 정도로 진솔하다"는 평가를 받았습니다.\n\n오늘날 줄리언은 철학과 정치학 복수 전공을 이수 중이며, 난민 정책의 윤리적 틀에 관한 첫 논문을 하버드 폴리티컬 리뷰에 게재했습니다.',
  },
  'eleanor-vance': {
    classYear: '2027년 입학',
    quote: '"언어는 단순한 의사소통이 아니라, 사고 그 자체의 건축물입니다."',
    description: '디지털 시대의 멸종 위기 방언에 주목하며 이론 언어학의 경계를 재정의한 이야기.',
    fullNarrative: '엘리너의 언어에 대한 매혹은 죽어가는 웨일스 방언의 마지막 화자였던 할머니가 돌아가셨을 때 시작되었습니다. 한 세대와 함께 사고방식 전체가 사라질 수 있다는 깨달음은 그녀의 학문적 궤적을 정의할 사명을 일깨웠습니다.\n\n16세에 엘리너는 이미 시골 웨일스의 멸종 위기 방언 세 가지를 직접 개발한 방법론으로 기록했습니다. 전통적인 언어학 현장 조사와 머신러닝 패턴 인식을 결합한 그녀의 접근법은 여러 저명 사회언어학자들의 관심을 끌었습니다.\n\n우리의 역할은 엘리너의 작업을 단순한 학문 연구가 아니라 인지 과학·AI 개발·인권에 함의를 갖는 문화 보존의 한 형태로 자리매김시키는 것이었습니다. 옥스퍼드 언어학부에 그녀의 학제적 접근이 전통 학문과 현대 기술을 잇는 대학의 사명에 부합함을 보여주는 서사를 제시했습니다.\n\n엘리너는 현재 막달렌 칼리지에서 언어학·문헌학을 공부하며, 멸종 위기 켈트 언어를 위한 디지털 아카이브 사업에 펀딩을 확보했습니다.',
  },
  'mateo-rossi': {
    classYear: '2026년 입학',
    quote: '"내가 만드는 모든 기계는 인간의 의도와 물리 법칙 사이의 대화입니다."',
    description: '기계에 대한 어린 시절의 매혹이 지속가능한 로봇공학의 돌파구로 이어진 이야기.',
    fullNarrative: '마테오는 밀라노에 있는 아버지의 시계 수리점에서 자랐고, 모든 기계가 의도와 정밀함의 이야기를 담고 있다는 것을 배웠습니다. 14세에 그는 재활용 시계 부품으로 첫 자율 로봇을 만들었습니다 — 재활용 가능 자재를 분류하는 작은 장치였습니다.\n\n마테오를 특별하게 만든 것은 기술적 능력만이 아니라 공학에 대한 철학적 접근이었습니다. 그는 로봇공학을 순수 기술 분야가 아니라, 환경과 윤리적 명령에 답해야 하는 학문으로 보았습니다. "Horologia Verde" — 계획적 노후화를 역으로 설계한 로봇 — 프로젝트로 이탈리아 영 이노베이터 상을 수상했습니다.\n\n우리는 스탠퍼드의 세계적 공학 프로그램과 지속가능성 이니셔티브의 교차점에 그를 자리매김시키는 지원서를 만들었습니다. 그의 에세이는 시계 제작의 인내심과 기후 행동의 시급함을 연결하며, 깊이 개인적이면서도 세계적으로 유의미한 서사를 만들어냈습니다.\n\n스탠퍼드에서 마테오는 이미 지속가능성 연구실과 협력해, 운영 수명 이후 영양 풍부한 물질로 분해되는 생분해성 로봇 부품을 개발하고 있습니다.',
  },
  'clara-chen': {
    classYear: '2027년 입학',
    quote: '"기억은 향수가 아니라 — 정체성의 원재료입니다."',
    description: '개인의 기억과 학문적 엄격함 사이의 간극을 잇는, 디아스포라 정체성에 대한 문학적 탐구.',
    fullNarrative: '클라라 첸은 두 세계를 오가며 자랐습니다 — 조부모와 함께 여름을 보낸 분주한 타이베이의 거리, 그리고 학교를 다닌 코네티컷의 조용한 교외. 이 이중성은 혼란이 아니라 창조적 힘의 원천이었습니다.\n\n고등학교 3학년 때 클라라는 음식·언어·침묵의 렌즈를 통해 이민자 경험을 탐구한 단편 소설집을 완성했습니다. 그녀의 글은 세 개의 전국 문학 저널에 실렸는데, 고등학생으로서는 매우 드문 성취였습니다.\n\n클라라에 대한 우리의 접근은 단순히 재능 있는 작가가 아니라, 픽션을 주된 연구 방법론으로 사용하는 디아스포라 연구 학자로 자리매김시키는 것이었습니다. 그녀의 창작 작업이 사실은 문화 이론의 엄격한 탐구임을, 맥신 홍 킹스턴과 호미 바바의 저작과 연결지어 표현하도록 도왔습니다.\n\n예일 영문학부는 자신의 픽션을 탈식민 이론의 틀로 분석한 클라라의 보충 에세이에 특히 감동했습니다. 그녀는 현재 영문학·동아시아학 복수 전공 중이며, 데뷔 소설은 이미 주요 출판사의 검토를 받고 있습니다.',
  },
  'siddharth-mehta': {
    classYear: '2027년 입학',
    quote: '"양심 없는 금융은 단지 산수입니다. 저는 그것을 시(詩)로 만들고 싶었습니다."',
    description: '사회적 임팩트 지표와 전통 벤처 캐피털 프레임워크를 결합한 새로운 금융의 시대.',
    fullNarrative: '시다르스 메타의 각성은 15세에 라자스탄의 가족 본향 마을을 방문했을 때 찾아왔습니다. 디아스포라 커뮤니티의 수십 년에 걸친 자선 기부에도 불구하고, 마을은 기본 인프라조차 갖추지 못한 상태였습니다. 자본 흐름과 실제 임팩트의 단절이 그를 사로잡았습니다.\n\n현 상태를 받아들이는 대신, 시다르스는 진정한 사회적 투자 수익률을 측정하는 정량적 프레임워크를 개발하기 시작했습니다. 그가 "Impact Yield"라 명명한 모델은 전통적인 재무 지표와 개발 경제학에서 끌어온 사회 지표를 통합했습니다. 고등학교 졸업반 때, 지역의 마이크로파이낸스 기관이 그의 프레임워크를 채택했습니다.\n\n우리 팀은 시다르스의 이야기가 금융을 거부하는 것이 아니라 — 재상상하는 것임을 인식했습니다. 그의 와튼 지원서를 "양심 자본"이라는 아이디어를 중심으로 자리매김시켰고, 기술적 정교함과 깊은 개인적 동기를 연결했습니다.\n\n와튼에서 시다르스는 이미 자신의 Impact Yield 방법론으로 투자를 평가하는 학생 펀드를 출범시켰고, 세계경제포럼 영 리더스 서밋에 자신의 프레임워크를 발표하도록 초청받았습니다.',
  },
  'alexandros-kyros': {
    classYear: '2028년 입학',
    quote: '"바흐가 원조 알고리즘을 썼습니다. 저는 그저 그것을 파이썬으로 옮겼을 뿐입니다."',
    description: '음악 이론의 수학적 원리를 적용해 복잡한 데이터 인프라를 최적화한 이야기.',
    fullNarrative: '알렉산드로스 키로스는 콘서트 수준의 피아니스트이자 독학 프로그래머입니다 — 바흐의 푸가가 본질적으로 병렬 처리의 마스터클래스라는 그의 설명을 듣기 전까지는 어색해 보일 조합입니다.\n\n아테네에서 자란 알렉산드로스는 음악원에서 훈련받으면서 동시에 국제 수학 올림피아드에 출전했습니다. 그러나 그의 돌파구는 드뷔시의 "라 메르" 연주 도중 찾아왔습니다 — 오케스트라 성부들이 상호작용하는 방식이 분산 컴퓨팅 시스템이 데이터 흐름을 관리하는 방식과 구조적으로 동일하다는 통찰이었습니다.\n\n그는 대위법 음악 이론에서 영감을 받은 알고리즘을 개발해 벤치마크 테스트에서 데이터 처리 효율을 23% 개선했습니다. 컴퓨터 과학 교사와 공동 저술한 논문은 지역 IEEE 컨퍼런스에 채택되었습니다.\n\n우리의 과제는 알렉산드로스를 두 분야의 신동이 아니라, 두 분야 사이의 진정한 다리를 찾아낸 독자적 사고가로 제시하는 것이었습니다. MIT 입학사정팀이 "이번 사이클에서 본 가장 독창적인 지적 프레임워크"라고 평한 서사를 만들었습니다.\n\n알렉산드로스는 현재 MIT 컴퓨터 과학·공학 프로그램에 재학 중이며, 양자 컴퓨팅 응용을 위한 음악 영감 알고리즘을 계속 개발하고 있습니다.',
  },
  'sofia-dubois': {
    classYear: '2026년 입학',
    quote: '"도시는 살아 있는 유기체입니다. 도시 계획은 그것의 의학입니다."',
    description: '도시 계획과 다양한 대도시 커뮤니티의 심리적 영향에 대한 비교 연구.',
    fullNarrative: '소피아 뒤부아는 프랑스 외교관의 딸로 파리·라고스·상파울루를 오가며 어린 시절을 보냈습니다. 각 도시는 도시 공간이 인간 행동·공동체 유대·정신 건강을 어떻게 형성하는지에 대한 다른 교훈을 가르쳐주었습니다.\n\n라고스에서 그녀는 비공식 시장 공간이 어떤 계획된 커뮤니티 센터보다 더 강한 사회적 네트워크를 만들어내는 것을 관찰했습니다. 상파울루에서는 게이티드 커뮤니티가 거주자와 배제된 사람들 모두에게 미치는 심리적 영향을 연구했습니다. 파리에서는 관광객들이 감탄하는 거대 대로가 본래 국가 통제의 도구로 설계되었음을 의문시했습니다.\n\n17세에 소피아는 도시 계획·심리학·인류학의 방법론을 결합한 3대륙 공공 공간 디자인 비교 연구를 완성했습니다. 그녀의 작업은 포용적 도시 개발에 관한 UN-Habitat 보고서에 인용되었습니다.\n\n우리는 소피아의 컬럼비아 지원서를 지적 종합의 이야기로 제시하도록 도왔습니다 — 대학의 도시학·심리학·국제 관계 강점을 한데 모을 수 있는 사람으로요. 그녀의 학제적 접근은 컬럼비아의 글로벌 학문 사명과 깊이 공명했습니다.\n\n소피아는 현재 환경 심리학 집중 도시학을 공부하고 있으며, 뉴욕시 도시 계획과의 인턴십을 이미 확보했습니다.',
  },
}

export const storiesDataTranslations = {
  en: { storiesData: _en },
  ko: { storiesData: _ko },
} as const
