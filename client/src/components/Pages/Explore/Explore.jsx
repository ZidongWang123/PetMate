import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaneContainer from './PaneContainer/PaneContainer';
import SearchBar from './widget/searchbarPosts';
import UniformButton from './widget/UniformButton';
import { orange } from "../../../constant/actionTypes";


const Explore = () => {
  return(
    <div>
      <div style={{display:"flex",alignItems: "flex-end"}}>
        <SearchBar/>
        <Link to="/createPost">
          <UniformButton width="150px" backgroundColor={orange} fontColor="white">create a post</UniformButton>
        </Link>
      </div>

      <PaneContainer/>

    </div>

  )
}
export default Explore

