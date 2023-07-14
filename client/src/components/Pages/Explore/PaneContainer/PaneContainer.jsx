import React from 'react';
import PaneItem from '../PaneItem/PaneItem';
import pet from "../../../../images/cat.jpg";
import avatar from "../../../../images/avatar.jpg"// 导入窗格项组件
import dog1 from "../../../../images/dog1.jpg"
import dog2 from "../../../../images/dog2.jpg"
import dog3 from "../../../../images/dog3.jpg"
import dog4 from "../../../../images/dog4.jpeg"
import dog5 from "../../../../images/dog5.jpeg"
import { getPosts } from '../../../../api';
const PaneContainer = ({userId="",keyword="",where="explore"}) => {
    
    const [displayedPosts,setDisplayedPosts]= React.useState([[],[],[],[]])
    const [displayedPostId,setDisplayedPostId]=React.useState([])
    const assignPosts=(newPosts)=>{
      
      let columns=[[...displayedPosts[0]],[...displayedPosts[1]],[...displayedPosts[2]],[...displayedPosts[3]]]
      let displayedPostIdCopy=[...displayedPostId]
      for (let i = 0; i < 4; i++) {
        if(newPosts.length>0){
          for(let j=0;j<4;j++){
            if (newPosts.length>0){
              const lastPost=newPosts.pop()
              displayedPostIdCopy.push(lastPost._id)
              console.log(lastPost._id)
              columns[j].push(lastPost)

            }else{
              break
            }
          }
        }else{
          break
          }
      }
      setDisplayedPosts(columns)
      setDisplayedPostId(displayedPostIdCopy)
    }

  const fetchPosts= async (data)=>{
    try{
      const res = await getPosts(data)
      if (res.status === 200) {

        const newPosts=res.data.result
    
        assignPosts(newPosts)

      }

      else {
          console.log("Unknown error, try again")
      }


      } catch (error) {

      console.log(error)
    }
  }

  const handleScroll =  ()=>{

    // 获取滚动位置和页面高度等信息
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
   
    
    // 检查是否到达页面底部
    if (scrollTop + clientHeight +1>= scrollHeight) {
     
      const displayedPostIdList=JSON.stringify(displayedPostId)
    
      fetchPosts({userId,keyword,where,displayedPostIdList})
    }
  }

    React.useEffect(() => {

      const displayedPostIdList=JSON.stringify(displayedPostId)
    
      fetchPosts({userId,keyword,where,displayedPostIdList})
      


    }, []);
    React.useEffect(() => {


      window.addEventListener('scroll', handleScroll);
  
      // 在组件卸载时移除事件监听
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [displayedPostId,displayedPosts]);


  return (
    <div className="pane-container" style={{ display: 'flex',flexDirection:"row",justifyContent:"space-between"}}>
      <div className="column" style={{ display: 'flex',flexDirection:"column",marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {displayedPosts[0].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" ,marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {displayedPosts[1].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" ,marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {displayedPosts[2].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" }}> 
        {/* 渲染第一排窗格 */}
        {displayedPosts[3].map((item, index) => (
          <PaneItem post={item}/>
        ))}
      </div>
    </div>
  );
};

export default PaneContainer;