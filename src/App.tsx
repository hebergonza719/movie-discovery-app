import { Route, Routes } from 'react-router';
import HorrorMovieDiscoveryPage from './pages/HorrorMovieDiscoveryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HorrorMovieDiscoveryPage />} />
    </Routes>
  );
}
