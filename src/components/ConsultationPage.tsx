import { useState, useRef, useEffect, useMemo, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SearchOverlay } from './SearchOverlay'
import { getAllUniversities } from '../data/university-utils'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function UniversitySearchInput() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const allUniversities = useMemo(() => getAllUniversities(), [])

  const results = useMemo(() => {
    if (query.length < 1) return []
    const q = query.toLowerCase()
    return allUniversities
      .filter(u => !selected.includes(u.name) &&
        (u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)))
      .slice(0, 8)
  }, [query, selected, allUniversities])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (name: string) => {
    if (selected.length < 3) setSelected(prev => [...prev, name])
    setQuery('')
    setOpen(false)
  }

  const remove = (name: string) => {
    setSelected(prev => prev.filter(s => s !== name))
  }

  return (
    <div ref={containerRef} className="space-y-3 md:col-span-2">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((name, i) => (
            <div key={name} className="flex items-center gap-2 bg-surface-container px-3 py-2 border border-outline-variant/20">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary">{name}</span>
              <button
                type="button"
                onClick={() => remove(name)}
                className="text-outline-variant hover:text-primary transition-colors ml-1"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>close</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input — hidden once 3 selected */}
      {selected.length < 3 && (
        <div className="relative">
          <div className="flex items-center border-b border-outline-variant focus-within:border-secondary transition-colors gap-3">
            <span
              className="material-symbols-outlined text-outline-variant/50"
              style={{ fontVariationSettings: "'wght' 200", fontSize: '18px' }}
            >
              search
            </span>
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => { if (query) setOpen(true) }}
              placeholder={selected.length === 0
                ? t.consult_search_placeholder
                : t.add_more(3 - selected.length)}
              className="flex-1 bg-transparent py-3 md:py-4 font-body text-sm md:font-headline md:text-xl md:italic placeholder:text-stone-300 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); setQuery(''); setOpen(false) }}
                className="text-outline-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Dropdown */}
          {open && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-surface border border-outline-variant/20 shadow-xl z-20 max-h-56 overflow-y-auto">
              {results.map(u => (
                <button
                  key={u.name}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); select(u.name) }}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-surface-container-low transition-colors group border-b border-outline-variant/10 last:border-0"
                >
                  <div>
                    <p className="font-headline text-sm md:text-base text-primary group-hover:text-secondary transition-colors">
                      {u.name}
                    </p>
                    <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">
                      {u.city}, {u.country}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-xs text-outline-variant group-hover:text-secondary transition-colors">add</span>
                </button>
              ))}
            </div>
          )}

          {open && query.length > 0 && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 bg-surface border border-outline-variant/20 shadow-xl z-20 px-4 py-3">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">{t.consult_no_results}</p>
            </div>
          )}
        </div>
      )}

      {selected.length === 3 && (
        <p className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.consult_max_selected}</p>
      )}
    </div>
  )
}

const COUNTRY_CODES: { code: string; label: string; placeholder: string }[] = [
  { code: '+1',   label: '+1  US / CA', placeholder: '202-555-0100' },
  { code: '+44',  label: '+44  UK',     placeholder: '7700 900123' },
  { code: '+82',  label: '+82  KR',     placeholder: '10-1234-5678' },
  { code: '+81',  label: '+81  JP',     placeholder: '90-1234-5678' },
  { code: '+86',  label: '+86  CN',     placeholder: '131-0000-0000' },
  { code: '+852', label: '+852 HK',     placeholder: '9123 4567' },
  { code: '+65',  label: '+65  SG',     placeholder: '9123 4567' },
  { code: '+61',  label: '+61  AU',     placeholder: '412 345 678' },
  { code: '+49',  label: '+49  DE',     placeholder: '151 23456789' },
  { code: '+33',  label: '+33  FR',     placeholder: '6 12 34 56 78' },
  { code: '+39',  label: '+39  IT',     placeholder: '312 345 6789' },
  { code: '+34',  label: '+34  ES',     placeholder: '612 345 678' },
  { code: '+31',  label: '+31  NL',     placeholder: '6 12345678' },
  { code: '+41',  label: '+41  CH',     placeholder: '79 123 45 67' },
  { code: '+46',  label: '+46  SE',     placeholder: '70-123 45 67' },
  { code: '+7',   label: '+7   RU',     placeholder: '912 345-67-89' },
  { code: '+971', label: '+971 AE',     placeholder: '50 123 4567' },
  { code: '+91',  label: '+91  IN',     placeholder: '98765 43210' },
  { code: '+55',  label: '+55  BR',     placeholder: '11 91234-5678' },
  { code: '+52',  label: '+52  MX',     placeholder: '55 1234 5678' },
]

const OFFICES = [
  { city: 'Seoul', district: 'Gangnam-gu' },
  { city: 'New York', district: 'Madison Ave' },
  { city: 'London', district: 'Mayfair' },
]

function MobileConsultation() {
  const [submitted, setSubmitted] = useState(false)
  const [countryCode, setCountryCode] = useState('+82')
  const [searchOpen, setSearchOpen] = useState(false)
  const phonePlaceholder = COUNTRY_CODES.find(c => c.code === countryCode)?.placeholder ?? '000-0000'
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">169 Avenue</Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="text-primary/70 p-1" aria-label="Search">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <div className="flex items-center border border-outline-variant/30 overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'en' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >EN</button>
            <span className="w-px h-3 bg-outline-variant/30" />
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'ko' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >한</button>
          </div>
        </div>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <main className="pt-28 pb-20 px-6 max-w-lg mx-auto">
        {submitted ? (
          <div className="py-20 text-center space-y-8">
            <span className="material-symbols-outlined text-secondary text-6xl">check_circle</span>
            <h2 className="font-headline text-3xl italic text-primary">{t.consult_success_title}</h2>
            <p className="font-body text-on-surface-variant text-sm max-w-xs mx-auto leading-relaxed">
              {t.consult_success_body}
            </p>
            <Link to="/" className="inline-block bg-primary text-on-primary px-10 py-4 text-xs tracking-widest uppercase">
              {t.return_home}
            </Link>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="mb-12">
              <h2 className="font-headline italic text-3xl text-primary leading-tight tracking-tighter mb-4">
                {language === 'ko' ? '무료 가능성 진단 받기' : 'Free Feasibility Diagnosis'}
              </h2>
              <p className="text-sm font-body text-on-surface-variant opacity-80 max-w-[300px] leading-relaxed">
                {language === 'ko'
                  ? '입력하신 정보를 바탕으로 지원 가능 대학과 전략을 안내드립니다.'
                  : 'Based on the information you provide, we\'ll present target universities and a strategic direction.'
                }
              </p>
            </section>

            {/* Form - same fields as desktop */}
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              {/* Personal Narrative */}
              <div className="flex items-center space-x-3 border-b border-outline-variant/30 pb-3">
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">01</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step1}</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_name} <span className="text-secondary">*</span></label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. James Whitmore" type="text" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_email} <span className="text-secondary">*</span></label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="contact@example.com" type="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_phone}</label>
                <div className="flex items-end gap-2 border-b border-outline-variant focus-within:border-secondary transition-colors">
                  <select
                    className="bg-transparent py-3 font-body text-sm appearance-none focus:outline-none text-primary shrink-0 pr-1"
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                  >
                    {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                  <span className="text-outline-variant/40 pb-3">|</span>
                  <input className="flex-1 bg-transparent py-3 font-body text-sm placeholder:text-stone-300 focus:outline-none" placeholder={phonePlaceholder} type="tel" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_residency}</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder={t.consult_residency_placeholder} type="text" />
              </div>

              {/* Academic Background */}
              <div className="flex items-center space-x-3 border-b border-outline-variant/30 pb-3 mt-6">
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">02</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step2}</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">School Location <span className="text-secondary">*</span></label>
                <div className="relative">
                  <select className="appearance-none w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>Select location</option>
                    {SCHOOL_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none text-outline-variant">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Grade Level <span className="text-secondary">*</span></label>
                <div className="relative">
                  <select className="appearance-none w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>Select grade</option>
                    {GRADE_LEVELS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none text-outline-variant">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Curriculum <span className="text-secondary">*</span></label>
                <div className="relative">
                  <select className="appearance-none w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>Select curriculum</option>
                    {CURRICULUMS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none text-outline-variant">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">GPA / Expected Grade</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. 3.8/4.0, A*AA, 42/45 IB" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">IB / AP Score (if applicable)</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. IB 42/45, AP 5 (Calc BC), AP 4 (Econ)" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Intended Major <span className="text-secondary">*</span></label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. Computer Science, Economics" type="text" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Preferred Universities</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. MIT, Stanford, Oxford" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Admission Type <span className="text-secondary">*</span></label>
                <div className="relative">
                  <select className="appearance-none w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>Select type</option>
                    {ADMISSION_TYPES.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none text-outline-variant">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_level} <span className="text-secondary">*</span></label>
                <div className="relative">
                  <select className="appearance-none w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>{t.consult_level_placeholder}</option>
                    {STUDY_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none text-outline-variant">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_commencement}</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder={t.consult_commencement_placeholder} type="text" />
              </div>

              {/* Institutions of Interest */}
              <div className="flex items-center space-x-3 border-b border-outline-variant/30 pb-3 mt-6">
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">03</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step3}</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">
                  {t.consult_universities} <span className="text-on-surface-variant/40 normal-case font-normal">{t.consult_universities_sub}</span>
                </label>
                <UniversitySearchInput />
              </div>

              {/* Extracurricular Activities */}
              <div className="flex items-center space-x-3 border-b border-outline-variant/30 pb-3 mt-6">
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">04</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Extracurricular Activities</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Activities & Achievements</label>
                <textarea className="bg-surface-container-low border-none p-6 font-body text-sm placeholder:text-on-surface-variant/40 focus:bg-surface-container-lowest focus:outline-none transition-colors resize-none" placeholder="가장 오래 한 활동 또는 전공과 관련된 경험을 간단히 적어주세요 / Longest activity or major-related experience" rows={3} />
              </div>

              {/* Additional Questions */}
              <div className="flex items-center space-x-3 border-b border-outline-variant/30 pb-3 mt-6">
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">05</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Tell Us More</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Your strongest subject</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. Mathematics, Biology, Economics" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Why this major?</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="Brief reason for your major choice" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Your biggest concern right now</label>
                <input className="bg-transparent border-t-0 border-x-0 border-b border-outline-variant py-3 px-0 font-body text-sm focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. Not sure if my grades are competitive enough" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.consult_notes_label}</label>
                <textarea className="bg-surface-container-low border-none p-6 font-body text-sm placeholder:text-on-surface-variant/40 focus:bg-surface-container-lowest focus:outline-none transition-colors resize-none" placeholder={t.consult_notes_placeholder} rows={3} />
              </div>

              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant"><span className="text-secondary">*</span> {t.consult_required}</p>

              <div>
                <button type="submit" className="w-full bg-primary text-on-primary py-5 font-label uppercase tracking-[0.2em] text-xs active:scale-95 transition-all duration-300">
                  {language === 'ko' ? '전략 진단 요청하기' : 'Request Strategy Diagnosis'}
                </button>
                <p className="mt-4 font-label text-[9px] tracking-widest text-on-surface-variant/60 text-center">
                  {language === 'ko'
                    ? '입력하신 정보를 바탕으로 맞춤 전략을 안내드립니다.'
                    : 'We\'ll present a personalized strategy based on your information.'
                  }
                </p>
              </div>
            </form>

            {/* Discretion Note */}
            <section className="mt-20 flex flex-col items-center text-center gap-12">
              <div className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <p className="font-headline italic text-lg text-primary">{t.consult_discretion}</p>
                <p className="text-xs font-body text-on-surface-variant/60 max-w-[240px] leading-relaxed">
                  {t.consult_discretion_body}
                </p>
              </div>

              {/* Global Offices */}
              <div className="w-full h-px bg-outline-variant opacity-20" />
              <div className="flex flex-col gap-6 w-full">
                <p className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant/40">{t.consult_offices}</p>
                <div className="grid grid-cols-3 gap-4">
                  {OFFICES.map((office, i) => (
                    <div key={office.city} className={`flex flex-col gap-1 ${i === 1 ? 'border-x border-outline-variant/20' : ''}`}>
                      <span className="text-[10px] font-bold text-primary uppercase">{office.city}</span>
                      <span className="text-[9px] text-on-surface-variant/50 uppercase">{office.district}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low py-12 px-6 flex flex-col items-center text-center gap-6">
        <div className="font-headline italic text-lg text-primary">169 Avenue</div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">About</Link>
          <Link to="/services" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Partners</Link>
        </div>
        <div className="text-[10px] font-body text-on-surface-variant/30 mt-4">&copy; 2025 169 Avenue. The Digital Curator.</div>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/about" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">info</span>
          <span className="text-[8px] font-label uppercase tracking-widest">About</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">handshake</span>
          <span className="text-[8px] font-label uppercase tracking-widest">Partners</span>
        </Link>
        <Link to="/field" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">school</span>
          <span className="text-[8px] font-label uppercase tracking-widest">Field</span>
        </Link>
        <Link to="/destinations" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">public</span>
          <span className="text-[8px] font-label uppercase tracking-widest">Destinations</span>
        </Link>
        <Link to="/stories" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          <span className="text-[8px] font-label uppercase tracking-widest">Stories</span>
        </Link>
      </nav>
    </div>
  )
}

// ============================================================
// Desktop Consultation (unchanged)
// ============================================================

const CURRICULUMS = [
  'IB (International Baccalaureate)',
  'AP (Advanced Placement)',
  'A-Level',
  'American Curriculum',
  'Korean Curriculum',
  'Other',
]

const SCHOOL_LOCATIONS = [
  'South Korea',
  'United States',
  'Southeast Asia',
  'Europe',
  'China / Japan',
  'Other',
]

const GRADE_LEVELS = [
  'Grade 10 (High School Sophomore)',
  'Grade 11 (High School Junior)',
  'Grade 12 (High School Senior)',
  'University Student',
  'Gap Year / Other',
]

const ADMISSION_TYPES = [
  'Freshman Admission',
  'Transfer Admission',
  'Not sure yet',
]

const STUDY_LEVELS = [
  'Elite Boarding Prep',
  'Undergraduate Ivy/Oxbridge',
  'Postgraduate Research',
  'MBA / Law / Medical',
]


const FULL_OFFICES = [
  { city: 'Seoul', address: 'Cheongdam-dong, Gangnam-gu', detail: 'Private Academic Salon', phone: '+82 2-555-0000' },
  { city: 'London', address: 'Mayfair, St James\'s Place', detail: 'Curatorial Suite', phone: '+44 20 7946 0000' },
  { city: 'New York', address: 'Upper East Side, 5th Ave', detail: 'The Atelier Tower', phone: '+1 212-555-0100' },
]

export function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [countryCode, setCountryCode] = useState('+82')
  const phonePlaceholder = COUNTRY_CODES.find(c => c.code === countryCode)?.placeholder ?? '000-0000'
  const { t, language } = useLanguage()
  usePageTitle('무료 가능성 진단 - Free Diagnosis')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-surface selection:bg-secondary/20">
      {/* Desktop Nav */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Desktop Content */}
      <main className="hidden md:block pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-none tracking-tight mb-8">
                {language === 'ko' ? '무료 가능성 진단' : 'Free Feasibility'} <br />
                <span className="italic font-light">{language === 'ko' ? '받기' : 'Diagnosis'}</span>
              </h1>
              <p className="font-headline italic text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
                {language === 'ko'
                  ? '입력하신 정보를 바탕으로 지원 가능 대학과 전략을 안내드립니다.'
                  : 'Based on your information, we\'ll present target universities and a strategic direction.'
                }
              </p>
            </div>
            <div className="hidden md:block md:col-span-4 pb-4">
              <div className="w-full aspect-[3/4] overflow-hidden grayscale contrast-125 opacity-90">
                <img alt="Classical architectural detail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIJuanZH--r2rB6b7w1He3VUDciTPOw-sEVJoxUYT3cj8DzinO5w2pBMA3Fhp-hMrtCA0-SLBu3DLggvRWqgzHlCMTrqtSrgqUd3W1dB98P3TNtG6eurYzvOKBjtuj8tbys93p1Xr719RdoUGseJ8cqlXoOlbG00ggGUFSbqnVTehsDaI6p54yfZaKusZorGKl0F13NtN9EuEe-IeRVCzQl5PYas7RmEZX9UPhxNsqv1jfAjsEcbKQwnqjDU1uTeM4OYQObmzDLps" />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="py-20 text-center space-y-8">
                <span className="material-symbols-outlined text-secondary text-6xl">check_circle</span>
                <h2 className="font-headline text-4xl italic text-primary">{t.consult_success_title_desktop}</h2>
                <p className="font-body text-on-surface-variant text-lg max-w-md mx-auto leading-relaxed">{t.consult_success_body}</p>
                <Link to="/" className="inline-block bg-primary text-on-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-secondary transition-all mt-8">{t.home}</Link>
              </div>
            ) : (
              <form className="space-y-24" onSubmit={handleSubmit}>
                {/* Step 1 */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">01</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step1}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_name} <span className="text-secondary">*</span></label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. James Whitmore" type="text" required />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_email} <span className="text-secondary">*</span></label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="contact@example.com" type="email" required />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_phone}</label>
                      <div className="flex items-end gap-3 border-b border-outline-variant focus-within:border-secondary transition-colors">
                        <select
                          className="bg-transparent py-4 font-headline text-xl italic appearance-none focus:outline-none text-primary shrink-0 pr-2"
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                        >
                          {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                        </select>
                        <span className="text-outline-variant/40 pb-4">|</span>
                        <input className="flex-1 bg-transparent py-4 font-headline text-xl italic placeholder:text-stone-300 focus:outline-none" placeholder={phonePlaceholder} type="tel" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_residency}</label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder={t.consult_residency_placeholder} type="text" />
                    </div>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">02</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step2}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">School Location <span className="text-secondary">*</span></label>
                      <select className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                        <option value="" disabled>Select location</option>
                        {SCHOOL_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Grade Level <span className="text-secondary">*</span></label>
                      <select className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                        <option value="" disabled>Select grade</option>
                        {GRADE_LEVELS.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Curriculum <span className="text-secondary">*</span></label>
                      <select className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                        <option value="" disabled>Select curriculum</option>
                        {CURRICULUMS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">GPA / Expected Grade</label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. 3.8/4.0, A*AA, 42/45 IB" type="text" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">IB / AP Score (if applicable)</label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. IB 42/45, AP 5 (Calc BC)" type="text" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Intended Major <span className="text-secondary">*</span></label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. Computer Science, Economics" type="text" required />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Preferred Universities</label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder="e.g. MIT, Stanford, Oxford" type="text" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Admission Type <span className="text-secondary">*</span></label>
                      <select className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                        <option value="" disabled>Select type</option>
                        {ADMISSION_TYPES.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_level} <span className="text-secondary">*</span></label>
                      <select className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors" required defaultValue="">
                        <option value="" disabled>{t.consult_level_placeholder}</option>
                        {STUDY_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_commencement}</label>
                      <input className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors" placeholder={t.consult_commencement_placeholder} type="text" />
                    </div>
                  </div>
                </div>
                {/* Step 3 — Institutions of Interest */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">03</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step3}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {t.consult_universities} <span className="text-on-surface-variant/40">{t.consult_universities_sub}</span>
                      </label>
                      <UniversitySearchInput />
                    </div>
                  </div>
                </div>
                {/* Step 4 — Extracurricular Activities */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">04</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">Extracurricular Activities</h2>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Activities & Achievements</label>
                    <textarea className="bg-surface-container-low border-none p-8 font-headline text-xl italic placeholder:text-stone-400 focus:bg-surface-container-lowest focus:outline-none transition-colors" placeholder="가장 오래 한 활동 또는 전공과 관련된 경험을 간단히 적어주세요 / Longest activity or major-related experience" rows={4} />
                  </div>
                </div>
                {/* Step 5 */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">05</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">{t.consult_step4}</h2>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.consult_notes_label}</label>
                    <textarea className="bg-surface-container-low border-none p-8 font-headline text-xl italic placeholder:text-stone-400 focus:bg-surface-container-lowest focus:outline-none transition-colors" placeholder={t.consult_notes_placeholder} rows={4} />
                  </div>
                </div>
                {/* Submit */}
                <div className="pt-8">
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8"><span className="text-secondary">*</span> {t.consult_required}</p>
                </div>
                <div>
                  <button type="submit" className="group flex items-center space-x-6 bg-primary text-on-primary px-12 py-6 hover:bg-secondary transition-all duration-500">
                    <span className="font-label text-xs uppercase tracking-[0.3em]">{language === 'ko' ? '전략 진단 요청하기' : 'Request Strategy Diagnosis'}</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </button>
                  <p className="mt-6 font-label text-[9px] tracking-widest text-on-surface-variant opacity-60">
                    {language === 'ko' ? '입력하신 정보를 바탕으로 맞춤 전략을 안내드립니다.' : 'We\'ll present a personalized strategy based on your information.'}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-20">
            <div className="bg-surface-container-lowest p-10 shadow-[0_10px_40px_-10px_rgba(0,1,1,0.04)] border border-surface-container">
              <span className="material-symbols-outlined text-secondary mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              <p className="font-headline italic text-xl leading-relaxed text-primary mb-8">{t.consult_sidebar_quote}</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-secondary" />
                <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">{t.consult_sidebar_director}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'wght' 200" }}>verified_user</span>
                <div>
                  <h4 className="font-label text-[11px] uppercase tracking-widest font-bold text-primary mb-2">{t.consult_verified}</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{t.consult_verified_body}</p>
                </div>
              </div>
            </div>
            <div className="aspect-video bg-surface-container-high relative overflow-hidden">
              <img alt="London street view" className="w-full h-full object-cover grayscale brightness-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ9ttfmvUbJ6W2BkaCHf0lJ7NdRnv0Rt7ovPhdKH51Yyqax8YuriNeEghuudsiw8o8_g6ZRr3S0Z-PlamFmc2qYRtNTkHRqtQzi4NDinnpqvy_zffDifUwWYmtrBDoQJ_AIQ8kFcXWraT15btYH_G6j0teYoK80Pxp_echfGGl_tBJfAbD0pCTHYFmjXH9_Py7gCYvr4e95I_1tkuch-EkibaW51UWjpTnLLs-YkvdGwJtolG7dERLWd6PcsvYzDFmdtZVj8CIwwk" />
              <div className="absolute inset-0 bg-secondary/5" />
              <div className="absolute bottom-6 left-6"><span className="font-label text-[10px] uppercase tracking-widest text-white bg-primary px-3 py-1">{t.consult_london}</span></div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section id="offices" className="mt-40 border-t border-outline-variant/30 pt-20 px-6 md:px-12 max-w-7xl mx-auto">
          <h3 className="font-headline text-3xl italic text-primary mb-16">{t.consult_offices_full}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FULL_OFFICES.map((office) => (
              <div key={office.city} className="space-y-4">
                <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-primary">{office.city}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-loose">{office.address}<br />{office.detail}<br />{office.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile */}
      <MobileConsultation />
    </div>
  )
}
