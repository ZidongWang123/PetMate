import React from 'react';
import PaneItem from '../PaneItem/PaneItem';
import "./PaneContainer.css"
import { getPosts } from '../../../../api';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';
import { darkPurple } from '../../../../constant/actionTypes';
import { Box } from '@mui/material';
const PaneContainer = ({userId="",keyword="",where="explore",postsCountGet=undefined,likesCountGet=undefined,likes}) => {
    const divRefs = [React.useRef(null),React.useRef(null),React.useRef(null),React.useRef(null)];
    const dataFetchedRef = React.useRef(false);
    const displayedPostsIdRef = React.useRef([]);
    const [displayedPosts,setDisplayedPosts]= React.useState([[],[],[],[]])
    const [isloading,setIsLoading]=React.useState(true)
    const [isNewLoading,setIsNewLoading]=React.useState(false)
    
    const assignPosts=(newPosts)=>{
        
        setDisplayedPosts((displayedPosts)=>{
            const postsNew=[...newPosts]
          
            const columns=[[...displayedPosts[0]],[...displayedPosts[1]],[...displayedPosts[2]],[...displayedPosts[3]]]
            const displayedPostId=[...displayedPostsIdRef.current]
            let adjust=false
            let maxIndex=undefined
            let minIndex=undefined
            if(divRefs[0].current){
              const divLengths=divRefs.map((item)=>(item.current.clientHeight))
              const max = Math.max(...divLengths);
              const min = Math.min(...divLengths);
              maxIndex = divLengths.indexOf(max);
              minIndex = divLengths.indexOf(min);
              const diff = max - min;
              if(diff>400){
                adjust=true
                
              }
  
            }
            
            while(postsNew.length>0){
              
              for(let j=0;j<4;j++){
                if (postsNew.length>0){
  
                  const lastPost=postsNew.pop()
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
        if(newPosts.length===0){
          setIsNewLoading(false)
        }
        
        if(postsCountGet){
          if(newPosts.length!==0){

            let likes=0
            newPosts.forEach((item)=>{
              likes+=item.likes.length
            })
            
            postsCountGet(newPosts.length)
            likesCountGet(likes)

          }
        }
        
        assignPosts(newPosts)
        setIsLoading(false)

      
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

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight +1>= scrollHeight&&
      displayedPostsIdRef.current.length!==0) {
        
      setIsNewLoading(true)
      const displayedPostIdList=JSON.stringify(displayedPostsIdRef.current)
      fetchPosts({userId,keyword,where,displayedPostIdList,size:12})
      window.removeEventListener('scroll', handleScroll);
      
    }
  }
    React.useEffect(() => {
    
        
      if(!dataFetchedRef.current){
        dataFetchedRef.current = true;
        const displayedPostIdList=JSON.stringify(displayedPostsIdRef.current)
        fetchPosts({userId,keyword,where,displayedPostIdList,size:12})

      }

    }, []);


    React.useEffect(() => {
      
       
        window.addEventListener('scroll', handleScroll);

      return () => {
  
        window.removeEventListener('scroll', handleScroll);
      };

    }, [displayedPosts]);


  return (
    <div>
      {isloading&&<div style={{display:"flex",justifyContent:"center"}}>Loading......</div>}
        
        <div className="pane-container" >
          <div className="column" ref={divRefs[0]}> 
            {displayedPosts[0].map((item, index) => (
              <PaneItem post={item} likesCountGet={likesCountGet} likesCount={likes}/>
            ))}
          </div>
          <div className="column" ref={divRefs[1]}> 
            {displayedPosts[1].map((item, index) => (
              <PaneItem post={item} likesCountGet={likesCountGet} likesCount={likes}/>
            ))}
          </div>
          <div className="column" ref={divRefs[2]}> 
            {displayedPosts[2].map((item, index) => (
              <PaneItem post={item} likesCountGet={likesCountGet} likesCount={likes}/>
            ))}
          </div>
          <div className="column" ref={divRefs[3]}> 
            {displayedPosts[3].map((item, index) => (
              <PaneItem post={item} likesCountGet={likesCountGet} likesCount={likes}/>
            ))}
          </div>
          <div className="arrowUp" onClick={handleArrowClick}>
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </div>

      
      {
        isNewLoading&&(
          <div style={{display:"flex",justifyContent:"center",height:"50px"}}>
          <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
        </div>
        )
      }
       {(!isloading&&displayedPosts[0].length===0)&&<div style={{display:"flex",justifyContent:"center"}}>No results</div>}
    </div>
  );
};

export default PaneContainer;