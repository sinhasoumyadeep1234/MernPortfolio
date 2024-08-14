import React from 'react'
// importing card and button from bootstrap
import {Card, Button} from 'react-bootstrap';

// this component will get a project item as prop
const ProjectCard = ({project}) => {
    console.log("Controlled entered in card");
    console.log(project);
    return(
    <Card style={{width: '18rem'}} className="project-card bg-light glow-effect">
        {/* in this card we will have a project image..all these data is defined in the prop we will be getting */}
        <Card.Img variant="top" src={project.image}/>
        <Card.Body className="d-flex flex-column">
            {/* inside card body we will have a titile of the project and its description */}
            <Card.Title>{project.title}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            {/* after this we will have a button to see the project in details */}
            <Button variant="primary" href={`/projects/${project.id}`}>See More</Button>

        </Card.Body>
    </Card>
    );
};

export default ProjectCard;