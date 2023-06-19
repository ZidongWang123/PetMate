import react,{useRef,useEffect,useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./PostDetailWindow.css"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { WidthFull } from "@mui/icons-material";
import HeartIcon from "./HeartIcon";
import { Link, useNavigate } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export default function PostDetailWindow({isOpen,onClose,picture,text,avatar,name,count,tags}){
    const authName="licxzc";
    const handleDragStart = (e) => e.preventDefault();
    const pictures=[picture,picture,picture,picture]
    const pictureItems=[]
    const navigate = useNavigate();
    pictures.map((item,index)=>{
        pictureItems.push( <img className="pictureDetail" src={item}  onDragStart={handleDragStart} role="presentation" />)
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
        console.log(param)
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
        <div className="modal-content" style={{marginTop:"20px"}}>
                <AliceCarousel mouseTracking items={pictureItems}/>
        </div>
        <div style={{marginRight:"50px",height:"520",width:"420",position:"relative"}}>

            <div className="showDetail">
                <Link to={`/userPage/${name}`}style={{color:"inherit",textDecorationLine: "none"}} onClick={onClose}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img className="authorAvatar" style={{width: "30px",height:"30px"}} src={avatar} ></img>
                        <span>{name}</span>
                    </div>
                </Link>

                <div className="contentWindow" onWheel={handleScroll} ref={divRef}>
                    <h3 style={{wordBreak: "break-word"}}>{text}</h3>
                    <p style={{wordBreak: "break-word"}}>sadsasdpasdadasddsadadsdadadasdsadsadasdadxxxxxxxxxxxxxxxxxxxxxxxxssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssxxxxsadsasdpasdadasddsadadsdadadasdsadsadasdadxxxxxxxxxxxxxxxxxxxxxxxx
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssxxxxsadsasdpasdadasddsadadsdadadasdsadsadasdadxxxxxxxxxxxxxxxxxxxxxxxx
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssxxxx</p>
                    <div>
                        {tags.map((item,index) => (
                            <span className="tagInPosts"  onClick={()=>handleLink(item)}>#{item}</span>
                        )

                        )}
                    </div>
                </div>

            </div>
            <div className="endElement" >
                <span>
                    <HeartIcon postID={5} count={count}/>
                </span>
                <span style={{float:"right"}}>
                    {name===authName&&<FontAwesomeIcon className="clickIcon" icon={faTrash} onClick={deletePost}> </FontAwesomeIcon>}
                </span>
            </div>
        </div>

    </div>
    );
}