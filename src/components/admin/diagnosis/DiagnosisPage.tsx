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
  const { language } = useLanguage()
  const ko = language === 'ko'

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'parent', label: ko ? '학부모 설문' : 'Parent Survey', icon: 'family_restroom' },
    { id: 'observer', label: ko ? '관찰 체크리스트' : 'Observer', icon: 'checklist' },
    { id: 'result', label: ko ? '진단 결과' : 'Result', icon: 'analytics' },
  ]

  const handleChange = useCallback((next: DiagnosisData) => {
    setData(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const handleReset = () => {
    if (!confirm(ko ? '모든 진단 데이터를 초기화하시겠습니까?' : 'Reset all diagnosis data? This cannot be undone.')) return
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
            <h1 className="font-headline text-3xl text-primary tracking-tight">{ko ? '학생 진단' : 'Student Diagnosis'}</h1>
            <p className="font-body text-sm text-on-surface-variant/50 mt-1">
              {data.parent.studentName || (ko ? '새 진단' : 'New diagnosis')} | {data.createdAt}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset}
              className="px-5 py-2.5 font-body text-sm text-primary/50 border border-outline-variant/30 hover:border-primary/30 hover:text-primary transition-colors">
              {ko ? '초기화' : 'Reset'}
            </button>
            <button onClick={() => setPresenting(true)}
              className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">slideshow</span>
              {ko ? '프레젠테이션' : 'Present'}
            </button>
          </div>
        </div>

        <div className="flex border-b border-outline-variant/15 mb-8">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px ${
                tab === t.id ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant/50 hover:text-primary'
              }`}>
              <span className="material-symbols-outlined text-base">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-outline-variant/10 p-8">
          {tab === 'parent' && <ParentSurvey data={data} onChange={handleChange} />}
          {tab === 'observer' && <ObserverChecklist data={data} onChange={handleChange} />}
          {tab === 'result' && <DiagnosisResult data={data} onChange={handleChange} />}
        </div>

        <p className="font-body text-xs text-on-surface-variant/30 mt-4 text-center">
          {ko ? '데이터는 이 브라우저에 자동 저장됩니다.' : 'Data is auto-saved to this browser.'}
        </p>
      </main>

      {presenting && <PresentationMode data={data} onClose={() => setPresenting(false)} />}
    </>
  )
}
