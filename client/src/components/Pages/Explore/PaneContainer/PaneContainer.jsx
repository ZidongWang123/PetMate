import React from 'react';
import PaneItem from '../PaneItem/PaneItem';
import "./PaneContainer.css"
import { getPosts } from '../../../../api';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const PaneContainer = ({userId="",keyword="",where="explore",postsCountGet=undefined}) => {
    const divRefs = [React.useRef(null),React.useRef(null),React.useRef(null),React.useRef(null)];
    const dataFetchedRef = React.useRef(false);
    const displayedPostsIdRef = React.useRef([]);
    const [displayedPosts,setDisplayedPosts]= React.useState([[],[],[],[]])
    
    const assignPosts=(newPosts)=>{
        setDisplayedPosts((displayedPosts)=>{

          const columns=[[...displayedPosts[0]],[...displayedPosts[1]],[...displayedPosts[2]],[...displayedPosts[3]]]
          const displayedPostId=[...displayedPostsIdRef.current]
          let adjust=false
          console.log(divRefs)
          const divLengths=divRefs.map((item)=>(item.current.clientHeight))
          const max = Math.max(...divLengths);
          const min = Math.min(...divLengths);
          const maxIndex = divLengths.indexOf(max);
          const minIndex = divLengths.indexOf(min);
          const diff = max - min;
          console.log(max)
          console.log(min)
          console.log(diff)
          if(diff>400){
            adjust=true
            
          }
          while(newPosts.length>0){
            
            for(let j=0;j<4;j++){
              if (newPosts.length>0){

                const lastPost=newPosts.pop()
                displayedPostId.push(lastPost._id)
                if(adjust&&j===maxIndex){
                  columns[minIndex].push(lastPost)
                  adjust=false
                }else{
                  columns[j].push(lastPost)
                }
                
              }else{
                break
              }
            }
          }
          displayedPostsIdRef.current=[...displayedPostId]
  
          return [...columns]

        })
    }

  const fetchPosts= async (data)=>{
    try{
      
  
      const res = await getPosts(data)
      if (res.status === 200) {

        const newPosts=res.data.result
        if(postsCountGet){
          let likes=0
          newPosts.forEach((item)=>{
            likes+=item.likes.length
          })
          
          postsCountGet(newPosts.length,likes)
          
        }
        assignPosts(newPosts)

      }

      else {
          console.log("Unknown error, try again")
      }


      } catch (error) {

      console.log(error)
    }
  }
  
  const handleArrowClick=()=>{

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }
  const handleScroll =  ()=>{

    // 获取滚动位置和页面高度等信息
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
   
    
    // 检查是否到达页面底部
    if (scrollTop + clientHeight +1>= scrollHeight&&
      displayedPostsIdRef.current.length!==0) {

      const displayedPostIdList=JSON.stringify(displayedPostsIdRef.current)
      fetchPosts({userId,keyword,where,displayedPostIdList,size:16})
      
     
    }
  }
    React.useEffect(() => {
    
        
      if(!dataFetchedRef.current){
        dataFetchedRef.current = true;
        const displayedPostIdList=JSON.stringify(displayedPostsIdRef.current)
        fetchPosts({userId,keyword,where,displayedPostIdList,size:16})

      }

    }, []);


    React.useEffect(() => {
        
        window.scrollTo(0,0)
        window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, []);


  return (
    <div className="pane-container" >
      <div className="column" ref={divRefs[0]}> 
        {displayedPosts[0].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" ref={divRefs[1]}> 
        {displayedPosts[1].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" ref={divRefs[2]}> 
        {displayedPosts[2].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" ref={divRefs[3]}> 
        {displayedPosts[3].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="arrowUp" onClick={handleArrowClick}>
            <FontAwesomeIcon icon={faArrowUp} />
        </div>
    </div>
  );
};

export default PaneContainer;