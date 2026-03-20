import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { ConsultationPage } from './components/ConsultationPage'
import { SuccessStoriesPage } from './components/SuccessStoriesPage'
import { StoryDetailPage } from './components/StoryDetailPage'
import { AboutPage } from './components/AboutPage'
import { PartnersPage } from './components/PartnersPage'
import { DestinationsPage } from './components/DestinationsPage'
import { RegionDetailPage } from './components/RegionDetailPage'
import { StateDetailPage } from './components/StateDetailPage'
import { EuropeCountryDetailPage } from './components/EuropeCountryDetailPage'

function App() {
  return (
    <BrowserRouter basename="/169Avenue">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/us/:stateCode" element={<StateDetailPage />} />
        <Route path="/destinations/eu/:countryId" element={<EuropeCountryDetailPage />} />
        <Route path="/destinations/:id" element={<RegionDetailPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
