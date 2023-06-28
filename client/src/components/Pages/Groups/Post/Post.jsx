import React from "react";
import "./PostDetails.css"; // 引入自定义的 CSS 样式文件
import Avatar from "@mui/material/Avatar";
import { Link } from 'react-router-dom';

const dummyData = {
  title: "Everything you should know when adopting a large dog",
  author: {
    name: "Sarah",
  },
  timestamp: "May 27, 2023",
  content: "Adopting a large dog is a decision that comes with both challenges and rewards. Large dog breeds typically have robust physiques and high energy levels, which require special attention and care. Before making the decision, it is crucial to understand the following key points that will help you better adapt to and care for your new family member.\n\nBreed Selection:\nUnderstanding the characteristics of different breeds is essential before adopting a large dog. Each breed has distinct personalities, health issues, and activity needs. For example, German Shepherds are often intelligent, loyal, and active, while Saint Bernards are more gentle and friendly. Choosing a breed that suits your lifestyle and home environment is crucial for harmonious coexistence.\n\nSpace Requirements:\nLarge dogs need ample space to move around and stretch their bodies. Before adoption, ensure you have a spacious yard or living area and provide enough outdoor activity space for your dog. Large dogs are generally not suitable for apartments or small residences as they require sufficient room to expend their energy.\n\nExercise and Physical Activity:\nLarge dogs typically have high energy levels and require ample exercise to maintain their health and happiness. Long walks, jogging, or swimming sessions are crucial for large dogs on a daily basis. Make sure you have enough time and resources to fulfill their exercise needs.\n\nHealth Care and Nutrition:\nLarge dogs have specific health care requirements. Regular veterinary check-ups, vaccinations, and preventive care are necessary to ensure their well-being. Additionally, large dogs often have different nutritional needs compared to smaller breeds. Consult with your veterinarian to determine the appropriate diet and feeding schedule for your dog.",
};

const PostDetails = () => {
  const { title, author, timestamp, content } = dummyData;

  return (
    <div className="post-details">
      <div className="post-title-wrapper">
        <h2 className="post-title">{title}</h2>
      </div>
      <div className="author-info">
        <div className="author-avatar" onClick={() => window.location.href = "http://localhost:3000/myposts"}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className="author-details">
          <span className="author-name">{author.name}</span>
          <p className="post-timestamp">Posted on {timestamp}</p>
        </div>
        <div className="button-group"style={{ marginLeft: '700px' }}>
          <div className="edit-button-wrapper">
            <button className="edit-button" onClick={() => window.location.href = "http://localhost:3000/groups/post/editPost"}>
            Edit
            </button>
          </div>
          <div className="delete-button-wrapper">
            <button 
              className="delete-button"
              
            >
              Delete
            </button>
          </div>
          
        </div>


        
      </div>
      <div className="post-content-wrapper">
        <p className="post-content">{content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
