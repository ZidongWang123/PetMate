import React, { useEffect, useState } from "react";
import "./PersonalInfo.css"
import { darkPurple,orange } from "../../../constant/actionTypes";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InfoItem from "./InfoItem.jsx";
import DateItem from "./DateItem";
import avatar from "../../../images/avatar.jpg"
import AvatarItem from "./AvatarItem";



const PersonalInfo = () => {
    const[userInfo,setUserInfo]=useState({})

    

    const onInfoUpdate=(key,attributeValue)=>{
    /***************************************
    
    
    todo:  
    decide whether the key is img
    update data in the database
    
    
    ***************************************/
     
    
       setUserInfo(()=>({...userInfo, [key]:attributeValue}))
    }
    const sexOptions=["male","female","other","unspecified"]
    useEffect(()=>{

    /***************************************

    todo: require data from database
    

    ***************************************/
        
        const initialUserInfo={
            accountNum:"1231231331",
            email:"804667287@qq.com",
            city:"Munich",
            name:"www",
            birthday:"02-21-1999",
            sex:"male",
            intro:"I want to find friends who like dogs",
            avatar:avatar,
            password:"12313123"
            
        }
        setUserInfo(initialUserInfo)
        /***************************************

        todo: transfer the img url to dataurl,and setUserInfo
        

        ***************************************/
        
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
                        Account:
                    </h4>
                    <span style={{fontFamily: "ubuntu", // 设置字体样式
                    fontSize: '15px', // 设置字体大小
                    fontWeight: 'bold', // 设置字体粗细}
                    }}>{userInfo.accountNum}</span>
                </div>
            </div>
           
            <InfoItem attribute={userInfo.name} title={"name"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.email} title={"email"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.city} title={"city"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.sex} title={"sex"} onConfirmChange={onInfoUpdate} select={true} selectItems={sexOptions}></InfoItem>
            <DateItem attribute={userInfo.birthday} title={"birthday"} onConfirmChange={onInfoUpdate}></DateItem>
            <InfoItem attribute={userInfo.intro} title={"intro"} onConfirmChange={onInfoUpdate} inputLength={60} inputWidth={"460px"}></InfoItem>
            
        </div>

    );
};

export default PersonalInfo;