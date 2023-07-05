import React, {useEffect,useState} from "react";
//import ImageUploader from 'react-images-upload';
// import ImageUploader from 'react-images-upload';
import "./CreatePost.css"
import { darkPurple, orange,darkGray } from "../../../../constant/actionTypes";
import InputField from "../widget/InputField";
import UniformButton from "../widget/UniformButton";
import { Link, useNavigate,useParams } from 'react-router-dom';
import dog1 from "../../../../images/dog1.jpg"
import dog2 from "../../../../images/dog2.jpg"
import dog3 from "../../../../images/dog3.jpg" 



export default function CreatePost(){

    const{postId} = useParams();
    console.log(postId)

    const [pictures,setPictures]=useState([])
    const [title,setTitle]=useState("")
    const [text,setText]=useState("")
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
        setPictures(pictureDataURLs)

    }
    const onDelete=(pictureFiles, pictureDataURLs)=> {
        setPictures(pictureDataURLs)
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
    useEffect(()=>{
        if(postId){
            /* *****************************************
                request post data according to postId 

                then set all states

            ******************************************/
        setTitle("this is a title")
        setTags(["tag1","tag2","tag3"])
        setText("This is a text")
        setPictures([dog1,dog2,dog3])
        }

    },[])

    return (
        <div style={{display:"flex"}}> 
            
            <div style={{marginRight:"50px" }}>
                <InputField title="Title:" value={title} isMultiline={false} height="default" onInputChange={handleTitleChange}></InputField>
                <InputField title="Text:" value={text} isMultiline={true} height="350px" onInputChange={handleTextChange}></InputField>
                <InputField title="Tags:" isMultiline={false} height="default" onInputChange={handleTagsChange}></InputField>
            </div>
            <div>
                <h2 style={{
                fontFamily:"Comic Sans MS",
                margin:"10px 0",
                color:darkPurple
                }}>{"Pictures:"}</h2>
                {/* <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                withPreview={true}
                onChange={onDrop}
                onDelete={onDelete}
                buttonStyles={{color:"white",backgroundColor:orange,fontFamily:"Gloria Hallelujah"}}
                fileSizeError={"File size is too big!"}
                fileTypeError={"This extension is not supported!"}
                imgExtension={['.jpg', '.gif', '.png', '.gif',"jpeg"]}
                maxFileSize={524288000}
                defaultImages={pictures}
                /> */}
                <div style={{display:"flex",float:"right"}}> 
                    <UniformButton width="100px"  backgroundColor={"gray"} fontColor="white" onClick={onCancel}>cancel</UniformButton>
                    <UniformButton width="100px"  backgroundColor={orange} fontColor="white" onClick={onSubmit}>
                        {postId?"confirm":"post"}
                    </UniformButton>
                </div>

            </div>

        </div>     
    );
}
