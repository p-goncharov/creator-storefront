import { useMemo } from 'react';
import CreatorGrid from './components/CreatorGrid';
import CreatorApiService from './services/creatorApi';
import './App.css';

function App() {
  const apiService = useMemo(() => new CreatorApiService(), []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Creator Stats</h1>
          <p>Showcasing top creators and their performance metrics</p>
        </div>
      </header>

      <main className="app-main">
        <CreatorGrid apiService={apiService} />
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Creator Storefront. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
