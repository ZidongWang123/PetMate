import React,{useState} from "react"
import { darkPurple} from "../../../constant/actionTypes";
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { modifyPersonalInfo } from "../../../api";




export default function InfoItem({attribute,userId,title,onConfirmChange,select,selectItems,inputLength,inputWidth}){


    const normTitle=title.charAt(0).toUpperCase() + title.slice(1)
    const[currentValue,setCurrentValue]=useState(attribute)
    const[isEdit,setIsEdit]=useState(false)
    const navigate=useNavigate()

    const handleConfirmClick =async () => {

        try{
            const res=await modifyPersonalInfo(userId,{[title]:currentValue})
            if(res.status===200){
                setIsEdit(false);
                onConfirmChange(title,currentValue)
                const user = JSON.parse(localStorage.getItem('profile'));
                user.result[title]=currentValue
                localStorage.setItem('profile', JSON.stringify(user));
                navigate("/personalInfo")
            }
        }catch(error){

        console.log(error)
        };
    }
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
                    inputProps={{
                        style:{  fontFamily: "ubuntu", 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
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
                    fontFamily: "ubuntu", 
                    fontSize: '15px', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', 
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
