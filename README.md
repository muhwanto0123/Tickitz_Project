<br />
<p align="center">
  <div align="center">
     <h1>Tickitz BE</h1>
  </div>
  <h3 align="center">Tickitz</h3>
  <p align="center">
    <a href="https://github.com/muhwanto0123/Tickitz_Project"><strong>Explore the docs »</strong></a>
    <br />
  <a href="https://documenter.getpostman.com/view/29337374/2s9YkodgtA">View Documentation</a>
    ·
    <a href="https://tickitz-project.vercel.app/">Api Demo</a> -->
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)


# About The Project

Tickitz is a movie web application designed for users to discover, explore and enjoy movies. With an intuitive and user-friendly interface, Tickitz offers information about all the films showing, and upcoming ones. 

Tickitz provides you with film details, just click on the image of the film you want to know information about, and of course you can order the film also on the web here, but don't forget to log in first

To create Tickitz, Im using cutting-edge technologies like React Js, Bootstrap, Moment, Axios, PostMan, Redux toolkit, which will provide efficient experience.

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)

# Installation

1. Clone this repository

```sh
git clone https://github.com/muhwanto0123/Tickitz_Project.git
```

2. Change directory to Tickitz_Project

```sh
cd Tickitz_Project
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [tickets.sql](./src/tickets.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

6. Run this command to run the server

```sh
npm run start
```

- Or run this command for running in development environment

```sh
npm run dev
```


## Documentation

Documentation files are provided in the [docs](./src/docs) folder

- [Postman API colletion](https://documenter.getpostman.com/view/29337374/2s9YkodgtA)
- [PostgreSQL database query](./src/docs/tickets.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/29337374/2s9YkodgtA)

## Related Project

:rocket: [`Backend Tickitz`](https://github.com/muhwanto0123/Tickitz_Project)

:rocket: [`Frontend Tickitz`](https://github.com/muhwanto0123/tickitz_fe_2React)

:rocket: [`Demo Tickitz`](https://tickitz-fe-2-react.vercel.app/)
