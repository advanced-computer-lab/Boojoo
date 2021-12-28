
<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#screenshots">ScreenShots</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Boojoo Airline Reservation System]](https://example.com)

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MOTIVATION -->
### Motivation

The following are the objectives of this project:

Master working with MERN Stack.
Learn how to work together as a team on GitHub.
Learn how to follow up system requirments part by part to complete a whole software.


<!-- BUILD STATUS -->
### Build Status
Our website currently offers one-way flights only but we promise we will cover round trips soon
also, we are goingto add sign out for convenience only.



<!-- CODING STYLE -->
### Coding Style
This Project is Divided into two parts backend which is built with Camel Case and no semi colons after line.while, the other part which is the frontend
is built with coding standards like Indentation styles and size.



<!-- BUILT WITH -->
### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Mongoose](https://mongoosejs.com/)
* [Passport](http://www.passportjs.org/)
* [HTML]
* [CSS]


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run The two servers(backend one:8000),(FrontEnd:3000)
   ```js
   cd src
   node index.js
   ctrl+shift+'
   cd src
   cd client
   cd src
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This Project is a Smart Remote System That can be Used to Reserve And Organize Flights(AirLine Reservation System)
_For more , please refer to the [Documentation](https://en.wikipedia.org/wiki/Airline_reservations_system)_   

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## RoadMap

- [x] Automatic Mailing System API
- [x] Online Payment API
- [x] Login Register
- [x] Error Handling And Responsivness
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROUTES -->
## Routes

The Server Section is running on index.js File All the Depndencies are on package.json and package-lock.json(in src for backend)
and There's two More Package.json and package-lock.json in Src>Client>Src (for FrontEnd)
There is 4 Model Schemas mongo ones (Admin,User,Flight,Reservation) .With,2 Routes backend ones one for Functioning the users Stories(Users.js) 
and the other one For functioning Flights Stories(Flights.js)all The routers are in the Routes section every Router has a Comment
Above it Explaning its Usage.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- TESTS -->
## Tests

Mainly all this project was tested using Rest extension client
examples:
###
 POST http://localhost:8000/Users/Register/ 
 Content-Type: application/json

{
"Email":"Ab", "Password":"14567", "PassportNumber":"1001001","FirstName":"zy","LastName":"ay","Address":"he","CountryCode":12,
"Telephone":11
}

###
POST http://localhost:8000/flights/abdo@gmail.com/CreateFlight 
content-type: application/json

{ "Code": "A2", "Airport": "qahera", "Date": "tomorrow", "Terminal": "3", "Available": true, "Arrival": "el sbt el sob7", "Departure": " bleel","From":"Tahrir", "To":"rehab", "Price":"1500","TripDuration":"sa3a","Seats":15,"Cabin":"Busniess","Baggage":"25" }

### PUT http://localhost:8000/users/ChangePassword/61c7899bbcfe17742dbff09f content-type: application/json

{
"OldPassword":"03", "NewPassword":"1"
}

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Abdelrahman Omar - [@Email](miro29147@gmail.com)
Abdelrahman Hany - [@Email](abdo.hany1998@gmail.com)
Project Link: [https://github.com/advanced-computer-lab/Boojoo](https://github.com/advanced-computer-lab/Boojoo)

<p align="right">(<a href="#top">back to top</a>)</p>





<!-- SCREENSHOTS -->
## ScreenShots


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
