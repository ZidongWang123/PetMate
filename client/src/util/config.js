import {i18nChangeLanguage  } from '@wangeditor/editor'

//import DateSelecter from "../../Widget/DateSelecter/DateSelecter";

i18nChangeLanguage("en")
export const toolbarConfig = {"excludeKeys":[
    'blockquote',
    'fontFamily',
    "todo",
    "insertTable",
    "codeBlock",
    "insertLink",
   'group-video',
   'group-image',
   'group-more-style' // 排除菜单组，写菜单组 key 的值即可
]           
  }   
        
  // 编辑器配置
  export  const editorConfig = {                         
      placeholder: '请输入内容...123132132',
      uploadImgShowBase64: true,
      fontNames:["Arial",
      "Arial Black",
      "Courier New",
      "Georgia",
      "Impact",
      "Lucida Console",
      "Lucida Sans Unicode",
      "Microsoft YaHei",
      "Tahoma",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
      "SimSun",],
      defaultFontName:"Verdana"
  }

