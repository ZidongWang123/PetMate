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

import SingleGroup1 from "./components/Pages/Groups/SingleGroup/SingleGroup1";
import Post from "./components/Pages/Groups/Post/Post";
import UserPage from "./components/Pages/Explore/UserPage/UserPage";
import CreatePost from "./components/Pages/Explore/CreatePost/CreatePost";
import SecondNavbar from "./components/Navbar/SecondNavbar";
import Applied from "./components/Settings/MyActivity/Applied/Applied";
import Created from "./components/Settings/MyActivity/Created/Created";
import GroupPostForm from "./components/Pages/Groups/Post/GroupPostForm";
import EditPost from "./components/Pages/Groups/Post/Edit/EditPost";
import { CreateGroup } from "./components/Pages/Groups/GroupForm/CreateGroup";
import { EditGroup } from "./components/Pages/Groups/GroupForm/EditGroup";
import ActivityPage from "./components/Pages/Activity/ActivityPage/ActivityPage";
import Subscription from "./components/Navbar/Subscription";
import Applications from "./components/Settings/Application/Applications";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const pureMode=localStorage.getItem("pureMode")
  let initialAds=true
  if(pureMode){
    
    if(pureMode==="false"){
      initialAds=false
    }else{
      initialAds=true
    }
    
    console.log(initialAds)
  }
  const [isAds, setIsAds] = React.useState(initialAds);

  
  const [openSecNavbar, setOpenSecNavbar] = React.useState(
    localStorage.getItem("secNavbar") === "true"
  );
  const [secNav, setSecNav] = React.useState(
    localStorage.getItem("secNav")?.split(",") || []
  );
  const activityTypes = ["events", "services"];
  const [activityType, setActivityType] = React.useState("");
  

  const handleAdSChange=(event)=>{
    setIsAds(!event.target.checked);
    const pureMode=!event.target.checked
    localStorage.setItem('pureMode', pureMode);

  }
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
          <Navbar handleSecNavbar={handleSecNavbar} isAdsOpen={isAds} onAdsChange={handleAdSChange} />
          {/*    <PaypalPayment /> */}
          {openSecNavbar ? (
            <SecondNavbar pages={secNav} activityType={activityType} />
          ) : null}
          <div className="page">
          {isAds&&<Ads className="ads-leftContainer"/>}
            <div className="routes">
              <Routes>
                <Route path="/" element={<Navigate to="/explore" />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:id" element={<SingleGroup1 />} />
                <Route path="/groups/create-group" element={<CreateGroup />} />
                <Route path="/groups/:id/edit-group" element={<EditGroup />} />
                <Route path="/groups/post/:id" element={<Post />} />

              <Route
                path="/groups/:id/create-post"
                element={<GroupPostForm />}
              />
              <Route path="/event" element={<Event />} />
              <Route path="/service" element={<Service />} />
              <Route path="/howitworks" element={<AppIntro />} />
              <Route path="/personalInfo" element={<PersonalInfo />} />
              <Route path="/myarticles" element={<MyPosts />} />
              <Route path="/myarticles/:userId" element={<MyPosts />} />
              <Route path="/mygroups" element={<MyGroups />} />
              <Route path="/userExplorePosts/:userId" element={<UserPage />} />
              <Route path="/explore/post/create" element={<CreatePost />} />
              <Route path="/groups/post/editPost/:id" element={<EditPost />} />

              <Route
                path="/explore/post/editPost/:postId"
                element={<CreatePost />}
              />
              <Route path="/:activityType/:id" element={<ActivityPage />} />
              <Route path="/:activityType/:id" element={<ActivityPage />} />
              <Route path="/subscription" element={<Subscription />} />

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

              <Route path="/applications/:id" element={<Applications />} />

                {!user ? (
                  <Route path="/auth" element={<Auth />} />
                ) : (
                  <Route path="/explore" element={<Navigate to="/" />} />
                )}
              </Routes>
            </div>
            {isAds&&<Ads className="ads-rightContainer"  />}
          </div>
        </Container>
      </BrowserRouter>
    
  );
};

export default App;
