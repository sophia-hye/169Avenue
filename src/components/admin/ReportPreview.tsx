import { forwardRef } from 'react'
import type { ReportData } from '../../data/report-template'
import { PERSONALITY_LABELS } from '../../data/report-template'

const C = {
  accent: '#6b4f4f', blue: '#43586b', olive: '#8b8469', brown: '#9c7a5a',
  gray: '#756c67', bg: '#ece7e1', paper: '#f9f7f3', ink: '#2c2c2c',
  muted: '#6f6a64', line: '#ddd5ca', beige: '#efe7dc',
}
const BAR_BG: Record<string, string> = { accent: C.accent, gray: C.gray, blue: C.blue }

function Stars({ count }: { count: number }) {
  return <span style={{ color: C.accent, letterSpacing: '0.15em', fontSize: 15 }}>
    {Array.from({ length: 5 }, (_, i) => i < count ? '\u2605' : '\u2606').join('')}
  </span>
}

function Divider() {
  return (
    <div style={{ width: 180, height: 1, background: C.line, margin: '10px auto 8px', position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 38, height: 3, transform: 'translate(-50%,-50%)', background: C.accent, borderRadius: 999 }} />
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return <div style={{ textAlign: 'center', marginBottom: 24 }}><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 34, fontWeight: 500, margin: 0 }}>{title}</h2><Divider /></div>
}

const page: React.CSSProperties = {
  background: C.paper, width: '210mm', minHeight: '297mm', padding: '56px 42px',
  boxShadow: '0 8px 24px rgba(44,44,44,0.08)', border: '1px solid rgba(0,0,0,0.04)',
  fontFamily: '"Inter", "Pretendard", "Noto Sans KR", Arial, sans-serif',
  color: C.ink, lineHeight: 1.6, boxSizing: 'border-box', pageBreakAfter: 'always',
}

export const ReportPreview = forwardRef<HTMLDivElement, { data: ReportData }>(({ data }, ref) => {
  const roadmapColors = [C.olive, C.accent, '#5b342f']
  const roadmapIcons = ['?', '\u25D0', '\u25C9']

  return (
    <div ref={ref} style={{ background: C.bg, padding: '40px 28px 80px' }}>
      {/* PAGE 1: Cover */}
      <section style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 18 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.muted }}>{data.programName}</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 500, margin: 0 }}>Student Growth Report</h1>
        <Divider />
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 500 }}>{data.studentName || 'Student Name'}</div>
        {data.grade && <div style={{ color: C.muted, fontSize: 16 }}>{data.grade}</div>}
        <div style={{ color: C.muted, fontSize: 14 }}>{data.programName}{data.programPeriod ? ` | ${data.programPeriod}` : ''}</div>
        <div style={{ color: C.muted, fontSize: 14 }}>{data.date}</div>
        {data.observer && <div style={{ color: C.muted, fontSize: 13, marginTop: 8 }}>Observer: {data.observer}</div>}
      </section>

      {/* PAGE 2: Executive Summary */}
      <section style={page}>
        <SectionHeader title="Executive Summary" />
        <div style={{ background: C.beige, border: '1px solid rgba(107,79,79,0.08)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: '#403c38', margin: 0, lineHeight: 1.8 }}>{data.summaryText || 'Summary will appear here.'}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { icon: '\u2726', label: 'Strength', value: data.strength, bg: C.brown },
            { icon: '\u2197', label: 'Direction', value: data.direction, bg: C.accent },
            { icon: '#', label: 'Keywords', value: data.keywords, bg: C.blue },
          ].map((card) => (
            <div key={card.label} style={{ background: '#f4eee6', border: `1px solid ${C.line}`, borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: card.bg, color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, margin: '0 0 6px' }}>{card.label}</h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.45, margin: 0, whiteSpace: 'pre-line' }}>{card.value || '-'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 3: Area Assessments */}
      <section style={page}>
        <SectionHeader title="Area Assessment" />

        {/* English / Communication + Learning Attitude */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, marginBottom: 14, color: C.accent }}>English / Communication & Learning Attitude</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.skills.map((skill) => (
              <div key={skill.name} style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${C.line}`, borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: C.blue, color: '#fff', fontSize: 14, flexShrink: 0 }}>{skill.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{skill.name}</span>
                      <Stars count={skill.stars} />
                    </div>
                    <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>{skill.description || '-'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exploration Areas */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, marginBottom: 14, color: C.accent }}>Exploration Areas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {data.explorations.map((exp, i) => (
            <div key={exp.name} style={{ background: '#f4eee6', border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? C.olive : C.brown, color: '#fff', fontSize: 14, flexShrink: 0 }}>{exp.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{exp.name}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{exp.description || '-'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 4: Personality Analysis */}
      <section style={page}>
        <SectionHeader title="Personality Analysis" />

        {/* Profile Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
          {data.profileBars.map((bar) => (
            <div key={bar.label} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 14, alignItems: 'center' }}>
              <label style={{ fontSize: 15, fontWeight: 600, color: '#4a4642' }}>{bar.label}</label>
              <div style={{ height: 28, background: '#e3ddd4', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${bar.percent}%`, background: BAR_BG[bar.color] }} />
              </div>
            </div>
          ))}
        </div>

        {/* Type Badges */}
        <div style={{ background: C.beige, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, margin: '0 0 16px' }}>Personality Type</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {data.primaryType.map((t) => {
              const info = PERSONALITY_LABELS[t]
              return (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `2px solid ${info.color}`, borderRadius: 8, padding: '10px 16px' }}>
                  <span style={{ fontSize: 18 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: info.color }}>{info.en} ({info.ko})</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{info.desc_en}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Analysis Note */}
        <div style={{ background: 'rgba(255,255,255,0.5)', borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
          <p style={{ fontSize: 15, color: '#4f4a45', margin: 0, lineHeight: 1.8 }}>{data.analysisNote || 'Comprehensive diagnosis will appear here.'}</p>
        </div>
      </section>

      {/* PAGE 5: Growth Roadmap */}
      <section style={page}>
        <SectionHeader title="Recommended Growth Direction" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {data.roadmap.map((entry, i) => (
            <div key={entry.period} style={{ position: 'relative', paddingLeft: 46, paddingBottom: 14, borderBottom: i < data.roadmap.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ position: 'absolute', left: 0, top: 2, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, background: roadmapColors[i] || C.olive }}>{roadmapIcons[i]}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginBottom: 8 }}>{entry.period}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 14 }}>
                {entry.items.filter(Boolean).map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 6: Recommended Programs */}
      <section style={page}>
        <SectionHeader title="Recommended Next Steps" />
        <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', background: C.beige, border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden' }}>
          {data.recommendedSteps.filter(Boolean).map((step, i) => (
            <li key={i} style={{ padding: '24px 26px', fontSize: 18, borderBottom: i < data.recommendedSteps.length - 1 ? '1px solid rgba(107,79,79,0.14)' : 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 34, color: C.accent, minWidth: 34, lineHeight: 1 }}>{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: C.muted, margin: 0, fontStyle: 'italic' }}>
            This report is not an evaluation. It is a future design document.
          </p>
        </div>
      </section>

      {/* PAGE 7: Closing */}
      <section style={{ ...page, pageBreakAfter: 'auto' }}>
        <SectionHeader title="Moving Forward" />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: 60, gap: 30 }}>
          <p style={{ maxWidth: '72%', fontSize: 24, lineHeight: 1.7, color: '#443f3a', fontStyle: 'italic', margin: 0 }}>
            {data.closingMessage || 'Closing message will appear here.'}
          </p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: C.accent, color: '#fff', padding: '14px 28px', fontWeight: 600, letterSpacing: '0.01em', boxShadow: '0 6px 18px rgba(107,79,79,0.22)' }}>
            {'\u2192'} Free Consultation
          </span>
        </div>
      </section>
    </div>
  )
})

ReportPreview.displayName = 'ReportPreview'
