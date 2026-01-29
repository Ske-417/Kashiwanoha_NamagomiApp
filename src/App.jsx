import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Scan from './pages/Scan';
import History from './pages/History';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scan" element={<Scan />} />
            <Route path="history" element={<History />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
