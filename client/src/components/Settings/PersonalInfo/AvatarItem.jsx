import React,{useState, useRef}from "react";
import { Avatar,  Box, Slider } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import { Modal } from "@mui/material";
import { orange,darkPurple } from "../../../constant/actionTypes";
import UniformButton from "../../Pages/Explore/widget/UniformButton";
import { modifyPersonalInfo } from "../../../api";
import { useNavigate } from 'react-router-dom';

export default function AvatarItem({attribute,userId,title,onConfirmChange}){
   
    const normTitle=title.charAt(0).toUpperCase() + title.slice(1)
    const [openModal, setOpenModal] = useState(false);

    const [zoom,setZoom]=useState(1)
    const [preview, setPreview] =useState(null)  
    const navigate=useNavigate()
    var avatarEditorRef=useRef(null)  

    const handleSlider = (event, value) => {
        setZoom(value)
    };

    const handleCancel = () => {
        setOpenModal(false)
    };

    const setEditorRef = (ed) => {
    avatarEditorRef = ed;
    };

    const handleSave = async (e) => {
    if (avatarEditorRef) {
        const canvasScaled = avatarEditorRef.getImageScaledToCanvas();
    
        const croppedImg = canvasScaled.toDataURL('image/jpeg', 0.8);

        try{
            const res=await modifyPersonalInfo(userId,{[title]:croppedImg})
            if(res.status===200){
                onConfirmChange(title,croppedImg)
                setPreview(null)
                setZoom(1)
                setOpenModal(false)

                let user = JSON.parse(localStorage.getItem('profile'));
                user.result.avatar=croppedImg
                localStorage.setItem('profile', JSON.stringify(user));
                navigate("/personalInfo")
            }
        }catch(error){
   
        }

        
    }
    };

    const handleFileChange = (e) => {
        if(e.target.files&& e.target.files.length>0){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            e.target.value = '';
            setOpenModal(true)
        }

    };
    
    return (

        <div style={{display:"flex",alignItems:"center",height:"100px" ,borderBottom:"solid 1px rgba(0,0,0,0.2)"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
                <h4 style={{
                    fontFamily:"Comic Sans MS",
                    color:darkPurple,
                    margin:"0",
                    width:"160px"
                }}>
                    {normTitle}
                </h4>
                <Avatar
                    src={attribute}
                    style={{ width: "50px", height: "50px" }}
                />
                <Modal
                    slotProps={{
                        backdrop:{
                            sx:{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",

                            }
                        },
                        root:{
                            sx:{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",

                            }
                        }
                    }}
                    open={openModal}
                >
                    <Box style={{outline:"none"}}>
                        <AvatarEditor
                            borderRadius={150}
                            ref={setEditorRef}
                            image={preview}
                            width={180}
                            height={180}
                            border={50}
                            color={[0, 0, 0, 0.7]} 
                            rotate={0}
                            scale={zoom}
                        />
                        <Slider
                            sx={{
                                display:"block",
                                margin:"0 auto",
                                width:"80%",
                                color:darkPurple
                            }}
                            aria-label="raceSlider"
                            value={zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            size="medium"
                            onChange={handleSlider}
                        ></Slider>
                        <Box 
                            style={{
                                display:"flex",
                                justifyContent:"center"
                                
                            }}
                        >
                            <UniformButton width="100px" backgroundColor="gray" fontColor="white" onClick={handleCancel}>
                                Cancel
                            </UniformButton>
                            <UniformButton width="100px" backgroundColor="orange" fontColor="white" onClick={handleSave}>
                                save
                            </UniformButton>
                        </Box>
                    </Box>

                </Modal>
                <input
                    id="personalInfo-avatarItem-editImg" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    style={{
                        display:"none",
                        marginLeft:"auto",
                        color:{orange},
                        fontFamily:"ubuntun"
                        
                    }}
                ></input>
                <label htmlFor ="personalInfo-avatarItem-editImg" className="infoItem-span"
                style={{
                    marginLeft:"auto",
                    marginRight:"20px"
                }}>
                    Change 
                </label>
            </div>
        </div>
    )
}
 

   

