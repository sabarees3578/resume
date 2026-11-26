import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RisoDitherBackground } from './components/RisoDitherBackground';
import { Home } from './pages/Home';
import { Projects, type ProjectCategory } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Resume } from './pages/Resume';

export type PageName = 'Home' | 'Projects' | 'Skills' | 'Resume';

const VALID_PAGES: PageName[] = ['Home', 'Projects', 'Skills', 'Resume'];

function getPageFromHash(): PageName {
  const raw = window.location.hash.replace('#', '').toLowerCase();
  const match = VALID_PAGES.find((p) => p.toLowerCase() === raw);
  return match ?? 'Home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>(() => getPageFromHash());
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('All');

  const handleNavigate = useCallback((page: string, options?: { category?: ProjectCategory }) => {
    const target: PageName = VALID_PAGES.includes(page as PageName) ? (page as PageName) : 'Home';
    if (options?.category) {
      setProjectCategory(options.category);
    } else if (target === 'Projects' && currentPage !== 'Projects') {
      setProjectCategory('All');
    }

    setCurrentPage(target);
    const nextHash = `#${target.toLowerCase()}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home onNavigate={handleNavigate} />;
      case 'Projects':
        return (
          <Projects
            initialCategory={projectCategory}
            onNavigate={handleNavigate}
          />
        );
      case 'Skills':
        return <Skills />;
      case 'Resume':
        return <Resume />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative isolate min-h-screen bg-zinc-950 text-white flex flex-col">
      <RisoDitherBackground />
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main key={currentPage} className="flex-1 animate-fade-up">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
