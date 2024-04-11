import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import ModalCard from "../components/ModalCard";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signin = () => {
const [signinForm, setSigninForm] = useState({
    username: '',
    password: ''
})
const navigate = useNavigate();

const handleFormChange = (type, e) => {
    setSigninForm({
      ...signinForm,
      [type]: e.target.value
    })
  }
  return (
    <ModalCard>
      <Heading label={"Sign in"} />
      <SubHeading label={"Enter your credentials to access your account"} />
      <InputBox onChange = {(e)=> handleFormChange('username', e)} placeholder={"johndoe@example.com"} label={"Email"} />
      <InputBox onChange = {(e)=> handleFormChange('password', e)} placeholder={"xyz@123"} label={"Password"} />
      <div className={"pt-4"}>
        <Button label={"Sign ip"} onClick = {async()=>{
            const response =  await axios.post('http://localhost:3000/api/v1/user/signin/', {
                ...signinForm
              })
    
            localStorage.setItem("token", response.data.token)
            navigate('/dashboard')
        }}/>
      </div>
      <BottomWarning
        label={"Don't have an account? "}
        buttonText={"Sign up"}
        to={"/signup"}
      />
    </ModalCard>
  );
};

export default Signin