import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

const SECTIONS_EN = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the services of 169 Avenue ("the Company"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
  },
  {
    title: '2. Description of Services',
    body: '169 Avenue provides bespoke academic consulting services, including but not limited to university admissions strategy, personal statement development, interview preparation, and profile building. All services are rendered on a private, confidential basis.',
  },
  {
    title: '3. Engagement & Fees',
    body: 'All engagements are initiated through a formal consultation and governed by a separate service agreement. Fees are communicated prior to engagement and are non-refundable unless otherwise specified in the individual service agreement.',
  },
  {
    title: '4. Confidentiality',
    body: 'We treat all client information with the utmost discretion. Information shared during consultations and throughout the engagement will not be disclosed to third parties without your explicit consent, except as required by law.',
  },
  {
    title: '5. Intellectual Property',
    body: 'All content on this website, including text, graphics, and design, is the exclusive property of 169 Avenue and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.',
  },
  {
    title: '6. Limitation of Liability',
    body: '169 Avenue provides advisory services. We do not guarantee admission to any institution. The Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or reliance on our advice.',
  },
  {
    title: '7. Amendments',
    body: 'We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised terms.',
  },
  {
    title: '8. Governing Law',
    body: 'These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which 169 Avenue operates, without regard to conflict of law provisions.',
  },
  {
    title: '9. Contact',
    body: 'For any questions regarding these Terms of Service, please contact us through the consultation form or via our London office.',
  },
]

const SECTIONS_KO = [
  {
    title: '1. 이용약관 동의',
    body: '169 Avenue("회사")의 서비스에 접근하거나 이용함으로써 귀하는 본 이용약관에 동의하는 것으로 간주됩니다. 이에 동의하지 않으실 경우 서비스를 이용하지 마시기 바랍니다.',
  },
  {
    title: '2. 서비스 설명',
    body: '169 Avenue는 대학 입학 전략, 자기소개서 개발, 인터뷰 준비, 프로필 구축 등을 포함한 맞춤형 학업 컨설팅 서비스를 제공합니다. 모든 서비스는 비공개 및 기밀 방식으로 제공됩니다.',
  },
  {
    title: '3. 계약 및 요금',
    body: '모든 계약은 공식 상담을 통해 시작되며 별도의 서비스 계약에 의해 규율됩니다. 요금은 계약 전에 고지되며, 개별 서비스 계약에 달리 명시되지 않는 한 환불되지 않습니다.',
  },
  {
    title: '4. 기밀 유지',
    body: '저희는 모든 고객 정보를 최고 수준의 신중함으로 처리합니다. 상담 및 계약 기간 중 공유된 정보는 법적으로 요구되는 경우를 제외하고 귀하의 명시적 동의 없이 제3자에게 공개되지 않습니다.',
  },
  {
    title: '5. 지식재산권',
    body: '본 웹사이트의 모든 콘텐츠(텍스트, 그래픽, 디자인 포함)는 169 Avenue의 독점 소유물이며 관련 지식재산권법의 보호를 받습니다. 무단 복제 또는 배포는 엄격히 금지됩니다.',
  },
  {
    title: '6. 책임의 제한',
    body: '169 Avenue는 자문 서비스를 제공합니다. 어떤 기관의 입학도 보장하지 않습니다. 회사는 서비스 이용 또는 자문 의존으로 인해 발생하는 간접적, 부수적 또는 결과적 손해에 대해 책임을 지지 않습니다.',
  },
  {
    title: '7. 약관 변경',
    body: '저희는 언제든지 본 이용약관을 수정할 권리를 보유합니다. 변경 사항은 업데이트된 발효일과 함께 이 페이지에 게시됩니다. 변경 후 서비스를 계속 이용하는 것은 개정된 약관에 동의하는 것으로 간주됩니다.',
  },
  {
    title: '8. 준거법',
    body: '본 이용약관은 법률 충돌 규정에 관계없이 169 Avenue가 운영되는 관할권의 법률에 따라 해석됩니다.',
  },
  {
    title: '9. 문의',
    body: '이용약관에 관한 질문이 있으시면 상담 양식 또는 런던 오피스를 통해 문의해 주시기 바랍니다.',
  },
]

export function TermsPage() {
  const { language, t } = useLanguage()
  const sections = language === 'ko' ? SECTIONS_KO : SECTIONS_EN
  const title = language === 'ko' ? '이용약관' : 'Terms of Service'
  const updated = language === 'ko' ? '최종 업데이트: 2025년 1월 1일' : 'Last updated: January 1, 2025'

  const content = (
    <div className="max-w-3xl mx-auto px-6 md:px-0 py-16 md:py-24">
      <div className="mb-16">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">169 Avenue</span>
        <h1 className="font-headline text-5xl md:text-6xl text-primary tracking-tight mb-4">{title}</h1>
        <p className="font-body text-sm text-on-surface-variant">{updated}</p>
      </div>

      <div className="space-y-14">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-headline text-xl italic text-primary mb-4">{s.title}</h2>
            <p className="font-body text-on-surface-variant leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-outline-variant/20">
        <Link to="/" className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors">
          ← {t.home}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="bg-surface">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="hidden md:block pt-32 pb-20 max-w-screen-lg mx-auto px-8 md:px-16">
        {content}
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileShell>{content}</MobileShell>
    </div>
  )
}
