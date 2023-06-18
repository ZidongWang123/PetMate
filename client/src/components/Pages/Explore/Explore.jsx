import React,{useEffect,useState,useRef,useCallback} from 'react';
import PaneItem from "./PaneItem";
import pet from "../../../images/cat.jpg";
import avatar from "../../../images/avatar.jpg"// 导入窗格项组件
import { convertLength } from '@mui/material/styles/cssUtils';
import { Link, useLocation } from 'react-router-dom';
import PaneContainer from './PaneContainer';
import SearchBar from './searchbarPosts';
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { darkPurple, orange,brightPurple } from "../../../constant/actionTypes";


const Explore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // 通过 get 方法获取具体的查询参数值
  const keyword = queryParams.get('keyword');
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

