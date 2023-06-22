import React,{useEffect,userState} from "react";
import TextField from '@mui/material/TextField';
import { darkPurple, orange } from "../../../constant/actionTypes";

export default function InputField({title,isMultiline,height}){


    return(
        <>
            <h2 style={{
            fontFamily:"Comic Sans MS",
            fontSize:"25px",
            fontWeight:"bold",
            color:orange
            }}>{title}</h2>
            <TextField variant="outlined" 
            multiline={isMultiline}
            InputProps={{
                style:{  fontFamily: "Comic Sans MS", // 设置字体样式
                fontSize: '16px', // 设置字体大小
                fontWeight: 'bold', // 设置字体粗细}
                fontFamily:"Comic Sans MS"
            }}}
            sx={{
                background:"white",
                borderRadius:"5px",
                width:"400px",
                height:{height},
                overflow: "auto",
                "::-webkit-scrollbar":{
                    display: "none"
                }
            }}/>

        </>
    )    

    }