import {useRef,useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./PostDetailWindow.css"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HeartIcon from "../widget/HeartIcon";
import { Link, useNavigate } from 'react-router-dom';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { orange } from "../../../../constant/actionTypes";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { deletePost } from "../../../../api";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import signInPic from "../../../../images/dabengou/SignInPic.jpg";
import Warning from "../../../Widget/ConfirmDialog/Warning";
import Tooltip from '@mui/material/Tooltip';

const warningText="Sure to delete the post？"
const severityOptions = { success: "success", failure: "error" }

export default function PostDetailWindow({post,isOpen,onClose,count,isLiked,onClick}){

    
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleDragStart = (e) => e.preventDefault();
    const pictures=post.pictures
    const pictureItems=[]
    const navigate = useNavigate();
    const [severiry,setSeverity]=useState("")
    const [msg,setMsg]=useState("")
    const [isFeedbackMsg,setIsFeedbackMsg]=useState(false)
    const [isWarningOpen,setIsWarningOpen]=useState(false)

    const handleImageLoad = (event) => {
        const img = event.target;
        const aspectRatio = img.width / img.height;
        let width = 'auto';
        let height = 'auto';
    
        if (aspectRatio < 1) {
          height = '420px';
        } else {
          width = '420px';
        }
    
        img.style.width = width;
        img.style.height = height;
      };

    pictures.map((item,index)=>{
        pictureItems.push(
            <div style={{display:"flex",height:"420px",justifyContent:"center",alignItems:"center"}}>
                <img 
                    className="pictureDetail" 
                    src={item} 
                    onLoad={handleImageLoad} 
                    onDragStart={handleDragStart} 
                    role="presentation" 
                />
                
            </div>
            
        )
    })

    const divRef = useRef(null);
    const deleteConfirm=async ()=>{

        try{
            const res=await deletePost(post._id)
            if (res.status === 200) {
                onClose()
                setIsWarningOpen(false)
                navigate(`/empty`)
                setTimeout(() => {
                    navigate(`/userExplorePosts/${user.result._id}`)
                }, 0);
               
            }
            else if (res.status = 500) {
                onClose()
                setMsg(res.data.message)
                setSeverity(severityOptions.failure)
            }
            else {
                setSeverity(severityOptions.failure)
                setMsg("Unknown error, try again")
            }
            setIsFeedbackMsg(true)
        }catch(error){

        }
        


        
    }
    const handleScroll = (event) => {
      const delta = event.deltaY;
      divRef.current.scrollTop += delta;
    };
    
    const handleLink=(param)=>{
        
        const queryParams = new URLSearchParams();
        queryParams.append('keyword', param);
        const path = '/explore';
        const url = `${path}?${queryParams.toString()}`;
        navigate("/explore/empty")
        setTimeout(() => {
            navigate(url);
        }, 0);
        
        onClose()

    }
    
    const onWarningCanecel=()=>{
        setIsWarningOpen(false)
    }
    const onDeleteClick=()=>{
        setIsWarningOpen(true)
    }

    if (!isOpen) {
        return null; 
      }
    
    
      
    return (
    <div className="popUpWindow">
        <div className="arrowLeft" onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <FeedbackMsg status={isFeedbackMsg} severity={severiry} message={msg} ></FeedbackMsg>
        <Warning isOpen={isWarningOpen} onConfirm={deleteConfirm} onCancel={onWarningCanecel} pic={signInPic} text={warningText}></Warning>
        <div className="modal-content" >
                <AliceCarousel 
                    
                    mouseTracking
                    // autoPlay 
                    // autoPlayStrategy="all" 
                    autoPlayInterval={1000}
                    items={pictureItems}
                />
        </div>
        <div style={{marginRight:"50px",height:"520",width:"420",position:"relative",marginLeft:"10px"}}>

            <div className="showDetail">
                <Link to={`/userExplorePosts/${post.creatorId}`}style={{color:"inherit",textDecorationLine: "none"}} onClick={onClose}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <Avatar 
                            src={post.creator.avatar} 
                            sx={{
                            width:"30px",
                            height:"30px",
                            
                            ":hover": {
                                cursor: "pointer",
                                filter: "brightness(0.8)"
                            }
                            }}>
                        </Avatar>
                        <span style={{
                            fontFamily: "Comic Sans MS",
                            marginLeft:"5px",
                            fontSize:"16px",
                            color:"rgb(100,100,100)"}}
                        >
                            {post.creator.name}
                        </span>
                    </div>
                </Link>

                <div className="contentWindow" onWheel={handleScroll} ref={divRef}>
                    <h3 style={{fontFamily:"ubuntu",wordBreak: "break-word"}}>{post.title}</h3>
                    <p style={{fontFamily:"ubuntu",wordBreak: "break-word",lineHeight: '1.5'}}>{post.text}</p>
                    <div>
                        {post.tags.map((item,index) => (
                            <span
                                style={{
                                    color: orange,
                                    display:"inline-block",
                                    fontFamily: "Comic Sans MS"
                                }}
                                className="tagInPosts"
                                onClick={
                                    ()=>handleLink(item)
                                }
                            >
                                #{item}
                            </span>
                        )
                        )}
                    </div>
                    

                </div>
                <span 
                    style={{
                        fontSize:"14px",
                        fontFamily:"ubuntu",
                        color:"gray"
                    }}>
                    Created at: {dayjs(post.createdAt).format("MM-DD-YYYY HH:mm:ss")}
                </span>

            </div>
            <div className="endElement" >
                <span>
                    <HeartIcon count={count} isLiked={isLiked} onClick={onClick}/>
                </span>
                <span style={{float:"right"}}>
                {user&&post.creatorId===user.result._id&&
                <Link to={`/explore/post/editPost/${post._id}`}>
                    <Tooltip title="edit">
                        <FontAwesomeIcon className="clickIcon" icon={faEdit} > </FontAwesomeIcon>
                    </Tooltip>
                </Link>
                }
                {user&&post.creatorId===user.result._id&&
                <Tooltip title="delete">
                    <FontAwesomeIcon 
                        className="clickIcon" 
                        icon={faTrash} 
                        onClick={onDeleteClick} 
                        color="black"> 
                    </FontAwesomeIcon>
                </Tooltip>}

                </span>
            </div>
        </div>

    </div>
    );
}