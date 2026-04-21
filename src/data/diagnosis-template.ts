export type SchoolType = '' | 'general' | 'international' | 'overseas'
export type MainActivity = '' | 'academic' | 'art' | 'tennis' | 'other'
export type ActivityDuration = '' | 'lt-6m' | '6-12m' | 'gt-1y'
export type EnglishLevel = '' | 'none' | 'academy' | 'daily' | 'overseas'
export type DirectionDilemma = '' | 'art-vs-academic' | 'tennis-vs-art' | 'arts-vs-academic' | 'unsure'
export type DirectionConfidence = '' | 'none' | 'considering' | 'somewhat' | 'certain'
export type NewActivityAttitude = '' | 'active' | 'situational' | 'passive'
export type FocusLevel = '' | 'long' | 'medium' | 'distracted'
export type SelfDirection = '' | 'self' | 'when-told' | 'rarely'
export type ParentConcernType = '' | 'direction' | 'continuation' | 'admission-link' | 'losing-interest'
export type TargetEducation = '' | 'overseas-univ' | 'domestic-univ' | 'undecided'
export type InterestField = '' | 'arts-sports' | 'academic' | 'both' | 'unsure'

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
  // Step-form additions (optional for backward compatibility)
  schoolType?: SchoolType
  parentPhone?: string
  mainActivity?: MainActivity
  activityDuration?: ActivityDuration
  englishLevel?: EnglishLevel
  directionDilemma?: DirectionDilemma
  directionConfidence?: DirectionConfidence
  newActivityAttitude?: NewActivityAttitude
  focusLevel?: FocusLevel
  selfDirection?: SelfDirection
  parentConcernType?: ParentConcernType
  pastAttempts?: string
  targetEducation?: TargetEducation
  interestField?: InterestField
  keyQuestion?: string
}

export interface StudentSurvey {
  ageGroup: 'lower-elem' | 'upper-elem' | 'middle'
  favoriteActivities: string[]
  englishIntro: string
  goalOrDream: string
  interestArea: string
}

/** Personality type labels used on the Result tab + PDF page 6. */
export type PersonalityType = 'exploratory' | 'focused' | 'expressive'

export const PERSONALITY_LABELS: Record<PersonalityType, { en: string; ko: string; color: string; icon: string; desc_en: string; desc_ko: string }> = {
  exploratory: { en: 'Exploratory', ko: '탐색형', color: '#43586b', icon: '🔵', desc_en: 'Needs diverse experiences',            desc_ko: '다양한 경험 필요' },
  focused:     { en: 'Focused',     ko: '집중형', color: '#8b8469', icon: '🟢', desc_en: 'Needs specific area strengthening',    desc_ko: '특정 분야 강화 필요' },
  expressive:  { en: 'Expressive',  ko: '표현형', color: '#6b4f4f', icon: '🟡', desc_en: 'Needs presentation/leadership growth', desc_ko: '발표/리더십 강화' },
}

/** Observer v2 — structured evaluation engine for The 169 Method */
export const OBSERVER_DOMAIN_KEYS = [
  'focus', 'exploration', 'expression', 'coachability', 'confidence', 'adaptability',
] as const

export type ObserverDomainKey = typeof OBSERVER_DOMAIN_KEYS[number]

export interface ObserverItem {
  /** Stable key identifier for the item within its domain — also used as i18n key. */
  key: string
  label: string
  score: number // 1-5
  note: string
}

export interface ObserverDomain {
  items: ObserverItem[]
  mentorNote: string
}

export type ObserverMap = Record<ObserverDomainKey, ObserverDomain>

export interface DiagnosisData {
  id: string
  createdAt: string
  parent: ParentSurvey
  student: StudentSurvey
  observer: ObserverMap
  summary: {
    type: ('exploratory' | 'focused' | 'expressive')[]
    overallNote: string
    recommendedDirection: string
    nextSteps: string
    /** Growth-roadmap horizons (optional; folded from former Growth Report). */
    roadmapShort?: string
    roadmapMid?: string
    roadmapLong?: string
    /** Narrative reflection rendered at the end of the PDF. */
    closingMessage?: string
  }
}

/**
 * Static item catalog per domain.
 * Keys stay stable across languages — display labels come from i18n.
 */
const mkItem = (key: string, label: string): ObserverItem => ({ key, label, score: 3, note: '' })

export const OBSERVER_TEMPLATE: ObserverMap = {
  focus: {
    mentorNote: '',
    items: [
      mkItem('sustained_attention',     'Sustained Attention'),
      mkItem('task_completion',         'Task Completion'),
      mkItem('depth_of_engagement',     'Depth of Engagement'),
      mkItem('recovery_from_distraction', 'Recovery from Distraction'),
    ],
  },
  exploration: {
    mentorNote: '',
    items: [
      mkItem('curiosity_driven_action', 'Curiosity-Driven Action'),
      mkItem('self_starting',           'Self-Starting Behavior'),
      mkItem('question_asking',         'Question Asking'),
      mkItem('range_of_interests',      'Range of Interests'),
    ],
  },
  expression: {
    mentorNote: '',
    items: [
      mkItem('articulation',            'Articulation of Ideas'),
      mkItem('creative_output',         'Creative Output'),
      mkItem('skill_application',       'Technical Skill Application'),
      mkItem('presentation_confidence', 'Presentation Confidence'),
    ],
  },
  coachability: {
    mentorNote: '',
    items: [
      mkItem('receiving_correction',    'Receiving Correction'),
      mkItem('applying_feedback',       'Applying Feedback'),
      mkItem('willingness_to_retry',    'Willingness to Retry'),
      mkItem('self_reflection',         'Self-Reflection'),
    ],
  },
  confidence: {
    mentorNote: '',
    items: [
      mkItem('peer_interaction',        'Peer Interaction'),
      mkItem('leadership_moments',      'Leadership Moments'),
      mkItem('handling_visibility',     'Handling Visibility'),
      mkItem('emotional_steadiness',    'Emotional Steadiness'),
    ],
  },
  adaptability: {
    mentorNote: '',
    items: [
      mkItem('new_context_adjustment',  'New Context Adjustment'),
      mkItem('handling_ambiguity',      'Handling Ambiguity'),
      mkItem('stress_resilience',       'Stress Resilience'),
      mkItem('openness_to_change',      'Openness to Change'),
    ],
  },
}

/** Deep clone the template so mutations don't bleed across diagnoses. */
const cloneTemplate = (): ObserverMap => {
  const out = {} as ObserverMap
  for (const k of OBSERVER_DOMAIN_KEYS) {
    out[k] = {
      mentorNote: '',
      items: OBSERVER_TEMPLATE[k].items.map((it) => ({ ...it })),
    }
  }
  return out
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
    schoolType: '',
    parentPhone: '',
    mainActivity: '',
    activityDuration: '',
    englishLevel: '',
    directionDilemma: '',
    directionConfidence: '',
    newActivityAttitude: '',
    focusLevel: '',
    selfDirection: '',
    parentConcernType: '',
    pastAttempts: '',
    targetEducation: '',
    interestField: '',
    keyQuestion: '',
  },
  student: {
    ageGroup: 'upper-elem',
    favoriteActivities: [],
    englishIntro: '',
    goalOrDream: '',
    interestArea: '',
  },
  observer: cloneTemplate(),
  summary: {
    type: [],
    overallNote: '',
    recommendedDirection: '',
    nextSteps: '',
  },
}

/** Display axis label (English) for a domain key. Used for radar chart axis names. */
export const DOMAIN_DISPLAY: Record<ObserverDomainKey, string> = {
  focus:        'Focus',
  exploration:  'Exploration',
  expression:   'Expression',
  coachability: 'Coachability',
  confidence:   'Confidence',
  adaptability: 'Adaptability',
}

/** Calculate domain averages for radar chart. */
export function calcRadarScores(observer: DiagnosisData['observer']): { axis: string; value: number }[] {
  return OBSERVER_DOMAIN_KEYS.map((key) => {
    const items = observer[key].items
    const value = items.length ? items.reduce((s, it) => s + it.score, 0) / items.length : 0
    return { axis: DOMAIN_DISPLAY[key], value }
  })
}

/** Legacy helper retained for backward compatibility with callers expecting a flat entry list. */
export interface ObserverEntry {
  category: string
  label: string
  score: number
  note: string
}
export function flattenObserver(observer: ObserverMap): ObserverEntry[] {
  const out: ObserverEntry[] = []
  for (const key of OBSERVER_DOMAIN_KEYS) {
    const dom = observer[key]
    for (const it of dom.items) {
      out.push({ category: DOMAIN_DISPLAY[key], label: it.label, score: it.score, note: it.note })
    }
  }
  return out
}
