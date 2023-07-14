import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import "../PaneItem/PaneItem.css"

const HeartIcon=({count})=>{

    // check whether the author is in the list of likes
      // todo
    //
    const [isLiked, setIsLiked] = React.useState(false)
    // const [windowStyle,setWindowStyle] =useState(null)
    const [likeCount,setLikeCount]= React.useState(count)
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