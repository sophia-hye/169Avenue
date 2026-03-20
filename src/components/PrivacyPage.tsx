import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

const SECTIONS_EN = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us during consultations and through our website inquiry form. This includes your name, email address, phone number, country of residence, and academic background. We do not collect sensitive personal data without your explicit consent.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'The information we collect is used solely to provide and improve our consulting services, communicate with you regarding your engagement, and send relevant updates about our services. We do not use your data for unsolicited marketing without your consent.',
  },
  {
    title: '3. Information Sharing',
    body: '169 Avenue does not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality obligations. We may disclose information when required by law.',
  },
  {
    title: '4. Data Security',
    body: 'We implement industry-standard security measures to protect your personal information. All data is transmitted over encrypted connections. Access to client information is restricted to authorised personnel on a need-to-know basis.',
  },
  {
    title: '5. Data Retention',
    body: 'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy or as required by applicable law. Upon request, we will securely delete or anonymise your data, subject to any legal retention obligations.',
  },
  {
    title: '6. Cookies',
    body: 'Our website uses essential cookies to ensure proper functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings; however, this may affect the functionality of certain features.',
  },
  {
    title: '7. Your Rights',
    body: 'You have the right to access, correct, or request deletion of your personal data at any time. You may also object to the processing of your data or request data portability. To exercise these rights, please contact us directly.',
  },
  {
    title: '8. Children\'s Privacy',
    body: 'Our services are intended for individuals of at least 16 years of age. We do not knowingly collect personal information from children under 16 without parental or guardian consent.',
  },
  {
    title: '9. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website. Your continued use of our services after changes constitutes acceptance of the revised policy.',
  },
  {
    title: '10. Contact Us',
    body: 'If you have any questions, concerns, or requests regarding your personal data or this Privacy Policy, please reach out to us through the consultation form or via our London office. We are committed to addressing your concerns promptly.',
  },
]

const SECTIONS_KO = [
  {
    title: '1. 수집하는 정보',
    body: '저희는 상담 중 및 웹사이트 문의 양식을 통해 직접 제공하신 정보를 수집합니다. 여기에는 이름, 이메일 주소, 전화번호, 거주 국가 및 학업 배경이 포함됩니다. 명시적인 동의 없이는 민감한 개인정보를 수집하지 않습니다.',
  },
  {
    title: '2. 정보 이용 목적',
    body: '수집한 정보는 컨설팅 서비스 제공 및 개선, 계약 관련 커뮤니케이션, 서비스 관련 업데이트 발송을 위해서만 사용됩니다. 귀하의 동의 없이 원치 않는 마케팅에 데이터를 사용하지 않습니다.',
  },
  {
    title: '3. 정보 공유',
    body: '169 Avenue는 귀하의 개인정보를 제3자에게 판매, 거래 또는 대여하지 않습니다. 비밀 유지 의무가 있는 신뢰할 수 있는 서비스 제공업체와 사업 운영에 필요한 정보를 공유할 수 있습니다. 법적으로 요구되는 경우에는 정보를 공개할 수 있습니다.',
  },
  {
    title: '4. 데이터 보안',
    body: '귀하의 개인정보를 보호하기 위해 업계 표준 보안 조치를 시행합니다. 모든 데이터는 암호화된 연결을 통해 전송됩니다. 고객 정보에 대한 접근은 필요에 따라 권한 있는 직원으로 제한됩니다.',
  },
  {
    title: '5. 데이터 보유',
    body: '개인정보는 본 정책에 명시된 목적을 달성하거나 관련 법률에서 요구하는 기간 동안 보유합니다. 요청 시 법적 보유 의무에 따라 데이터를 안전하게 삭제하거나 익명화합니다.',
  },
  {
    title: '6. 쿠키',
    body: '웹사이트는 정상적인 기능을 위해 필수 쿠키를 사용합니다. 추적 또는 광고 쿠키는 사용하지 않습니다. 브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능에 영향을 미칠 수 있습니다.',
  },
  {
    title: '7. 귀하의 권리',
    body: '귀하는 언제든지 개인정보에 대한 접근, 수정 또는 삭제를 요청할 권리가 있습니다. 또한 데이터 처리에 이의를 제기하거나 데이터 이동성을 요청할 수 있습니다. 이러한 권리를 행사하려면 직접 문의해 주시기 바랍니다.',
  },
  {
    title: '8. 아동 개인정보 보호',
    body: '저희 서비스는 만 16세 이상을 대상으로 합니다. 부모 또는 보호자의 동의 없이 만 16세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.',
  },
  {
    title: '9. 정책 변경',
    body: '본 개인정보처리방침은 수시로 업데이트될 수 있습니다. 중요한 변경 사항은 웹사이트에 공지를 게시하여 알려드립니다. 변경 후 서비스를 계속 이용하는 것은 개정된 정책에 동의하는 것으로 간주됩니다.',
  },
  {
    title: '10. 문의하기',
    body: '개인정보 또는 본 개인정보처리방침에 관한 질문, 우려 사항 또는 요청이 있으시면 상담 양식 또는 런던 오피스를 통해 문의해 주시기 바랍니다. 귀하의 우려 사항을 신속하게 처리하겠습니다.',
  },
]

export function PrivacyPage() {
  const { language, t } = useLanguage()
  const sections = language === 'ko' ? SECTIONS_KO : SECTIONS_EN
  const title = language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'
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
