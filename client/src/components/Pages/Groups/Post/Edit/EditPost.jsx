import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import "@wangeditor/editor/dist/css/style.css"; // use for rich-text editor
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { paArticlesInfo, getArticlesInfo } from "../../../../../api";
import { toolbarConfig, editorConfig } from "../../../../../util/config";
import { FormData } from "../../../../../util/index";
import InputBar from "../../../../Widget/InputBar/InputBar";
import "./edit.css"; // import the css form we defined
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../../Widget/Input/Input";
const EditPost = () => {
  const [editor, setEditor] = useState(null);
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [width, setWidth] = useState("200");
  const [height, setHeight] = useState("200");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [titleValue, setTitleValue] = useState("");
  const editorRef = useRef();

  const navigate = useNavigate();//navigation between pages
  let params = useParams(); //access the parameter values from the current URL
  const articlesId = params["id"];//take the id from params to the articleid

  const getArticlesInfoRequest = async () => {
    const { data: articlesInfoResulet } = await getArticlesInfo(articlesId); //extract the data property from the response and pass to articlesInfoResulet
    setArticle(articlesInfoResulet);
    setContent(articlesInfoResulet.content);
    setTitleValue(articlesInfoResulet.title);
    setPreviewImage(articlesInfoResulet.imageURL);
    setWidth(articlesInfoResulet.imageWidth || "200");
    setHeight(articlesInfoResulet.imageHeight || "200");
  };
  useEffect(() => {
    getArticlesInfoRequest();
  }, []);

  // image edit 
  const onEditUploadImage = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // only accept image
    fileInput.addEventListener("change", handleFileChange);
    fileInput.click(); //pop up window to choose 
  };
  // image delete 
  const onDeleteUploadImage = async () => {
    setPreviewImage(null);
  };
  const handleFileChange = (event) => {
    //accesses the files property of the target property of the event parameter to get the selected files. Only one file is selected-->index [0]
    const file = event.target.files[0];
    // read content of the file 
    const reader = new FileReader();
    // will be called when the file reading is complete
    reader.onload = () => {
      setPreviewImage(reader.result); // to show preview of image 
    };
    //starts the file reading process and return as URL 
    reader.readAsDataURL(file);
    // 处理选择的文件
  };
  const paArticlesInfoReuest = async (articleId, article) => {
    await paArticlesInfo(articleId, article);
  };
  const onSaveArtilce = () => {
    article.content = content;
    article.title = titleValue;
    article.imageURL = previewImage;
    article.imageWidth = width;
    article.imageHeight = height;
    paArticlesInfoReuest(article._id, article);
    setTimeout(() => {
      navigate(`/groups/post/${articlesId}`);
    }, 1000);
  };
  const onGoBack = () => {
    navigate(-1);
  };
  const handleTitleChange = (value) => {
    setTitleValue(value);
  };
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  return (
    article && (
      <div>
        <div className="post-details">
          <div className="post-title-wrapper">
            <h2 className="post-title">
              {" "}
              <InputBar
                initialValue={titleValue}
                onInputChange={handleTitleChange}
              />
            </h2>
          </div>

          <div className="author-info">
            <div className="author-avatar">
              <Avatar alt="Remy Sharp" src={article.u_id.avatar} />
            </div>

            <div className="author-details">
              <span className="author-name">{article.u_id.name}</span>
              <p className="post-timestamp">
                {article.updated_at == article.date ? "Posted on" : "Edited on"}{" "}  
                {FormData(article.updated_at)}
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="button-group" style={{ marginLeft: "700px" }}>
              <div className="save-button-wrapper">
                <button
                  className="save-button"
                  onClick={() => {
                    onSaveArtilce();
                  }}
                >
                  Save
                </button>
              </div>

              <div className="discard-button-wrapper">
                <button
                  className="discard-button"
                  onClick={() => {
                    onGoBack();
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
          <div
            className="editContent"
            style={{ border: "1px solid #ccc", zIndex: 100 }}
          >
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              ref={editorRef}
              defaultConfig={editorConfig}
              value={article.content}
              onCreated={setEditor}
              onChange={(editor) => setContent(editor.getHtml())}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>

          <div className="image_show">
            <div className="button-wrapper">
              <button
                className="Image-button"
                onClick={() => {
                  onEditUploadImage();
                }}
              >
                Upload Image
              </button>
              <button
                className="Image-button"
                onClick={() => {
                  onDeleteUploadImage();
                }}
              >
                Delete Image
              </button>

              <Input
                name="width"
                defaultValue={width}
                label="Width"
                handleChange={handleWidthChange}
                type="text"
              />
              <Input
                name="height"
                defaultValue={height}
                label="Height"
                handleChange={handleHeightChange}
                type="text"
              />
            </div>
            {previewImage && (
              <img
                className="upload_image"
                src={previewImage}
                alt=""
                srcset=""
                width={width}
                height={height}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default EditPost;
