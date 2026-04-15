import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

const SECTIONS_EN = [
  {
    title: '1. Data Controller',
    body: '169 Avenue ("the Company") is the data controller responsible for the processing of your personal information. Address: Seoul, Republic of Korea.',
  },
  {
    title: '2. Information We Collect',
    body: 'We collect the following categories of personal information:\n\n- Parent/Guardian: Name, email address, phone number, country of residence\n- Student: Name, date of birth, grade/school year, school name, academic background (GPA, curriculum type), extracurricular activity information\n- Program-related: Health information relevant to program safety (allergies, medical conditions), passport information (for overseas programs only)\n- Automatically collected: Browser type, access logs, IP address (via website)',
  },
  {
    title: '3. Purpose of Processing',
    body: 'We process your personal information for the following purposes:\n\n- Providing consulting services and program delivery\n- Creating Student Growth Reports\n- Communicating with parents/guardians regarding program progress and results\n- Connecting students with specialist partners (with prior consent)\n- Improving our services and developing new programs\n- Complying with legal obligations',
  },
  {
    title: '4. Legal Basis for Processing',
    body: 'We process personal information based on: consent of the data subject (or legal guardian for minors under 14), performance of a contract, and compliance with legal obligations under the Personal Information Protection Act (PIPA) of the Republic of Korea.',
  },
  {
    title: '5. Third-Party Disclosure',
    body: 'We may share personal information with the following third parties, only with prior consent:\n\n- Specialist partners: Sports coaches, art mentors (e.g., Parsons graduates), former admissions officers — for the purpose of providing specialized consulting\n- Overseas program partners: Local schools, accommodation providers — for overseas program operation\n- Insurance providers: For program liability and travel insurance purposes\n\nWe do not sell, trade, or rent personal information to any third party.',
  },
  {
    title: '6. Retention Period',
    body: 'We retain personal information for the following periods:\n\n- Consultation records: 3 years from the date of last consultation\n- Program participation records and Student Growth Reports: 5 years from program completion\n- Contract and payment records: 5 years (as required by commercial law)\n- Website access logs: 1 year\n\nAfter the retention period expires, data is promptly destroyed.',
  },
  {
    title: '7. Data Destruction',
    body: 'When personal information is no longer needed or the retention period has expired:\n\n- Electronic files: Permanently deleted using technical methods that prevent recovery\n- Paper documents: Shredded or incinerated\n\nDestruction is carried out within 5 business days of the retention period expiring.',
  },
  {
    title: '8. Data Security',
    body: 'We implement the following security measures to protect your personal information:\n\n- All data is transmitted over encrypted connections (SSL/TLS)\n- Access to client information is restricted to authorized personnel on a need-to-know basis\n- Regular security reviews and access log monitoring\n- Separate storage and encryption for sensitive information',
  },
  {
    title: '9. Children\'s Privacy',
    body: 'Our services are primarily for minors. In accordance with the Personal Information Protection Act of the Republic of Korea:\n\n- For children under the age of 14: We obtain verifiable consent from a parent or legal guardian before collecting personal information\n- For participants aged 14-18: We obtain consent from both the participant and their parent/legal guardian\n\nParents/guardians may request access to, correction of, or deletion of their child\'s personal information at any time.',
  },
  {
    title: '10. Your Rights',
    body: 'You have the following rights regarding your personal information:\n\n- Right to access: Request a copy of your personal data\n- Right to correction: Request correction of inaccurate data\n- Right to deletion: Request deletion of your personal data\n- Right to suspend processing: Request that we stop processing your data\n- Right to withdraw consent: Withdraw previously given consent at any time\n\nTo exercise these rights, please contact us via email or the consultation form. We will respond within 10 business days.',
  },
  {
    title: '11. Cookies',
    body: 'Our website uses essential cookies to ensure proper functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings; however, this may affect the functionality of certain features.',
  },
  {
    title: '12. Privacy Officer',
    body: 'The following person is responsible for the protection of personal information and handling of related inquiries:\n\nTitle: Privacy Officer\nOrganization: 169 Avenue\nContact: Available via the consultation form on our website\n\nYou may also file a complaint with the Personal Information Protection Commission (www.pipc.go.kr) or the Korea Internet & Security Agency (www.kisa.or.kr).',
  },
  {
    title: '13. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website and notifying existing clients via email at least 7 days before the changes take effect. Your continued use of our services after changes constitutes acceptance of the revised policy.',
  },
]

const SECTIONS_KO = [
  {
    title: '1. 개인정보처리자',
    body: '169 Avenue("회사")는 귀하의 개인정보 처리에 대한 책임이 있는 개인정보처리자입니다. 주소: 서울특별시, 대한민국.',
  },
  {
    title: '2. 수집하는 개인정보 항목',
    body: '회사는 다음과 같은 개인정보를 수집합니다.\n\n- 학부모/보호자: 성명, 이메일 주소, 전화번호, 거주 국가\n- 학생: 성명, 생년월일, 학년, 학교명, 학업 배경(GPA, 커리큘럼 유형), 비교과 활동 정보\n- 프로그램 관련: 프로그램 안전과 관련된 건강 정보(알레르기, 질환), 여권 정보(해외 프로그램에 한함)\n- 자동 수집 정보: 브라우저 유형, 접속 로그, IP 주소(웹사이트 이용 시)',
  },
  {
    title: '3. 개인정보 처리 목적',
    body: '회사는 다음의 목적으로 개인정보를 처리합니다.\n\n- 컨설팅 서비스 제공 및 프로그램 운영\n- Student Growth Report 작성\n- 프로그램 진행 상황 및 결과에 대한 학부모/보호자 소통\n- 전문가 파트너에게 학생 연결(사전 동의 시)\n- 서비스 개선 및 신규 프로그램 개발\n- 법적 의무 준수',
  },
  {
    title: '4. 개인정보 처리의 법적 근거',
    body: '회사는 정보주체(만 14세 미만의 경우 법정대리인)의 동의, 계약의 이행, 대한민국 개인정보보호법에 따른 법적 의무 준수를 근거로 개인정보를 처리합니다.',
  },
  {
    title: '5. 개인정보 제3자 제공',
    body: '회사는 사전 동의를 받은 경우에 한하여 다음의 제3자에게 개인정보를 제공할 수 있습니다.\n\n- 전문가 파트너: 스포츠 코치, 미술 멘토(파슨스 졸업생 등), 입학사정관 출신 컨설턴트 — 전문 컨설팅 제공 목적\n- 해외 프로그램 파트너: 현지 학교, 숙소 제공업체 — 해외 프로그램 운영 목적\n- 보험사: 프로그램 배상책임보험 및 여행자보험 목적\n\n회사는 개인정보를 제3자에게 판매, 거래 또는 대여하지 않습니다.',
  },
  {
    title: '6. 개인정보 보유 및 이용 기간',
    body: '회사는 다음의 기간 동안 개인정보를 보유합니다.\n\n- 상담 기록: 마지막 상담일로부터 3년\n- 프로그램 참여 기록 및 Student Growth Report: 프로그램 종료 후 5년\n- 계약 및 결제 기록: 5년(상법에 따름)\n- 웹사이트 접속 로그: 1년\n\n보유 기간 만료 시 지체 없이 파기합니다.',
  },
  {
    title: '7. 개인정보 파기 절차 및 방법',
    body: '개인정보가 더 이상 필요하지 않거나 보유 기간이 만료된 경우:\n\n- 전자적 파일: 복구 불가능한 기술적 방법으로 영구 삭제\n- 서면 자료: 파쇄 또는 소각\n\n보유 기간 만료일로부터 5영업일 이내에 파기를 완료합니다.',
  },
  {
    title: '8. 개인정보 보호 조치',
    body: '회사는 개인정보 보호를 위해 다음과 같은 보안 조치를 시행합니다.\n\n- 모든 데이터는 암호화된 연결(SSL/TLS)을 통해 전송\n- 고객 정보에 대한 접근은 업무상 필요한 권한 있는 직원으로 제한\n- 정기적 보안 점검 및 접근 로그 모니터링\n- 민감 정보의 별도 저장 및 암호화',
  },
  {
    title: '9. 아동 개인정보 보호',
    body: '회사의 서비스는 주로 미성년자를 대상으로 합니다. 대한민국 개인정보보호법에 따라:\n\n- 만 14세 미만 아동: 개인정보 수집 전 부모 또는 법정대리인의 검증 가능한 동의를 받습니다\n- 만 14세 이상 18세 이하: 참가자 본인과 부모/법정대리인 모두의 동의를 받습니다\n\n부모/보호자는 언제든지 자녀의 개인정보에 대한 열람, 정정 또는 삭제를 요청할 수 있습니다.',
  },
  {
    title: '10. 정보주체의 권리',
    body: '귀하는 개인정보에 관하여 다음의 권리를 가집니다.\n\n- 열람권: 개인정보 사본 요청\n- 정정권: 부정확한 정보의 정정 요청\n- 삭제권: 개인정보 삭제 요청\n- 처리정지권: 개인정보 처리 중지 요청\n- 동의 철회권: 이전에 제공한 동의를 언제든지 철회\n\n이러한 권리를 행사하려면 이메일 또는 상담 양식을 통해 문의해 주시기 바랍니다. 10영업일 이내에 답변드리겠습니다.',
  },
  {
    title: '11. 쿠키',
    body: '웹사이트는 정상적인 기능을 위해 필수 쿠키를 사용합니다. 추적 또는 광고 쿠키는 사용하지 않습니다. 브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능에 영향을 미칠 수 있습니다.',
  },
  {
    title: '12. 개인정보 보호 책임자',
    body: '개인정보 보호 및 관련 문의 처리를 담당하는 책임자는 다음과 같습니다.\n\n직책: 개인정보 보호 책임자\n소속: 169 Avenue\n연락처: 웹사이트 상담 양식을 통해 문의 가능\n\n개인정보 침해에 대한 신고나 상담은 개인정보보호위원회(www.pipc.go.kr) 또는 한국인터넷진흥원(www.kisa.or.kr)에도 할 수 있습니다.',
  },
  {
    title: '13. 개인정보처리방침 변경',
    body: '본 개인정보처리방침은 수시로 업데이트될 수 있습니다. 중요한 변경 사항은 웹사이트에 공지를 게시하고, 기존 고객에게는 변경 시행일 최소 7일 전에 이메일로 통지합니다. 변경 후 서비스를 계속 이용하는 것은 개정된 정책에 동의하는 것으로 간주됩니다.',
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
            <p className="font-body text-on-surface-variant leading-relaxed whitespace-pre-line">{s.body}</p>
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
