import React, {useEffect,useState } from 'react';
import "./PaneItem.css"
import PostDetailWindow   from '../PostDetailWindow/PostDetailWindow';
import { Link } from 'react-router-dom';
import HeartIcon from '../widget/HeartIcon';
import { Avatar } from '@mui/material';
import Warning from '../../../Widget/ConfirmDialog/Warning';
import signInPic from "../../../../images/dabengou/SignInPic.jpg";
import { modifyLikes } from '../../../../api';
import { useNavigate } from 'react-router-dom';

const LoginText="Please log in first!"

const PaneItem = ({ post,likesCountGet=undefined,likesCount}) => {

  const user=JSON.parse(localStorage.getItem("profile"))
  let initialLikeState=false

  if(user&&post.likes.includes(user.result._id)){
    initialLikeState=true
  }

  const navigate=useNavigate()
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [isLiked, setIsLiked] = React.useState(initialLikeState)
  const [isDialogOpen,setIsDialogOpen]=React.useState(false)
  const [likes,setLikes]=React.useState(post.likes)
  
  const handleLikeClick = async() => {
      if(!user){
        setIsDialogOpen(true)
      }
      else{
        let list=[...likes]
        if(!isLiked){
          list.push(user.result._id)
          if(likesCountGet){
            likesCountGet(likesCount+1)
          }
        }else{
          if(likesCountGet){
            likesCountGet(likesCount-1)
          } 
          list=list.filter(item=>item!==user.result._id)
        }
        const res=await modifyLikes(post._id,{likes:list})
        
        if(res.status===200){
          setLikes(list)
          setIsLiked(!isLiked)
        }
        else{
          console.log("unknown error!!")
        }
      }

  }
  const onDialogConfirm=()=>{
    
    setIsDialogOpen(false)
    navigate("/auth")   
  }
  const onDialogCancel=()=>{
    setIsDialogOpen(false)
  }
  

  const handleImgClick=(event)=>{
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleWheel = (e) => {
    e.preventDefault(); 
  };
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.body.classList.add('modal-open');
    }else{
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };


  },[isModalOpen])
  return (
    <div className="pane-item" style={{ display: "flex",flexDirection:"column"}}>
      <a >
        <img className="post-firstImage" src={post.pictures[0]} onClick={handleImgClick}  />
      </a>
      <Warning 
        isOpen={isDialogOpen} 
        onConfirm={onDialogConfirm} 
        onCancel={onDialogCancel} 
        pic={signInPic} 
        text={LoginText}>
      </Warning>
      <PostDetailWindow
        post={post}
        isOpen={isModalOpen}
        onClose={closeModal}
        count={likes.length} 
        isLiked={isLiked} 
        onClick={handleLikeClick}

      />
      <div style={{padding:"8px"}}>
        <div style={{marginBottom:"5px",maxWidth:"204px"}}>
          <a >
            <span style={{wordBreak: "break-word",fontFamily:"ubuntu"}}>{post.title}</span>
          </a>
        </div>
        
        <div style={{display:"flex",alignItems:"center"}}> 
          <Link to={`/userExplorePosts/${post.creatorId}`}style={{color:"inherit", textDecorationLine: "none"}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <Avatar 
                src={post.creator.avatar} 
                sx={{
                  width:"24px",
                  height:"24px",
                  
                  ":hover": {
                    cursor: "pointer",
                    filter: "brightness(0.8)"
                  }
                }}>
              </Avatar>
              <span style={{
                fontFamily: "Comic Sans MS",
                marginLeft:"5px",
                fontSize:"14px",
                color:"rgb(100,100,100)"}}
              >
                {post.creator.name}
              </span>

            </div>

          </Link>
      

          <span style={{marginLeft: "auto",cursor:"pointer"}}>
            <HeartIcon count={likes.length} isLiked={isLiked} onClick={handleLikeClick}/>
          </span>

        </div>

      </div>
    </div>
  );
};

export default PaneItem;
