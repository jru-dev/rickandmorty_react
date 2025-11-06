import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Items from './pages/Items'
import Contact from './pages/Contact'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
)