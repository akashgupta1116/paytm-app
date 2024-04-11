import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import ModalCard from "../components/ModalCard";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const Signup = () => {
  const [signUpForm, setSignUpForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleFormChange = (type, e) => {
    setSignUpForm({
      ...signUpForm,
      [type]: e.target.value
    })
  }
  return (
    <ModalCard>
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your information to create an account"} />
      <InputBox onChange = {(e)=> handleFormChange('firstname', e)}  placeholder={"John"} label={"Firstname"} />
      <InputBox onChange = {(e)=> handleFormChange('lastname', e)} placeholder={"Doe"} label={"Lastname"} />
      <InputBox onChange = {(e)=> handleFormChange('username', e)} placeholder={"johndoe@example.com"} label={"Email"} />
      <InputBox onChange = {(e)=> handleFormChange('password', e)} placeholder={"xyz@123"} label={"Password"} />
      <div className={"pt-4"}>
        <Button onClick = {async ()=> {
          const response =  await axios.post('http://localhost:3000/api/v1/user/signup/', {
            ...signUpForm
          })

          localStorage.setItem("token", response.data.token)
          navigate('/dashboard')
        }} 
        label={"Sign up"} />
      </div>
      <BottomWarning
        label={"Already have an account? "}
        buttonText={"Sign in"}
        to={"/signin"}
      />
    </ModalCard>
  );
};

export default Signup