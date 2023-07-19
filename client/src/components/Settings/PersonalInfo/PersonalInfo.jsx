import React, { useEffect, useState } from "react";
import "./PersonalInfo.css"
import { darkPurple } from "../../../constant/actionTypes";
import InfoItem from "./InfoItem.jsx";
import DateItem from "./DateItem";
import AvatarItem from "./AvatarItem";
import {getPersonalInfo } from "../../../api";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
import dayjs from "dayjs";
import PassordItem from "./PasswordItem";
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
                <span style={{fontFamily: "ubuntu", 
                fontSize: '15px',
                fontWeight: 'bold', 
                }}>{children}</span>
            </div>
        </div>
    )

}

const sexOptions=["male","female","other","unspecified"]
const msg={successful:"successfully updated",failure:"fail to update, interal server error"}
const severity={success:"success",failure:"error"}
const PersonalInfo = () => {
    const[userInfo,setUserInfo]=useState({})
    const[isFeedbackMsg,setIsFeedbackMsg]=useState(false)


    const handelfeebackMsgClose=()=>{
        setIsFeedbackMsg(false)
    }

    const onInfoUpdate= (key,attributeValue)=>{
    
       setUserInfo(()=>({...userInfo, [key]:attributeValue}))
       setIsFeedbackMsg(true)
    }
    

    const fetcbPersonalInfo=async(userId)=>{
        try{

            const res= await getPersonalInfo(userId);
            if(res.status===200){
                setUserInfo(res.data.result)
            }
            else{
                console.log("unknown error, try again")
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect( ()=>{

        const userId = JSON.parse(localStorage.getItem('profile')).result._id;
        fetcbPersonalInfo(userId)
        
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
           
            <AvatarItem attribute={userInfo.avatar} userId={userInfo._id} title={"avatar"} onConfirmChange={onInfoUpdate} ></AvatarItem>
            <FixedInfo title="Email">{userInfo.email}</FixedInfo>
           
            <InfoItem attribute={userInfo.name} userId={userInfo._id} title={"name"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.address} userId={userInfo._id} title={"address"} onConfirmChange={onInfoUpdate} inputLength={30} inputWidth={"230px"}></InfoItem>
            <InfoItem attribute={userInfo.sex} userId={userInfo._id} title={"sex"} onConfirmChange={onInfoUpdate} select={true} selectItems={sexOptions}></InfoItem>
            <DateItem attribute={userInfo.birthday} userId={userInfo._id} title={"birthday"} onConfirmChange={onInfoUpdate}></DateItem>
            <InfoItem attribute={userInfo.intro} userId={userInfo._id} title={"intro"} onConfirmChange={onInfoUpdate} inputLength={60} inputWidth={"460px"}></InfoItem>
            <PassordItem attribute={userInfo.password} userId={userInfo._id} title={"password"} onConfirmChange={onInfoUpdate}></PassordItem>
            {userInfo.isPrime&&
           <FixedInfo title="Prime">{dayjs(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss")} - {dayjs(userInfo.dueTime).format("YYYY-MM-DD HH:mm:ss")}</FixedInfo>

            }
            <FeedbackMsg status={isFeedbackMsg} severity={severity.success} message={msg.successful} onClose={handelfeebackMsgClose}></FeedbackMsg>
        </div>

    );
};

export default PersonalInfo;