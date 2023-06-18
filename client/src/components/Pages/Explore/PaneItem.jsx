import React, {useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./PaneItem.css"
import PostDetailWindow   from './PostDetailWindow';
import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';


const PaneItem = ({ firstImageUrl, text,avatar,name,count,tags}) => {
  const [isModalOpen,setIsModalOpen]=useState(false)

  const handleImgClick=(event)=>{
    const  location=event.target.getBoundingClientRect();
    setIsModalOpen(true);
    //get the relative location of the image clicked on to the view window
  //   setWindowStyle(
  //     {
  //       position: "fixed",
  //       backgroundColor: "rgba(245, 242, 236,0.98)",
  //       display: "flex",
  //       justifyContent: "center", /* 水平居中 */
  //       alignItems: "center",
        
  //       left:`${location.left}px`,
  //       top:`${location.top}px`,
  //       right:`${location.right}px`,
  //       bottom:`${location.bottom}px`,
  //       // width:"100%",
  //       // height:"100%",
  //       opacity:1,
  //       transitionProperty: "width,height, opacity",
  //       transitionDuration: "3s",
  //       transform: "scale(0.5)"
  //     }
  //   )
  // //   requestAnimationFrame(() => {
  // //     setWindowStyle({
  // //       position: "fixed",
  // //       backgroundColor: "rgba(245, 242, 236,0.98)",
  // //       display: "flex",
  // //       justifyContent: "center", /* 水平居中 */
  // //       alignItems: "center",
  // //       left: 0,
  // //       top: 0,
  // //       width: "100%",
  // //       height: "100%",
  // //       opacity: "1",
  // //       transitionProperty: "width,height, opacity",
  // //       transitionDuration: "3s",

  // //     });
  // //   })
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleWheel = (e) => {
    e.preventDefault(); // 阻止默认的滚轮行为
  };
  useEffect(() => {
    console.log(123)
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
      <PostDetailWindow  isOpen={isModalOpen} onClose={closeModal} picture={firstImageUrl} name={name} text={text} avatar={avatar
      } count={count} tags={tags}/>
      <div style={{padding:"8px"}}>
        <div style={{marginBottom:"10px",maxWidth:"204px"}}>
          <a >
            <span style={{wordBreak: "break-word"}}>{text}</span>
          </a>
        </div>
        
        <div > 
          <Link to={`/userPage/${name}`}style={{color:"inherit",float: "left", textDecorationLine: "none"}}>
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
