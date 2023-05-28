import React from 'react'
import Style from "../Components/Dealers.module.css"
import { Input, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Form = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: ""
  })
  const handleChange=(e)=>{
    let name=e.target.name;
    let values=e.target.value;
    setValue({
      ...value,
      [name]:values
    });
  }
  const handleSubmitLogin=async(event)=>{
    event.preventDefault();
    let res=await fetch("https://buy-car.onrender.com/user/login",{
      method:"POST",
      body: JSON.stringify(value),
      headers:{
        "Content-type":"application/json"
      }
    })
    let data=await res.json();
    if(data.msg==="Wrong Credientials"){
      alert("Invalid Credentials");
      return;
    }
    localStorage.setItem("token",data.token)
    localStorage.setItem("id",data.id)
    alert("You are now logged in");
    setValue({
      email: "",
      password: ""
    })
  }
  const handleSubmitSignup=async(event)=>{
    event.preventDefault();
    await fetch("https://buy-car.onrender.com/user/register",{
      method:"POST",
      body: JSON.stringify(value),
      headers:{
        "Content-type":"application/json"
      }
    })
    setValue({
      email: "",
      password: ""
    })
  }
  return (
    <div className={Style.main}>
      <Tabs isFitted variant='enclosed'>
        <TabList>
          <Tab _selected={{ color: 'rgba(0, 0, 0, 0.721)', bg: 'rgba(0, 123, 255, 0.476)', fontSize:"1.3rem" }}>Login</Tab>
          <Tab _selected={{ color: 'rgba(0, 0, 0, 0.721)', bg: 'rgba(0, 255, 68, 0.476)', fontSize:"1.3rem" }}>Signup</Tab>
        </TabList>

        <TabPanels>
          <TabPanel className={Style.form}>
            <form onSubmit={handleSubmitLogin}>
              <p style={{fontSize:"1.3rem"}}>Email</p>
              <Input style={{fontSize:"1.3rem"}} onChange={handleChange} type="email" name='email' value={value.email} placeholder="Email" />
              <p style={{fontSize:"1.3rem"}}>Password</p>
              <Input style={{fontSize:"1.3rem"}} onChange={handleChange} type="password" name='password' value={value.password} placeholder="Password" />
              <br />
              <Input style={{fontSize:"1.3rem",cursor:"pointer"}} type='submit' />
            </form>
          </TabPanel>
          <TabPanel className={Style.form2}>
            <form onSubmit={handleSubmitSignup}>
              <p style={{fontSize:"1.3rem"}}>Email</p>
              <Input style={{fontSize:"1.3rem",borderColor:"green"}} onChange={handleChange} type="email" name='email' value={value.email} placeholder="Email" />
              <p style={{fontSize:"1.3rem"}}>Password</p>
              <Input style={{fontSize:"1.3rem",borderColor:"green"}} onChange={handleChange} type="password" name='password' value={value.password} placeholder="Password" />
              <Input style={{fontSize:"1.3rem",borderColor:"green",cursor:"pointer"}} type='submit' />
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Form