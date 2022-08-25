import React from 'react'
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import styled from 'styled-components';
import ContactForm from './ContactForm';
import ContactInfoItem from './ContactInfoItem';
import SectionTitle from './SectionTitle';
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent"



const ContactSectionStyle = styled.div`
padding: 2rem 0;
.contactSection__wrapper{
    display: flex;
    gap: 5rem;
    margin-top: 1rem;
    justify-content: space-between;
    position: relative;
}
.contactSection__wrapper::after{
    position: absolute;
    content: '';
    width: 2px;
    height: 80%;
    background-color: blue;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
}
.left{
    width: 100%;
    max-width: 500px;
}
.right{
    max-width: 500px;
    width: 100%;
    border-radius: 12px;
}
@media only screen and (max-width: 768px) {
    .contactSection__wrapper {
        flex-direction: column;
    }
    .contactSection__wrapper:: after {
        display: none;
    }
    .left,
    .right{ 
        max-width: 100%;
    }
    .right{
        padding: 4rem 2rem 2rem 2rem;
    }
}
`;


export default function ContactSection() {
  return (
    <ContactSectionStyle>
        <div className="container">
            <SectionTitle heading="Contact Us"
            subheading="Get in Touch" />
            <div className="contactSection__wrapper">
                <div className="left">
                <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <ContactInfoItem icon={<MdLocalPhone />}
                    text="+254700633233" />
                    <ContactInfoItem icon={<MdEmail />}
                    text="programs@iearn.africa" />
                    <ContactInfoItem text="Ngara Road, Nairobi, Kenya"/>
                </CardContent>
                </Card>
                </div>
                <div className="right">
                    <ContactForm />
                </div>
            </div>
        </div>
    </ContactSectionStyle>
  )
}
