import React, {useEffect,useState } from 'react';
import "./PaneItem.css"
import PostDetailWindow   from '../PostDetailWindow/PostDetailWindow';
import { Link } from 'react-router-dom';
import HeartIcon from '../widget/HeartIcon';


const PaneItem = ({ postId="3jahkjd2198323",firstImageUrl, text,avatar,name,count,tags}) => {
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
        <img className="post-firstImage" src={firstImageUrl} onClick={handleImgClick}  />
      </a>
      <PostDetailWindow  postId={postId} isOpen={isModalOpen} onClose={closeModal} picture={firstImageUrl} name={name} text={text} avatar={avatar
      } count={count} tags={tags}/>
      <div style={{padding:"8px"}}>
        <div style={{marginBottom:"10px",maxWidth:"204px"}}>
          <a >
            <span style={{wordBreak: "break-word"}}>{text}</span>
          </a>
        </div>
        
        <div > 
          <Link to={`/userPage/${postId}`}style={{color:"inherit",float: "left", textDecorationLine: "none"}}>
            <img className="authorAvatar" src={avatar} alt="Image"/>
            <span >{name}</span>
          </Link>
      

          <span style={{float: "right",cursor:"pointer"}}>
          <HeartIcon postId={3} count={count}/>
          </span>

        </div>

      </div>
    </div>
  );
};

export default PaneItem;
