import PaneContainer from "./PaneContainer";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import avatar from "../../../images/avatar.jpg"
import "./UserPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

import { fontSize } from "@mui/system";



export default function UserPage(){
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


          <PaneContainer></PaneContainer>
        </div>
    )
}