import { useLanguage } from '../context/LanguageContext'

const TRUST_ICONS = ['school', 'analytics', 'description']

export function TrustSection() {
  const { t, language } = useLanguage()
  const ko = language === 'ko'

  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-8 md:px-16 lg:px-24 mb-32 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.trust_tag}</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">{t.trust_title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
          {t.trust_items.map((item, i) => (
            <div key={item.title} className="bg-surface-container-lowest p-8 md:p-10 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{TRUST_ICONS[i]}</span>
              <h3 className="font-headline text-xl text-primary mb-6">{item.title}</h3>
              <ul className="space-y-4">
                {item.items.map((li) => (
                  <li key={li} className="flex items-start gap-3 text-sm font-body text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Positioning Comparison */}
        <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm">
          <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-8">
            {ko ? '왜 169 Avenue인가' : 'Why 169 Avenue'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-4 pr-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant" />
                  <th className="text-left py-4 pr-6 font-body text-sm text-on-surface-variant/60">
                    {ko ? '유학원' : 'Study Abroad Agency'}
                  </th>
                  <th className="text-left py-4 pr-6 font-body text-sm text-on-surface-variant/60">
                    {ko ? '입시 컨설팅' : 'Admissions Consulting'}
                  </th>
                  <th className="text-left py-4 font-body text-sm text-primary font-bold">169 Avenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { labelEn: 'Basis', labelKo: '기준', c1En: 'Country', c1Ko: '국가', c2En: 'GPA (내신)', c2Ko: '내신', c3En: 'Academic Structure', c3Ko: '학력 구조' },
                  { labelEn: 'Method', labelKo: '방식', c1En: 'Processing', c1Ko: '대행', c2En: 'Guidance', c2Ko: '지도', c3En: 'Strategy Design', c3Ko: '전략 설계' },
                  { labelEn: 'Scope', labelKo: '범위', c1En: 'Overseas only', c1Ko: '해외만', c2En: 'Domestic only', c2Ko: '국내만', c3En: 'Integrated', c3Ko: '통합' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/15">
                    <td className="py-4 pr-6 font-label text-xs uppercase tracking-widest text-on-surface-variant">{ko ? row.labelKo : row.labelEn}</td>
                    <td className="py-4 pr-6 font-body text-sm text-on-surface-variant/50">{ko ? row.c1Ko : row.c1En}</td>
                    <td className="py-4 pr-6 font-body text-sm text-on-surface-variant/50">{ko ? row.c2Ko : row.c2En}</td>
                    <td className="py-4 font-body text-sm text-primary font-bold">{ko ? row.c3Ko : row.c3En}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
