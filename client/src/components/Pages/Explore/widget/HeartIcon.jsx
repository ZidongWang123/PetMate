import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import "../PaneItem/PaneItem.css"

const HeartIcon=({count,isLiked,onClick})=>{

    // check whether the author is in the list of likes
      // todo


    return(
      <>
          <FontAwesomeIcon
          className='clickIcon'
          icon={faHeart}
          
          color={isLiked ? 'red' : 'gray'}
          onClick={onClick}
          />
          <span>{count}</span>
      </>
        
    )
} 



export default HeartIcon