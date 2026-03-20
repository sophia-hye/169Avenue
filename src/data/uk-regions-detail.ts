export interface UKNationDetail {
  readonly description: string
  readonly images: readonly string[]
  readonly highlights: readonly string[]
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const UK_NATION_DETAILS: Record<string, UKNationDetail> = {
  england: {
    description:
      "England is the intellectual heart of the United Kingdom, home to Oxford and Cambridge — the world's oldest and most prestigious universities. From the spires of Oxford to the punting canals of Cambridge, England's academic tradition spans eight centuries. London, as a global financial and cultural capital, hosts Imperial, UCL, LSE, and King's College, offering unparalleled access to industry, finance, and the arts.",
    images: [
      U('1444628838545-ac4016a5418a'),
      U('1513635269975-59663e0ac1ad'),
      U('1529655683826-aba9b3e77383'),
      U('1486299267070-83823f5448b5'),
    ],
    highlights: ['Oxford & Cambridge Tradition', 'London Global Hub', 'Russell Group Excellence'],
  },
  scotland: {
    description:
      "Scotland combines centuries of intellectual tradition with breathtaking natural landscapes. The University of Edinburgh, founded in 1583, is one of the world's great research universities. St Andrews, the oldest university in Scotland, has shaped generations of leaders. Glasgow's dynamic university scene is embedded in a city renowned for its architecture, culture, and reinvention as a creative and tech hub.",
    images: [
      U('1540420773420-3450b87a6df9'),
      U('1531501801788-4e8cbe0f1abb'),
      U('1588681664899-f142ff2dc9b1'),
    ],
    highlights: ['Ancient Academic Tradition', 'World-Class Research', 'Stunning Natural Landscape'],
  },
  wales: {
    description:
      "Wales offers a distinctive academic experience in a country of extraordinary natural beauty, rich cultural heritage, and a language that traces back over a thousand years. Cardiff, the vibrant capital, is home to Cardiff University, a leading Russell Group institution. The country's commitment to bilingual education and its unique cultural identity make Welsh universities a compelling choice for students seeking both academic rigour and a sense of place.",
    images: [
      U('1507003211169-0a1dd7228f2d'),
      U('1513380538-10u4j7bkcbde'),
    ],
    highlights: ['Unique Cultural Heritage', 'Russell Group Institution', 'Outstanding Natural Beauty'],
  },
  ni: {
    description:
      "Northern Ireland is an emerging destination for higher education, offering world-class universities at a fraction of the cost of other UK cities. Queen's University Belfast, a member of the Russell Group, has produced Nobel laureates and world-class researchers. Belfast's remarkable transformation from industrial city to creative and tech hub provides students with a dynamic environment for study and career development.",
    images: [
      U('1588680709029-6d30e6a6b1dd'),
      U('1590212151175-d58edd989f34'),
    ],
    highlights: ['Russell Group Quality', 'Emerging Tech Scene', 'Affordable Excellence'],
  },
}

export function getUKNationDetail(nationId: string): UKNationDetail | undefined {
  return UK_NATION_DETAILS[nationId]
}
