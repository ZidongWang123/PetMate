import React, { Children, useEffect, useState } from "react";
import "./PersonalInfo.css"
import { darkPurple,orange } from "../../../constant/actionTypes";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InfoItem from "./InfoItem.jsx";
import DateItem from "./DateItem";
import avatar from "../../../images/avatar.jpg"
import AvatarItem from "./AvatarItem";

const FixedInfo=({title,children})=>{


    return(
        <div style={{display:"flex",alignItems:"center",height:"60px"}}>
            <div 
                style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"flex-end"
                }}
            >
                <h4 
                    style={{
                        fontFamily:"Comic Sans MS",
                        color:darkPurple,
                        margin:"0",
                        width:"160px"
                    }}
                >
                    {title}:
                </h4>
                <span style={{fontFamily: "ubuntu", // 设置字体样式
                fontSize: '15px', // 设置字体大小
                fontWeight: 'bold', // 设置字体粗细}
                }}>{children}</span>
            </div>
        </div>
    )

}

const PersonalInfo = () => {
    const[userInfo,setUserInfo]=useState({})

    

    const onInfoUpdate= (key,attributeValue)=>{

       
    
       setUserInfo(()=>({...userInfo, [key]:attributeValue}))
    }
    const sexOptions=["male","female","other","unspecified"]
    useEffect(()=>{


        const user = JSON.parse(localStorage.getItem('profile'));
    
        setUserInfo(user.result)
        
    },[])

    return (
        <div className="personalInfo-pane">
            <h2 style={{
            fontFamily:"Comic Sans MS",
            fontSize:"20px",
            color:darkPurple,
            paddingBottom:"10px",
            borderBottom:"solid 2px rgba(0,0,0,0.2)",
            marginBottom:"0"
            }}>Personal Information:</h2>
           
            <AvatarItem attribute={userInfo.avatar} title={"avatar"} onConfirmChange={onInfoUpdate} ></AvatarItem>
            <FixedInfo title="Email">{userInfo.email}</FixedInfo>
           
            <InfoItem attribute={userInfo.name} userId={userInfo._id} title={"name"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.address} userId={userInfo._id} title={"address"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.sex} userId={userInfo._id} title={"sex"} onConfirmChange={onInfoUpdate} select={true} selectItems={sexOptions}></InfoItem>
            <DateItem attribute={userInfo.birthday} userId={userInfo._id} title={"birthday"} onConfirmChange={onInfoUpdate}></DateItem>
            <InfoItem attribute={userInfo.intro} userId={userInfo._id} title={"intro"} onConfirmChange={onInfoUpdate} inputLength={60} inputWidth={"460px"}></InfoItem>
            {userInfo.isPrime&&
           <FixedInfo title="Prime"></FixedInfo>
            }
        </div>

    );
};

export default PersonalInfo;