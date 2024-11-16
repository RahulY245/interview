import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Protect routes */}
            <Route 
              path="/List" 
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Stepperform" 
              element={
                <ProtectedRoute>
                  <Stepperform />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Product" 
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Add-product" 
              element={
                <ProtectedRoute>
                  <Addproduct />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
