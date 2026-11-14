import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing-page';
import ExplorePage from './pages/Explore-page';
import MoonExplorePage from './pages/moon-pages/moon-explore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/moon" element={<MoonExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;