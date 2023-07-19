import React,{useState} from "react"
import { darkPurple} from "../../../constant/actionTypes";
import { modifyPersonalInfo } from "../../../api";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';



export default function PassordItem({attribute,userId,title,onConfirmChange}){


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
                            style:{  fontFamily: "ubuntu", 
                            fontSize: '15px', 
                            fontWeight: 'bold', 
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

                <span style={{
                    fontFamily: "ubuntu", 
                    fontSize: '15px', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', 
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
