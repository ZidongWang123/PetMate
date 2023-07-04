
//import PaneContainer from "./PaneContainer";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import avatar from "../../../images/avatar.jpg"
import "./mypostpage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import { fontSize } from "@mui/system";

const ForumPost = ({ post, group, date, author }) => (
  <div className="forum-post">
    <div className="post-list">
      <div className="post">
      <Link to="/groups/post">{post}</Link>
      </div>
      <div className="group">
        <Link to="/groups/group1">{group}</Link>
      </div>
      <div className="post-date">{date}</div>
      <div className="post-author">{author}</div>
    </div>
  </div>
);

const Forum = () => {
  const dummyData = [
    { post: "xxx", group: "Group 1", date: "2023-05-01", author: "Sarah" },
    { post: "xxx", group: "Group 1", date: "2023-05-02", author: "Author 2" },
    { post: "xxx", group: "Group 1", date: "2023-05-03", author: "Author 3" },
  ];

  return (
    <div className="forum">
      <div className="forum-header">
        <div className="header-post">Posts</div>
        <div className="header-group">Groups</div>
        <div className="header-date">Date</div>
        <div className="header-author">Author</div>
      </div>
      {dummyData.map((data, index) => (
        <ForumPost
          key={index}
          post={data.post}
          group={data.group}
          date={data.date}
          author={data.author}
        />
      ))}
    </div>
  );
};

export default function MyPost(){
    const{name} = useParams();
    const [profil,setProfil]=useState([])
    useEffect(()=>{
        // request profil data here and set the variable profil
        
        // todo...
        
        setProfil({avatar:avatar,name:"wang" ,intro:"my name is zidong, I like cats",totalLikeCount:5,id:"12312321",location:"munich",gender:"male"})
},[])


    return(
        

        <div>
            <div className="userPageProfil">
                <img src={profil.avatar} style={{width:"140px",borderRadius:"50%",marginBottom:"20px",marginTop:"10px",marginRight:"10px"}}></img>
                <div>
                    <h3 style={{marginTop:"20px",marginBottom:"5px"}}>{profil.name}</h3>
                    <div style={{color:"gray",fontSize:"12px"}}>id: {profil.id} | location: {profil.location}</div>
                    <div>{profil.intro}</div>
                    <div style={{marginTop:"5px",marginBottom:"5px"}}>
                        <FontAwesomeIcon 
                        icon={profil.gender==="male" ? faMars : profil.gender==="female"? faVenus :null}
                        color={profil.gender==="male" ? "blue" : profil.gender==="female"? "pink" :""} />     
                    </div>
                    <div>{profil.totalLikeCount} <span style={{color:"gray"}}>likes</span>
                    </div>
                </div>

            </div>

            <Forum />

        </div>
    
    )
}