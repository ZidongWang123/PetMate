import React, {useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import "./PaneItem.css"
import PostDetailWindow   from './PostDetailWindow';
import { Link } from 'react-router-dom';

const HeartIcon=({postID,count})=>{

    // check whether the author is in the list of likes
      // todo
    //
    const [isLiked, setIsLiked] = useState(false)
    // const [windowStyle,setWindowStyle] =useState(null)
    const [likeCount,setLikeCount]=useState(count)
    const handleLikeClick = () => {
    if(!isLiked){
    setLikeCount(likeCount+1)
    }else{
    setLikeCount(likeCount-1)
    }
    setIsLiked(!isLiked)

    // modify the data in database

    // {todo}

    // 
    }

    return(
      <>
          <FontAwesomeIcon
          className='clickIcon'
          icon={faHeart}
          
          color={isLiked ? 'red' : 'gray'}
          onClick={handleLikeClick}
          />
          <span>{likeCount}</span>
      </>
        
    )
} 



export default HeartIcon