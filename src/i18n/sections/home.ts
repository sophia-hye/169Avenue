export const homeTranslations = {
  en: {
    // ─── Legacy / shared keys (kept for non-home components) ───
    hero_body: 'Curating academic journeys for the next generation of global leaders. We transform aspirations into heritage through bespoke admissions strategy.',
    hero_quote: '"Education is the most powerful weapon which you can use to change the world."',

    expertise_title: 'Refined\u00A0Methodology',
    expertise_body: 'Our approach is not a process; it is a curation. We look beyond the transcript to find the narrative that resonates with admissions committees.',
    expertise_download: 'Download Prospectus',
    expertise_items: [
      { title: 'Editorial Essay Mentoring', description: 'Crafting compelling personal narratives that highlight individual brilliance and intellectual curiosity.' },
      { title: 'Strategic Profile Building', description: 'Developing a 4-year roadmap of extracurricular and academic achievements designed for impact.' },
      { title: 'Interview Artistry', description: 'Mastering the art of communication to leave a lasting impression on elite university alumni.' },
      { title: 'Visa & Global Compliance', description: 'Seamless handling of complex international regulations for a stress-free transition.' },
    ],

    success_story_link: 'Success Stories',
    success_story_view_all: 'View All Stories',

    destinations_section_tag: 'The Global Reach',
    destinations_section_title: 'Curated Destinations',
    destinations_section_body: 'From the ivy-clad walls of New England to the historic cloisters of Oxford, we provide exclusive access to the world\'s most elite institutions.',
    destinations_items: [
      { title: 'United States', tag: 'Primary Hub', description: 'Elite Ivy League & STEM powerhouse research programs.' },
      { title: 'United Kingdom', tag: 'Heritage Focus', description: 'Oxbridge and the Russell Group excellence.' },
      { title: 'Europe', tag: 'Modern Classics', description: 'Business, Art, and Design leadership in Paris & Berlin.' },
      { title: 'Asia-Pacific', tag: 'Emerging Frontiers', description: 'The new standard for global innovation hubs in Singapore & Seoul.' },
    ],

    // ─── Homepage sections (editorial) ───

    // 1. Hero
    hero_eyebrow: 'Premium Pathway Design for Students',
    hero_h1_1: 'We don\'t run camps.',
    hero_h1_2: 'We build pathways.',
    hero_subheadline: '169Avenue is not another study-abroad agency or experience camp.',
    hero_description: 'We analyze each student\'s potential and design a direction that connects to real growth and admissions — a premium pathway service.',
    hero_cta1: 'Request Pre-Diagnosis',
    hero_cta2: 'View Programs',

    // 2. Audience Split
    target_split_title: 'Where is your child right now?',
    target_split: [
      {
        tier: 'Discovery Program',
        age: 'Lower Elementary',
        description: 'A talent-discovery program for students just starting out. Short, dense sessions reveal each child\'s interests and potential.',
        bullets: ['Low-commitment short sessions', 'Talent discovery focused', 'Initial direction feedback'],
        href: '/services',
        cta: 'Discovery Details',
        accent: 'bg-amber-100/70 text-amber-900',
        dot: 'bg-amber-500',
      },
      {
        tier: 'Decision Program',
        age: 'Middle School',
        description: 'A program for students at the decision point for admissions and career direction. Deep mentoring and evaluation design the next strategy.',
        bullets: ['Single or Dual Track', 'Comparative analysis report', 'Connects to strategy consulting'],
        href: '/services',
        cta: 'Decision Details',
        accent: 'bg-sky-100/70 text-sky-900',
        dot: 'bg-sky-600',
      },
    ],

    // 3. Problem
    problem_title: 'The problem isn\'t lack of experience — it\'s absence of direction.',
    problem_items: [
      '"Should we keep letting them do this?"',
      '"Is my child really suited for this path?"',
      '"If we don\'t set the direction right now, will it be too late?"',
    ],
    problem_conclusion: 'What matters more than another experience is deciding what to continue.',

    // 4. Solution
    solution_title: '169Avenue designs the experience and delivers the outcome.',
    solution_body: 'We don\'t just connect lessons or offer experiences. We observe what each student is truly capable of, and based on that, we recommend the next direction.',
    solution_subbody: '169Avenue is a premium pathway-design program built on Experience + Strategy + Outcomes.',
    solution_pillars: [
      {
        name: 'Experience',
        description: 'High-density, in-field sessions with top-tier mentors.',
        icon: 'bolt',
      },
      {
        name: 'Strategy',
        description: 'Direction designed around each student\'s temperament and potential.',
        icon: 'insights',
      },
      {
        name: 'Outcomes',
        description: 'Reports, strategy consultations, and next-step program linkage.',
        icon: 'flag',
      },
    ],

    // 5. Process
    process_title: 'How It Works',
    process_subtitle: 'Every program runs in four sessions.',
    process_steps: [
      { step: '01', label: 'Pre Session',      title: 'Pre Session',      description: 'We identify the student\'s and parents\' concerns, current state, and goals. Not a simple consultation — a customized diagnostic phase.', icon: 'edit_note' },
      { step: '02', label: 'Core Session',     title: 'Core Session',     description: 'A high-density focused session in the chosen field. Not an experience — the core phase where the mentor directly observes and evaluates.',   icon: 'bolt' },
      { step: '03', label: 'Post Report',      title: 'Post Report',      description: 'After the session, we provide a comprehensive report summarizing strengths, limits, growth potential, and the most suitable direction.',    icon: 'insights' },
      { step: '04', label: 'Strategy Session', title: 'Strategy Session', description: 'Based on the report we explain the next direction and propose the next program or academic/athletic/artistic roadmap.',                  icon: 'route' },
    ],

    // 6. Programs Overview
    programs_title: 'Programs Designed Around Decision Points',
    programs: [
      {
        name: 'Discovery Program',
        description: 'An exploratory program for students just starting out. In a short window we observe interest, response, and potential.',
        meta: [
          { label: 'For',    value: 'Lower Elementary' },
          { label: 'Format', value: '1 – 1.5 hour sessions' },
          { label: 'Goal',   value: 'Talent Discovery' },
        ],
        href: '/services',
        cta: 'View Program',
        accent: 'amber',
      },
      {
        name: 'Decision Program',
        description: 'For students who need deeper evaluation for admissions and career. Focus on one field, or compare two to decide the direction.',
        meta: [
          { label: 'For',    value: 'Middle School' },
          { label: 'Format', value: 'Single / Dual Track' },
          { label: 'Goal',   value: 'Direction Decision' },
        ],
        href: '/services',
        cta: 'View Program',
        accent: 'sky',
      },
    ],

    // 7. Dual Track
    dual_track_badge: 'Signature',
    dual_track_title: 'Experience two options. Decide on one direction.',
    dual_track_body: 'When a student is torn between two fields, 169Avenue doesn\'t stop at letting them try each. With, for example, tennis and art, we draw on each field\'s mentoring and observation to compare which direction fits better and give a final recommendation.',
    dual_track_highlight: 'This isn\'t two experiences. It\'s one decision program.',
    dual_track_flow: [
      'Day 1: Tennis Core Session',
      'Day 2: Art Core Session',
      'Integrated Report',
      'Strategy Session',
    ],

    // 8. Mentors
    mentors_title: 'Top-Tier Mentors, Not Ordinary Instructors',
    mentors: [
      {
        emoji: '🎨',
        name: 'Art Mentor',
        headline: 'A Parsons-trained evaluative lens and portfolio insight.',
        body: 'More than teaching art — we approach the student\'s work from the evaluator\'s perspective: what to look for, and how to develop it.',
      },
      {
        emoji: '🎾',
        name: 'Tennis Mentor',
        headline: 'Elite coaching shaped by pro experience and real results.',
        body: 'More than technique instruction — we honestly assess the student\'s potential and competitiveness, coaching in a way that connects to the next step.',
      },
    ],
    mentors_tagline: 'We don\'t highlight average instructors. 169Avenue\'s mentors are experts with the standards and experience to judge a student\'s direction, not just teach a lesson.',

    // 9. Outcomes
    outcomes_title: 'This program doesn\'t end with an experience.',
    outcomes_items: [
      { step: '01', title: 'Comprehensive Analysis Report', description: 'Summarizes the student\'s strengths, response, potential, and most suitable direction.' },
      { step: '02', title: 'Direction Recommendation',      description: 'Recommends whether an arts/athletics path, an academic path, or a specific concentration is best.' },
      { step: '03', title: 'Next-Step Design',              description: 'Provides a concrete proposal for which flow — Direction / Academic / Elite Track — comes next.' },
    ],
    outcomes_body: 'What parents want isn\'t a "good experience" — it\'s the conviction of where their child should go next.',

    // 10. Next Path
    next_path_title: 'Once the direction is set, the next step begins.',
    next_path_cards: [
      { name: 'Direction Track', tagline: 'A growth track for students whose arts or athletic potential is confirmed.', body: 'Ongoing mentoring, portfolio, live feedback.' },
      { name: 'Academic Track',  tagline: 'A major- and activity-design track for academic-focused students.',        body: 'Major exploration, activity roadmap, academic direction.' },
      { name: 'Elite Track',     tagline: 'A long-term, top-tier custom program.',                                      body: 'Senior mentoring, long-term strategy, premium management.' },
    ],
    next_path_body: 'The first session is not the end — it\'s the beginning. 169Avenue designs the most suitable next path together with the student, based on the outcome.',

    // 11. CTA
    cta_title: 'What you need now is not more experiences — it\'s a more precise direction.',
    cta_body: 'Don\'t judge your child\'s potential on a hunch. Through top-tier mentor observation and analysis, confirm the next step that matters most right now.',
    cta_btn_primary: 'Request Pre-Diagnosis',
    cta_btn_secondary: 'Book Consultation',

    // Legacy final_cta_* keys (kept to avoid breaking other pages if referenced)
    final_cta_title: 'What you need now is not more experiences — it\'s a more precise direction.',
    final_cta_body: '',
    final_cta1: 'Request Pre-Diagnosis',
    final_cta2: 'Book Consultation',

    // Shared mini CTAs (used by MiniCTA + page-level injections)
    mini_cta_default: 'Not sure if your profile qualifies? Get a free diagnosis.',
    mini_cta_default_btn: 'Free Diagnosis',
    mini_cta_case: 'Want to see how your case would be analyzed?',
    mini_cta_case_btn: 'Request Case Analysis',
    mini_cta_region: 'Need a strategy for universities in this region?',

    // ─── Cases / FAQ / Trust (used by shared components outside homepage) ───
    case_tag: 'Real-World Strategy',
    case_title: 'Case Studies',
    case_sub: 'Anonymized examples of how we design admissions strategies for different student profiles.',
    case_cta: 'Get Your Strategy Designed',
    cases: [
      { tag: 'Foreign HS → Korean University', title: 'US High School, GPA 3.8 / AP Calculus, Economics', strategy: 'Targeted top-tier Korean business programs through 재외국민 특별전형. Positioned AP coursework as equivalent rigor, crafted bilingual personal statement emphasizing cross-cultural leadership experience.', result: 'Reach: Yonsei · Korea Univ. Business / Match: Sungkyunkwan SKKU / Safety: Hanyang · Chung-Ang' },
      { tag: 'International School → Korean University', title: 'Southeast Asia International School / No AP / Student Council', strategy: 'Designed application around leadership narrative and community impact. Compensated for lack of AP with IB predicted 36 points and curated extracurricular portfolio.', result: 'Reach: Sungkyunkwan SKKU / Match: Hanyang · Kyung Hee / Safety: Chung-Ang · Dongguk (+ TOPIK plan)' },
      { tag: 'Foreign University → Korean Transfer', title: 'US University Sophomore / 72 Credits / GPA 3.5', strategy: 'Credit transfer analysis revealed 85% transferability. Built transfer narrative around desire for specialized Korean research programs unavailable abroad.', result: 'Reach: Korea Univ. · Sogang / Match: Sungkyunkwan · Hanyang / Mapped 61 of 72 credits transferable' },
      { tag: 'International → Overseas University', title: 'Korean HS Student / TOEFL 112 / Science Olympiad Gold', strategy: 'Leveraged Olympiad achievement for STEM positioning at US/UK universities. Developed research narrative connecting Korean science education with global innovation goals.', result: 'Application strategy spanning MIT, Caltech, Imperial College, and ETH Zurich.' },
    ],

    faq_tag: 'Common Questions',
    faq_title: 'Frequently Asked Questions',
    faq_sub: 'Answers to the questions we hear most from students and parents navigating international-to-Korean admissions.',
    faqs: [
      { q: 'Can students from overseas high schools apply to Korean universities without a Korean student record (학생부)?', a: 'Yes. Most top Korean universities offer 재외국민 특별전형 (Special Admission for Overseas Koreans) or 외국인 전형 (International Student Admission) tracks that do not require a Korean 학생부.' },
      { q: 'Is it difficult to enter top Korean universities without IB or AP coursework?', a: 'Not necessarily. While IB/AP coursework can strengthen your application, Korean universities also recognize other international curricula.' },
      { q: 'What is the most important factor when transferring from a foreign university to a Korean university?', a: 'Credit transferability is the most critical factor. We conduct a detailed credit mapping analysis before you apply.' },
      { q: 'Can I prepare for both Korean and overseas university admissions simultaneously?', a: 'Yes, and this is one of our core specialties. We design parallel strategies that maximize your options.' },
      { q: 'What deliverables do I receive after a consultation?', a: 'Target university list (reach/match/safety tiers), curriculum gap analysis, personalized preparation timeline, and strategic positioning document.' },
      { q: 'How early should I start preparing?', a: 'Ideally 12-18 months before the application deadline. Starting early allows time for TOPIK preparation, document gathering, and strategic course selection.' },
    ],

    trust_tag: 'What You Get',
    trust_title: 'Transparent & Verifiable',
    trust_items: [
      { title: 'University Coverage', items: ['Korean SKY + top 15 universities', 'US Ivy League & Top 50', 'UK Russell Group & Oxbridge', 'EU/Asia-Pacific elite institutions'] },
      { title: 'Diagnostic Framework', items: ['IB/AP/A-Level/Korean curriculum analysis', 'GPA conversion & competitiveness scoring', 'Extracurricular impact assessment', 'Language proficiency positioning'] },
      { title: 'What You Receive After Consultation', items: ['Target university table: Reach / Match / Safety tiers', 'Major fit analysis with competitiveness scoring', 'Document strategy: essays, recommendations, portfolio', 'Preparation timeline with monthly milestones', 'Credit transfer mapping (for transfer applicants)'] },
    ],
    trust_compare_title: 'Why 169 Avenue',
    trust_compare_col1: 'Study Abroad Agency',
    trust_compare_col2: 'Admissions Consulting',
    trust_compare_rows: [
      { label: 'Basis', c1: 'Country', c2: 'GPA (내신)', c3: 'Academic Structure' },
      { label: 'Method', c1: 'Processing', c2: 'Guidance', c3: 'Strategy Design' },
      { label: 'Scope', c1: 'Overseas only', c2: 'Domestic only', c3: 'Integrated' },
    ],

    problem_strategy_link: 'See Our Strategy',
  },

  ko: {
    hero_body: '차세대 글로벌 리더를 위한 학업 여정을 큐레이팅합니다. 맞춤형 입학 전략으로 꿈을 유산으로 만들어 드립니다.',
    hero_quote: '"교육은 세상을 바꾸는 가장 강력한 무기다."',

    expertise_title: '정제된\u00A0방법론',
    expertise_body: '우리의 접근법은 단순한 프로세스가 아닌 큐레이션입니다. 성적표 너머에서 입학사정관의 마음을 움직이는 이야기를 찾아냅니다.',
    expertise_download: '브로셔 다운로드',
    expertise_items: [
      { title: '에세이 멘토링', description: '개인의 탁월함과 지적 호기심을 담아내는 설득력 있는 자기소개서를 작성합니다.' },
      { title: '전략적 프로필 구축', description: '입시에 실질적인 영향을 미치는 비교과 활동 및 학업 성취를 위한 4년 로드맵을 개발합니다.' },
      { title: '인터뷰 아트', description: '명문대 인터뷰에서 지속적인 인상을 남길 수 있는 커뮤니케이션 능력을 마스터합니다.' },
      { title: '비자 & 글로벌 컴플라이언스', description: '복잡한 국제 규정을 원활하게 처리하여 스트레스 없는 유학 준비를 지원합니다.' },
    ],

    success_story_link: '성공 사례',
    success_story_view_all: '모든 스토리 보기',

    destinations_section_tag: '글로벌 네트워크',
    destinations_section_title: '엄선된 유학지',
    destinations_section_body: '뉴잉글랜드의 아이비 담쟁이 담벼락부터 옥스퍼드의 역사적인 회랑까지, 세계 최고 명문 기관에 대한 독점적인 접근을 제공합니다.',
    destinations_items: [
      { title: '미국', tag: '주요 거점', description: '아이비리그 및 STEM 중심 연구 프로그램.' },
      { title: '영국', tag: '전통 명문', description: '옥스브리지와 러셀 그룹의 우수성.' },
      { title: '유럽', tag: '현대적 클래식', description: '파리와 베를린의 비즈니스·예술·디자인 리더십.' },
      { title: '아시아-태평양', tag: '신흥 허브', description: '싱가포르와 서울의 글로벌 혁신 허브 신기준.' },
    ],

    // 1. Hero
    hero_eyebrow: 'Premium Pathway Design for Students',
    hero_h1_1: 'We don\'t run camps.',
    hero_h1_2: 'We build pathways.',
    hero_subheadline: '169Avenue는 단순한 유학원이나 체험형 캠프가 아닙니다.',
    hero_description: '학생의 가능성을 분석하고, 실제 성장과 입시에 연결되는 방향을 설계하는 프리미엄 진로 설계 서비스입니다.',
    hero_cta1: '사전 진단 신청하기',
    hero_cta2: '프로그램 보기',

    // 2. Audience Split
    target_split_title: '우리 아이는 지금 어떤 단계에 있나요?',
    target_split: [
      {
        tier: 'Discovery Program',
        age: '초등 저학년',
        description: '처음 시작하는 아이를 위한 재능 탐색 프로그램. 짧고 밀도 있는 경험을 통해 아이의 흥미와 가능성을 발견합니다.',
        bullets: ['부담 없는 짧은 세션', '재능 탐색 중심', '초기 방향성 피드백 제공'],
        href: '/services',
        cta: 'Discovery 자세히 보기',
        accent: 'bg-amber-100/70 text-amber-900',
        dot: 'bg-amber-500',
      },
      {
        tier: 'Decision Program',
        age: '중학생',
        description: '입시와 진로의 방향을 결정해야 하는 시점의 학생을 위한 프로그램. 깊이 있는 멘토링과 평가를 통해 다음 단계의 전략을 설계합니다.',
        bullets: ['단일 또는 듀얼 트랙 가능', '비교 분석 리포트 제공', '전략 상담 연결'],
        href: '/services',
        cta: 'Decision 자세히 보기',
        accent: 'bg-sky-100/70 text-sky-900',
        dot: 'bg-sky-600',
      },
    ],

    // 3. Problem
    problem_title: '문제는 경험의 부족이 아니라, 방향의 부재입니다',
    problem_items: [
      '"이걸 계속 시켜도 될까?"',
      '"우리 아이가 정말 이 길에 맞는 걸까?"',
      '"지금 방향을 제대로 잡지 않으면 나중에 늦는 건 아닐까?"',
    ],
    problem_conclusion: '단순 체험보다 중요한 것은 무엇을 계속할지 결정하는 일입니다.',

    // 4. Solution
    solution_title: '169Avenue는 경험을 설계하고, 결과로 연결합니다',
    solution_body: '우리는 단순히 수업을 연결하거나 체험을 제공하지 않습니다. 학생이 실제로 어떤 가능성을 가지고 있는지 관찰하고, 그 결과를 바탕으로 다음 단계의 방향을 제안합니다.',
    solution_subbody: '169Avenue는 Experience + Strategy + Outcomes를 결합한 프리미엄 진로 설계 프로그램입니다.',
    solution_pillars: [
      {
        name: 'Experience',
        description: '최상위 멘토와의 밀도 높은 현장 경험',
        icon: 'bolt',
      },
      {
        name: 'Strategy',
        description: '학생의 성향과 잠재력에 맞춘 방향 설계',
        icon: 'insights',
      },
      {
        name: 'Outcomes',
        description: '리포트, 전략 상담, 다음 단계 프로그램 연결',
        icon: 'flag',
      },
    ],

    // 5. Process
    process_title: 'How It Works',
    process_subtitle: '모든 프로그램은 네 단계로 진행됩니다',
    process_steps: [
      { step: '01', label: 'Pre Session',      title: 'Pre Session',      description: '학생과 부모의 고민, 현재 상태, 목표를 파악합니다. 단순 상담이 아니라 맞춤형 설계를 위한 사전 진단 단계입니다.', icon: 'edit_note' },
      { step: '02', label: 'Core Session',     title: 'Core Session',     description: '선택한 분야에서 밀도 높은 집중 세션이 진행됩니다. 단순 체험이 아니라 멘토가 학생을 직접 관찰하고 평가하는 핵심 단계입니다.', icon: 'bolt' },
      { step: '03', label: 'Post Report',      title: 'Post Report',      description: '세션 이후 학생의 강점, 한계, 성장 가능성, 적합한 방향을 정리한 종합 분석 리포트를 제공합니다.', icon: 'insights' },
      { step: '04', label: 'Strategy Session', title: 'Strategy Session', description: '리포트를 바탕으로 앞으로의 방향을 설명하고, 다음 단계 프로그램 또는 학업·예체능 로드맵을 제안합니다.', icon: 'route' },
    ],

    // 6. Programs Overview
    programs_title: 'Programs Designed Around Decision Points',
    programs: [
      {
        name: 'Discovery Program',
        description: '처음 시작하는 아이를 위한 탐색형 프로그램. 짧은 시간 안에 흥미와 반응, 잠재력을 확인합니다.',
        meta: [
          { label: '대상', value: '초등 저학년' },
          { label: '구성', value: '1~1.5시간 중심' },
          { label: '목적', value: '재능 탐색' },
        ],
        href: '/services',
        cta: '프로그램 보기',
        accent: 'amber',
      },
      {
        name: 'Decision Program',
        description: '입시와 진로를 고려해 더 깊이 있는 판단이 필요한 학생을 위한 프로그램. 한 분야에 집중하거나, 두 분야를 비교하여 방향을 결정할 수 있습니다.',
        meta: [
          { label: '대상', value: '중학생' },
          { label: '구성', value: '단일 / 듀얼 트랙' },
          { label: '목적', value: '방향 결정' },
        ],
        href: '/services',
        cta: '프로그램 보기',
        accent: 'sky',
      },
    ],

    // 7. Dual Track
    dual_track_badge: 'Signature',
    dual_track_title: '두 가지 선택지를 경험하고, 하나의 방향을 결정합니다',
    dual_track_body: '학생이 두 분야 사이에서 고민하고 있다면, 169Avenue는 각각의 가능성을 따로 체험시키는 데서 끝나지 않습니다. 예를 들어 테니스와 미술을 함께 선택한 경우, 각 분야의 멘토링과 관찰을 바탕으로 어느 방향이 더 적합한지 비교 분석하고 최종 추천을 제시합니다.',
    dual_track_highlight: '이것은 두 개의 체험이 아니라, 하나의 결정 프로그램입니다.',
    dual_track_flow: [
      'Day 1: Tennis Core Session',
      'Day 2: Art Core Session',
      'Integrated Report',
      'Strategy Session',
    ],

    // 8. Mentors
    mentors_title: 'Top-Tier Mentors, Not Ordinary Instructors',
    mentors: [
      {
        emoji: '🎨',
        name: 'Art Mentor',
        headline: 'Parsons 기반의 평가 관점과 포트폴리오 인사이트',
        body: '단순히 미술을 가르치는 것이 아니라, 학생의 작업을 어떤 기준으로 보고 어떻게 발전시켜야 하는지 평가 관점에서 접근합니다.',
      },
      {
        emoji: '🎾',
        name: 'Tennis Mentor',
        headline: '프로 경험과 실전 결과를 가진 엘리트 코칭',
        body: '기술 지도에 그치지 않고, 학생의 잠재력과 경쟁력을 현실적으로 판단하고 다음 단계로 연결할 수 있는 코칭을 제공합니다.',
      },
    ],
    mentors_tagline: '우리는 평균적인 강사진을 내세우지 않습니다. 169Avenue의 멘토는 단순 수업을 넘어, 학생의 방향을 판단할 수 있는 기준과 경험을 갖춘 전문가입니다.',

    // 9. Outcomes
    outcomes_title: '이 프로그램은 경험으로 끝나지 않습니다',
    outcomes_items: [
      { step: '01', title: '종합 분석 리포트', description: '학생의 강점, 반응, 가능성, 적합한 방향을 정리합니다.' },
      { step: '02', title: '방향성 제안',       description: '예체능형, 학업형, 혹은 특정 분야 집중이 더 적합한지 제안합니다.' },
      { step: '03', title: '다음 단계 설계',     description: 'Direction / Academic / Elite Track 중 어떤 흐름으로 이어질지 구체적인 제안을 제공합니다.' },
    ],
    outcomes_body: '부모가 원하는 것은 "좋은 체험"이 아니라 "우리 아이가 어디로 가야 하는지에 대한 확신"입니다.',

    // 10. Next Path
    next_path_title: '방향이 정해지면, 다음 단계가 시작됩니다',
    next_path_cards: [
      { name: 'Direction Track', tagline: '예체능 가능성이 확인된 학생을 위한 성장 트랙', body: '지속 멘토링, 포트폴리오, 실전 피드백 중심' },
      { name: 'Academic Track',  tagline: '학업형 학생을 위한 전공·활동 설계 트랙',     body: '전공 탐색, 활동 로드맵, 학업 방향성 중심' },
      { name: 'Elite Track',     tagline: '최상위 맞춤형 장기 설계 프로그램',             body: '고급 멘토링, 장기 전략, 프리미엄 관리 중심' },
    ],
    next_path_body: '첫 세션은 끝이 아니라 시작입니다. 169Avenue는 학생의 결과에 따라 가장 적합한 다음 경로를 함께 설계합니다.',

    // 11. CTA
    cta_title: '지금 필요한 것은 더 많은 체험이 아니라, 더 정확한 방향입니다',
    cta_body: '우리 아이의 가능성을 감으로 판단하지 마세요. 최상위 멘토의 관찰과 분석을 통해, 지금 가장 필요한 다음 단계를 확인해보세요.',
    cta_btn_primary: '사전 진단 신청하기',
    cta_btn_secondary: '상담 예약하기',

    final_cta_title: '지금 필요한 것은 더 많은 체험이 아니라, 더 정확한 방향입니다',
    final_cta_body: '',
    final_cta1: '사전 진단 신청하기',
    final_cta2: '상담 예약하기',

    mini_cta_default: '내 프로필이 자격이 되는지 확인해 보세요.',
    mini_cta_default_btn: '무료 진단',
    mini_cta_case: '내 케이스는 어떻게 분석될까요?',
    mini_cta_case_btn: '케이스 분석 요청',
    mini_cta_region: '이 지역 대학 지원 전략이 필요하신가요?',

    case_tag: '실전 전략 예시',
    case_title: '케이스 스터디',
    case_sub: '다양한 학생 프로필에 맞춰 설계한 입시 전략의 익명화된 사례입니다.',
    case_cta: '나만의 전략 설계 받기',
    cases: [
      { tag: '해외고 → 한국대', title: '미국고 GPA 3.8 / AP 미적분, 경제', strategy: '재외국민 특별전형으로 한국 상위권 경영 프로그램 타겟. AP 과목을 동등한 학업 강도로 포지셔닝, 이중 언어 자기소개서 작성.', result: '상향: 연세·고려 경영 / 적정: 성균관 SKKU / 안정: 한양·중앙' },
      { tag: '국제학교 → 한국대', title: '동남아 국제학교 / AP 없음 / 학생회', strategy: '리더십 내러티브와 커뮤니티 임팩트 중심 지원 설계. AP 부재를 IB 예상 36점과 비교과 포트폴리오로 보완.', result: '상향: 성균관 SKKU / 적정: 한양·경희 / 안정: 중앙·동국 (+ TOPIK 계획)' },
      { tag: '해외대 → 한국대 편입', title: '미국 대학 2학년 / 72학점 / GPA 3.5', strategy: '학점 이전 분석 결과 85% 이전 가능 확인. 해외에서 불가능한 한국 특화 연구 프로그램 지원 동기로 편입 내러티브 구축.', result: '상향: 고려·서강 / 적정: 성균관·한양 / 72학점 중 61학점 이전 가능' },
      { tag: '한국 → 해외대 진학', title: '한국고 / TOEFL 112 / 과학올림피아드 금메달', strategy: '올림피아드 성과를 미국/영국 대학 STEM 포지셔닝에 활용. 한국 과학교육과 글로벌 혁신을 연결하는 연구 내러티브 개발.', result: 'MIT, 칼텍, 임페리얼 칼리지, ETH 취리히 지원 전략 수립' },
    ],

    faq_tag: '자주 묻는 질문',
    faq_title: '자주 묻는 질문',
    faq_sub: '해외-한국 입시를 준비하는 학생과 학부모에게 가장 많이 받는 질문입니다.',
    faqs: [
      { q: '해외고 출신이면 학생부가 없어도 한국 대학 지원이 가능한가요?', a: '네, 가능합니다. 대부분의 한국 상위권 대학은 재외국민 특별전형이나 외국인 전형을 통해 학생부 없이도 지원할 수 있습니다.' },
      { q: 'IB/AP 없이도 한국 상위권 대학 입학이 어려운가요?', a: '반드시 그렇지는 않습니다. IB/AP가 유리하지만, A-Level, 미국식 등 다른 국제 커리큘럼도 인정됩니다.' },
      { q: '해외대에서 한국대로 편입할 때 가장 중요한 요소는?', a: '학점 이전 가능성이 가장 중요합니다. 지원 전 상세한 학점 매핑 분석을 통해 어떤 학점이 인정되는지 정확히 파악합니다.' },
      { q: '국내 입시와 해외 입시를 동시에 준비할 수 있나요?', a: '네, 이것이 저희 핵심 전문 분야입니다. 두 타임라인을 모두 관리하는 병렬 전략을 설계합니다.' },
      { q: '상담 후 어떤 결과물을 받나요?', a: '지원 가능 대학 리스트(상향/적정/안정), 커리큘럼 갭 분석, 맞춤 준비 일정표, 전략 포지셔닝 문서를 제공합니다.' },
      { q: '준비는 언제부터 시작해야 하나요?', a: '이상적으로는 지원 마감 12-18개월 전부터 시작하는 것이 좋습니다. TOPIK 준비, 서류 수집, 전략적 과목 선택에 시간이 필요합니다.' },
    ],

    trust_tag: '상담 결과물',
    trust_title: '투명하고 검증 가능한',
    trust_items: [
      { title: '대학 커버리지', items: ['한국 SKY + 상위 15개 대학', '미국 아이비리그 & Top 50', '영국 러셀그룹 & 옥스브리지', '유럽/아시아-태평양 명문'] },
      { title: '진단 프레임워크', items: ['IB/AP/A-Level/한국 교과과정 분석', 'GPA 변환 및 경쟁력 점수화', '비교과 활동 임팩트 평가', '어학 능력 포지셔닝'] },
      { title: '상담 후 제공 산출물', items: ['지원 가능 대학표: 상향 / 적정 / 안정', '전공 적합성 분석 및 경쟁력 점수', '서류 전략: 에세이, 추천서, 포트폴리오', '월별 마일스톤 포함 준비 일정표', '학점 이전 매핑 (편입 지원자)'] },
    ],
    trust_compare_title: '왜 169 Avenue인가',
    trust_compare_col1: '유학원',
    trust_compare_col2: '입시 컨설팅',
    trust_compare_rows: [
      { label: '기준', c1: '국가', c2: '내신', c3: '학력 구조' },
      { label: '방식', c1: '대행', c2: '지도', c3: '전략 설계' },
      { label: '범위', c1: '해외만', c2: '국내만', c3: '통합' },
    ],

    problem_strategy_link: '전략 방식 보기',
  },
} as const
