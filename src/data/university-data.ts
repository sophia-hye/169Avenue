export interface UniversityStats {
  readonly students: string
  readonly tuition: string
  readonly roomBoard: string
  readonly acceptance: string
  readonly founded: string
  readonly description: string
  readonly images: readonly string[]
}

// Per-university Flickr CC image search tags (loremflickr.com)
// loremflickr searches Flickr CC-licensed photos and returns consistent results via `lock`
const UNIVERSITY_TAGS: Record<string, string> = {
  'mit': 'mit,massachusetts,institute,technology',
  'stanford-university': 'stanford,university,california',
  'harvard-university': 'harvard,university,cambridge',
  'harvard-medical-school': 'harvard,medical,school,boston',
  'harvard-law-school': 'harvard,law,university',
  'harvard-business-school': 'harvard,business,school',
  'university-of-oxford': 'oxford,university,england,historic',
  'university-of-cambridge': 'cambridge,university,kings,college',
  'imperial-college-london': 'imperial,college,london,university',
  'eth-zurich': 'eth,zurich,switzerland,university',
  'caltech': 'caltech,california,technology,university',
  'yale-university': 'yale,university,newhaven',
  'princeton-university': 'princeton,university,newjersey',
  'carnegie-mellon-university': 'carnegie,mellon,pittsburgh,university',
  'uc-berkeley': 'berkeley,university,california,campus',
  'national-university-of-singapore': 'singapore,university,campus',
  'tsinghua-university': 'tsinghua,university,beijing,china',
  'johns-hopkins-university': 'johns,hopkins,university,baltimore',
  'london-school-of-economics': 'london,school,economics,lse',
  'ucl': 'ucl,london,university,college',
  'kaist': 'kaist,korea,university,technology',
  'epfl': 'epfl,lausanne,switzerland,university',
  'insead': 'insead,fontainebleau,business,school',
  'london-business-school': 'london,business,school,campus',
  'the-juilliard-school': 'juilliard,lincoln,center,new,york',
  'royal-college-of-art': 'royal,college,art,london,kensington',
  'loughborough-university': 'loughborough,university,campus,sport',
}

function pickImages(slug: string, count = 3): string[] {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) & 0xffffff

  const tags = UNIVERSITY_TAGS[slug] ?? 'university,campus,architecture,building'
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    // Cap lock at 30 to stay within available Flickr CC photo counts and avoid solid-color placeholders
    const lock = (((hash >>> 0) + i * 11) % 30) + 1
    // Request 4:3 ratio to match common photo format and reduce letterboxing
    result.push(`https://loremflickr.com/1200/900/${tags}?lock=${lock}`)
  }
  return result
}

const SPECIFIC: Record<string, Omit<UniversityStats, 'images'>> = {
  'mit': {
    students: '11,500',
    tuition: '$57,986 / yr',
    roomBoard: '$17,960 / yr',
    acceptance: '4%',
    founded: '1861',
    description: 'The Massachusetts Institute of Technology is the world\'s foremost science and engineering university, driving breakthroughs from the internet to cancer research. Its culture of innovation and entrepreneurship has spawned over 30,000 companies worldwide.',
  },
  'stanford-university': {
    students: '17,249',
    tuition: '$62,484 / yr',
    roomBoard: '$19,575 / yr',
    acceptance: '4%',
    founded: '1885',
    description: 'Stanford\'s position in Silicon Valley has made it the cradle of modern technology. Its interdisciplinary ethos and proximity to industry leaders create an unparalleled environment for intellectual ambition and entrepreneurial spirit.',
  },
  'harvard-university': {
    students: '23,731',
    tuition: '$57,261 / yr',
    roomBoard: '$20,043 / yr',
    acceptance: '4%',
    founded: '1636',
    description: 'The oldest university in the United States, Harvard has shaped leaders across law, medicine, government, and the arts for nearly four centuries. Its unrivalled endowment funds world-class research and one of the greatest library systems on earth.',
  },
  'harvard-medical-school': {
    students: '1,100',
    tuition: '$69,400 / yr',
    roomBoard: '$16,200 / yr',
    acceptance: '3%',
    founded: '1782',
    description: 'Harvard Medical School stands at the apex of medical education and research, affiliated with 15 teaching hospitals and the Longwood Medical Area. Its graduates have shaped modern medicine through landmark discoveries in genomics, neuroscience, and oncology.',
  },
  'harvard-law-school': {
    students: '1,990',
    tuition: '$70,800 / yr',
    roomBoard: '$17,100 / yr',
    acceptance: '12%',
    founded: '1817',
    description: 'Harvard Law School is the world\'s premier institution for legal education, producing Supreme Court justices, heads of state, and the architects of international law. Its vast clinical programs and unmatched faculty define the contours of legal thought globally.',
  },
  'harvard-business-school': {
    students: '2,100',
    tuition: '$73,440 / yr',
    roomBoard: '$18,200 / yr',
    acceptance: '12%',
    founded: '1908',
    description: 'Harvard Business School invented the case method and remains the gold standard of business education. Its alumni network spans every industry and continent, and its research consistently shapes global management practice.',
  },
  'university-of-oxford': {
    students: '26,000',
    tuition: '£9,250 – £39,010 / yr',
    roomBoard: '£8,500 – £12,000 / yr',
    acceptance: '17%',
    founded: '1096',
    description: 'The oldest English-speaking university in the world, Oxford\'s collegiate system fosters intimate intellectual exchange across every discipline. From PPE to biochemistry, its tutorial system cultivates independent thinkers who shape global policy and culture.',
  },
  'university-of-cambridge': {
    students: '24,450',
    tuition: '£9,250 – £35,517 / yr',
    roomBoard: '£7,500 – £11,000 / yr',
    acceptance: '21%',
    founded: '1209',
    description: 'Cambridge\'s 800-year legacy of intellectual discovery includes Newton\'s laws, Watson and Crick\'s DNA model, and the development of modern computing. The collegiate system creates a community that prizes rigour, curiosity, and collegial debate.',
  },
  'imperial-college-london': {
    students: '22,000',
    tuition: '£9,250 – £35,100 / yr',
    roomBoard: '£9,000 – £13,000 / yr',
    acceptance: '14%',
    founded: '1907',
    description: 'Ranked among the world\'s top engineering and science universities, Imperial\'s location in South Kensington and its deep ties to London\'s financial and tech sectors create extraordinary pathways for applied research and industry leadership.',
  },
  'eth-zurich': {
    students: '22,200',
    tuition: 'CHF 730 / semester',
    roomBoard: 'CHF 800 – 1,400 / month',
    acceptance: '27%',
    founded: '1855',
    description: 'ETH Zurich has produced 22 Nobel laureates including Albert Einstein. Switzerland\'s flagship technical university offers a rigorous education in engineering, natural sciences, and architecture within one of the world\'s most innovative ecosystems.',
  },
  'caltech': {
    students: '2,397',
    tuition: '$60,816 / yr',
    roomBoard: '$18,096 / yr',
    acceptance: '4%',
    founded: '1891',
    description: 'With the highest ratio of Nobel laureates to faculty of any institution, Caltech\'s intimate research environment in Pasadena cultivates a singular focus on scientific excellence. Its collaborative culture and proximity to NASA\'s JPL make it a hub for space and technology research.',
  },
  'yale-university': {
    students: '14,726',
    tuition: '$62,250 / yr',
    roomBoard: '$18,800 / yr',
    acceptance: '5%',
    founded: '1701',
    description: 'Yale\'s residential college system, world-class professional schools, and extraordinary arts and humanities tradition create one of the most holistic educational experiences in the world. Its Law School, School of Management, and School of Drama are consistently ranked first in their fields.',
  },
  'princeton-university': {
    students: '8,478',
    tuition: '$59,710 / yr',
    roomBoard: '$18,180 / yr',
    acceptance: '4%',
    founded: '1746',
    description: 'Princeton\'s no-loan financial aid policy, extraordinary faculty-to-student ratio, and strong emphasis on undergraduate research make it a uniquely rigorous and accessible institution. Its departments in economics, mathematics, and public affairs are among the finest in the world.',
  },
  'carnegie-mellon-university': {
    students: '15,818',
    tuition: '$60,032 / yr',
    roomBoard: '$15,954 / yr',
    acceptance: '15%',
    founded: '1900',
    description: 'Carnegie Mellon\'s School of Computer Science is the birthplace of robotics, artificial intelligence, and human-computer interaction as academic disciplines. Its synergy between technology, the arts, and business creates graduates who lead both Silicon Valley and Broadway.',
  },
  'uc-berkeley': {
    students: '45,057',
    tuition: '$14,312 (in-state) / $44,066 (out-of-state) / yr',
    roomBoard: '$19,444 / yr',
    acceptance: '14%',
    founded: '1868',
    description: 'The flagship of the University of California system, Berkeley has been the intellectual home of the Free Speech Movement, Nobel Prize-winning research, and the open-source software movement. Its public mission and extraordinary research output represent American higher education at its finest.',
  },
  'national-university-of-singapore': {
    students: '40,000',
    tuition: 'SGD 8,800 – 34,100 / yr',
    roomBoard: 'SGD 6,000 – 10,000 / yr',
    acceptance: '21%',
    founded: '1905',
    description: 'Asia\'s leading global university, NUS blends Eastern and Western intellectual traditions on a 150-hectare campus in one of the world\'s great cities. Its strategic location at the heart of Southeast Asia makes it the gateway for students seeking careers in Asia\'s dynamic economies.',
  },
  'tsinghua-university': {
    students: '47,000',
    tuition: 'CNY 5,000 – 45,000 / yr',
    roomBoard: 'CNY 1,200 – 2,400 / month',
    acceptance: '0.07%',
    founded: '1911',
    description: 'Known as "China\'s MIT," Tsinghua has educated the majority of China\'s top political and business leaders. Its engineering and computer science programs are world-class, and its growing partnerships with global tech companies make it essential for understanding China\'s technological ascent.',
  },
  'johns-hopkins-university': {
    students: '29,987',
    tuition: '$60,480 / yr',
    roomBoard: '$17,438 / yr',
    acceptance: '8%',
    founded: '1876',
    description: 'America\'s first research university, Johns Hopkins pioneered the model of combining teaching with research. Its medical school and Bloomberg School of Public Health are consistently ranked among the world\'s best, and its proximity to Washington D.C. makes it a hub for policy-oriented research.',
  },
  'london-school-of-economics': {
    students: '12,000',
    tuition: '£9,250 – £27,336 / yr',
    roomBoard: '£8,000 – £14,000 / yr',
    acceptance: '16%',
    founded: '1895',
    description: 'LSE\'s location in the heart of London and its singular focus on the social sciences create an intensely cosmopolitan intellectual environment. Its economics and political science departments have shaped global policy frameworks, and its alumni network spans the world\'s governments and financial institutions.',
  },
  'ucl': {
    students: '42,000',
    tuition: '£9,250 – £35,000 / yr',
    roomBoard: '£8,500 – £13,500 / yr',
    acceptance: '63%',
    founded: '1826',
    description: 'University College London, ranked among the world\'s top 10 universities, was the first in England to admit students regardless of religion or sex. Its location in Bloomsbury and deep connections to London\'s intellectual life make it a crucible of progressive thought and world-class research.',
  },
  'kaist': {
    students: '10,500',
    tuition: 'KRW 0 (scholarship-based)',
    roomBoard: 'KRW 500,000 – 900,000 / month',
    acceptance: '29%',
    founded: '1971',
    description: 'Korea Advanced Institute of Science and Technology is the engine of South Korea\'s technological transformation. Its scholarship model, cutting-edge research in semiconductors and AI, and close industry partnerships with Samsung and LG make it one of Asia\'s most competitive institutions.',
  },
  'epfl': {
    students: '12,000',
    tuition: 'CHF 730 / semester',
    roomBoard: 'CHF 900 – 1,500 / month',
    acceptance: '20%',
    founded: '1969',
    description: 'The École Polytechnique Fédérale de Lausanne on the shores of Lake Geneva is Europe\'s most dynamic technical university. Its multilingual environment, world-class research parks, and deep ties to the Geneva international community attract exceptional students from over 120 countries.',
  },
  'insead': {
    students: '1,400',
    tuition: '€95,000 (full MBA)',
    roomBoard: '€1,500 – 2,500 / month',
    acceptance: '30%',
    founded: '1957',
    description: 'INSEAD\'s campuses in Fontainebleau, Singapore, and Abu Dhabi embody its identity as "The Business School for the World." Its one-year MBA is the most internationally diverse programme of its kind, and its alumni network of 62,000 in 175 countries is unrivalled in global business.',
  },
  'london-business-school': {
    students: '2,200',
    tuition: '£92,250 (full MBA)',
    roomBoard: '£1,800 – 3,000 / month',
    acceptance: '20%',
    founded: '1964',
    description: 'London Business School\'s location in the world\'s premier financial centre provides unparalleled access to global business, finance, and consulting. Its student body of 130 nationalities creates one of the most internationally immersive learning environments in business education.',
  },
  'the-juilliard-school': {
    students: '862',
    tuition: '$47,400 / yr',
    roomBoard: '$17,200 / yr',
    acceptance: '7%',
    founded: '1905',
    description: 'Juilliard at Lincoln Center in New York City is the world\'s pre-eminent performing arts conservatory. Its alumni — Yo-Yo Ma, Robin Williams, Kevin Spacey, Patti LuPone — have defined American cultural life across music, drama, and dance for a century.',
  },
  'royal-college-of-art': {
    students: '2,400',
    tuition: '£12,000 – £27,000 / yr',
    roomBoard: '£10,000 – £16,000 / yr',
    acceptance: '20%',
    founded: '1837',
    description: 'The Royal College of Art in Kensington is the world\'s top postgraduate art and design university. Its alumni include David Hockney, Sir James Dyson, and Zandra Rhodes, and its location adjacent to the V&A and Natural History Museums makes it the centre of London\'s creative universe.',
  },
  'loughborough-university': {
    students: '18,000',
    tuition: '£9,250 – £22,750 / yr',
    roomBoard: '£6,500 – £9,500 / yr',
    acceptance: '55%',
    founded: '1909',
    description: 'Loughborough is consistently ranked the world\'s top sports science university. Its Olympic and Paralympic athlete support programmes, cutting-edge human performance laboratories, and exclusive partnerships with national sporting bodies make it the gold standard for elite athletic education.',
  },
}

function deriveStats(slug: string, country: string): Omit<UniversityStats, 'images'> {
  const isUK = country === 'UK'
  const isEU = ['Germany', 'France', 'Switzerland', 'Netherlands', 'Italy', 'Finland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Belgium', 'Spain'].includes(country)
  const isAsia = ['Japan', 'China', 'South Korea', 'Singapore', 'India'].includes(country)
  const isAustralia = ['Australia', 'New Zealand'].includes(country)

  if (isUK) return {
    students: '14,000 – 28,000',
    tuition: '£9,250 – £30,000 / yr',
    roomBoard: '£7,000 – £12,000 / yr',
    acceptance: '15 – 35%',
    founded: '–',
    description: 'A globally respected research institution, celebrated for its rigorous academic standards, collegiate community, and strong connections to industry and public service.',
  }
  if (isEU) return {
    students: '10,000 – 30,000',
    tuition: '€500 – €18,000 / yr',
    roomBoard: '€700 – €1,400 / month',
    acceptance: '15 – 40%',
    founded: '–',
    description: 'A distinguished European research university combining centuries of academic tradition with cutting-edge innovation, operating within one of the world\'s most vibrant research ecosystems.',
  }
  if (isAsia) return {
    students: '15,000 – 50,000',
    tuition: 'Varies by programme',
    roomBoard: 'Varies by location',
    acceptance: '10 – 30%',
    founded: '–',
    description: 'A leading institution in the Asia-Pacific region, recognised for exceptional research output, competitive admissions, and strong industry partnerships across technology, medicine, and the sciences.',
  }
  if (isAustralia) return {
    students: '35,000 – 55,000',
    tuition: 'AUD 33,000 – 45,000 / yr',
    roomBoard: 'AUD 14,000 – 22,000 / yr',
    acceptance: '25 – 50%',
    founded: '–',
    description: 'A world-class research university in one of the globe\'s most liveable regions, combining high academic standards with an outstanding quality of student life and strong connections to Asia-Pacific industry.',
  }
  return {
    students: '8,000 – 45,000',
    tuition: '$45,000 – $65,000 / yr',
    roomBoard: '$15,000 – $20,000 / yr',
    acceptance: '5 – 40%',
    founded: '–',
    description: 'A distinguished research university with a long tradition of academic excellence, producing leaders across the sciences, humanities, and professional fields.',
  }
}

export function getUniversityStats(slug: string, country = 'USA'): UniversityStats {
  const specific = SPECIFIC[slug]
  const base = specific ?? deriveStats(slug, country)
  return { ...base, images: pickImages(slug, 3) }
}
