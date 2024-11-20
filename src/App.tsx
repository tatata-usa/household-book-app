import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './component/AppLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />}></Route>
          <Route path='/report' element={<Report />}></Route>
          <Route path='/*' element={<NoMatch />}></Route>
          </Route>
      </Routes>
    </Router>

  );
}

export default App;
