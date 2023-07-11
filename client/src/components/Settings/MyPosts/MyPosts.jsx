//import PaneContainer from "./PaneContainer";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import avatar from "../../../images/avatar.jpg"
import "./mypostpage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import {getUserArticles} from "../../../api/user"
import {FormData} from "../../../util/index"
import TableFilter  from "../../Widget/TableFilter/TableFilter";




export default function MyPost(){
    const params = useParams();
    console.log(JSON.parse(window.localStorage.getItem("profile")).result,"7777");
    const userId=params.userId|| JSON.parse(window.localStorage.getItem("profile")).result._id 
    const [profil,setProfil]=useState([])
    const [articleList,setArticleList]=useState([])

    const columns = [

      {
        field: 'Topics',
        headerName: 'Topics', 
        width:200,
        renderCell:(params) => (
          
           
            <Link
           to={`/groups/post/${params.row.id}`} style={{ textDecoration:'none'}}
            >
              {params.row.Topics}
            </Link>
        ),
  
      },
      {
        field: 'Groups',
        headerName: 'Groups', 
        width:100,
        renderCell:(params) => (
           
            <Link
           to={`/groups/${params.row.g_id}`}
            >
              {params.row.Groups}
            </Link>
        ),
  
      },
      {
        field: 'Date',
        headerName: 'Date', 
        width:150,
  
  
      },
      {
        field: 'Author',
        headerName: 'Author',
        width:200,
  
      },
      {
        field: 'Tags',
        headerName: 'Tags', 
        width:300,
        renderCell:(params) => (
           
        
            <div>
            {params.row.Tags.map(item=>{
              return <span className="single-tag">#{item}</span>
            })}
            </div>
              
           
        ),
  
      },
     
      
    ];
    const getUserArticlesRequest=async(userId)=>{
      try {
        const articleListResulet=await getUserArticles(userId)
     
        const articles=articleListResulet.map(item=>{
       
          return {"id":item._id,"g_id":item.g_id._id,"Topics":item.title,"Groups":item.g_id.groupName,"Date":FormData(item.date),"Author":item.u_id.name,"Tags":item.tags}
        })
        setArticleList(articles)
      } catch (error) {
        console.log(error);
      }
        
    }
    useEffect(()=>{
        // request profil data here and set the variable profil
        
        // todo...
       
        getUserArticlesRequest(userId)
        setProfil({avatar:avatar,name:"wang" ,intro:"my name is zidong, I like cats",totalLikeCount:5,id:"12312321",location:"munich",gender:"male"})
},[])


    return(
        

        <div  className="myPosts">
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
            <div >
          <TableFilter data={articleList }  columns={columns}></TableFilter>
            </div>
            {/* <Forum /> */}
          
           
        </div>
        
    
    )
}