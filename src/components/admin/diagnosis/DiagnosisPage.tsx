import { useState, useCallback } from 'react'
import { Navbar } from '../../Navbar'
import { ParentSurvey } from './ParentSurvey'
import { ObserverChecklist } from './ObserverChecklist'
import { DiagnosisResult } from './DiagnosisResult'
import { PresentationMode } from './PresentationMode'
import { DEFAULT_DIAGNOSIS, type DiagnosisData } from '../../../data/diagnosis-template'
import { useLanguage } from '../../../context/LanguageContext'

type TabId = 'parent' | 'observer' | 'result'

const STORAGE_KEY = '169av-diagnosis'

function loadSaved(): DiagnosisData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { ...DEFAULT_DIAGNOSIS, id: crypto.randomUUID?.() || Date.now().toString() }
}

export function DiagnosisPage() {
  const [data, setData] = useState<DiagnosisData>(loadSaved)
  const [tab, setTab] = useState<TabId>('parent')
  const [presenting, setPresenting] = useState(false)
  const { t } = useLanguage()

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'parent', label: t.diag_tab_parent, icon: 'family_restroom' },
    { id: 'observer', label: t.diag_tab_observer, icon: 'checklist' },
    { id: 'result', label: t.diag_tab_result, icon: 'analytics' },
  ]

  const handleChange = useCallback((next: DiagnosisData) => {
    setData(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const handleReset = () => {
    if (!confirm(t.diag_reset_confirm)) return
    const fresh = { ...DEFAULT_DIAGNOSIS, id: crypto.randomUUID?.() || Date.now().toString() }
    setData(fresh)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl text-primary tracking-tight">{t.diag_page_title}</h1>
            <p className="font-body text-sm text-on-surface-variant/50 mt-1">
              {data.parent.studentName || t.diag_new} | {data.createdAt}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset}
              className="px-5 py-2.5 font-body text-sm text-primary/50 border border-outline-variant/30 hover:border-primary/30 hover:text-primary transition-colors">
              {t.diag_reset}
            </button>
            <button onClick={() => setPresenting(true)}
              className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">slideshow</span>
              {t.diag_present}
            </button>
          </div>
        </div>

        <div className="flex border-b border-outline-variant/15 mb-8">
          {TABS.map((tab_) => (
            <button key={tab_.id} onClick={() => setTab(tab_.id)}
              className={`flex items-center gap-2 px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px ${
                tab === tab_.id ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant/50 hover:text-primary'
              }`}>
              <span className="material-symbols-outlined text-base">{tab_.icon}</span>
              {tab_.label}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-outline-variant/10 p-8">
          {tab === 'parent' && <ParentSurvey data={data} onChange={handleChange} />}
          {tab === 'observer' && <ObserverChecklist data={data} onChange={handleChange} />}
          {tab === 'result' && <DiagnosisResult data={data} onChange={handleChange} />}
        </div>

        <p className="font-body text-xs text-on-surface-variant/30 mt-4 text-center">
          {t.diag_autosave_note}
        </p>
      </main>

      {presenting && <PresentationMode data={data} onClose={() => setPresenting(false)} />}
    </>
  )
}
