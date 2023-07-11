import PaneContainer from "../PaneContainer/PaneContainer";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import avatar from "../../../../images/avatar.jpg"
import "./UserPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { getPersonalInfo } from "../../../../api";
import { Avatar } from "@mui/material";

import { fontSize } from "@mui/system";




export default function UserPage(){
    const{userId} = useParams();
    const[userInfo,setUserInfo]=useState({})

    const fetcbPersonalInfo=async(userId)=>{
        try{
    
            const res= await getPersonalInfo(userId);
            if(res.status===200){
                setUserInfo(res.data.result)
            }
            else{
                console.log("unknown error when getting personal infomation")
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect( ()=>{

        
        fetcbPersonalInfo(userId)
        
    },[])

        
    

    return(
        

        <div>
            <div className="userPageProfil">
                <Avatar
                src={userInfo.avatar}
                style={{
                    width:"140px",
                    height:"140px",
                    marginBottom:"10px",
                    marginTop:"10px",
                    marginRight:"10px"
                }}
                >
                </Avatar>
                
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <h3 style={{marginTop:"5px",marginBottom:"5px"}}>{userInfo.name}</h3>
                    <div style={{color:"gray",fontSize:"12px"}}>id: {userInfo._id} | location: {userInfo.location}</div>
                    <div>Introduction:{userInfo.intro}</div>
                    <div style={{marginTop:"5px",marginBottom:"5px"}}>
                        {(userInfo.sex==="female"||userInfo.sex==="male")&&
                        <FontAwesomeIcon 
                            icon={userInfo.sex==="male" ? faMars : userInfo.gender==="female"? faVenus :null}
                            color={userInfo.sex=="male" ? "blue" : userInfo.gender==="female"? "pink" :""} 
                        />}
                    </div>
                    <div>{} <span style={{color:"gray"}}>likes</span>
                    </div>
                </div>

            </div>


            <PaneContainer userId={userId} where="userPage" keyword=""></PaneContainer>
        </div>
    )
}