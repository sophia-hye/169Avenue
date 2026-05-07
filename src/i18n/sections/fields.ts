interface FieldI18n {
  name: string
  description: string
}

const _en: Record<string, FieldI18n> = {
  cs: {
    name: 'Computer Science',
    description: 'From artificial intelligence to cybersecurity, these institutions lead the digital revolution and shape the future of technology.',
  },
  business: {
    name: 'Business & MBA',
    description: 'The world\'s premier business schools that forge the next generation of global leaders, entrepreneurs, and financial innovators.',
  },
  engineering: {
    name: 'Engineering',
    description: 'Where theoretical breakthroughs meet real-world impact — these engineering powerhouses drive innovation across every industry.',
  },
  medicine: {
    name: 'Medicine & Health',
    description: 'The institutions at the forefront of medical research, clinical excellence, and the transformation of global healthcare.',
  },
  law: {
    name: 'Law',
    description: 'These law schools have produced prime ministers, Supreme Court justices, and the architects of international legal frameworks.',
  },
  arts: {
    name: 'Arts & Humanities',
    description: 'Where literature, philosophy, history, and the fine arts converge — these institutions nurture the deepest forms of human inquiry.',
  },
  'fine-arts': {
    name: 'Fine Arts & Design',
    description: 'The world\'s most prestigious art and design schools — where painters, sculptors, architects, and digital artists are shaped into visionaries who define visual culture.',
  },
  music: {
    name: 'Music & Performing Arts',
    description: 'The conservatories and academies that have produced the greatest composers, performers, and conductors — where musical genius is cultivated across every tradition.',
  },
  sports: {
    name: 'Sports Science & Kinesiology',
    description: 'Where athletic performance meets scientific rigor — these institutions lead in sports science, biomechanics, exercise physiology, and the training of elite athletes and coaches.',
  },
}

const _ko: Record<string, FieldI18n> = {
  cs: {
    name: '컴퓨터 과학',
    description: '인공지능부터 사이버보안까지, 이 대학들은 디지털 혁명을 이끌며 기술의 미래를 만들어갑니다.',
  },
  business: {
    name: '경영·MBA',
    description: '차세대 글로벌 리더, 기업가, 금융 혁신가를 길러내는 세계 최고의 경영 대학원들입니다.',
  },
  engineering: {
    name: '공학',
    description: '이론적 돌파구와 현실의 임팩트가 만나는 곳 — 모든 산업의 혁신을 이끄는 공학 강자들입니다.',
  },
  medicine: {
    name: '의학·보건',
    description: '의학 연구와 임상의 최전선에 서서 글로벌 헬스케어를 변화시키는 기관들입니다.',
  },
  law: {
    name: '법학',
    description: '총리, 대법관, 그리고 국제 법체계의 설계자들을 배출해 온 법학 대학들입니다.',
  },
  arts: {
    name: '인문·예술',
    description: '문학·철학·역사·예술이 만나는 곳 — 인간 탐구의 가장 깊은 형태를 길러내는 기관들입니다.',
  },
  'fine-arts': {
    name: '순수예술·디자인',
    description: '세계에서 가장 명망 있는 예술·디자인 학교들 — 시각 문화를 정의하는 화가, 조각가, 건축가, 디지털 아티스트를 길러냅니다.',
  },
  music: {
    name: '음악·공연예술',
    description: '역대 최고의 작곡가·연주자·지휘자를 배출해 온 음악원과 아카데미 — 모든 전통에 걸쳐 음악적 천재성을 길러내는 곳입니다.',
  },
  sports: {
    name: '스포츠 과학·운동학',
    description: '운동 수행 능력과 과학적 엄격함이 만나는 곳 — 스포츠 과학·생체역학·운동 생리학과 엘리트 선수·코치 양성을 선도합니다.',
  },
}

export const fieldsTranslations = {
  en: { fields: _en },
  ko: { fields: _ko },
} as const
