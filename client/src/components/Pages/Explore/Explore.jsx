import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaneContainer from './PaneContainer';
import SearchBar from './searchbarPosts';
import Button from "@mui/material/Button";
import { orange } from "../../../constant/actionTypes";


const Explore = () => {
  return(
    <div>
      <div style={{display:"flex"}}>
        <SearchBar/>
        <Link to="/createPost">
           <Button  variant="contained" 
          
          sx={{
            height:"50px",
            width:"150px",
            marginTop: "45px",
            marginLeft: 2,
            padding: 2,
            paddingLeft: 2,
            paddingRight: 4,
            borderRadius: "9999px",
            color: "black",
            backgroundColor: 'transparent',
            border: 'gray',
    
            ":hover": {
              color: "white",
              backgroundColor: orange,
            },
          }} >create a post</Button>
        </Link>
       
      </div>

      <PaneContainer/>

    </div>

  )
}
export default Explore

