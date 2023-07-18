import React, { useEffect, useState } from "react";
import "./PostDetails.css"; // 引入自定义的 CSS 样式文件
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesInfo, delArticles } from "../../../../api";
import { FormData } from "../../../../util/index";

const PostDetails = () => {
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();
  let params = useParams();
  const articlesId = params["id"];

  const getArticlesInfoRequest = async () => {
    const { data: articleResulet } = await getArticlesInfo(articlesId);
    setArticle(articleResulet);
  };
  const onDeleteArticle = async (id) => {
    await delArticles(id);
    onGoBack(article.g_id);
  };
  const onGoBack = (g_id) => {
    navigate(`/groups/${g_id}`);
  };

  const onEditArticle = async (id) => {
    navigate(`/groups/post/EditPost/${id}`);
  };
  const onGoMyposts = (id) => {
    navigate(`/myarticles/${id}`);
  };
  const searchTag = async (value) => {
    const queryParams = new URLSearchParams();
    queryParams.append("keyword", value);
    const path = `/groups/${article.g_id}`;
    const url = `${path}?${queryParams.toString()}`;
    navigate(url);
  };
  useEffect(() => {
    getArticlesInfoRequest();
  }, []);
  return (
    article.length != 0 && (
      <div className="post-details">
        <div className="post-title-wrapper">
          <h2 className="post-title">{article.title}</h2>
        </div>
        <div className="author-info">
          <div
            className="author-avatar"
            onClick={() => onGoMyposts(article.u_id._id)}
          >
            <Avatar alt="Remy Sharp" src={article.u_id.avatar} />
          </div>
          <div className="author-details">
            <span className="author-name">{article.u_id.name}</span>
            <p className="post-timestamp">
              {article.updated_at == article.date ? "Posted on" : "Edited on"}{" "}
              {FormData(article.updated_at)}
            </p>
            <p>
              {" "}
              {article.tags.map((item) => {
                return (
                  <span
                    className="single-tag"
                    onClick={() => searchTag(item)}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.target.style.fontWeight = "bold")}
                    onMouseLeave={(e) => (e.target.style.fontWeight = "normal")}
                  >
                    #{item}
                  </span>
                );
              })}
            </p>
          </div>
          {article.editFlag && (
            <div className="button-group" style={{ marginLeft: "500px" }}>
              <div className="edit-button-wrapper">
                <button
                  className="edit-button"
                  onClick={() => onEditArticle(article._id)}
                >
                  Edit
                </button>
              </div>
              <div className="delete-button-wrapper">
                <button
                  className="delete-button"
                  onClick={() => onDeleteArticle(article._id)}
                >
                  Delete
                </button>
              </div>

              <button
                className="delete-button"
                onClick={() => onGoBack(article.g_id)}
              >
                Back
              </button>
            </div>
          )}
        </div>
        <div className="post-content-wrapper">
          <p
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          ></p>
          {article.imageURL && (
            <img
              className="post-img"
              src={article.imageURL}
              alt=""
              width={article.imageWidth}
              height={article.imageHeight}
            />
          )}
        </div>
      </div>
    )
  );
};

export default PostDetails;
