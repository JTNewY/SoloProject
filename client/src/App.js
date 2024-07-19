import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; // Ensure you add styles in App.css or use your preferred styling method
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './layout/Navigation';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainContent from './pages/MainContent';
import Profile from './layout/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Profile />
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          {/* 다른 경로와 컴포넌트들을 추가하세요 */}
        </Routes>
      </div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
