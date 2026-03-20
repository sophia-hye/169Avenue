export interface Story {
  readonly id: string
  readonly university: string
  readonly classYear: string
  readonly name: string
  readonly quote: string
  readonly description: string
  readonly fullNarrative: string
  readonly image: string
  readonly offsetClass: string
}

export const FEATURED_STORY: Story = {
  id: 'julian-thorne',
  university: 'Harvard University',
  classYear: 'Class of 2028',
  name: 'Julian Thorne',
  quote: '"In the silence of the library, I found my own voice, not just the echoes of the masters."',
  description: 'Julian\'s journey wasn\'t about perfect scores, but about his inquiry into the intersections of classical philosophy and modern ethics.',
  fullNarrative: 'Julian\'s journey wasn\'t about perfect scores, but about his inquiry into the intersections of classical philosophy and modern ethics. We helped him weave a narrative that proved to Harvard that he wasn\'t just a student, but a contributor to the global discourse.\n\nGrowing up in a small coastal town, Julian found solace in the works of Aristotle and Kant. But it was his volunteer work at a local refugee center that transformed his academic interest into a lived philosophy. He began to see ethics not as abstract theory, but as the framework through which communities navigate their most pressing challenges.\n\nOur team worked with Julian to articulate this unique intersection. Rather than presenting a conventional application focused on grades and test scores, we helped him craft a narrative that wove together his philosophical inquiry with his community engagement. The result was an application that Harvard\'s admissions committee described as "refreshingly authentic."\n\nToday, Julian is pursuing a joint concentration in Philosophy and Government, and has already published his first paper on ethical frameworks for refugee policy in the Harvard Political Review.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAte5zHNXx-XepMVoY85CMYl29jafjj35d0oz2kN9x5-_LYr4SmdH7jCIgIn8Ww94R3qxYcLyR76KNA6Ttb5uwqHhY1E3zquTXf6J8AUb-mXXCNXAi_6DSjCCnKl1PUkRfOfHUWXOqvO8Jyz_gq-7Z_vYI_XMF6CO_BhD24KiMq7LI2EwKXFe1bbJDaoC0Ti-S7Wfttoo3acpWdD3iphl4Z53mdTrxloudKEPZ-AfAZ3Wgr2OjePEo6pDFWEb06Pv-s8XfzjvydydI',
  offsetClass: '',
}

export const STORIES: readonly Story[] = [
  {
    id: 'eleanor-vance',
    university: 'Oxford University',
    classYear: 'Class of 2027',
    name: 'Eleanor Vance',
    quote: '"Language is not just communication — it is the architecture of thought itself."',
    description: 'Redefining the boundaries of theoretical linguistics through a focus on endangered dialects in the digital age.',
    fullNarrative: 'Eleanor\'s fascination with language began when her grandmother, a native speaker of a dying Welsh dialect, passed away. The realization that an entire way of thinking could vanish with a single generation sparked a mission that would define her academic trajectory.\n\nAt 16, Eleanor had already documented three endangered dialects in rural Wales using a methodology she developed herself — combining traditional linguistic fieldwork with machine learning pattern recognition. Her approach caught the attention of several leading sociolinguists.\n\nOur role was to help Eleanor position her work not merely as academic research, but as a form of cultural preservation with implications for cognitive science, AI development, and human rights. We guided her in presenting her narrative to Oxford\'s Faculty of Linguistics, emphasizing how her interdisciplinary approach aligned with the university\'s commitment to bridging traditional scholarship with modern technology.\n\nEleanor is now reading Linguistics and Philology at Magdalen College, where she has secured funding for a digital archive of endangered Celtic languages.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zOWgh5ROQTB-ktL0wbewyf-kOz4x0H972El6fl6bX209EGDHKxJvmzV63xGVy7qWMrmGdxf0vdemWRDwmdwfh-nS0ww7YdJNznHVPfYkKBaffUjETf35R3kCd8ExjxJGGxT_lDfEwy-iFKyBh1GbyGX1kKiB2MCEjCcHiBEq4o8aQB-sqPBDznnVMaSGgpLrmAHwBPPuJJEZWhmsgLbySOiuavunHeHtpL8J2DMuJ2OAhcdlL6xi6h0yHH3HeSyvXnERwDxeH5A',
    offsetClass: '',
  },
  {
    id: 'mateo-rossi',
    university: 'Stanford University',
    classYear: 'Class of 2026',
    name: 'Mateo Rossi',
    quote: '"Every machine I build is a conversation between human intention and physical law."',
    description: 'How a childhood fascination with mechanism transformed into a breakthrough approach to sustainable robotics.',
    fullNarrative: 'Mateo grew up in his father\'s watch repair shop in Milan, where he learned that every mechanism tells a story of intention and precision. By age 14, he had built his first autonomous robot from recycled watch parts — a small device that could sort recyclable materials.\n\nWhat set Mateo apart was not just his technical skill, but his philosophical approach to engineering. He saw robotics not as a field of pure technology, but as a discipline that must answer to environmental and ethical imperatives. His project "Horologia Verde" — robots designed with planned obsolescence in reverse — won Italy\'s Young Innovator Prize.\n\nWe helped Mateo craft an application that positioned him at the intersection of Stanford\'s world-class engineering program and its sustainability initiatives. His essay connected the patience of horology to the urgency of climate action, creating a narrative that was both deeply personal and globally relevant.\n\nAt Stanford, Mateo is already collaborating with the Sustainability Lab, developing biodegradable robotic components that decompose into nutrient-rich material after their operational life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxuBL6BsvgI1IJOo5-ilHAQNic__RwTYuMW3GcPnmtWNUHomJWxY8GGJ5CR6UUiF7A1CKJcbqc4RWI-QodZT-0tro9ki7wpNF6Ya2FXZvqTTv-BgheOKb3dM7Kcg34x-DGpNAuIj7Ba9PYJiIhhEfnhZxbHuVFfbKeVLgojrrOS2eyl3F5txnRDr30hX5zCCY8u-C0atYm3Cx0BJK3o1egqUb1yLNVPjARJxgiOKwG7Df3x2bYcrsHgZyrZZJgRUR3k9L4xtZxW4',
    offsetClass: 'md:mt-12',
  },
  {
    id: 'clara-chen',
    university: 'Yale University',
    classYear: 'Class of 2027',
    name: 'Clara Chen',
    quote: '"Memory is not nostalgia — it is the raw material of identity."',
    description: 'A literary exploration of diaspora identity that bridged the gap between personal memory and academic rigor.',
    fullNarrative: 'Clara Chen grew up between two worlds: the bustling streets of Taipei, where she spent summers with her grandparents, and the quiet suburbs of Connecticut, where she attended school. This duality was not a source of confusion but of creative power.\n\nBy her junior year of high school, Clara had completed a collection of short stories that explored the immigrant experience through the lens of food, language, and silence. Her writing was featured in three national literary journals — an unusual achievement for a high school student.\n\nOur approach with Clara was to position her not merely as a talented writer, but as a scholar of diaspora studies who used fiction as her primary research methodology. We helped her articulate how her creative work was, in fact, a rigorous exploration of cultural theory, drawing connections to the works of Maxine Hong Kingston and Homi Bhabha.\n\nYale\'s English department was particularly moved by Clara\'s supplementary essay, which analyzed her own fiction through the framework of postcolonial theory. She is now pursuing a double major in English and East Asian Studies, and her debut novel is already under consideration by a major publisher.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5_uTG69o-ZaObOWCpRtNQj9UOKoTKJbuV3cQ8BcIcTCuw_NN1f014VgRz0omSCFe40szhxxJpOsN9ym--DDsc1s28Zo2EmVJvP-BOd2Rm_aJv46XZ_wMTACYD7gocdqpCx2Zqt8O42KaAQ8EaiqVjH_bi5nH0LnV7zqObNUdA-ID7OvL9sxOaTsT3-QvTpXvxufFP6QtIhazcOe3beyrBuV7Psvoduh-XCDoTrveKIdHy_LUTX-qFzsJ-cb62-Jv7l2FJ1JPhSUk',
    offsetClass: 'mt-12 lg:mt-0',
  },
  {
    id: 'siddharth-mehta',
    university: 'UPenn (Wharton)',
    classYear: 'Class of 2027',
    name: 'Siddharth Mehta',
    quote: '"Finance without conscience is just arithmetic. I wanted to make it poetry."',
    description: 'Synthesizing social impact metrics with traditional venture capital frameworks for a new era of finance.',
    fullNarrative: 'Siddharth Mehta\'s awakening came at age 15, when he visited his family\'s ancestral village in Rajasthan. Despite decades of charitable donations from the diaspora community, the village lacked basic infrastructure. The disconnect between capital flow and actual impact haunted him.\n\nRather than accepting the status quo, Siddharth began developing a quantitative framework for measuring the true social return on investment. His model, which he called "Impact Yield," integrated traditional financial metrics with social indicators drawn from development economics. By his senior year, a local microfinance institution had adopted his framework.\n\nOur team recognized that Siddharth\'s story was not about rejecting finance — it was about reimagining it. We positioned his application to Wharton around the idea of "conscious capital," connecting his technical sophistication with his deep personal motivation.\n\nAt Wharton, Siddharth has already launched a student fund that uses his Impact Yield methodology to evaluate investments, and he was invited to present his framework at the World Economic Forum\'s Young Leaders Summit.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa5Gy3AHjB3xY7C3tejZMmQjhoxA6AMA_B85gJbBiEV9o6txhlSVoTcZsf8TbWZ_JEWsW4kWKVlvO57crSX-u5DtTD0gN5wNV_giR-aId2psEOUWuKazCLJhW85fxyFU9dKjonk2Ad_TKe1rT00tE3XCw9bWeI74sghlHw43qK-wjyLW3YssCLA1PNfstAT1NhaXByKB3S7c7hshdTpv02pgBHwYCP42RwAXH5wkQSz_i0Rmpw-cDupdG4UhnAe-IPKsBGqQOeQEI',
    offsetClass: '',
  },
  {
    id: 'alexandros-kyros',
    university: 'MIT',
    classYear: 'Class of 2028',
    name: 'Alexandros Kyros',
    quote: '"Bach wrote the original algorithms. I just translated them into Python."',
    description: 'Applying the mathematical principles of music theory to optimize complex data infrastructure.',
    fullNarrative: 'Alexandros Kyros is a concert-level pianist and a self-taught programmer — a combination that might seem unusual until you hear him explain how a Bach fugue is essentially a masterclass in parallel processing.\n\nGrowing up in Athens, Alexandros trained at the conservatory while simultaneously competing in international mathematics olympiads. But it was during a performance of Debussy\'s "La Mer" that he had his breakthrough insight: the way orchestral voices interact is structurally identical to how distributed computing systems manage data flow.\n\nHe developed an algorithm inspired by contrapuntal music theory that improved data processing efficiency by 23% in benchmark tests. The paper he co-authored with his computer science teacher was accepted at a regional IEEE conference.\n\nOur challenge was to present Alexandros not as a prodigy in two fields, but as a singular thinker who had found a genuine bridge between them. We helped him craft a narrative that MIT\'s admissions team described as "the most original intellectual framework we\'ve seen this cycle."\n\nAlexandros is now in MIT\'s Computer Science and Engineering program, where he continues to develop music-inspired algorithms for quantum computing applications.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaMJNBxBBRG75UYcO4yaq8n7_7iwQ1E-KTiG2bWv2i01vXDL0jyabTcvvv_wfiEdTlS83SVgS4EHFXSbb0xuigY8O8rY6PPC20-aN3jJPfbWjRMtyd3pkgffh04Qq3Qfjogv9sng2khDGbR1Nt98I0abR079adfMLNpS_EVxV6nVsT7l-j_AFkTozO7JpAwK694aCvRg31XHUU8bmLMv1-Y4HnoOvs6eknNR_C93s3wW71ClaUDYZ5dKiDV0ddnyA5KGP6UbzGebU',
    offsetClass: 'md:mt-24',
  },
  {
    id: 'sofia-dubois',
    university: 'Columbia University',
    classYear: 'Class of 2026',
    name: 'Sofia Dubois',
    quote: '"Cities are living organisms. Urban planning is their medicine."',
    description: 'A comparative study of urban planning and its psychological impact on diverse metropolitan communities.',
    fullNarrative: 'Sofia Dubois spent her childhood moving between Paris, Lagos, and Sao Paulo as the daughter of a French diplomat. Each city taught her a different lesson about how urban spaces shape human behavior, community bonds, and mental health.\n\nIn Lagos, she observed how informal market spaces created stronger social networks than any planned community center. In Sao Paulo, she studied the psychological impact of gated communities on both residents and those excluded. In Paris, she questioned why the grand boulevards that tourists admire were originally designed as instruments of state control.\n\nBy age 17, Sofia had completed a comparative study of public space design across three continents, incorporating methodologies from urban planning, psychology, and anthropology. Her work was cited by a UN-Habitat report on inclusive urban development.\n\nWe helped Sofia present her application to Columbia as a story of intellectual synthesis — someone who could bring together the university\'s strengths in urban studies, psychology, and international affairs. Her interdisciplinary approach resonated deeply with Columbia\'s commitment to global scholarship.\n\nSofia is now studying Urban Studies with a concentration in Environmental Psychology, and she has already secured an internship with the city of New York\'s planning department.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMHJSvoeJUWgvJ_Q6M3btxPJfC-pacVKu9Bl02si6xeiZAvClSXj371dhkTN0OlieBx3B0C5PY5yyMDBI2-MbSyclgksyvP5ZzBxpdK3Kw7LDq1d8lX7hVLYMzgsE11AdGrsF7SFQARy4jp1VCKLvXlaNeUMHSdI1Q5g6HIUQ24oKFXrdSlCvPjHQuHJm1Wn07OK-ADwU_KzptuDC8vWQUAxEAPhov-qem5nVphGDlvhb9UZBeZDaOLsEv83HP0-NQU20OwhkLzF8',
    offsetClass: '',
  },
]

export const ALL_STORIES: readonly Story[] = [FEATURED_STORY, ...STORIES]

export function findStoryById(id: string): Story | undefined {
  return ALL_STORIES.find((s) => s.id === id)
}
