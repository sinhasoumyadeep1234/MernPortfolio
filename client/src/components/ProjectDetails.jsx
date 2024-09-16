import React from "react";
import { Container } from "react-bootstrap";
// import use params hook
import { useParams } from "react-router-dom";

const projects = [
  {
    id: 1,
    image: "/assets/images/amazon1.png",
    title: "Project 1 : AMAZON",
    fullDescription:
      "A simple frontend clone website of famous ecommerce platform amazon.com using HTML for structure,CSS for styling and little touch of JavaScript for carousel scrolling",
    video: "https://drive.google.com/file/d/1LuIKWKKy0BRNCCr_j8enIqguAzMsXKg6/preview",
    link: "https://sinhasoumyadeep1234.github.io/Amazon/",
  },
  {
    id: 2,
    image: "/assets/images/miranda1.png",
    title: "Project 2 : MIRANDA",
    fullDescription:
      "A simple frontend clone website of famous nostalgic website using HTMl for structure,CSS for styling and little touch of JavaScript for interactivity and ajax for animations",
    video: "https://drive.google.com/file/d/1Fe_yfvW9In7VU4N75wzY91-mMEuVMCCa/preview",
    link: "https://sinhasoumyadeep1234.github.io/Miranda/",
  },
  {
    id: 3,
    image: "/assets/images/myntra.png",
    title: "Project 3 : MYNTRA",
    fullDescription:
      "A simple frontend clone website of famous shopping platform myntra.com using HTMl for structure and CSS for styling",
    video: "https://drive.google.com/file/d/14ewJZJFnfHVpK2QpxdpSueBzEHoYVQwE/preview",
    link: "https://sinhasoumyadeep1234.github.io/Myntra/",
  },
  {
    id: 4,
    image: "/assets/images/netflix.png",
    title: "Project 4 : NETFLIX",
    fullDescription:
      "A simple frontend clone website of movies and webseries platform netflix.com using HTMl for structure and CSS for styling",
    video: "https://drive.google.com/file/d/1NOhiN4g6xazZSu7odRef2_UFcmXqmvvS/preview",
    link: "https://sinhasoumyadeep1234.github.io/Netflix/",
  },
  {
    id: 5,
    image: "/assets/images/tic-tac-toe.png",
    title: "Project 5 : TIC-TAC-TOE",
    fullDescription:
      "A simple game creation of famous nostalgic game using HTMl for structure,CSS for styling and JavaScript for logic building of the game",
    video: "https://drive.google.com/file/d/1szz498JYVoakE5L-Hy7Nr9nyP7iijfFB/preview",
    link: "https://sinhasoumyadeep1234.github.io/Tic-Tac-Toe/",
  },
  {
    id: 6,
    image: "/assets/images/twitter.png",
    title: "Project 6 : X ( TWITTER )",
    fullDescription:
      "A simple frontend clone website of famous Social media platform X(Formerly known as twitter) using HTMl for structure and CSS for styling.",
    video: "https://drive.google.com/file/d/1KW_bQGVebx3LlmfFhQjmFWy1m48Zq8aS/preview",
    link: "https://soumyasxworld.freewebhostmost.com/",
  },
  {
    id: 7,
    image: "/assets/images/textutilsimage.png",
    title: "Project 7 : TEXT UTILITY APP",
    fullDescription:
      "A text utility website that enables users In this project user can manipulate their text according to their needs by the options given in buttons. Eg: Change text to uppercase, lowercase, remove extra spaces etc.The user can also preview their text, see number of words/letters typed and many more.Moreover their is also option for dark mode in the app and also change of background color using color palette present.This project has been done using react.js",
    video: "https://drive.google.com/file/d/1O6IulNv_0IbKTO9G6B8tt94VCm9foV2L/preview",
    link: "https://sinhasoumyadeep1234.github.io/my-first-react-app/",
  },
  {
    id: 8,
    image: "/assets/images/spotifymain.png",
    title: "Project 8 : SPOTIFY",
    fullDescription:
      "A complete full stack clone of the famous Spotify music player application made using html,css and javascript. Users can select on the playlists and play/pause the respective songs with ease.",
    video: "https://drive.google.com/file/d/1X9y0k5IynGuDzr3JufZKaeK5BcG-Xfxl/preview",
    link: "https://soumyadeepspotify.freewebhostmost.com/",
  },
  {
    id: 9,
    image: "/assets/images/chatbot.png",
    title: "Project 9 : AI-BASED CHATBOT",
    fullDescription:
      "A AI based chatbot for college website is an automated AI intelligent system that uses NLP techniques to understand user intensions and perform actions accordingly. We have created this chatbot for our college website to facilitate the students in general queries like: fetching fee structures of various courses offered by the college,faculty details,placement records etc. We have used html and css for chatbot structure and nodejs and express js for backend logic building.",
    video: "https://drive.google.com/file/d/1shkUR__aG6iAAHH997fZAXzQXm900TXH/preview",
    link: "None",
  },
  {
    id:10,
    image:'/assets/images/rayban.png',
    title:'Project 10 : Animated Landing Page',
    fullDescription:'A animated landing page created using html css and js.',
    video:'https://drive.google.com/file/d/1aoJ6yneRMtNiZgnfqVIIm6QX9LtVwSm-/preview',
    link: 'https://sinhasoumyadeep1234.github.io/AnimatedWebsite/',
  },
];

const ProjectDetails = () => {
  // extract the id only
  const { id } = useParams();
  // now match the id with the projects array and capture the respective project object
  const project = projects.find((p) => p.id === parseInt(id));

  // then return a html page with that particular project having videos and all
  return (
    <Container className="project-details-container">
      {/* add title and image */}
      <h1>{project.title}</h1>
      <img
        src={project.image}
        alt={project.title}
        style={{ width: "100%" }}
        className="project-details-image"
      />
      {/* add description */}

      <h4 className="project-details-description">
        <b>Project Description:</b> {project.fullDescription}
      </h4>
      <h4
        className="project-details-description"
        style={{ textAlign: "center" }}
      >
        <b>Watch the video below to see the project's working👇</b>
      </h4>

      {/* add the video */}
      <div className="project-details-image">

        <iframe
        src={project.video}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title={project.title}
        className="project-details-video"
      ></iframe>
        
      </div>
      

      {/* add the project link */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "darkblue",
          fontWeight: "bolder",
        }}
      >
        Click On Me To View/Test The Project Online😉
      </a>
    </Container>
  );
};

export default ProjectDetails;
