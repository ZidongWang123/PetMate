
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
