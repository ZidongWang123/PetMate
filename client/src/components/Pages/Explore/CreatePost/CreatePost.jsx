import React, {useEffect,useState} from "react";
import ImageUploader from 'react-images-upload';
import "./CreatePost.css"
import { darkPurple, orange } from "../../../../constant/actionTypes";
import InputField from "../widget/InputField";
import InputTagBar from "../../../Widget/InputBar/InputTagBar";
import UniformButton from "../widget/UniformButton";
import { useNavigate, useParams } from 'react-router-dom';
import * as apis from "../../../../api";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg.jsx"
import { getSinglePost } from "../../../../api";
import Resizer from 'react-image-file-resizer';
const severityOptions = { success: "success", failure: "error",warning:"warning" }


export default function CreatePost() {


    const user = JSON.parse(localStorage.getItem('profile')).result;
    const { postId } = useParams();
    const [pictures, setPictures] = useState([])
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const [isFeedbackMsg, setIsFeedbackMsg] = useState(false)
    const [Msg, setMsg] = useState("")
    const [severity, setSeverity] = useState("")


    const handleTitleChange = (value) => {
        setTitle(value)
    }
    const handleTextChange = (value) => {
        setText(value)
    }
    const handleTagsChange = (value) => {
        setTags(value)
    }
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
          Resizer.imageFileResizer(
            file,
            420, 
            undefined, 
            'JPEG', 
            50, 
            0, 
            (compressedDataUrl) => {
              resolve(compressedDataUrl);
            },
            'base64' 
          );
        });
      };
    const onDrop =async (pictureFiles, pictureDataURLs) => {
        if(pictureFiles.length>6){
            setMsg("You can upload at most 6 pictures, please adjust the pictures")
            setSeverity(severityOptions.warning)
            setIsFeedbackMsg(true)
            
        }
       
       const compressedDataUrls=[]
       for(const file of pictureFiles){
        const compressedDataUrl= await compressImage(file);
        compressedDataUrls.push(compressedDataUrl)
       }
    
        setPictures(compressedDataUrls)
        

    }
    const onDelete = async(pictureFiles, pictureDataURLs) => {
        
        if(pictureFiles.length>6){
            setMsg("You can upload at most 6 pictures,please adjust the pictures")
            setSeverity(severityOptions.warning)
            setIsFeedbackMsg(true)            
        }
        const compressedDataUrls=[]
        for(const file of pictureFiles){
         const compressedDataUrl= await compressImage(file);
         compressedDataUrls.push(compressedDataUrl)
        }

        setPictures(compressedDataUrls)
    }
    const handelfeebackMsgClose = () => {
        setIsFeedbackMsg(false)

    }

    const createPost=async()=>{
        try {

            
            const res = await apis.createExplorePost({ title, text, tags,  pictures, creatorId: user._id })
            if (res.status = 200) {
                setSeverity(severityOptions.success)
                setMsg(res.data.message)

                setTimeout(()=>{

                    navigate(`/userExplorePosts/${user._id}`)

                },1000)     
                
            }
            else if (res.status = 500) {
                setMsg(res.data.message)
                setSeverity(severityOptions.failure)
            }
            else {
                setSeverity(severityOptions.failure)
                setMsg("Unknown error, try again")
            }
            setIsFeedbackMsg(true)

        } catch (error) {
            setSeverity(severityOptions.failure)
            setMsg("Unknown error, try again")
            setIsFeedbackMsg(true)
        }

    }
    const modifyPost=async()=>{
        try {

            
            const res = await apis.modifyPost(postId,{ title, text, tags, pictures})
            if (res.status = 200) {
                setSeverity(severityOptions.success)
                setMsg(res.data.message)

                setTimeout(()=>{

                    navigate(`/userExplorePosts/${user._id}`)

                },1000)     
                
            }
            else if (res.status = 500) {
                setMsg(res.data.message)
                setSeverity(severityOptions.failure)
            }
            else {
                setSeverity(severityOptions.failure)
                setMsg("Unknown error, try again")
            }
            setIsFeedbackMsg(true)

        } catch (error) {
            setSeverity(severityOptions.failure)
            setMsg("Unknown error, try again")
            setIsFeedbackMsg(true)
        }

    }
    const onSubmit = async () => {



        if(title===""||tags.length===0||text===""||pictures.length===0){
            setMsg("Each input field must not be empty. ")
            setSeverity(severityOptions.failure)
            setIsFeedbackMsg(true)
        }
        else{
            if(pictures.length>6){

                setMsg("You can upload at most 6 pictures,please adjust the pictures")
                setSeverity(severityOptions.failure)
                setIsFeedbackMsg(true)
            }
            else{
                if(postId){
                    modifyPost()
                }
                else{
                    createPost()
                }
            }


    
        }


    }

    const onCancel = () => {
        if(postId){
            navigate(`/userExplorePosts/${user._id}`)
        }else{
            const url = "/explore";
            navigate(url);
        }

    };
    useEffect(() => {

        const getPost=async()=>{
            try{
    
                const res=await getSinglePost(postId)
                if(res.status===200){
    
                    setTitle(res.data.result.title)
                    setTags(res.data.result.tags);
                    setText(res.data.result.text);
                    setPictures(res.data.result.pictures);
                }
    
            }catch(error){
                console.log(error)
            }
        
        }

        if (postId) {

            getPost()

        }
    }, []);

    return (
        <div style={{ display: "flex" }}>

            <div style={{ marginRight: "50px" }}>
                <InputField title="Title:" value={title} isMultiline={false} height="default" onInputChange={handleTitleChange}></InputField>
                <h2 style={{
                    fontFamily:"Comic Sans MS",
                    color:darkPurple,
                    margin:"10px 0"
                }}>
                    Tags:
                </h2>
                <InputTagBar
                    tags={tags}
                    onTagsChange={handleTagsChange}
                    width="450px" 
                    borderRadius="10px" 
                    height="90px"
                    where="explorePost"
                >
                </InputTagBar>
                <InputField title="Text:" value={text} isMultiline={true} height="340px" onInputChange={handleTextChange} maxLength={2000}></InputField>

            </div>
            <div>
                <h2 style={{
                    fontFamily: "Comic Sans MS",
                    margin: "10px 0",
                    color: darkPurple
                }}>{"Pictures:"}</h2>
                <ImageUploader
                    label="* <=5MB&at most 6 pictures; jpg|jpeg|png|gif"
                    withLabel={true}
                    withIcon={true}
                    buttonText='Choose images'
                    withPreview={true}
                    labelStyles={{fontFamily:"ubuntu"}}
                    onChange={onDrop}
                    onDelete={onDelete}
                    buttonStyles={{color:"white",backgroundColor:orange,fontFamily:"Gloria Hallelujah"}}
                    fileSizeError={"File size is too big!"}
                    fileTypeError={"This extension is not supported!"}
                    imgExtension={['.jpg', '.gif','.jpeg','.png']}
                    maxFileSize={5242880}
                    defaultImages={pictures}
                />
                <div style={{ display: "flex", float: "right" }}>
                    <UniformButton width="100px" backgroundColor={"gray"} fontColor="white" onClick={onCancel}>cancel</UniformButton>
                    <UniformButton width="100px" backgroundColor={orange} fontColor="white" onClick={onSubmit}>
                        {postId ? "confirm change" : "post"}
                    </UniformButton>
                </div>

            </div>
            <FeedbackMsg status={isFeedbackMsg} severity={severity} message={Msg} onClose={handelfeebackMsgClose}></FeedbackMsg>

        </div>
    );
}
