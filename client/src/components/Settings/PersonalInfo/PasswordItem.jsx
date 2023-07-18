import React,{useState} from "react"
import { darkPurple,orange } from "../../../constant/actionTypes";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { auto } from "@popperjs/core";
import { display, fontFamily, width } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import { modifyPersonalInfo } from "../../../api";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';






export default function PassordItem({attribute,userId,title,onConfirmChange,select,selectItems,inputLength,inputWidth}){


    const normTitle=title.charAt(0).toUpperCase() + title.slice(1)
    const[currentValue,setCurrentValue]=useState(attribute)
    const[isEdit,setIsEdit]=useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();}


    const handleConfirmClick =async () => {

        try{

            const res=await modifyPersonalInfo(userId,{[title]:currentValue})
            if(res.status===200){
                setIsEdit(false);
                onConfirmChange(title,currentValue)
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

                    <FormControl variant="standard">
                            
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={currentValue}
                        onChange={onChange}
                        inputProps={{
                            style:{  fontFamily: "ubuntu", // 设置字体样式
                            fontSize: '15px', // 设置字体大小
                            fontWeight: 'bold', // 设置字体粗细}
                            width:"230px"
                            },
                            maxLength:24

                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    </FormControl>:
                // <TextField 
                //     variant="standard" 
                //     value={currentValue}
                //     onChange={onChange}
                    
                
                //     // value={inputValue}
                //     inputProps={{
                //         style:{  fontFamily: "ubuntu", // 设置字体样式
                //         fontSize: '15px', // 设置字体大小
                //         fontWeight: 'bold', // 设置字体粗细}
                //         width:inputWidth
                //         },
                //         maxLength:inputLength
                //     }}>
                // </TextField>:
                <span style={{
                    fontFamily: "ubuntu", // 设置字体样式
                    fontSize: '15px', // 设置字体大小
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', // 设置字体粗细}
                }}>
                    **********************
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
