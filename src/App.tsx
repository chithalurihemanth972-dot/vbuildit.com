
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Dock } from './components/Navigation';
import { DomainsModal } from './components/DomainsModal';
import { HomePage } from './pages/HomePage';
import { DomainsPage } from './pages/DomainsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialProject, setInitialProject] = useState<number | null>(null);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <div className="noise-overlay" />

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/domains" element={<DomainsPage onOpenDomains={() => setIsModalOpen(true)} />} />
            <Route path="/projects" element={<ProjectsPage onOpenDomains={() => setIsModalOpen(true)} />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Dock />

        <AnimatePresence>
          {isModalOpen && (
            <DomainsModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setInitialProject(null);
              }}
              initialProjectId={initialProject}
            />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
