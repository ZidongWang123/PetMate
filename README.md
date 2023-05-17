## PetMate

## Introduction

Using React, Node.js, Express & MongoDB to build a Full Stack MERN Application. The App is called "PetMate" and it is a pet owner community app that allows users to meet like friends and have some group activities with same interest friends offline.

## Init

Setup:
- create a .env file and set the PORT and CONNECTION_URL (see .env.example)
- run ```npm i && npm start``` for both client and server side to start the app

## Technical documentation
Here we will instruct our code in each folder.

## Client
### Client/src/actions
The actions folder contains functions that send data (payload) to reducers to update the application state. These functions are typically triggered by events such as button clicks or form submissions.

### Client/src/components
The components folder contains our reusable React components, which can be imported and used in other parts of the application.

### Client/src/api
The api folder contains functions for making API calls to a server, typically using a library like Axios or Fetch.

### Client/src/constants
The constants folder contains constants or configuration values that are used throughout the application, such as API endpoints or action types.

### Client/src/images
The images folder contains image files used in the application.

### Client/src/reducers
The reducers folder contains functions that handle state updates based on actions triggered by the user. The state updates are returned as a new state object, which is then stored in the application's global state.

### Client/src/App.js
This is the main component that renders other components and is responsible for routing and managing state.

### Client/src/index.js
This is the entry point of the React application and is responsible for rendering the App component and initializing the Redux store and other configuration settings.



## Server
### Server/controllers/
The controller folder contains the logic for handling incoming HTTP requests, processing data, and returning responses.

### Server/middleware/
The middleware folder contains functions that can be applied to incoming requests to modify them or add additional behavior before they are handled by the controller. Like the same action but from diff user.

### Server/models/
The models folder contains the database schema definitions and data access functions for interacting with the database.

### Server/routes/
The routes folder contains the definitions for the routes that the application will handle, mapping HTTP methods and URLs to controller functions.

### Server/index.js
The index.js file ties everything together, importing the necessary modules and setting up the server to listen for incoming requests.