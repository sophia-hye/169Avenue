import { forwardRef } from 'react'
import type { ReportData } from '../../data/report-template'
import { PERSONALITY_LABELS } from '../../data/report-template'

/* ── Quiet Luxury Design Tokens ── */
const T = {
  ink: '#2C2C2C',
  sub: '#F5F1EB',
  accent: '#6B4F4F',
  line: '#E5E0D8',
  paper: '#FAFAF7',
  muted: '#9B958D',
  body: '#5A5550',
  card: '#FFFFFF',
  olive: '#7A7560',
  blue: '#4A5F78',
  serif: '"Playfair Display", "Noto Serif KR", Georgia, serif',
  sans: '"Pretendard", "Noto Sans KR", "Inter", sans-serif',
}

const page: React.CSSProperties = {
  background: T.paper,
  width: '210mm',
  minHeight: '297mm',
  padding: '60px 40px',
  fontFamily: T.sans,
  color: T.ink,
  lineHeight: 1.6,
  boxSizing: 'border-box',
  pageBreakAfter: 'always',
  position: 'relative',
}

/* ── Shared Components ── */

function Stars({ count }: { count: number }) {
  return (
    <span style={{ color: T.accent, letterSpacing: '0.25em', fontSize: 14 }}>
      {Array.from({ length: 5 }, (_, i) => i < count ? '\u2605' : '\u2606').join('')}
    </span>
  )
}

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {sub && <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.muted, marginBottom: 8 }}>{sub}</div>}
      <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 400, margin: 0, color: T.ink }}>{title}</h2>
      <div style={{ width: 36, height: 2, background: T.accent, marginTop: 14 }} />
    </div>
  )
}

function Pg({ n }: { n: number }) {
  return <div style={{ position: 'absolute', bottom: 36, right: 40, fontSize: 10, color: T.muted, letterSpacing: '0.15em' }}>{String(n).padStart(2, '0')}</div>
}

function Footer() {
  return (
    <div style={{ position: 'absolute', bottom: 36, left: 40, display: 'flex', alignItems: 'center', gap: 4 }}>
      <img src="/169Avenue/logo.png" alt="" style={{ height: 18, filter: 'brightness(0)', opacity: 0.2 }} />
      <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.line }}>169 Avenue</span>
    </div>
  )
}

/* ── Report ── */

export const ReportPreview = forwardRef<HTMLDivElement, { data: ReportData }>(({ data }, ref) => {
  return (
    <div ref={ref} style={{ background: '#E8E4DE', padding: '40px 28px 80px' }}>

      {/* ═══════════ PAGE 1 — Cover ═══════════ */}
      <section style={{ ...page, padding: '80px 40px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
          {/* Top logo */}
          <div style={{ marginBottom: 'auto', paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <img src="/169Avenue/logo.png" alt="" style={{ height: 72, filter: 'brightness(0)', opacity: 0.8 }} />
            <span style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: T.muted }}>169 Avenue</span>
          </div>

          {/* Center content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <div style={{ width: 48, height: 1, background: T.line, marginBottom: 32 }} />
            <h1 style={{ fontFamily: T.serif, fontSize: 38, fontWeight: 400, margin: 0, color: T.ink, lineHeight: 1.3 }}>
              Student<br />Growth Report
            </h1>
            <div style={{ width: 48, height: 1, background: T.line, margin: '32px 0 36px' }} />
            <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.ink, marginBottom: 8 }}>
              {data.studentName || 'Student Name'}
            </div>
            {data.grade && <div style={{ fontSize: 13, color: T.muted, letterSpacing: '0.05em' }}>{data.grade}</div>}
          </div>

          {/* Bottom info */}
          <div style={{ marginTop: 'auto', borderTop: `1px solid ${T.line}`, paddingTop: 20, width: '70%' }}>
            <div style={{ fontSize: 13, color: T.body, marginBottom: 4 }}>{data.programName}</div>
            <div style={{ fontSize: 12, color: T.muted }}>
              {[data.programPeriod, data.date].filter(Boolean).join('  |  ')}
            </div>
            {data.observer && <div style={{ fontSize: 11, color: T.muted, marginTop: 8 }}>Prepared by {data.observer}</div>}
          </div>
        </div>
      </section>

      {/* ═══════════ PAGE 2 — Executive Summary ═══════════ */}
      <section style={page}>
        <SectionHead title="Executive Summary" sub="Overview" />

        {/* Summary Box */}
        <div style={{ background: T.sub, padding: '28px 32px', marginBottom: 36 }}>
          <p style={{ fontSize: 14, color: T.body, margin: 0, lineHeight: 1.9 }}>
            {data.summaryText || `${data.studentName || 'The student'} showed strong participation and a positive attitude throughout the program, with particular strength in communication-driven activities.`}
          </p>
        </div>

        {/* Key Insights */}
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.muted, marginBottom: 16 }}>Key Insights</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { label: 'Strength', value: data.strength, icon: '\u2713' },
            { label: 'Direction', value: data.direction, icon: '\u2192' },
            { label: 'Keywords', value: data.keywords, icon: '\u2023' },
          ].map((c) => (
            <div key={c.label} style={{ background: T.card, border: `1px solid ${T.line}`, padding: '24px 20px' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 15, color: T.ink, fontWeight: 500, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{c.value || '-'}</div>
            </div>
          ))}
        </div>

        <Footer /><Pg n={2} />
      </section>

      {/* ═══════════ PAGE 3 — Area Assessment ═══════════ */}
      <section style={page}>
        <SectionHead title="Area Assessment" sub="Detailed Evaluation" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {data.skills.map((skill) => (
            <div key={skill.name} style={{ background: T.card, border: `1px solid ${T.line}`, padding: '20px 24px', borderRadius: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.ink }}>{skill.name}</span>
                <Stars count={skill.stars} />
              </div>
              <p style={{ fontSize: 13, color: T.body, margin: 0, lineHeight: 1.7 }}>{skill.description || '-'}</p>
            </div>
          ))}
        </div>

        {/* Exploration */}
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 14 }}>Exploration</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {data.explorations.map((exp) => (
            <div key={exp.name} style={{ background: T.sub, border: `1px solid ${T.line}`, padding: '20px 22px', borderRadius: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 6 }}>{exp.icon} {exp.name}</div>
              <div style={{ fontSize: 13, color: T.body, lineHeight: 1.65 }}>{exp.description || '-'}</div>
            </div>
          ))}
        </div>

        <Footer /><Pg n={3} />
      </section>

      {/* ═══════════ PAGE 4 — Personality Analysis ═══════════ */}
      <section style={page}>
        <SectionHead title="Personality Analysis" sub="Behavioral Profile" />

        {/* Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          {data.profileBars.map((bar) => {
            const fill = bar.color === 'accent' ? T.accent : bar.color === 'blue' ? T.blue : T.olive
            return (
              <div key={bar.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{bar.label}</span>
                  <span style={{ fontSize: 12, color: T.muted, fontFamily: T.sans }}>{bar.percent}%</span>
                </div>
                <div style={{ height: 8, background: T.line, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${bar.percent}%`, background: fill, borderRadius: 4, transition: 'width 0.3s' }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Type */}
        <div style={{ background: T.card, border: `1px solid ${T.line}`, padding: '28px 28px 24px', borderRadius: 4 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 18 }}>Type Classification</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {data.primaryType.map((t) => {
              const info = PERSONALITY_LABELS[t]
              return (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${info.color}`, padding: '10px 18px', borderRadius: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: info.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: info.color }}>{info.en}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{info.desc_en}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18 }}>
            <p style={{ fontSize: 14, color: T.body, margin: 0, lineHeight: 1.85 }}>
              {data.analysisNote || `${data.studentName || 'This student'} shows a combination of personality traits that suggest a growth approach centered on diverse exploration and expressive activities.`}
            </p>
          </div>
        </div>

        <Footer /><Pg n={4} />
      </section>

      {/* ═══════════ PAGE 5 — Growth Roadmap ═══════════ */}
      <section style={page}>
        <SectionHead title="Growth Roadmap" sub="Strategic Planning" />

        <div style={{ paddingLeft: 20 }}>
          {data.roadmap.map((entry, i) => {
            const isLast = i === data.roadmap.length - 1
            const colors = [T.olive, T.accent, T.blue]
            return (
              <div key={entry.period} style={{ display: 'flex', gap: 24, minHeight: isLast ? 'auto' : 120 }}>
                {/* Dot + Line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: colors[i], flexShrink: 0 }} />
                  {!isLast && <div style={{ width: 1.5, flex: 1, background: T.line }} />}
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : 32 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 400, color: T.ink, marginBottom: 10 }}>{entry.period}</div>
                  <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: T.body, lineHeight: 1.85 }}>
                    {entry.items.filter(Boolean).map((item, j) => <li key={j} style={{ marginBottom: 4 }}>{item}</li>)}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <Footer /><Pg n={5} />
      </section>

      {/* ═══════════ PAGE 6 — Recommended Path ═══════════ */}
      <section style={page}>
        <SectionHead title="Recommended Path" sub="Next Steps" />

        <p style={{ fontSize: 13, color: T.muted, marginBottom: 28, lineHeight: 1.7 }}>
          Based on this assessment, the following are recommended for {data.studentName || 'the student'}:
        </p>

        {/* Recommendation list */}
        <div style={{ background: T.sub, padding: '8px 0', marginBottom: 36 }}>
          {data.recommendedSteps.filter(Boolean).map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', borderBottom: i < data.recommendedSteps.length - 1 ? `1px solid ${T.line}` : 'none' }}>
              <span style={{ fontFamily: T.serif, fontSize: 32, color: T.accent, opacity: 0.25, minWidth: 36, lineHeight: 1 }}>{i + 1}</span>
              <span style={{ fontSize: 16, color: T.ink, fontWeight: 500 }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: 20, marginLeft: 4 }}>
          <p style={{ fontSize: 12, color: T.muted, margin: 0, fontStyle: 'italic', lineHeight: 1.75 }}>
            These recommendations are based on professional assessment during the program period. A follow-up consultation with {data.observer || 'the director'} is included to discuss the detailed strategy.
          </p>
        </div>

        <Footer /><Pg n={6} />
      </section>

      {/* ═══════════ PAGE 7 — Closing ═══════════ */}
      <section style={{ ...page, pageBreakAfter: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%', padding: '0 40px' }}>
          {/* Top brand */}
          <div style={{ marginBottom: 'auto', paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <img src="/169Avenue/logo.png" alt="" style={{ height: 72, filter: 'brightness(0)', opacity: 0.8 }} />
            <span style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: T.muted }}>169 Avenue</span>
          </div>

          {/* Center content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 48, height: 1, background: T.line, marginBottom: 40 }} />

            <p style={{ fontFamily: T.serif, fontSize: 20, lineHeight: 1.9, color: T.body, maxWidth: '78%', margin: 0 }}>
              {data.closingMessage || `Through this program, we were able to identify ${data.studentName || 'the student'}'s unique potential. With continued guidance, meaningful growth lies ahead.`}
            </p>

            <div style={{ width: 48, height: 1, background: T.line, margin: '40px 0' }} />
          </div>

          {/* Bottom info */}
          <div style={{ marginTop: 'auto', borderTop: `1px solid ${T.line}`, paddingTop: 20, width: '70%', paddingBottom: 20 }}>
            <div style={{ fontSize: 13, color: T.body, marginBottom: 4 }}>{data.programName}</div>
            <div style={{ fontSize: 12, color: T.muted }}>
              {[data.programPeriod, data.date].filter(Boolean).join('  |  ')}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

ReportPreview.displayName = 'ReportPreview'
