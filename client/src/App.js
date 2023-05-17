import React from 'react';
import { Container } from "@mui/material";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Explore from './components/Pages/Explore/Explore';
import Auth from './components/Auth/Auth';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
      <BrowserRouter>
          <Container maxWidth="lg">
              <Navbar />
              <Routes>
                  <Route path="/" element={<Navigate to="/posts" />} />
                  <Route path="/explore" element={<Explore />} />
                  {/* <Route path="/posts/search" element={<Home />} />
                  <Route path="/posts/:id" element={<PostDetails />} /> */}
                  {!user ? (
                      <Route path="/auth" element={<Auth />} />
                      ) : (
                      <Route path="/explore" element={<Navigate to="/" />} />
                  )}
              </Routes>
          </Container>
      </BrowserRouter>
  );
};

export default App;




/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
