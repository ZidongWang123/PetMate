import React from 'react';
import { Container } from "@mui/material";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Explore from './components/Pages/Explore/Explore';
import Groups from './components/Pages/Groups/Groups';
import Event from './components/Pages/Event/Event';
import Service from './components/Pages/Service/Service';
import Auth from './components/Auth/Auth';
import PersonalInfo from './components/Settings/PersonalInfo/PersonalInfo';
import MyPosts from './components/Settings/MyPosts/MyPosts';
import MyGroups from './components/Settings/MyGroups/MyGroups';
import MyEvents from './components/Settings/MyEvents/MyEvents';
import MyServices from './components/Settings/MyServices/MyServices';
import AppIntro from './components/Settings/AppIntro/AppIntro';
import Ads from './components/Widget/Ads/Ads';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
      <BrowserRouter>
          <Container maxWidth="lg">
              <Navbar />
              <div className="page"> 
                <Ads />
                  <div className="routes">
                    <Routes >
                        <Route path="/" element={<Navigate to="/explore" />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="/event" element={<Event />} />
                        <Route path="/service" element={<Service />} />
                        <Route path="/howitworks" element={<AppIntro />} />
                        <Route path="/personalInfo" element={<PersonalInfo />} />
                        <Route path="/myposts" element={<MyPosts />} />
                        <Route path="/mygroups" element={<MyGroups />} />
                        <Route path="/myevents" element={<MyEvents />} />
                        <Route path="/myservices" element={<MyServices />} />
                        {!user ? (
                            <Route path="/auth" element={<Auth />} />
                            ) : (
                            <Route path="/explore" element={<Navigate to="/" />} />
                        )}
                    </Routes>
                  </div>
                <Ads />
              </div>
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
