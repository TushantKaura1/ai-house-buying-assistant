import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
