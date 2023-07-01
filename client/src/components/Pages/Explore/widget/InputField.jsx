import React,{useEffect,useState,userState} from "react";
import TextField from '@mui/material/TextField';
import { darkPurple, orange } from "../../../../constant/actionTypes";
import { Margin } from "@mui/icons-material";

export default function InputField({title,isMultiline,height,onInputChange}){

    const [inputValue,setInputValue]=useState("")
    const handleInput = (event) => {
        const value = event.target.value;
        setInputValue(value);
        onInputChange(value); // 调用父组件传递的回调函数，并传递输入框的值
      };
    return(
        <>
            <h2 style={{
            fontFamily:"Comic Sans MS",
            color:darkPurple,
            margin:"10px 0"
            }}>{title}</h2>
            <TextField variant="outlined" 
            multiline={isMultiline}
            onChange={handleInput}
            value={inputValue}
            InputProps={{

                style:{  fontFamily: "ubuntu", // 设置字体样式
                fontSize: '15px', // 设置字体大小
                fontWeight: 'bold', // 设置字体粗细}
                },
                maxRows:50
            }}
            sx={{
                background:"white",
                borderRadius:"10px",
                width:"450px",
                height:{height},
                overflow: "auto",
                "::-webkit-scrollbar":{
                    display: "none"
                },
                boxShadow:"1px 1px 4px rgba(0, 0, 0, 0.2)"
            }}/>

        </>
    )    

    }