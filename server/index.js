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
import applicationRoutes from "./routes/application.js";
import createdServiceRoutes from "./routes/createdService.js";
import createdEventRoutes from "./routes/createdEvent.js";

import articleRoutes from "./routes/article.js";
//import paypal api

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
app.use("/createdservices", createdServiceRoutes);
app.use("/createdevents", createdEventRoutes);
app.use("/events", eventRoutes);
app.use("/applications", applicationRoutes);

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
