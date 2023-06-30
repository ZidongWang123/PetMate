import React, {useEffect,useState} from "react";
import ImageUploader from 'react-images-upload';
import "./CreatePost.css"
import { darkPurple, orange,darkGray } from "../../../../constant/actionTypes";
import InputField from "../widget/InputField";
import UniformButton from "../widget/UniformButton";
import { Link, useNavigate } from 'react-router-dom';



export default function CreatePost(){

    const [pictures,setPictures]=useState([])
    const [title,setTitle]=useState()
    const [text,setText]=useState()
    const [tags,setTags]=useState([])
    const navigate=useNavigate()

    const handleTitleChange=(value)=>{
        setTitle(value)
    }
    const handleTextChange=(value)=>{
        setText(value)
    }
    const handleTagsChange=(value)=>{
        setTags(value)
    }
    const onDrop=(pictureFiles, pictureDataURLs)=> {
        setPictures(pictureFiles)

    }
    const onDelete=(pictureFiles, pictureDataURLs)=> {
        setPictures(pictureFiles)
    }
    const onSubmit=()=>{
        // send the post to the database
        // {todo}

        //
    }

    const onCancel=()=>{
        // 导航到目标页面
        const url = '/explore';
        navigate(url);

    }

    return (
        <div style={{display:"flex"}}> 
            
            <div style={{marginRight:"50px" }}>
                <InputField title="Title:" isMultiline={false} height="default" onInputChange={handleTitleChange}></InputField>
                <InputField title="Text:" isMultiline={true} height="350px" onInputChange={handleTextChange}></InputField>
                <InputField title="Tags:" isMultiline={false} height="default" onInputChange={handleTagsChange}></InputField>
            </div>
            <div>
                <h2 style={{
                fontFamily:"Comic Sans MS",
                margin:"10px 0",
                color:darkPurple
                }}>{"Pictures:"}</h2>
                <ImageUploader
               
                withIcon={false}
                buttonText='Choose images'
                withPreview={true}
                onChange={onDrop}
                onDelete={onDelete}
                buttonStyles={{color:"white",backgroundColor:orange}}
                fileSizeError={"File size is too big!"}
                fileTypeError={"This extension is not supported!"}
                imgExtension={['.jpg', '.gif', '.png', '.gif',"jpeg"]}
                maxFileSize={524288000}
                />
                <div style={{display:"flex",float:"right"}}> 
                    <UniformButton width="100px"  backgroundColor={"gray"} fontColor="white" onClick={onCancel}>cancel</UniformButton>
                    <UniformButton width="100px"  backgroundColor={orange} fontColor="white" onClick={onSubmit}>post</UniformButton>
                </div>

            </div>

        </div>     
    );
}
