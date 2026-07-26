import { Routes, Route } from 'react-router'
import { FarmProvider } from './context/FarmContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import HobbiesPage from './pages/HobbiesPage'
import HonorsPage from './pages/HonorsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <FarmProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/honors" element={<HonorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </FarmProvider>
  )
}
