import React from 'react'
// import the project card component to use it here 
import ProjectCard from './ProjectCard';
import {Container,Row,Col} from 'react-bootstrap';

// create a array of projects
const projects=[
  {
    id:1,
    image:'/assets/images/amazon1.png',
    title:'Project 1 : AMAZON',
    description:'Frontend clone website of famous ecommerce platform amazon.com',
    fullDescription:'A simple frontend clone website of famous ecommerce platform amazon.com using HTMl for structure,CSS for styling and little touch of JavaScript for carousel scrolling',
    video:'https://drive.google.com/file/d/1LuIKWKKy0BRNCCr_j8enIqguAzMsXKg6/preview',
    link: 'https://sinhasoumyadeep1234.github.io/Amazon/'
  },
  {
    id:2,
    image:'/assets/images/miranda1.png',
    title:'Project 2 : MIRANDA',
    description:'Frontend clone website of famous nostalgic website Miranda',
    fullDescription:'A simple frontend clone website of famous nostalgic website using HTMl for structure,CSS for styling and little touch of JavaScript for interactivity and ajax for animations',
    video:'https://drive.google.com/file/d/1Fe_yfvW9In7VU4N75wzY91-mMEuVMCCa/preview',
    link: 'https://sinhasoumyadeep1234.github.io/Miranda/'
  },
  {
    id:3,
    image:'/assets/images/myntra.png',
    title:'Project 3 : MYNTRA',
    description:'Frontend clone website of famous shopping platform myntra.com',
    fullDescription:'A simple frontend clone website of famous shopping platform myntra.com using HTMl for structure and CSS for styling',
    video:'https://drive.google.com/file/d/14ewJZJFnfHVpK2QpxdpSueBzEHoYVQwE/preview',
    link: 'https://sinhasoumyadeep1234.github.io/Myntra/'
  },
  {
    id:4,
    image:'/assets/images/netflix.png',
    title:'Project 4 : NETFLIX',
    description:'Frontend clone website of famous movies and webseries platform netflix.com',
    fullDescription:'A simple frontend clone website of movies and webseries platform netflix.com using HTMl for structure and CSS for styling',
    video:'https://drive.google.com/file/d/1NOhiN4g6xazZSu7odRef2_UFcmXqmvvS/preview',
    link: 'https://sinhasoumyadeep1234.github.io/Netflix/'
  },
  {
    id:5,
    image:'/assets/images/tic-tac-toe.png',
    title:'Project 5 : TIC-TAC-TOE',
    description:'Nostalgic game: Tic-tac-toe,which we everyone have played in past in any point of our lives.',
    fullDescription:'A simple game creation of famous nostalgic game using HTMl for structure,CSS for styling and JavaScript for logic building of the game',
    video:'https://drive.google.com/file/d/1szz498JYVoakE5L-Hy7Nr9nyP7iijfFB/preview',
    link: 'https://sinhasoumyadeep1234.github.io/Tic-Tac-Toe/'
  },
  {
    id:6,
    image:'/assets/images/twitter.png',
    title:'Project 6 : X ( TWITTER )',
    description:'Frontend clone of X(Twitter) a famous social media platform.',
    fullDescription:'A simple frontend clone website of famous Social media platform X(Formerly known as twitter) using HTMl for structure and CSS for styling.',
    video:'https://drive.google.com/file/d/1KW_bQGVebx3LlmfFhQjmFWy1m48Zq8aS/preview',
    link: 'https://soumyasxworld.freewebhostmost.com/'
  },
  {
    id:7,
    image:'/assets/images/textutilsimage.png',
    title:'Project 7 : TEXT UTILITY APP',
    description:'Text utility application',
    fullDescription:'A text utility website that enables users In this project user can manipulate their text according to their needs by the options given in buttons. Eg: Change text to uppercase, lowercase, remove extra spaces etc.The user can also preview their text, see number of words/letters typed and many more.Moreover their is also option for dark mode in the app and also change of background color using color palette present.',
    video:'https://drive.google.com/file/d/1O6IulNv_0IbKTO9G6B8tt94VCm9foV2L/preview',
    link: 'https://sinhasoumyadeep1234.github.io/my-first-react-app/'
  },
  {
    id:8,
    image:'/assets/images/spotifymain.png',
    title:'Project 8 : SPOTIFY',
    description:'Full Stack clone of Spotify music player',
    fullDescription:'A complete full stack clone of the famous Spotify music player application made using html,css and javascript. Users can select on the playlists and play/pause the repective songs with ease.',
    video:'https://drive.google.com/file/d/1X9y0k5IynGuDzr3JufZKaeK5BcG-Xfxl/preview',
    link: 'https://soumyadeepspotify.freewebhostmost.com/'
  },
  {
    id:9,
    image:'/assets/images/chatbot.png',
    title:'Project 9 : AI-BASED CHATBOT',
    description:'AI based chatbot for college website',
    fullDescription:'A AI based chatbot for college website is an automated AI intelligent system that uses NLP techniques to understand user intensions and perform actions accordingly. We have created this chatbot for our college website to facilitate the students in general queries like: fetching fee structures of various courses offered by the college,faculty details,placement records etc. We have used html and css for chatbot structure and nodejs and express js for backend logic building.',
    video:'https://drive.google.com/file/d/1shkUR__aG6iAAHH997fZAXzQXm900TXH/preview',
    link: 'None'
  },
  {
    id:10,
    image:'/assets/images/rayban.png',
    title:'Project 10 : Animated Landing Page',
    description:'A very charming animated landing page',
    fullDescription:'A animated landing page created using html css and js.',
    video:'https://drive.google.com/file/d/1aoJ6yneRMtNiZgnfqVIIm6QX9LtVwSm-/preview',
    link: 'https://sinhasoumyadeep1234.github.io/AnimatedWebsite/'
  },
]


// now use the array to call the card component
const Projects = () => {
  return(
<Container className='d-flex justify-content-center mt-5'>
  <Row className="justify-content-center">
    {/* now take the array and use map function to apply styles to all the sub elements */}
    {projects.map(project=>(
        <Col key={project.id} sm={12} md={6} lg={4} className='mb-4 d-flex justify-content-center'>
          {/* call the card component and send one project element at a time as a prop */}
          
          <ProjectCard project={project}/>

        </Col>
    ))}
  </Row>
</Container>
);
};


export default Projects;
