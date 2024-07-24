import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; // Ensure you add styles in App.css or use your preferred styling method
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './layout/Navigation';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PostPages from './pages/PostPages';
import Login from './components/Login/LoginPage';
import Home from './pages/Home';
import LoginContextProvider from './contexts/LoginContextProvider';
import AboutPages from './pages/AboutPages';

import List from './pages/board/List';
import Insert from './pages/board/Insert';
import Read from './pages/board/Read';
import Update from './pages/board/Update';

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Header />
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPages />} />
            <Route path="/post" element={<PostPages />} />
            <Route path="/boards" element={ <List/> }></Route>
            <Route path="/boards/insert" element={ <Insert/> }></Route>
            <Route path="/boards/:no" element={ <Read/> }></Route>
            <Route path="/boards/update/:no" element={ <Update/> }></Route>
            {/* 다른 경로와 컴포넌트들을 추가하세요 */}
          </Routes>
        </div>
        <Footer />
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
