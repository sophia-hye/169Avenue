import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './components/HomePage'
import { ConsultationPage } from './components/ConsultationPage'
import { SuccessStoriesPage } from './components/SuccessStoriesPage'
import { StoryDetailPage } from './components/StoryDetailPage'
import { AboutPage } from './components/AboutPage'
import { PartnersPage } from './components/PartnersPage'
import { DestinationsPage } from './components/DestinationsPage'
import { RegionDetailPage } from './components/RegionDetailPage'
import { StateDetailPage } from './components/StateDetailPage'
import { UKRegionDetailPage } from './components/UKRegionDetailPage'
import { EuropeCountryDetailPage } from './components/EuropeCountryDetailPage'
import { APCountryDetailPage } from './components/APCountryDetailPage'
import { FieldPage } from './components/FieldPage'
import { DomesticPage } from './components/DomesticPage'
import { DomesticFreshmanPage } from './components/DomesticFreshmanPage'
import { DomesticTransferPage } from './components/DomesticTransferPage'
import { UniversityDetailPage } from './components/UniversityDetailPage'
import { TermsPage } from './components/TermsPage'
import { PrivacyPage } from './components/PrivacyPage'

function App() {
  return (
    <LanguageProvider>
    <BrowserRouter basename="/169Avenue">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/field" element={<FieldPage />} />
        <Route path="/domestic" element={<DomesticPage />} />
        <Route path="/domestic/freshman" element={<DomesticFreshmanPage />} />
        <Route path="/domestic/transfer" element={<DomesticTransferPage />} />
        <Route path="/university/:slug" element={<UniversityDetailPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/us/:stateCode" element={<StateDetailPage />} />
        <Route path="/destinations/uk/:nationId" element={<UKRegionDetailPage />} />
        <Route path="/destinations/eu/:countryId" element={<EuropeCountryDetailPage />} />
        <Route path="/destinations/ap/:countryId" element={<APCountryDetailPage />} />
        <Route path="/destinations/:id" element={<RegionDetailPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
