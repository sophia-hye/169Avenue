interface UKNationI18n {
  description: string
  highlights: readonly string[]
}

const _en: Record<string, UKNationI18n> = {
  england: {
    description: "England is the intellectual heart of the United Kingdom, home to Oxford and Cambridge — the world's oldest and most prestigious universities. From the spires of Oxford to the punting canals of Cambridge, England's academic tradition spans eight centuries. London, as a global financial and cultural capital, hosts Imperial, UCL, LSE, and King's College, offering unparalleled access to industry, finance, and the arts.",
    highlights: ['Oxford & Cambridge Tradition', 'London Global Hub', 'Russell Group Excellence'],
  },
  scotland: {
    description: "Scotland combines centuries of intellectual tradition with breathtaking natural landscapes. The University of Edinburgh, founded in 1583, is one of the world's great research universities. St Andrews, the oldest university in Scotland, has shaped generations of leaders. Glasgow's dynamic university scene is embedded in a city renowned for its architecture, culture, and reinvention as a creative and tech hub.",
    highlights: ['Ancient Academic Tradition', 'World-Class Research', 'Stunning Natural Landscape'],
  },
  wales: {
    description: "Wales offers a distinctive academic experience in a country of extraordinary natural beauty, rich cultural heritage, and a language that traces back over a thousand years. Cardiff, the vibrant capital, is home to Cardiff University, a leading Russell Group institution. The country's commitment to bilingual education and its unique cultural identity make Welsh universities a compelling choice for students seeking both academic rigour and a sense of place.",
    highlights: ['Unique Cultural Heritage', 'Russell Group Institution', 'Outstanding Natural Beauty'],
  },
  ni: {
    description: "Northern Ireland is an emerging destination for higher education, offering world-class universities at a fraction of the cost of other UK cities. Queen's University Belfast, a member of the Russell Group, has produced Nobel laureates and world-class researchers. Belfast's remarkable transformation from industrial city to creative and tech hub provides students with a dynamic environment for study and career development.",
    highlights: ['Russell Group Quality', 'Emerging Tech Scene', 'Affordable Excellence'],
  },
}

const _ko: Record<string, UKNationI18n> = {
  england: {
    description: '잉글랜드는 영국의 지적 중심지이며, 세계에서 가장 오래되고 명망 있는 대학인 옥스퍼드와 케임브리지의 본거지입니다. 옥스퍼드의 첨탑부터 케임브리지의 평평한 강 위 보트까지, 잉글랜드의 학문 전통은 8세기에 걸쳐 이어집니다. 글로벌 금융·문화 수도인 런던은 임페리얼, UCL, LSE, 킹스 칼리지를 품으며 산업·금융·예술계에 비할 데 없는 접근성을 제공합니다.',
    highlights: ['옥스퍼드·케임브리지 전통', '런던 글로벌 허브', '러셀 그룹 우수성'],
  },
  scotland: {
    description: '스코틀랜드는 수 세기에 걸친 지적 전통과 숨막히는 자연 경관을 결합합니다. 1583년 설립된 에든버러 대학은 세계 최고의 연구 중심 대학 중 하나입니다. 스코틀랜드 최고(古)인 세인트앤드루스는 여러 세대의 리더를 길러왔습니다. 글래스고의 역동적 대학 문화는 건축·문화 그리고 창의·기술 허브로 재탄생한 도시 안에 자리잡고 있습니다.',
    highlights: ['오랜 학문 전통', '세계 수준의 연구', '경이로운 자연 경관'],
  },
  wales: {
    description: '웨일스는 천 년이 넘는 역사를 가진 언어와 풍부한 문화 유산, 비범한 자연 미를 지닌 나라에서 차별화된 학문 경험을 제공합니다. 활기찬 수도 카디프에는 러셀 그룹 명문인 카디프 대학이 자리합니다. 이중 언어 교육에 대한 헌신과 독특한 문화 정체성은 학문적 엄격함과 장소의 정취를 함께 추구하는 학생들에게 매력적인 선택이 됩니다.',
    highlights: ['독특한 문화 유산', '러셀 그룹 대학', '뛰어난 자연 미'],
  },
  ni: {
    description: '북아일랜드는 다른 영국 도시의 일부 비용만으로 세계 수준의 대학을 만날 수 있는 신흥 학문 거점입니다. 러셀 그룹 회원교인 퀸스 대학 벨파스트는 노벨상 수상자와 세계적 연구자를 배출했습니다. 산업 도시에서 창의·기술 허브로 탈바꿈한 벨파스트의 변화는 학생들에게 학업과 진로 개발에 역동적인 환경을 제공합니다.',
    highlights: ['러셀 그룹 수준', '신흥 기술 씬', '합리적인 비용의 우수성'],
  },
}

export const ukRegionsTranslations = {
  en: { ukRegions: _en },
  ko: { ukRegions: _ko },
} as const
