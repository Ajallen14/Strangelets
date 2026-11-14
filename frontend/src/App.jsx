import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing-page';
import ExplorePage from './pages/Explore-page';
import MarsPage from './pages/Mars-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/mars" element={<MarsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
