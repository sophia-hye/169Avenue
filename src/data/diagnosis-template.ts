export interface ParentSurvey {
  studentName: string
  grade: string
  school: string
  curriculum: string
  englishExposure: string
  interests: string[]
  educationGoal: string
  overseasExperience: string
  concerns: string
}

export interface StudentSurvey {
  ageGroup: 'lower-elem' | 'upper-elem' | 'middle'
  favoriteActivities: string[]
  englishIntro: string
  goalOrDream: string
  interestArea: string
}

export interface ObserverEntry {
  category: string
  label: string
  score: number // 1-5
  note: string
}

export interface DiagnosisData {
  id: string
  createdAt: string
  parent: ParentSurvey
  student: StudentSurvey
  observer: {
    english: ObserverEntry[]
    attitude: ObserverEntry[]
    interest: ObserverEntry[]
    personality: ObserverEntry[]
    overseas: ObserverEntry[]
  }
  summary: {
    type: ('exploratory' | 'focused' | 'expressive')[]
    overallNote: string
    recommendedDirection: string
    nextSteps: string
  }
}

export const OBSERVER_TEMPLATE = {
  english: [
    { category: 'English', label: 'Conversation Level', score: 3, note: '' },
    { category: 'English', label: 'Presentation Confidence', score: 3, note: '' },
    { category: 'English', label: 'Listening Comprehension', score: 3, note: '' },
    { category: 'English', label: 'Vocabulary Range', score: 3, note: '' },
  ],
  attitude: [
    { category: 'Attitude', label: 'Focus / Concentration', score: 3, note: '' },
    { category: 'Attitude', label: 'Task Completion', score: 3, note: '' },
    { category: 'Attitude', label: 'Adaptability', score: 3, note: '' },
    { category: 'Attitude', label: 'Participation', score: 3, note: '' },
  ],
  interest: [
    { category: 'Interest', label: 'Academic Curiosity', score: 3, note: '' },
    { category: 'Interest', label: 'Sports Engagement', score: 3, note: '' },
    { category: 'Interest', label: 'Art / Creative Expression', score: 3, note: '' },
    { category: 'Interest', label: 'Leadership Initiative', score: 3, note: '' },
  ],
  personality: [
    { category: 'Personality', label: 'Exploratory Drive', score: 3, note: '' },
    { category: 'Personality', label: 'Depth of Focus', score: 3, note: '' },
    { category: 'Personality', label: 'Expressiveness', score: 3, note: '' },
    { category: 'Personality', label: 'Social Confidence', score: 3, note: '' },
  ],
  overseas: [
    { category: 'Overseas', label: 'Environmental Adaptability', score: 3, note: '' },
    { category: 'Overseas', label: 'Independence', score: 3, note: '' },
    { category: 'Overseas', label: 'Cultural Openness', score: 3, note: '' },
    { category: 'Overseas', label: 'Stress Resilience', score: 3, note: '' },
  ],
}

export const INTEREST_OPTIONS = [
  'Reading', 'Math / Science', 'Sports', 'Art / Drawing', 'Music',
  'Coding / Tech', 'Writing', 'Debate', 'Travel', 'Gaming',
]

export const DEFAULT_DIAGNOSIS: DiagnosisData = {
  id: '',
  createdAt: new Date().toISOString().slice(0, 10),
  parent: {
    studentName: '',
    grade: '',
    school: '',
    curriculum: '',
    englishExposure: '',
    interests: [],
    educationGoal: '',
    overseasExperience: '',
    concerns: '',
  },
  student: {
    ageGroup: 'upper-elem',
    favoriteActivities: [],
    englishIntro: '',
    goalOrDream: '',
    interestArea: '',
  },
  observer: { ...OBSERVER_TEMPLATE },
  summary: {
    type: [],
    overallNote: '',
    recommendedDirection: '',
    nextSteps: '',
  },
}

/** Calculate axis averages for radar chart */
export function calcRadarScores(observer: DiagnosisData['observer']): { axis: string; value: number }[] {
  const avg = (entries: ObserverEntry[]) => entries.reduce((s, e) => s + e.score, 0) / entries.length
  return [
    { axis: 'English', value: avg(observer.english) },
    { axis: 'Attitude', value: avg(observer.attitude) },
    { axis: 'Interest', value: avg(observer.interest) },
    { axis: 'Personality', value: avg(observer.personality) },
    { axis: 'Overseas', value: avg(observer.overseas) },
  ]
}
