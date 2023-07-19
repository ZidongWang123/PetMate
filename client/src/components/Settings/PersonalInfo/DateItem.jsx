import * as React from "react"
import { darkPurple,orange } from "../../../constant/actionTypes";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { modifyPersonalInfo } from "../../../api";

export default function DateItem({attribute,userId,title,onConfirmChange}){


    const normTitle=title.charAt(0).toUpperCase() + title.slice(1)
    const[currentValue,setCurrentValue]=React.useState(attribute)
    const[isEdit,setIsEdit]=React.useState(false)


    const handleConfirmClick = async() => {

        try{
            const res=await modifyPersonalInfo(userId,{[title]:currentValue.toDate()})
            if(res.status===200){
                setIsEdit(false);
                onConfirmChange(title,currentValue.toDate())
            }
        }catch(error){
   
        }
        
    }

    const handleEditClick = () => {
        setCurrentValue(dayjs(attribute))
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        onChange={(newValue) => setCurrentValue(newValue)}
                        value={currentValue}
                        slotProps={{textField:{InputProps:{style:{padding:"0px",width:"100px"}},variant:"standard"}}}
                    />
                </LocalizationProvider>:
                <span style={{
                    fontFamily: "ubuntu", 
                    fontSize: '15px', 
                    fontWeight: 'bold', 
                }}>
                    {attribute&&dayjs(attribute).format("MM-DD-YYYY")}
                </span>}
                <div style={{marginLeft:"auto",marginRight:"20px",display:"flex" }}>
                    {!isEdit?
                    <span onClick={handleEditClick} className="infoItem-span"
                    style={{
                        color:{orange},
                        fontFamily:"ubuntun"
                    }}>
                        Edit
                    </span>:
                    [
                        <span className="infoItem-span" onClick={handleCancelClick} > Cancel</span>,
                        <span className="infoItem-span" onClick={handleConfirmClick} > Confirm</span>
                    ]}
                </div>
            </div>
        </div>

    )
}