import React, {useState} from 'react'
import emailjs from 'emailjs-com'
import styled from 'styled-components';
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent"



const FormStyle = styled.form`
width: 100%;
padding-top: 0rem;
.form-group {
    width: 70%;
    margin-bottom:  1rem;
}
label {
    font-size: 1.8rem;
}
input,
textarea {
    width: 100%;
    font-size: 2rem;
    padding: 1.2rem;
    color: black;
    background-color: #D3D3D3;
    outline: none;
    border: none;
    border-radius: 8px;
    margin-top: 1rem;
}
textarea {
    min-height: 150px;
    resize: vertical;
}
button {
    font-size: 1rem;
    display: inline-block;
    outline: none;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    cursor: pointer;
}
`;

export default function ContactForm() {

    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function sendEmail(e){
        e.preventDefault();
        setLoader(true);

        setName('');
        setEmail('');
        setMessage('');

        emailjs.sendForm(
            "service_skoytto",
             "template_qjnmncb", 
             e.target,
              "0Dh6RBMbka2LPXU2V"
              ).then(res=>{
                console.log(res);
              }).catch(err=> console.log(err));
    }

  return (
    <>
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <FormStyle onSubmit={sendEmail}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={name}
            onChange={(e) => setName(e.target.value)}/>

            <label>Email</label>
            <input type="email" name="user_email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <label>Message</label>
            <textarea name='message' rows='1' value={message}
            onChange={(e) => setMessage(e.target.value)}></textarea>

            
            <button 
         type="submit" value="Send" style={{background : loader? "#0056D2" : "rgb(2, 2, 110)"}}
         >
            Submit
            </button>
          </div>
        </FormStyle>
        </CardContent>
              </Card>
    </>
  )
}
