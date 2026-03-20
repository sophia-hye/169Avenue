export interface UKUniversity {
  readonly rank: number
  readonly name: string
  readonly city: string
  readonly nation: string
  readonly lon: number
  readonly lat: number
}

export const UK_UNIVERSITIES: readonly UKUniversity[] = [
  { rank: 1, name: 'University of Oxford', city: 'Oxford', nation: 'england', lon: -1.254, lat: 51.754 },
  { rank: 2, name: 'University of Cambridge', city: 'Cambridge', nation: 'england', lon: 0.117, lat: 52.204 },
  { rank: 3, name: 'Imperial College London', city: 'London', nation: 'england', lon: -0.175, lat: 51.499 },
  { rank: 4, name: 'UCL', city: 'London', nation: 'england', lon: -0.134, lat: 51.525 },
  { rank: 5, name: 'London School of Economics', city: 'London', nation: 'england', lon: -0.116, lat: 51.514 },
  { rank: 6, name: "King's College London", city: 'London', nation: 'england', lon: -0.116, lat: 51.511 },
  { rank: 7, name: 'University of Edinburgh', city: 'Edinburgh', nation: 'scotland', lon: -3.189, lat: 55.944 },
  { rank: 8, name: 'University of Manchester', city: 'Manchester', nation: 'england', lon: -2.234, lat: 53.467 },
  { rank: 9, name: 'University of Bristol', city: 'Bristol', nation: 'england', lon: -2.602, lat: 51.459 },
  { rank: 10, name: 'University of Warwick', city: 'Coventry', nation: 'england', lon: -1.561, lat: 52.379 },
  { rank: 11, name: 'University of Glasgow', city: 'Glasgow', nation: 'scotland', lon: -4.288, lat: 55.872 },
  { rank: 12, name: 'University of Leeds', city: 'Leeds', nation: 'england', lon: -1.553, lat: 53.807 },
  { rank: 13, name: 'Durham University', city: 'Durham', nation: 'england', lon: -1.576, lat: 54.768 },
  { rank: 14, name: 'University of Birmingham', city: 'Birmingham', nation: 'england', lon: -1.930, lat: 52.450 },
  { rank: 15, name: 'University of St Andrews', city: 'St Andrews', nation: 'scotland', lon: -2.799, lat: 56.340 },
  { rank: 16, name: 'University of Sheffield', city: 'Sheffield', nation: 'england', lon: -1.488, lat: 53.381 },
  { rank: 17, name: 'University of Nottingham', city: 'Nottingham', nation: 'england', lon: -1.188, lat: 52.940 },
  { rank: 18, name: 'University of Southampton', city: 'Southampton', nation: 'england', lon: -1.397, lat: 50.935 },
  { rank: 19, name: 'University of York', city: 'York', nation: 'england', lon: -1.052, lat: 53.947 },
  { rank: 20, name: 'University of Exeter', city: 'Exeter', nation: 'england', lon: -3.534, lat: 50.736 },
  { rank: 21, name: 'University of Aberdeen', city: 'Aberdeen', nation: 'scotland', lon: -2.108, lat: 57.165 },
  { rank: 22, name: 'Cardiff University', city: 'Cardiff', nation: 'wales', lon: -3.179, lat: 51.484 },
  { rank: 23, name: "Queen's University Belfast", city: 'Belfast', nation: 'ni', lon: -5.933, lat: 54.584 },
  { rank: 24, name: 'University of Bath', city: 'Bath', nation: 'england', lon: -2.359, lat: 51.380 },
  { rank: 25, name: 'University of Reading', city: 'Reading', nation: 'england', lon: -0.945, lat: 51.441 },
]

export const UK_NATION_NAMES: Record<string, string> = {
  england: 'England',
  scotland: 'Scotland',
  wales: 'Wales',
  ni: 'Northern Ireland',
}

export function getUniversitiesByNation(nationId: string): readonly UKUniversity[] {
  return UK_UNIVERSITIES.filter((u) => u.nation === nationId)
}

export function getNationsWithUniversities(): string[] {
  return ['england', 'scotland', 'wales', 'ni']
}
