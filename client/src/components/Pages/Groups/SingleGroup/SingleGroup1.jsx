import React from "react";
import "./Single.css"; // 引入自定义的CSS样式文件
import SearchBar from "./searchbarGroup";
import SingleGroupDetail from "./SingleGroupDetail.jsx";

//import { darkPurple, brightGreen, brightPurple, orange } from '../../../constant/actionTypes';
import { Link } from "react-router-dom";
import SignInWarning from "../../../Widget/ConfirmDialog/SignInWarning";

export const orange = "#F0A860";

const ForumPost = ({ topic, date, author }) => (
  <div className="single-forum-post">
    <Link to="/groups/post">{topic}</Link>
    <div className="single-post-date">{date}</div>
    <div className="single-post-author">{author}</div>
  </div>
);

const Forum = () => {
  const dummyData = [
    { topic: "Topic 1", date: "2023-05-01", author: "Sarah" },
    { topic: "Topic 2", date: "2023-05-02", author: "Author 2" },
    { topic: "Topic 3", date: "2023-05-03", author: "Author 3" },
  ];

  return (
    <div className="single-forum">
      <div className="single-forum-header">
        <div className="single-header-topic">Topics</div>
        <div className="single-header-date">Date</div>
        <div className="single-header-author">Author</div>
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

const SignleGroup1 = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    return <SignInWarning />;
  }
  return (
    <div>
      <SingleGroupDetail />
      <Forum />
    </div>
  );

  {
    /*  <SearchBar /> */
  }
  {
    /* 将 SearchBar 放在一个容器中 */
  }
  {
    /* {posts.map((post, index) => (
      <Post key={index} title={post.title} content={post.content} />
    ))} */
  }
};

export default SignleGroup1;
