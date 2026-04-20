export interface SkillEntry {
  name: string
  icon: string
  stars: number
  description: string
}

export interface ExplorationEntry {
  name: string
  icon: string
  description: string
}

export interface RoadmapEntry {
  period: string
  items: string[]
}

export interface ProfileBar {
  label: string
  percent: number
  color: 'accent' | 'gray' | 'blue'
}

export type PersonalityType = 'exploratory' | 'focused' | 'expressive'

export interface ReportData {
  // 1. Basic Info
  studentName: string
  grade: string
  programName: string
  programPeriod: string
  observer: string
  date: string

  // 2. Executive Summary
  summaryText: string
  strength: string
  direction: string
  keywords: string

  // 3. Area Assessments
  skills: SkillEntry[]
  explorations: ExplorationEntry[]

  // 4. Personality Type
  profileBars: ProfileBar[]
  primaryType: PersonalityType[]
  analysisNote: string

  // 5. Growth Roadmap
  roadmap: RoadmapEntry[]

  // 6. Recommended Programs (upsell)
  recommendedSteps: string[]

  // 7. Closing
  closingMessage: string
}

export const PERSONALITY_LABELS: Record<PersonalityType, { en: string; ko: string; color: string; icon: string; desc_en: string; desc_ko: string }> = {
  exploratory: { en: 'Exploratory', ko: '탐색형', color: '#43586b', icon: '🔵', desc_en: 'Needs diverse experiences', desc_ko: '다양한 경험 필요' },
  focused: { en: 'Focused', ko: '집중형', color: '#8b8469', icon: '🟢', desc_en: 'Needs specific area strengthening', desc_ko: '특정 분야 강화 필요' },
  expressive: { en: 'Expressive', ko: '표현형', color: '#6b4f4f', icon: '🟡', desc_en: 'Needs presentation/leadership growth', desc_ko: '발표/리더십 강화' },
}

export const DEFAULT_REPORT: ReportData = {
  studentName: '',
  grade: '',
  programName: 'Future Pathway Program',
  programPeriod: '',
  observer: '',
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),

  summaryText: '',
  strength: '',
  direction: '',
  keywords: '',

  skills: [
    { name: 'Presentation', icon: '\uD83D\uDCAC', stars: 3, description: '' },
    { name: 'Expression', icon: '\uD83D\uDCA1', stars: 3, description: '' },
    { name: 'Focus', icon: '\uD83C\uDFAF', stars: 3, description: '' },
    { name: 'Task Completion', icon: '\uD83D\uDCCB', stars: 3, description: '' },
  ],
  explorations: [
    { name: 'Sports', icon: '\uD83C\uDFBE', description: '' },
    { name: 'Art', icon: '\uD83C\uDFA8', description: '' },
  ],

  profileBars: [
    { label: 'Exploratory', percent: 50, color: 'blue' },
    { label: 'Focused', percent: 50, color: 'gray' },
    { label: 'Expressive', percent: 50, color: 'accent' },
  ],
  primaryType: ['exploratory'],
  analysisNote: '',

  roadmap: [
    { period: 'Short-term (6 months)', items: [''] },
    { period: 'Mid-term (1\u20132 years)', items: [''] },
    { period: 'Long-term (High School)', items: [''] },
  ],

  recommendedSteps: ['1:1 Growth Strategy Consulting', '1-3 Month Intensive Program', 'Overseas Camp'],

  closingMessage: '',
}
