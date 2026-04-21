import { commonTranslations } from './sections/common'
import { homeTranslations } from './sections/home'
import { aboutTranslations } from './sections/about'
import { partnersTranslations } from './sections/partners'
import { usexpTranslations } from './sections/usexp'
import { consultTranslations } from './sections/consult'
import { decisionTranslations } from './sections/decision'
import { academicTranslations } from './sections/academic'
import { directionTranslations } from './sections/direction'
import { eliteTranslations } from './sections/elite'
import { howitworksTranslations } from './sections/howitworks'
import { discoveryTranslations } from './sections/discovery'
import { domesticTranslations } from './sections/domestic'
import { storiesTranslations } from './sections/stories'
import { blogTranslations } from './sections/blog'
import { termsTranslations } from './sections/terms'
import { privacyTranslations } from './sections/privacy'
import { pageCtaTranslations } from './sections/pageCta'
import { adminDiagnosisTranslations } from './sections/adminDiagnosis'
import { adminReportTranslations } from './sections/adminReport'
import { adminPresentationTranslations } from './sections/adminPresentation'

export const translations = {
  en: {
    ...commonTranslations.en,
    ...homeTranslations.en,
    ...aboutTranslations.en,
    ...partnersTranslations.en,
    ...usexpTranslations.en,
    ...consultTranslations.en,
    ...decisionTranslations.en,
    ...academicTranslations.en,
    ...directionTranslations.en,
    ...eliteTranslations.en,
    ...howitworksTranslations.en,
    ...discoveryTranslations.en,
    ...domesticTranslations.en,
    ...storiesTranslations.en,
    ...blogTranslations.en,
    ...termsTranslations.en,
    ...privacyTranslations.en,
    ...pageCtaTranslations.en,
    ...adminDiagnosisTranslations.en,
    ...adminReportTranslations.en,
    ...adminPresentationTranslations.en,
  },
  ko: {
    ...commonTranslations.ko,
    ...homeTranslations.ko,
    ...aboutTranslations.ko,
    ...partnersTranslations.ko,
    ...usexpTranslations.ko,
    ...consultTranslations.ko,
    ...decisionTranslations.ko,
    ...academicTranslations.ko,
    ...directionTranslations.ko,
    ...eliteTranslations.ko,
    ...howitworksTranslations.ko,
    ...discoveryTranslations.ko,
    ...domesticTranslations.ko,
    ...storiesTranslations.ko,
    ...blogTranslations.ko,
    ...termsTranslations.ko,
    ...privacyTranslations.ko,
    ...pageCtaTranslations.ko,
    ...adminDiagnosisTranslations.ko,
    ...adminReportTranslations.ko,
    ...adminPresentationTranslations.ko,
  },
} as const satisfies Record<string, Record<string, unknown>>

export type TranslationKey = keyof typeof translations.en
