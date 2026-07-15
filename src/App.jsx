import { useState, useEffect } from 'react'
import './styles/global.css'
import { Home } from './pages/Home'
import { Lesson1 } from './pages/Lesson1'
import { Lesson2 } from './pages/Lesson2'
import { Lesson3 } from './pages/Lesson3'
import { Sun, Moon } from 'lucide-react'

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case 'lesson1':
        return <Lesson1 onGoHome={() => setCurrentRoute('home')} />;
      case 'lesson2':
        return <Lesson2 onGoHome={() => setCurrentRoute('home')} />;
      case 'lesson3':
        return <Lesson3 onGoHome={() => setCurrentRoute('home')} />;
      case 'home':
      default:
        return <Home onSelectLesson={setCurrentRoute} />;
    }
  };

  return (
    <div className="app-container">
      <div className="bg-aurora">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="bg-grid"></div>
      </div>
      
      <button 
        onClick={toggleTheme}
        className="glass-panel"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          padding: '0.75rem',
          cursor: 'pointer',
          border: 'none',
          color: 'var(--text-primary)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}
        title="切换明暗主题"
        aria-label="切换明暗主题"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      {renderRoute()}
    </div>
  )
}

export default App
