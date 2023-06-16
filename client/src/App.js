import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Explore from "./components/Pages/Explore/Explore";
import Groups from "./components/Pages/Groups/Groups";
import Event from "./components/Pages/Activity/Event/Event";
import Service from "./components/Pages/Activity/Service/Service";
import Auth from "./components/Auth/Auth";
import PersonalInfo from "./components/Settings/PersonalInfo/PersonalInfo";
import MyPosts from "./components/Settings/MyPosts/MyPosts";
import MyGroups from "./components/Settings/MyGroups/MyGroups";
import AppIntro from "./components/Settings/AppIntro/AppIntro";
import Ads from "./components/Widget/Ads/Ads";
import GroupForm from "./components/Pages/Groups/GroupForm/GroupForm";
import SingleGroup1 from "./components/Pages/Groups/SingleGroup/SingleGroup1";
import Post from "./components/Pages/Groups/Post/Post";
import SecondNavbar from "./components/Navbar/SecondNavbar";
import Applied from "./components/Settings/MyActivity/Applied/Applied";
import Created from "./components/Settings/MyActivity/Created/Created";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [openSecNavbar, setOpenSecNavbar] = React.useState(
    localStorage.getItem("secNavbar") === "true"
  );
  const [secNav, setSecNav] = React.useState(
    localStorage.getItem("secNav")?.split(",") || []
  );
  const activityTypes = ["events", "services"];
  const [activityType, setActivityType] = React.useState("");

  const handleSecNavbar = (param, type) => {
    if (param.length === 0) {
      localStorage.setItem("secNavbar", false);
      setOpenSecNavbar(false);
    } else {
      localStorage.setItem("secNavbar", true);
      setOpenSecNavbar(true);
      setSecNav(param);
      localStorage.setItem("secNav", param);
      if (type === "My events") {
        setActivityType(activityTypes[0]);
      }

      if (type === "My services") {
        setActivityType(activityTypes[1]);
      }
    }
  };

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar handleSecNavbar={handleSecNavbar} />
        {openSecNavbar ? (
          <SecondNavbar pages={secNav} activityType={activityType} />
        ) : null}
        <div className="page">
          <Ads />
          <div className="routes">
            <Routes>
              <Route path="/" element={<Navigate to="/explore" />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/group1" element={<SingleGroup1 />} />
              <Route path="/groups/create-group" element={<GroupForm />} />
              <Route path="/groups/post" element={<Post />} />
              <Route path="/event" element={<Event />} />
              <Route path="/service" element={<Service />} />
              <Route path="/howitworks" element={<AppIntro />} />
              <Route path="/personalInfo" element={<PersonalInfo />} />
              <Route path="/myposts" element={<MyPosts />} />
              <Route path="/mygroups" element={<MyGroups />} />
              <Route
                path="/appliedevents"
                element={<Applied activityType={activityTypes[0]} />}
              />
              <Route
                path="/appliedservices"
                element={<Applied activityType={activityTypes[1]} />}
              />
              <Route
                path="/createdevents"
                element={<Created activityType={activityTypes[0]} />}
              />
              <Route
                path="/createdservices"
                element={<Created activityType={activityTypes[1]} />}
              />
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
