import React from 'react';

const PaneItem = ({ firstImageUrl, text,avatar,name }) => {
  return (
    <div className="pane-item" style={{ width: '200px', height: '300px' }}>
      <img src={firstImageUrl} style={{ width: '200px', height: '250px' }}/>
      <p>{text}</p>
      <div>
        <img src={avatar} alt="Image" style={{ width: '20px', height: '20px' }}/>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default PaneItem;
