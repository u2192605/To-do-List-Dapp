# To-Do List App

A full-stack To-Do list web application built using the MERN stack ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Node.js](https://nodejs.org/en/)).

## Key Features

- User authentication and authorization
  - Signup and login with hashed passwords 
  - JWT tokens for access control
- CRUD functionality for To-Do categories and tasks
  - Create, read, update, and delete categories
  - Create, read, update, and delete tasks within each category
- Responsive design and UI
- Pagination for tasks and categories  
- Real-time updates across client and server

## Demo

[![Video title](http://img.youtube.com/vi/ZqOpGIhJKw8/0.jpg)](http://www.youtube.com/watch?v=ZqOpGIhJKw8)

You can find a live demo here: [To-Do App](https://to-do-list-delta-seven.vercel.app/)

## Tech Stack

**Frontend:** [React](https://reactjs.org/), [React Router](https://reactrouter.com/), [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query), [TailwindCSS](https://tailwindcss.com/)

**Backend:** [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [JWT](https://www.npmjs.com/package/jsonwebtoken), [BCrypt](https://www.npmjs.com/package/bcrypt)

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance 

### Installation

1. Clone the repo

```bash
git clone https://github.com/MostafaXLotfy/To-doList.git 
```


2. Set environment variables

The project uses a .env file for environment variables.

Create a .env file in the server/ directory with:

```
MONGODB_URI=your_mongo_uri
SECRET=your_JWT_secret
```

And create a .env file in the client/ directory with: 

```  
REACT_APP_API_URL=your_api_url
```

This sets up the environment variables for both the backend Express server and the frontend React app.

3. Start the server

```bash
cd server/
npm install #install dependencies
npm start   #run server
```
4. start frontend 
```bash
cd client/
npm install #install dependencies
npm start   #run server
```

The app will be served at `http://localhost:3000`

## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
