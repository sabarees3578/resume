import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RisoDitherBackground } from './components/RisoDitherBackground';
import { Home } from './pages/Home';
import type { ProjectCategory } from './pages/Projects';

const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })));
const Resume = lazy(() => import('./pages/Resume').then((m) => ({ default: m.Resume })));

export type PageName = 'Home' | 'Projects' | 'Skills' | 'Resume';

const VALID_PAGES: PageName[] = ['Home', 'Projects', 'Skills', 'Resume'];

function getPageFromHash(): PageName {
  const raw = window.location.hash.replace('#', '').toLowerCase();
  const match = VALID_PAGES.find((p) => p.toLowerCase() === raw);
  return match ?? 'Home';
}

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-400/30 border-t-cyan-300 animate-spin" />
    </div>
  );
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
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
