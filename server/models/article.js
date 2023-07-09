/*
 * @Author: xiehuan 1208044257@qq.com
 * @Date: 2023-07-01 13:48:31
 * @LastEditors: xiehuan 1208044257@qq.com
 * @LastEditTime: 2023-07-06 16:36:52
 * @FilePath: \prototype\server\models\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    
    u_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    
    },

    g_id:{
      type: String,
      ref:"Group"
    },
    imageWidth:{

      type:String,

    },
    imageHeight:{

      type:String,
  
    }

  },
  { timestamps: { createdAt: 'date', updatedAt: 'updated_at' } }
);

export default mongoose.model("article", articleSchema);
