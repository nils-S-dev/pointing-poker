<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Pointing Poker</h1>

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
      <a href="#local-development">Local Development</a>
      <ul>
        <li><a href="#api">API</a></li>
        <li><a href="#client">Client</a></li>
      </ul>
    </li>
    <li>
      <a href="#docker-setup">Docker Setup</a>
      <ul>
        <li><a href="#development">Development</a></li>
        <li><a href="#production">Production</a></li>
      </ul>
    </li>
    <li><a href="#adding-a-prodecure">Adding a Procedure</a></li>
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
* [![Angular][React.js]][React-url]
* [Socket.io](https://socket.io/)

<p>(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
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

## Docker Setup

Make sure Docker is installed and the Docker Daemon is running

### Development

In the project root you will find a `docker-compose-template.yaml` file. It is meant for local startup, evaluation and testing

* For the `api` service in `args` make sure to provide a `JWT_SECRET`
* For the `client` service in `args` make sure that `API_URL` points to where your API is running, which is `localhost:3000` by default

if required you can make adaptions to the Nginx configuration used for the React client at `./client/nginx/local.conf`.

You can start the project by executing

```
docker compose up
```

### Production

In the project root there is a sample docker compose file that I am using for production: `docker-compose.production.yaml`. In order to use my approach you might follow these steps:

* Build an push the docker images for `api` and `client` to the GitHub Container Registry (GHCR). I am doing this using a GitHub Action: `.github/workflows/main.yaml`. 
* Make sure to configure the following <b>secrets</b> in Github:
  * `SHARED_SECRET`: the secret used to encrypt JWTs
  * `TOKEN`: Your GithHub Access Token with read and wright permissions on the registry 
* Make sure to configure the following <b>variables</b> in GitHub:
  * `API_URL`: The URL where the API is deployed
  * `CLIENT_URL`: The URL where the client is deployed (required for CORS)
* Make sure that on the machine you inted to deploy the docker images you are [authenticated with GHCR](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ADDING A PROCEDURE -->
## Adding a Procedure
The application offers several procedures to do the estimation in the socket.io room, such as using the fibonacci sequence or T-shirt sizes. Feel free to add your own procdures by

1. Creating a file in the `client/src/constants/procedures` directory and naming it to your procedure. Example: `fibonacci.ts`
2. Make sure to export a variable of type `EstimationProcedure`. Assign a meaningful `name`, a `label` (shown in the dropdown menu) and a list of `options`. Those `options` can later be chosen for estimation. Each option must have a `label`, which is use to display the choice, and a `value`, which will at some point in the future be used to calculate metrics.
3. In `client/src/constants/procedures` make sure you add your custom procedure to the `procedures` array using the exported variable of type EstimationProcedure you defined above.

Feel free to contribute!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add fibonacci estimation procedure
- [x] Add T-shirt sizes estimation procedure
- [x] Add text input estimation procedure
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
[React.js]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[React-url]: https://react.dev/
[Nest.js]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/