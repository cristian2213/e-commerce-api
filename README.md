<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">CIFULLMA</h3>

  <p align="center">
    An awesome e-commerce project
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<a id="about-the-project"></a>
This is an amazing e-commerce project, where all users can sell and buy products without problems, it allows each user to have a dashboard with everything necessary to load products in the right way through different types of load, for example, loads. In .csv, .xlsx and .txt format and also dynamic loads using plain text and using regular expressions to mutate it to a correct format, in addition, this project will implement development tools such as Docker-compose and <strong><a href="https://www.docker.com/">Docker</a></strong> containers for deployment on the server and to finish this project, I will implement notifications and a real time chat system using <strong><a href="https://socket.io/">Socket.IO</a></strong> and create my own library using <strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a></strong> to build graphs of system statistics, last but not least this project will have unit tests and good documentation made with <strong><a href="https://swagger.io/">Swagger</a></strong>.
Here's why:

- I want to increase my skills in Node.js, since this is my first project using this framework.
- This project was also born as a way to practice new algorithms and data structures that I have been learning lately on my own.
- Finally, I am creating this project to have it as a good reference for my work.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

<a id="built-with"></a>
These are the technologies with which this project is being built, I had thought to develop it with Nest.js, but I will leave it for another project.

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Pug](https://pugjs.org/)
- [React.js](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest#readme)
- [Socket.IO](https://socket.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

<a id="getting-started"></a>
First, make sure you have the following dependencies with this version or a newer one.

### Prerequisites

<a id="prerequisites"></a>

- node & npm
  ```sh
  v16.13.1 & v8.1.2
  ```
- Docker & Docker-compose

- A coffee on your table ☕

### Installation

<a id="installation"></a>
_To run this project, please follow the steps below._

1. Clone the repo
   ```sh
   git clone https://github.com/cristian2213/e-commerce-api.git
   ```
2. Run services
   ```sh
   docker-compose up -d
   ```
3. Create a .env file in the root and paste this variables:
   ```js
   APP_PORT=3000
   APP_HOST=127.0.0.1
   DB_CONNECTION=mysql
   MYSQL_HOST=127.0.0.1
   MYSQL_DATABASE=e-commerce-app-01
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_ROOT_PASSWORD=123456
   JWT_SECRET=yourKey
   SENDGRID_API_KEY=youCanCreateAKeyInSendGridIsFree
   SENDGRID_EMAIL_FROM=emailToSendEmailVerification
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Run the server in development mode
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<a id="usage"></a>
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- ## Roadmap

<a id="roadmap"></a>

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## Contributing

<a id="contributing"></a>
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

<a id="license"></a>
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

<a id="contact"></a>
My Linkedin: [https://www.linkedin.com/in/cristian-johany/](https://www.linkedin.com/in/cristian-johany/)

<p align="right">(<a href="#top">back to top</a>)</p>
