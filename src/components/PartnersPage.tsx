import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const CURATORS = [
  {
    name: 'Elena Moretti',
    role: 'Lead Architect of Ivy League Admissions',
    tag: 'Strategy',
    bio: 'A Harvard alumna with over a decade of experience navigating the nuanced landscapes of Cambridge and New Haven. Elena specializes in high-stakes narrative positioning.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI3u0WZAPn4zsTTIaFSz2naiEUT1HGVkZ_433tyLQFbbPlst51xsed-qkE451LHYUSMNgkpFO5wBmDv6vZkFcRaIg3zsLxkDL0558SDExr3ftWkZMqYgSLBSTOyXOrwRy4PVuU3W1ADFklF7ttLK_RsUdtpgrgzFA5nDMolbEyTiS9n2JFFV3D3JK6MrfEgOgdnLWhSffld8PhRkiZxZTCm4q8ckLrFnb1XvH1hkwkQaoS3wAteQPvRLOsqnpiItOmP1SoqipT6ug',
  },
  {
    name: 'Julian Thorne',
    role: 'Senior Curator of Narrative Strategy',
    tag: 'Narrative',
    bio: 'Former editor at a leading academic press and Stanford graduate. Julian crafts intellectual portfolios that capture the singular voice of the scholar.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWBWB9Nt1Oc8ydni8l6XQRokXm0cd1A2PZD8k8cGbUHqPtFRAVexpaBZVZSmsYSQNLutZhdkvGTz0446sOqs5ah5TaOUbqLy1mmeXPYFMDeAvUKrPDuaQhcsx0VlXzhwK1zJbmiwN9OBoKkBb4OGMBHp9FOw6_A99DvNf4JimYCRQrVxTem7RVYPm4A-v0XORnG9lhbKkZ4dsMQsKbaXbjI7F4hn0JQGWPXXX4g-gHp47Ybn-5PIewmk4rTLsaDgaSogNQQ911qOg',
  },
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Director of Institutional Ethics',
    tag: 'Ethics',
    bio: 'Holding a doctorate from Princeton, Sarah ensures every application maintains the highest standards of academic integrity while maximizing institutional fit.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLBr8X8SHLdaAkJqwYup39DoONL5j3zOs3VV-CJFE1Fj5plqMD3aF0oRh2KNurLZTu176Wc2D9HoiNa2p5Tl3VYPLnwV4Xj3L0JtQTkPbFQ_uOmTCbfSiogCYs9FvY_A6wUKRR2ghbMbCDTx80M5UfcLkkVmOJGB6oaL0N8mmvxbXqG_uPoRGFn0b-h-urrlbO9lMmpuKyIo68TiTbb8NgDmdKQVibiZhCG7PQT7NPX2euF-imprluMBQewPpSQfGbCenl-NIEg-M',
  },
]

export function PartnersPage() {
  return (
    <div className="bg-surface selection:bg-secondary selection:text-surface">
      <Navbar />

      <main className="pt-24">
        {/* Hero: Head Curator */}
        <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center overflow-hidden">
          <div className="w-full md:w-7/12 h-[500px] md:h-screen relative overflow-hidden">
            <img
              alt="Dr. Alistair Vance, Head Curator"
              className="w-full h-full object-cover grayscale brightness-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSogN2yuQSIB2WFYGDJCgeHPqOmNm8zH-GhptcoYSVqNcS-ftEpmjVaGvlNp6PUty0vUKtGVq4Mn1HJHrbSiiWqZIkMyoiWgkhk6AeozQc-74cHuYcVR_bWWZet_znnuueASKRCVFBGq62gttEEeBtbaZEr3UZ_x5IMj1OqvkfS3T6PjGWuy326fKG7TEymIxAvCLznaB0ix3KceeMHqsu8nF0Od4H7r9K6eJ5fedEP1nKYhQ0PJhTymTHW-3ZUSx6MntH8x5vzQY"
            />
          </div>
          <div className="w-full md:w-5/12 bg-surface p-8 md:p-20 flex flex-col justify-center z-10">
            <div className="mb-12">
              <span className="font-label uppercase tracking-[0.3em] text-[10px] text-secondary font-semibold block mb-4">
                Leadership
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-[1.1] text-primary tracking-tight">
                Architects of Intellectual Heritage
              </h1>
            </div>
            <div className="bg-surface-container-lowest p-10 md:-ml-32 shadow-2xl shadow-on-surface/5 relative border-l-4 border-secondary" style={{ marginTop: '-4rem' }}>
              <p className="font-headline italic text-2xl md:text-3xl text-on-surface-variant leading-relaxed">
                "We do not merely guide applications; we curate identities. Our role is to
                excavate the latent brilliance within each scholar and frame it for the world's
                most discerning stages."
              </p>
              <div className="mt-8">
                <p className="font-label font-bold text-primary uppercase tracking-widest text-xs">
                  -- Dr. Alistair Vance
                </p>
                <p className="font-label text-on-surface-variant text-[10px] uppercase tracking-tighter italic">
                  Founder & Head Curator, D.Phil Oxford
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-headline text-4xl text-primary leading-tight">
                The Art of Discernment
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-8">
                Our team is composed of former admissions officers, published authors, and
                distinguished academics. We treat each student's journey as a bespoke commission,
                ensuring that their intellectual narrative resonates with authority and authenticity.
              </p>
              <div className="h-px w-24 bg-secondary/30" />
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="pb-32 px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-surface-container-low">
            {CURATORS.map((curator, i) => (
              <div
                key={curator.name}
                className={`group relative bg-surface p-1 overflow-hidden border-b border-surface-container-high ${i < 2 ? 'md:border-r' : ''}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    alt={curator.name}
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    src={curator.image}
                  />
                </div>
                <div className="pt-8 pb-12 px-6">
                  <span className="font-label uppercase tracking-[0.2em] text-[9px] text-secondary mb-3 block">
                    {curator.tag}
                  </span>
                  <h3 className="font-headline text-3xl mb-1 text-primary">{curator.name}</h3>
                  <p className="font-label uppercase tracking-tighter text-[10px] text-on-surface-variant mb-6 italic">
                    {curator.role}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs">
                    {curator.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 bg-surface-container-low text-center px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
            <span className="font-headline text-[25vw] leading-none whitespace-nowrap">
              169 AVENUE
            </span>
          </div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">
              The curated path begins with a conversation.
            </h2>
            <p className="font-body text-on-surface-variant mb-16 max-w-xl mx-auto text-lg">
              Admission to 169 Avenue is by inquiry only. We invite you to schedule a private
              consultation to discuss your academic heritage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/consultation"
                className="w-full sm:w-auto bg-primary text-on-primary px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-label hover:bg-secondary transition-colors duration-500 text-center"
              >
                Match with a Curator
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto border border-outline-variant/30 text-primary px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-label hover:bg-primary hover:text-on-primary transition-all duration-500 text-center"
              >
                Our Philosophy
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
