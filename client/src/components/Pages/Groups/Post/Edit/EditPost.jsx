import React,{useEffect,useState,useRef} from "react";
import Avatar from "@mui/material/Avatar";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar,  } from '@wangeditor/editor-for-react'
import { DomEditor } from '@wangeditor/editor'
import {paArticlesInfo,getArticlesInfo} from '../../../../../api/user'
import {toolbarConfig,editorConfig} from '../../../../../util/config'
import {FormData} from '../../../../../util/index'
import InputBar from "../../../../Widget/InputBar/InputBar";
import "./edit.css"; // 引入自定义的 CSS 样式文件
import {useNavigate,useParams} from"react-router-dom"

import Input from '../../../../Widget/Input/Input'
  const EditPost = () => {
    //const { title, author, timestamp, content } = dummyData;
    const [editor, setEditor] = useState(null)  
    const [article,setArticle]=useState(null)
    const [content, setContent] = useState("")
    const [width,setWidth]=useState("200")
    const [height,setHeight]=useState("200")
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const [titleValue, setTitleValue] = useState('');
    const editorRef = useRef();
 
      const navigate = useNavigate();
      let params = useParams()
      const articlesId = params['id'];
      const getArticlesInfoRequest=async()=>{
        const articlesInfoResulet=await getArticlesInfo(articlesId)   
        setArticle(articlesInfoResulet)
        setContent(articlesInfoResulet.content)
        console.log(articlesInfoResulet.title);
        setTitleValue(articlesInfoResulet.title)
        setPreviewImage(articlesInfoResulet.imageURL)
        setWidth(articlesInfoResulet.imageWidth||'200')
        setHeight(articlesInfoResulet.imageHeight||'200')
        
      }
      useEffect(()=>{
        getArticlesInfoRequest()
        // if(editor){
        //   // const edito = editor.current.getInstance();
        //   // const textStyle = edito.createTextStyle({ fontName: "Arial", fontSize: "medium" });
        //   // edito.command(e => e.applyTextStyle(textStyle));
        //   console.log(editor.getConfig());
        // }
       
       },[])
       const onEditUploadImage=async()=>{
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*"; // 只接受图片类型的文件
        fileInput.addEventListener("change", handleFileChange);
        fileInput.click();

       }
       const onDeleteUploadImage=async ()=>{
        setPreviewImage(null);

       }
       const handleFileChange = (event) => {
        const file = event.target.files[0];
        
    
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        // 处理选择的文件
      };
      const paArticlesInfoReuest=async(articleId,article)=>{

          await paArticlesInfo(articleId,article)
      }
      const onSaveArtilce=()=>{

        article.content=content
        article.title=titleValue
        article.imageURL=previewImage
        article.imageWidth=width
        article.imageHeight=height
        console.log(article);
        paArticlesInfoReuest(article._id,article)  
        navigate(`/groups/post/${articlesId}`,  { replace: true })
        
      }
      const handleTitleChange = (value) => {
        
        setTitleValue(value)
      };
      const handleWidthChange=(e)=>{

        setWidth(e.target.value)
      }
      const handleHeightChange=(e)=>{
        setHeight(e.target.value)
        
      }

    
    return article&&(
      <div>
     
  
        <div className="post-details">
          <div className="post-title-wrapper">
            <h2 className="post-title">  <InputBar
                    initialValue={titleValue}
                    onInputChange={handleTitleChange}
        
                  /> 
                  
                  {/* <input type="text"   value={titleValue}  onChange={e => {
		setTitleValue(e.target.value);
	}} />      */}
  
  
   </h2>
          </div>
     
          <div className="author-info">
            <div className="author-avatar">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
  
            <div className="author-details">
              <span className="author-name">{article.u_id.name}</span>
              <p className="post-timestamp">Posted on   {FormData(article.updated_at)   }</p>
            </div>
            
            <input type="file"   ref={fileInputRef}
                   
                      style={{ display: "none" }}
                      onChange={handleFileChange}/>
            <div className="button-group" style={{ marginLeft: '700px' }}>
              <div className="save-button-wrapper">
                <button className="save-button" onClick={()=>{onSaveArtilce()}}>Save</button>
              </div>
              
              <div className="discard-button-wrapper">
                <button className="discard-button">Discard</button>
              </div>
            </div>
          </div>
          <div   className="editContent"  style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                ref={editorRef}
                    defaultConfig={editorConfig}
                    value={article.content}
                    onCreated={setEditor}
                    onChange={editor => setContent(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div> 
          
            <div className="image_show">
            <div className="button-wrapper">
                <button className="discard-button" onClick={()=>{onEditUploadImage()}} >Uploadimage</button>
                <button className="discard-button" onClick={()=>{onDeleteUploadImage()}} >Deleteimage</button>
          
                <Input name="width" defaultValue={width} label="Width" handleChange={handleWidthChange} type="text" />
                <Input name="height" defaultValue={height}   label="Height" handleChange={handleHeightChange} type="text" />

              </div>
              {previewImage&&(<img  className="upload_image" src={previewImage}alt="" srcset="" width={width} height={height} />) }
            </div>
          {/* <div className="post-content-wrapper">
            <p className="post-content">{content}</p>
          </div> */}
       
        </div>
      </div>
    )
  };
  
  export default EditPost;