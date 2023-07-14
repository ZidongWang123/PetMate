import React, {useEffect,useState } from 'react';
import "./PaneItem.css"
import PostDetailWindow   from '../PostDetailWindow/PostDetailWindow';
import { Link } from 'react-router-dom';
import HeartIcon from '../widget/HeartIcon';
import { Avatar } from '@mui/material';


const PaneItem = ({ post}) => {
  const [isModalOpen,setIsModalOpen]=useState(false)

  const handleImgClick=(event)=>{
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleWheel = (e) => {
    e.preventDefault(); // 阻止默认的滚轮行为
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
      <PostDetailWindow  post={post} isOpen={isModalOpen} onClose={closeModal}/>
      <div style={{padding:"8px"}}>
        <div style={{marginBottom:"5px",maxWidth:"204px"}}>
          <a >
            <span style={{wordBreak: "break-word",fontFamily:"ubuntu"}}>{post.title}</span>
          </a>
        </div>
        
        <div style={{display:"flex",alignItems:"center"}}> 
          <Link to={`/userPage/${post.creatorId}`}style={{color:"inherit", textDecorationLine: "none"}}>
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
            <HeartIcon count={post.likes.length}/>
          </span>

        </div>

      </div>
    </div>
  );
};

export default PaneItem;
