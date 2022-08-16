import React from "react";
import PText from "./PText";
import AboutImg from '../../assets/teen-coders.png'
import AboutImg2 from '../../assets/young-coders.png'
import styled from "styled-components"
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent"
import {Link} from 'react-router-dom';



const AboutPageStyles = styled.div`   
 padding: 2rem 0 10rem 0;
 .top-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
 }
 button {
  font-size: 2rem;
  display: inline-block;
  outline: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: blue;
}
 .left {
  flex: 3;
  background-color: white;
  align-items: center;
 }
 .right {
  flex: 2;
  background-color: white;
 }
 .about__subheading {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  span {
    background-color: gray-3;
    padding: 0.5rem
    border-radius: 0px
 }
.about__heading {
  font-size: 3.6rem;
  margin-bottom: 3rem;
}
.about__info {
  margin-bottom: 4rem;
  .para {
    max-width: 100%;
  }
  
}
.right {
  img {
    border: 2px solid;
  }
}
`;

const about = () => {
  return (
    <AboutPageStyles>
      <div className="container">
        <div className="top-section">
          <div className="left">
            <p className="about__subheading">
             Who we <span>Are...</span>
            </p>
            <h2 className="about__heading">
            Why Innovation Academy
            </h2>
            <div className="about__info">
            <PText>
            <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              iEARN Kenya Innovation Academy introduces education 4.0 that offers
        an opportunity for studious beginners and experts whose goal is to become professional.
        Our learning model is profoundly social, student-centric, personalized, blended, remote and supported by technology.
        </CardContent>
              </Card>
              </PText>
              <br /> <br />
              <PText>
            <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              Coding Mentors from iEARN will take training through a range of competency based learning activities
              that aim to introduce them to Coding and creativity.
              </CardContent>
              </Card>
              </PText>
              <br /> <br />
              <PText>
            <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              Coding will teach and expose the trainees to an iterative approach to solving problems and testing out ideas. 
              Computational and design thinking is an important skill in a world where human relations are increasingly dependent on technology.
              </CardContent>
              </Card>
              </PText>
            </div>
            <Link to="/contact">
            <button btnText="Contact Us">Contact Us</button>
            </Link>
          </div>
          <div className="right">
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
            <img src={AboutImg} alt="About img" />
            </CardContent>
              </Card>
            <br /> <br />
            <Card sx={{ maxWidth: 500 }}>
            <CardContent>
            <img src={AboutImg2} alt="About img" />
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AboutPageStyles>
  );
};



export default about;
