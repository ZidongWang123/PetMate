/*
 * @Author: xiehuan 1208044257@qq.com
 * @Date: 2023-06-30 11:20:53
 * @LastEditors: xiehuan 1208044257@qq.com
 * @LastEditTime: 2023-07-01 14:01:33
 * @FilePath: \prototype\server\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//import all the dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";


import serviceRoutes from "./routes/service.js";
import eventRoutes from "./routes/event.js";
import groupRoutes from "./routes/groups.js";
import explorePost from "./routes/explorePost.js";

import articleRoutes  from "./routes/article.js"
//create an instance of express
const app = express();
//use dotenv to hide the connection url
dotenv.config();

//set up the body parser and cors
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
//connect the routes and app, which means the all requests with /user will be directed to the userRoutes
app.use("/user", userRoutes);
app.use("/api/groups", groupRoutes);

app.use("/explore", explorePost);

app.use("/services", serviceRoutes);
app.use("/events", eventRoutes);

app.use("/api/articles", articleRoutes);
const PORT = 100;
const CONNECTION_URL = process.env.CONNECTION_URL;

//connect to the database and start the server
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Server running on port: ${CONNECTION_URL}`);
    })
  )
  .catch((error) => console.log(error.message));

// www.mongodb.com/cloud/atlas
