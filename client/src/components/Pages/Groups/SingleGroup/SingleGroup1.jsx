import React from "react";
import "./Single.css"; // 引入自定义的CSS样式文件
import SearchBar from "./searchbarGroup";
import Avatar from "@mui/material/Avatar";




const ForumPost = ({ topic, date, author }) => (
  <div className="forum-post">
    <div className="post-topic">{topic}</div>
    <div className="post-date">{date}</div>
    <div className="post-author">{author}</div>
  </div>
);


const Forum = () => {
  const dummyData = [
    { topic: "Topic 1", date: "2023-05-01", author: "Author 1" },
    { topic: "Topic 2", date: "2023-05-02", author: "Author 2" },
    { topic: "Topic 3", date: "2023-05-03", author: "Author 3" },
  ];

  return (
    <div className="forum">
      <div className="forum-header">
        <div className="header-topic">Topics</div>
        <div className="header-date">Date</div>
        <div className="header-author">Author</div>
      </div>
      {dummyData.map((data, index) => (
        <ForumPost
          key={index}
          topic={data.topic}
          date={data.date}
          author={data.author}
        />
      ))}
    </div>
  );
};


const GroupDetails = () => {
  return (
    <div className="group-details">
      <div className="group-avatar">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          
      </div>
      <div className="group-info">
      
        <div className="group-first-row">
              <p className="group-name">Group Name</p>
              <p className="group-creater">Created by:Tina Timo</p>
              <p className="group-amount">member:100</p>
        </div>
        <p className="group-intro">Group Introduction</p>
        <div className="group-tags">
          {/* 小组标签 */}
          <span className="tag">#Tag 1</span>
          <span className="tag">#Tag 2</span>
          <span className="tag">#Tag 3</span>
        </div>
        <div className="group-button">
         <button className="joined-button" disabled>
          Joined
         </button>
         <button className="write-post-button">Write a Post</button>
      </div>
      </div>
    </div>
  );
};

const App = () => (
  <div>
    <SearchBar /> {/* 将 SearchBar 放在一个容器中 */}
    {/* {posts.map((post, index) => (
      <Post key={index} title={post.title} content={post.content} />
    ))} */}
    <GroupDetails />
    <Forum/>
  </div>
);

export default App;
