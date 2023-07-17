import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaneContainer from './PaneContainer/PaneContainer';
import SearchBar from "../../Widget/SearchBar/SearchBar";
import UniformButton from './widget/UniformButton';
import { orange } from "../../../constant/actionTypes";
import { useNavigate } from 'react-router-dom';
import Warning from "../../Widget/ConfirmDialog/Warning.jsx"
import signInPic from "../../../images/dabengou/SignInPic.jpg";
import bePrimePic from "../../../images/dabengou/BePrimePic.jpg";

const subscribeText="Come subscribing first!"
const LoginText="Please log in first!"

const Explore = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParamValue = searchParams.get('keyword');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [text,setText]=React.useState("") 
  const [pic,setPic]=React.useState("") 
  const [isOpen,setIsOpen]=React.useState(false)
  // const [keyword,setKeyword]=React.useState("")
    const onClick=()=>{
    if(user&&user.result.isPrime){
      navigate("/explore/post/create")   
    }
    else if(user){
      setText(subscribeText)
      setPic(bePrimePic)
      setIsOpen(true)
    }
    else{
      setText(LoginText)
      setPic(signInPic)
      setIsOpen(true)
    }

  }
  const onSearch=(value)=>{

    const queryParams = new URLSearchParams();
    queryParams.append('keyword', value);
    // 导航到目标页面
    const path = '/explore';
    const url = `${path}?${queryParams.toString()}`;
    navigate("explore/empty")
    
    setTimeout(() => {
        navigate(url)
    }, 0);
  }
  const onConfirm=()=>{
    
    setIsOpen(false)
    
    navigate("/auth")   
  }
  const onCancel=()=>{
    setIsOpen(false)
  }
  return(
    <div>
      <div style={{display:"flex",alignItems: "flex-end"}}>
        <SearchBar searchPost={onSearch}/>
          <Warning isOpen={isOpen} onConfirm={onConfirm} onCancel={onCancel} pic={pic} text={text}></Warning> 
          <UniformButton width="160px" backgroundColor={orange} fontColor="white" onClick={onClick}>create a post</UniformButton>
          
      </div>
      {
        user?<PaneContainer 
          where='explore' 
          userId={user.result._id} 
          keyword={queryParamValue?queryParamValue:""} 
        />:
        <PaneContainer 
          where='explore' 
          keyword= {queryParamValue?queryParamValue:""}
        />
      }
      

    </div>

  )
}
export default Explore

