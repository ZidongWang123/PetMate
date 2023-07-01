import React,{useState} from "react"
import { darkPurple,orange } from "../../../constant/actionTypes";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { auto } from "@popperjs/core";
import { display, fontFamily, width } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';



export default function InfoItem({attribute,title,onConfirmChange,select,selectItems,inputLength,inputWidth}){


    const normTitle=title.charAt(0).toUpperCase() + title.slice(1)
    const[currentValue,setCurrentValue]=useState(attribute)
    const[isEdit,setIsEdit]=useState(false)


    const handleConfirmClick = () => {

        onConfirmChange(title,currentValue)
        setIsEdit(false);

        //update the data in the database
      };
    const onChange=(event)=>{
        setCurrentValue(event.target.value);
    }
    const handleEditClick = () => {
        setCurrentValue(attribute)
        setIsEdit(true)
    };
    const handleCancelClick=()=>{
        setIsEdit(false)
    }

    
    return(

        <div style={{display:"flex",alignItems:"center",height:"60px"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"flex-end",width:"100%"}}>
                <h4 style={{
                    fontFamily:"Comic Sans MS",
                    color:darkPurple,
                    margin:"0",
                    width:"160px"
                }}>
                    {normTitle}:
                </h4>
                {isEdit?
                <TextField 
                    select={select}
                    variant="standard" 
                    value={currentValue}
                    onChange={onChange}
                    
                
                    // value={inputValue}
                    inputProps={{
                        style:{  fontFamily: "ubuntu", // 设置字体样式
                        fontSize: '15px', // 设置字体大小
                        fontWeight: 'bold', // 设置字体粗细}
                        width:inputWidth
                        },
                        maxLength:inputLength
                    }}>
                    {select?
                    
                        selectItems.map((option) => (
                            <MenuItem key={ option} value={option}>
                                {option}
                            </MenuItem>
                        ))
                    :null}
                </TextField>:
                <span style={{
                    fontFamily: "ubuntu", // 设置字体样式
                    fontSize: '15px', // 设置字体大小
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', // 设置字体粗细}
                }}>
                    {attribute}
                </span>}
                <div style={{marginLeft:"auto",marginRight:"20px",display:"flex"}}>
                    {!isEdit?
                    <span onClick={handleEditClick} className="infoItem-span">
                        Edit
                    </span>:
                    <>
                        
                        <span className="infoItem-span" onClick={handleCancelClick} > Cancel</span>
                        <span className="infoItem-span" onClick={handleConfirmClick} > Confirm</span>
                    </>}
                </div>
            </div>
        </div>
    )
}
