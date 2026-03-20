export interface FieldUniversity {
  readonly rank: number
  readonly name: string
  readonly city: string
  readonly country: string
  readonly lon: number
  readonly lat: number
}

export interface Field {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly description: string
  readonly universities: readonly FieldUniversity[]
}

export const FIELDS: readonly Field[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    icon: 'terminal',
    description: 'From artificial intelligence to cybersecurity, these institutions lead the digital revolution and shape the future of technology.',
    universities: [
      { rank: 1, name: 'MIT', city: 'Cambridge', country: 'USA', lon: -71.092, lat: 42.360 },
      { rank: 2, name: 'Stanford University', city: 'Stanford', country: 'USA', lon: -122.170, lat: 37.427 },
      { rank: 3, name: 'Carnegie Mellon University', city: 'Pittsburgh', country: 'USA', lon: -79.943, lat: 40.443 },
      { rank: 4, name: 'University of Oxford', city: 'Oxford', country: 'UK', lon: -1.254, lat: 51.754 },
      { rank: 5, name: 'University of Cambridge', city: 'Cambridge', country: 'UK', lon: 0.117, lat: 52.204 },
      { rank: 6, name: 'ETH Zurich', city: 'Zurich', country: 'Switzerland', lon: 8.548, lat: 47.376 },
      { rank: 7, name: 'National University of Singapore', city: 'Singapore', country: 'Singapore', lon: 103.776, lat: 1.296 },
      { rank: 8, name: 'UC Berkeley', city: 'Berkeley', country: 'USA', lon: -122.258, lat: 37.872 },
      { rank: 9, name: 'Tsinghua University', city: 'Beijing', country: 'China', lon: 116.326, lat: 40.000 },
      { rank: 10, name: 'University of Toronto', city: 'Toronto', country: 'Canada', lon: -79.395, lat: 43.662 },
      { rank: 11, name: 'Georgia Tech', city: 'Atlanta', country: 'USA', lon: -84.395, lat: 33.776 },
      { rank: 12, name: 'KAIST', city: 'Daejeon', country: 'South Korea', lon: 127.360, lat: 36.374 },
      { rank: 13, name: 'Imperial College London', city: 'London', country: 'UK', lon: -0.175, lat: 51.499 },
      { rank: 14, name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
      { rank: 15, name: 'TU Munich', city: 'Munich', country: 'Germany', lon: 11.568, lat: 48.149 },
    ],
  },
  {
    id: 'business',
    name: 'Business & MBA',
    icon: 'trending_up',
    description: 'The world\'s premier business schools that forge the next generation of global leaders, entrepreneurs, and financial innovators.',
    universities: [
      { rank: 1, name: 'Harvard Business School', city: 'Boston', country: 'USA', lon: -71.122, lat: 42.365 },
      { rank: 2, name: 'Stanford GSB', city: 'Stanford', country: 'USA', lon: -122.163, lat: 37.430 },
      { rank: 3, name: 'Wharton (UPenn)', city: 'Philadelphia', country: 'USA', lon: -75.193, lat: 39.953 },
      { rank: 4, name: 'INSEAD', city: 'Fontainebleau', country: 'France', lon: 2.700, lat: 48.408 },
      { rank: 5, name: 'London Business School', city: 'London', country: 'UK', lon: -0.163, lat: 51.526 },
      { rank: 6, name: 'Columbia Business School', city: 'New York', country: 'USA', lon: -73.963, lat: 40.818 },
      { rank: 7, name: 'Booth (U Chicago)', city: 'Chicago', country: 'USA', lon: -87.596, lat: 41.789 },
      { rank: 8, name: 'Kellogg (Northwestern)', city: 'Evanston', country: 'USA', lon: -87.675, lat: 42.056 },
      { rank: 9, name: 'HEC Paris', city: 'Paris', country: 'France', lon: 2.163, lat: 48.755 },
      { rank: 10, name: 'MIT Sloan', city: 'Cambridge', country: 'USA', lon: -71.088, lat: 42.361 },
      { rank: 11, name: 'IE Business School', city: 'Madrid', country: 'Spain', lon: -3.688, lat: 40.436 },
      { rank: 12, name: 'Bocconi University', city: 'Milan', country: 'Italy', lon: 9.189, lat: 45.451 },
      { rank: 13, name: 'NUS Business School', city: 'Singapore', country: 'Singapore', lon: 103.773, lat: 1.293 },
      { rank: 14, name: 'Yale SOM', city: 'New Haven', country: 'USA', lon: -72.926, lat: 41.311 },
      { rank: 15, name: 'Tuck (Dartmouth)', city: 'Hanover', country: 'USA', lon: -72.289, lat: 43.706 },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: 'precision_manufacturing',
    description: 'Where theoretical breakthroughs meet real-world impact — these engineering powerhouses drive innovation across every industry.',
    universities: [
      { rank: 1, name: 'MIT', city: 'Cambridge', country: 'USA', lon: -71.092, lat: 42.360 },
      { rank: 2, name: 'Stanford University', city: 'Stanford', country: 'USA', lon: -122.170, lat: 37.427 },
      { rank: 3, name: 'University of Cambridge', city: 'Cambridge', country: 'UK', lon: 0.117, lat: 52.204 },
      { rank: 4, name: 'ETH Zurich', city: 'Zurich', country: 'Switzerland', lon: 8.548, lat: 47.376 },
      { rank: 5, name: 'Caltech', city: 'Pasadena', country: 'USA', lon: -118.125, lat: 34.138 },
      { rank: 6, name: 'Imperial College London', city: 'London', country: 'UK', lon: -0.175, lat: 51.499 },
      { rank: 7, name: 'Tsinghua University', city: 'Beijing', country: 'China', lon: 116.326, lat: 40.000 },
      { rank: 8, name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
      { rank: 9, name: 'Georgia Tech', city: 'Atlanta', country: 'USA', lon: -84.395, lat: 33.776 },
      { rank: 10, name: 'TU Munich', city: 'Munich', country: 'Germany', lon: 11.568, lat: 48.149 },
      { rank: 11, name: 'Seoul National University', city: 'Seoul', country: 'South Korea', lon: 126.952, lat: 37.460 },
      { rank: 12, name: 'Politecnico di Milano', city: 'Milan', country: 'Italy', lon: 9.228, lat: 45.479 },
      { rank: 13, name: 'TU Delft', city: 'Delft', country: 'Netherlands', lon: 4.374, lat: 52.002 },
      { rank: 14, name: 'UC Berkeley', city: 'Berkeley', country: 'USA', lon: -122.258, lat: 37.872 },
      { rank: 15, name: 'EPFL', city: 'Lausanne', country: 'Switzerland', lon: 6.566, lat: 46.519 },
    ],
  },
  {
    id: 'medicine',
    name: 'Medicine & Health',
    icon: 'cardiology',
    description: 'The institutions at the forefront of medical research, clinical excellence, and the transformation of global healthcare.',
    universities: [
      { rank: 1, name: 'Harvard Medical School', city: 'Boston', country: 'USA', lon: -71.104, lat: 42.336 },
      { rank: 2, name: 'University of Oxford', city: 'Oxford', country: 'UK', lon: -1.254, lat: 51.754 },
      { rank: 3, name: 'Stanford Medicine', city: 'Stanford', country: 'USA', lon: -122.175, lat: 37.434 },
      { rank: 4, name: 'Johns Hopkins University', city: 'Baltimore', country: 'USA', lon: -76.621, lat: 39.330 },
      { rank: 5, name: 'University of Cambridge', city: 'Cambridge', country: 'UK', lon: 0.117, lat: 52.204 },
      { rank: 6, name: 'Karolinska Institute', city: 'Stockholm', country: 'Sweden', lon: 18.035, lat: 59.348 },
      { rank: 7, name: 'UCL', city: 'London', country: 'UK', lon: -0.134, lat: 51.525 },
      { rank: 8, name: 'University of Toronto', city: 'Toronto', country: 'Canada', lon: -79.395, lat: 43.662 },
      { rank: 9, name: 'Yale School of Medicine', city: 'New Haven', country: 'USA', lon: -72.934, lat: 41.303 },
      { rank: 10, name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', lon: 144.961, lat: -37.798 },
      { rank: 11, name: 'Duke University', city: 'Durham', country: 'USA', lon: -78.938, lat: 36.001 },
      { rank: 12, name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
      { rank: 13, name: 'University of Edinburgh', city: 'Edinburgh', country: 'UK', lon: -3.189, lat: 55.944 },
      { rank: 14, name: 'Seoul National University', city: 'Seoul', country: 'South Korea', lon: 126.952, lat: 37.460 },
      { rank: 15, name: 'Heidelberg University', city: 'Heidelberg', country: 'Germany', lon: 8.706, lat: 49.410 },
    ],
  },
  {
    id: 'law',
    name: 'Law',
    icon: 'gavel',
    description: 'These law schools have produced prime ministers, Supreme Court justices, and the architects of international legal frameworks.',
    universities: [
      { rank: 1, name: 'Harvard Law School', city: 'Cambridge', country: 'USA', lon: -71.119, lat: 42.378 },
      { rank: 2, name: 'University of Oxford', city: 'Oxford', country: 'UK', lon: -1.254, lat: 51.754 },
      { rank: 3, name: 'University of Cambridge', city: 'Cambridge', country: 'UK', lon: 0.117, lat: 52.204 },
      { rank: 4, name: 'Yale Law School', city: 'New Haven', country: 'USA', lon: -72.929, lat: 41.312 },
      { rank: 5, name: 'Stanford Law School', city: 'Stanford', country: 'USA', lon: -122.168, lat: 37.425 },
      { rank: 6, name: 'Columbia Law School', city: 'New York', country: 'USA', lon: -73.961, lat: 40.808 },
      { rank: 7, name: 'NYU School of Law', city: 'New York', country: 'USA', lon: -73.998, lat: 40.729 },
      { rank: 8, name: 'LSE', city: 'London', country: 'UK', lon: -0.116, lat: 51.514 },
      { rank: 9, name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', lon: 144.961, lat: -37.798 },
      { rank: 10, name: 'NUS Law', city: 'Singapore', country: 'Singapore', lon: 103.774, lat: 1.295 },
      { rank: 11, name: 'Sciences Po', city: 'Paris', country: 'France', lon: 2.329, lat: 48.854 },
      { rank: 12, name: 'University of Hong Kong', city: 'Hong Kong', country: 'China', lon: 114.138, lat: 22.283 },
      { rank: 13, name: 'Georgetown Law', city: 'Washington', country: 'USA', lon: -77.007, lat: 38.900 },
      { rank: 14, name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
      { rank: 15, name: 'University of Chicago Law', city: 'Chicago', country: 'USA', lon: -87.600, lat: 41.790 },
    ],
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    icon: 'palette',
    description: 'Where literature, philosophy, history, and the fine arts converge — these institutions nurture the deepest forms of human inquiry.',
    universities: [
      { rank: 1, name: 'University of Oxford', city: 'Oxford', country: 'UK', lon: -1.254, lat: 51.754 },
      { rank: 2, name: 'University of Cambridge', city: 'Cambridge', country: 'UK', lon: 0.117, lat: 52.204 },
      { rank: 3, name: 'Harvard University', city: 'Cambridge', country: 'USA', lon: -71.118, lat: 42.377 },
      { rank: 4, name: 'Stanford University', city: 'Stanford', country: 'USA', lon: -122.170, lat: 37.427 },
      { rank: 5, name: 'Yale University', city: 'New Haven', country: 'USA', lon: -72.928, lat: 41.311 },
      { rank: 6, name: 'UCL', city: 'London', country: 'UK', lon: -0.134, lat: 51.525 },
      { rank: 7, name: 'Princeton University', city: 'Princeton', country: 'USA', lon: -74.655, lat: 40.343 },
      { rank: 8, name: 'Columbia University', city: 'New York', country: 'USA', lon: -73.963, lat: 40.808 },
      { rank: 9, name: 'Sorbonne University', city: 'Paris', country: 'France', lon: 2.344, lat: 48.848 },
      { rank: 10, name: 'University of Edinburgh', city: 'Edinburgh', country: 'UK', lon: -3.189, lat: 55.944 },
      { rank: 11, name: 'University of Chicago', city: 'Chicago', country: 'USA', lon: -87.600, lat: 41.789 },
      { rank: 12, name: 'Humboldt University', city: 'Berlin', country: 'Germany', lon: 13.394, lat: 52.518 },
      { rank: 13, name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
      { rank: 14, name: 'Peking University', city: 'Beijing', country: 'China', lon: 116.310, lat: 39.993 },
      { rank: 15, name: 'University of Amsterdam', city: 'Amsterdam', country: 'Netherlands', lon: 4.895, lat: 52.356 },
    ],
  },
]

export function getFieldById(id: string): Field | undefined {
  return FIELDS.find((f) => f.id === id)
}
