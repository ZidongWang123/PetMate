import react,{useRef,useEffect,useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./PostDetailWindow.css"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { WidthFull } from "@mui/icons-material";
import HeartIcon from "../widget/HeartIcon";
import { Link, useNavigate } from 'react-router-dom';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { orange } from "../../../../constant/actionTypes";
import { Avatar } from "@mui/material";
export default function PostDetailWindow({post,isOpen,onClose}){
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleDragStart = (e) => e.preventDefault();
    const pictures=post.pictures
    const pictureItems=[]
    const navigate = useNavigate();

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
    const deletePost=()=>{
        //delete the post from the database
        //to do
        //
        
        onClose()
        window.location.reload();

        
    }
    const handleScroll = (event) => {
      const delta = event.deltaY;
      divRef.current.scrollTop += delta;
    };
    
    const handleLink=(param)=>{
        
        const queryParams = new URLSearchParams();
        queryParams.append('keyword', param);
        // 导航到目标页面
        const path = '/explore';
        const url = `${path}?${queryParams.toString()}`;
        navigate(url);
        onClose()

    }
    

    if (!isOpen) {
        return null; // 如果弹窗关闭，则不渲染弹窗内容
      }
      
    return (
    <div className="popUpWindow">
        <div className="arrowLeft" onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="modal-content" >
                <AliceCarousel 
                    
                    mouseTracking
                    autoPlay 
                    autoPlayStrategy="all" 
                    autoPlayInterval={1000}
                    items={pictureItems}
                />
        </div>
        <div style={{marginRight:"50px",height:"520",width:"420",position:"relative",marginLeft:"10px"}}>

            <div className="showDetail">
                <Link to={`/userPage/${post.creatorId}`}style={{color:"inherit",textDecorationLine: "none"}} onClick={onClose}>
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
                    <h3 style={{wordBreak: "break-word"}}>{post.title}</h3>
                    <p style={{wordBreak: "break-word"}}>{post.text}</p>
                    <div>
                        {post.tags.map((item,index) => (
                            <span
                                style={{
                                    color: orange,
                                    display:"inline-block"
                                    
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

            </div>
            <div className="endElement" >
                <span>
                    <HeartIcon count={post.likes.length}/>
                </span>
                <span style={{float:"right"}}>
                {post.creatorId===user?._id&&
                <Link to={`/explore/post/editPost/${post._id}`}>
                    <FontAwesomeIcon className="clickIcon" icon={faEdit} > </FontAwesomeIcon>
                </Link>
                }
                {post.creatorId===user?._id&&
                <FontAwesomeIcon 
                    className="clickIcon" 
                    icon={faTrash} 
                    onClick={deletePost} 
                    color="black"> 
                </FontAwesomeIcon>}
                </span>
            </div>
        </div>

    </div>
    );
}