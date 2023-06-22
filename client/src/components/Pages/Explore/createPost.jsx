import React, {useEffect,useState} from "react";
import React, {useEffect,useState} from "react";
import ImageUploader from 'react-images-upload';
import "./CreatePost.css"
import { darkPurple, orange } from "../../../constant/actionTypes";
import InputField from "./InputField";

export default function CreatePost(){

    const [pictures,setPictures]=useState([123])

    const onDrop=(pictureFiles, pictureDataURLs)=> {
        setPictures(pictureFiles)

    }
    const onDelete=(pictureFiles, pictureDataURLs)=> {
        setPictures(pictureFiles)
    }
    return (
        <div style={{display:"flex"}}> 
            
            <div style={}>
                <InputField title="topic:" isMultiline={false} height="default"></InputField>
                <InputField title="text:" isMultiline={true} height="300px"></InputField>
                <InputField title="tags:" isMultiline={false} height="default"></InputField>
            </div>
            <ImageUploader
            fileContainerStyle={{minHeight:"620px",width:"400px",display: "flex",flexDirection:"column",justifyContent: "flex-start"}}
            withIcon={true}
            buttonText='Choose images'
            withPreview={true}
            onChange={onDrop}
            onDelete={onDelete}
            fileSizeError={"File size is too big!"}
            fileTypeError={"This extension is not supported!"}
            imgExtension={['.jpg', '.gif', '.png', '.gif',"jpeg"]}
            maxFileSize={524288000}
            />
        </div>     
    );
}
