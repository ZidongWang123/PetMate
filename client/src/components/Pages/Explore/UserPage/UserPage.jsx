import PaneContainer from "../PaneContainer/PaneContainer";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./UserPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { getPersonalInfo } from "../../../../api";
import { Avatar } from "@mui/material";





export default function UserPage(){
    const{userId} = useParams();
    const[userInfo,setUserInfo]=useState({})
    const[postsCount,setPostsCount]=useState(0)
    const[likes,setLikes]=useState(0)
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
    const postsCountGet=(postsCount)=>{
        setPostsCount(postsCount)

    }
    const likesCountGet=(likesCount)=>{
        setLikes(likesCount)
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
                    <h3 style={{marginTop:"5px",marginBottom:"5px",fontFamily:"Comic Sans MS"}}>{userInfo.name}</h3>
                    <div style={{color:"gray",fontSize:"12px",fontFamily:"ubuntu"}}>id: {userInfo._id} | address: {userInfo.address}</div>
                    <div style={{fontFamily:"ubuntu"}}>Introduction:{userInfo.intro}</div>
                    <div style={{marginTop:"5px",marginBottom:"5px"}}>
                        {(userInfo.sex==="female"||userInfo.sex==="male")&&
                        <FontAwesomeIcon 
                            icon={userInfo.sex==="male" ? faMars : userInfo.sex==="female"? faVenus :null}
                            color={userInfo.sex=="male" ? "blue" : userInfo.sex==="female"? "pink" :""} 
                        />}
                    </div>
                    <div style={{display:"flex"}}>
                        <span style={{color:"gray",fontFamily:"ubuntu"}}>{postsCount}&nbsp;posts &nbsp;|&nbsp;</span>
                        <span style={{color:"gray",fontFamily:"ubuntu"}}>{likes}&nbsp;likes</span>
                    </div>
                </div>

            </div>


            <PaneContainer userId={userId} where="userPage" keyword="" postsCountGet={postsCountGet} likesCountGet={likesCountGet} likes={likes}></PaneContainer>
        </div>
    )
}