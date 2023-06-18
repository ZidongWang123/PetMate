import React,{useEffect,useState,useRef,useCallback} from 'react';
import PaneItem from './PaneItem';
import pet from "../../../images/cat.jpg";
import avatar from "../../../images/avatar.jpg"// 导入窗格项组件
import dog1 from "../../../images/dog1.jpg"
import dog2 from "../../../images/dog2.jpg"
import dog3 from "../../../images/dog3.jpg"
import dog4 from "../../../images/dog4.jpeg"
import dog5 from "../../../images/dog5.jpeg"
const PaneContainer = () => {
    
    const [posts,setPosts]=useState([[
      // request data from backend and initialize the four columns
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,{ firstImageUrl:pet, text:"today I went to asdasdsadasdasddddddddddddd",avatar:avatar,name:"wang",count:4,tags:["dog","play","munich","fun","friend","pets","cat","group","pets","cat","group"] } ,
    { firstImageUrl:dog1, text:"czxczxczxcxzczxcz",avatar:avatar,name:"lisda",count:3 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog2, text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",avatar:avatar,name:"linnxc",count:2 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog3, text:"today ",avatar:avatar,name:"livzc",count:7 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog4, text:"today I went to park",avatar:avatar,name:"lisdad",count:8 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    { firstImageUrl:dog5, text:"i like dogs",avatar:avatar,name:"licxzc",count:5 ,tags:["dog","play","munich","fun","friend","pets","cat","group"]} ,
    
    ],[],[],[],[]])
    // const column1 = useRef([]);
    // // const [column1, setColumn1] = useState([]);
    // const [column2, setColumn2] = useState([]);
    // const [column3, setColumn3] = useState([]);
    // const [column4, setColumn4] = useState([]);


    
    const assignPane=(posts)=>{
      console.log(posts)
      let postsCopy=[...posts[0]]
      
      let columns=[[...posts[1]],[...posts[2]],[...posts[3]],[...posts[4]]]
    
      for (let i = 0; i < 4; i++) {
        if(postsCopy.length>0){
          for(let j=0;j<4;j++){
            if (postsCopy.length>0){
              let lastPost=postsCopy.pop()
                columns[j].push(lastPost)

            }else{
              break
            }
          }
        }else{
          break
          }
      }
      return ([postsCopy,...columns])
      // setColumn1(columns[0])
    }
    useEffect(() => {
      // const items = ;
      // console.log(items)
      // setPosts([1,2,3,4,5])
      setPosts(assignPane)
      // 监听滚动事件
      window.addEventListener('scroll', handleScroll);
  
      // 在组件卸载时移除事件监听
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const handleScroll =  ()=>{

      // 获取滚动位置和页面高度等信息
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
     
      
      // 检查是否到达页面底部
      if (scrollTop + clientHeight +1>= scrollHeight) {
        console.log("底部")
        setPosts(assignPane)
      }
    }
  

  return (
    <div className="pane-container" style={{ display: 'flex',flexDirection:"row",justifyContent:"space-between"}}>
      <div className="column" style={{ display: 'flex',flexDirection:"column",marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {posts[1].map((item, index) => (
          <PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name} count={item.count} tags={item.tags}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" ,marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {posts[2].map((item, index) => (
          <PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name} count={item.count} tags={item.tags}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" ,marginRight:"40px"}}> 
        {/* 渲染第一排窗格 */}
        {posts[3].map((item, index) => (
          <PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name} count={item.count} tags={item.tags}/>
        ))}
      </div>
      <div className="column" style={{ display: 'flex',flexDirection:"column" }}> 
        {/* 渲染第一排窗格 */}
        {posts[4].map((item, index) => (
          <PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name} count={item.count} tags={item.tags}/>
        ))}
      </div>
    </div>
  );
};

export default PaneContainer;