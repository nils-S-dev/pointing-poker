<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Pointing Poker</h3>

  <p align="center">
    A simple implementation of a Scrum poker usable for estimations and refinements powered by Socket.io
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#startup">Startup</a></li>
      </ul>
    </li>
    <li>
      <a href="#local-development">Local Development</a>
      <ul>
        <li><a href="#api">API</a></li>
        <li><a href="#client">Client</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

During many, many refinement sessions my colleagues and I were using various online scrum poker tools with similar problems: Flooded by ads, unpredictable behaviour, lack of customization. <br />

This project aims to solve those issues.
<br />

This repository offers a simple yet satifsying solution for online scrum poker sessions that can easily be self hosted using Docker.
<br />

The application consists of a React frontend (`client` folder) fulfilling the role of a web client with Nginx and a Nest.js API (`api` folder) handling the realtime communication with Socket.io.

<p>(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Nest][Nest.js]][Nest-url]
* [![Angular][Angular.io]][Angular-url]
* [Socket.io](https://socket.io/)

<p>(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Make sure Docker is installed and the Docker Daemon is running

### Setup

In the project root you will find a `docker-compose-template.yaml` file.

1. Copy it and rename it `docker-compose.yaml` or anything else that suits your case
2. Adapt the environment variables defined for the `api` service. Make `JWT_SECRET` any randowm string feasible for encoding JSON Web Tokens. Make `ORIGIN` the URL where you want to host the application client (required for CORS).
3. Adapt the build arguments defined for the `client` service. Make `API_URL` the URL where you want to host the application server.

if required you can make adaptions to the Nginx configuration used for the React client at `./client/nginx/local.conf`

### Startup

After taking care of the neccessary preperations mentioned above you can now start the project using

```
docker compose up
```

or if your chose a custom name for your compose file
```
docker compose -f <YOUR-COMPOSE-FILE> up
```

## Local Development

### API

The following steps need to be performed in order to start the API locally

#### Install Dependencies

Navigate into the `api` directory 
```
cd api
```
and install the depencencies
```
npm install
```

#### Environment Variables

1. Copy the `.env.template` file and rename it to `.env`.
2. Set `JWT_SECRET` to be any random string feasible for encoding JSON Web Tokens.

#### Startup

Start the API by running
```
npm run start:dev
```

### Client

The following steps need to be performed in order to start the client locally

#### Install Dependencies

Navigate into the `client` directory 
```
cd client
```
and install the depencencies
```
npm install
```

#### Environment Variables

The repository provides a `.env.development` file which Vite will used for local development.

#### Startup

Start the client by running
```
npm run dev
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add dibonacci estimation procedure
- [x] Add custom input estimation procedure
- [ ] Add imprint
- [ ] Add data privacy
- [ ] Make project fit for deployment via pipelines
- [ ] Add T-Shirt Sizes Estimation Procedure
- [ ] Add timer visible on top of screen when inside a session (room)
- [ ] Add notifications indicating the latest event and the user who triggered it (e.b. "John Doe joined the room")

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thanks A LOT to othneildrew for [this amazing README.md template](https://github.com/othneildrew/Best-README-Template)!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Nest.js]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/