import React from 'react';
import PaneItem from './PaneItem'; // 导入窗格项组件

const PaneContainer = () => {
  // 示例数据
  const items = [
    
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"./avatar.jpg",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    { firstImageUrl:"./petFoot.png", text:"today I went to...",avatar:"../../../images/avatar",name:"wang" } ,
    // 添加更多的项...
  ];

  return (
    <div className="pane-container">
      <div className="row" style={{ display: 'flex' }}> 
        {/* 渲染第一排窗格 */}
        {items.slice(0, 4).map((item, index) => (
          <span><PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name}/></span>
        ))}
      </div>
      <div className="row" style={{ display: 'flex' }}>
        {/* 渲染第二排窗格 */}
        {items.slice(4).map((item, index) => (
          <PaneItem key={index} firstImageUrl={item.firstImageUrl} text={item.text} avatar={item.avatar} name={item.name}/>
        ))}
      </div>
    </div>
  );
};

export default PaneContainer;
