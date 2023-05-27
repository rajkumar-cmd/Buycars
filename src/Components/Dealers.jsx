import { Input, Select } from '@chakra-ui/react'
import React from 'react'

const Dealers = () => {
  const [idOEM,setidOEM]=React.useState([]);
  const [idDeal,setidDeal]=React.useState(localStorage.getItem("id"));
  const [value, setValue] = React.useState({
    imageURL:"",
    title:"",
    desc:[],
    KMs_on_Odometer:0,
    major_Scratches:"",
    original_Paint:"",
    Number_of_accidents:0,
    Number_of_previous_buyers:0,
    registration_Place:"",
    OEM_Spec_ID:"",
    dealer_ID:idDeal
  })
  React.useEffect(() => {
    (async () => {
      const res = await fetch("https://cute-red-dibbler-garb.cyclic.app/OEM_Specs");
      let data = await res.json();
      console.log(data)
      setidOEM(data.OEM_Specs);
    })();
  }, [])
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
    await fetch("https://cute-red-dibbler-garb.cyclic.app/marketplace/add",{
      method:"POST",
      body: JSON.stringify(value),
      headers:{
        "Content-type":"application/json"
      }
    })
    alert("Details are recorded");
  }
  return (
    <form onSubmit={handleSubmitLogin}>
      <p style={{ fontSize: "1.3rem" }}>Title</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='title' value={value.title} placeholder="Title" />
      <p style={{ fontSize: "1.3rem" }}>Image URL</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='imageURL' value={value.imageURL} placeholder="Image URL" />
      <p style={{ fontSize: "1.3rem" }}>KMs on Odometer</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='KMs_on_Odometer' value={value.KMs_on_Odometer} placeholder="KMs_on_Odometer" />
      <p style={{ fontSize: "1.3rem" }}>Major Scratches</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='major_Scratches' value={value.major_Scratches} placeholder="Major Scratches" />
      <p style={{ fontSize: "1.3rem" }}>Number of accidents</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='Number_of_accidents' value={value.Number_of_accidents} placeholder="Number of accidents" />
      <p style={{ fontSize: "1.3rem" }}>Number of previous buyers</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='Number_of_previous_buyers' value={value.Number_of_previous_buyers} placeholder="Number of previous buyers" />
      <p style={{ fontSize: "1.3rem" }}>Registration Place</p>
      <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='registration_Place' value={value.registration_Place} placeholder="Registration Place" />
      <p style={{ fontSize: "1.3rem" }}>OEM Car Model</p>
      <Select onChange={handleChange} name='OEM_Spec_ID' placeholder="OEM Car Model" >
        {idOEM?.map((el)=>(
          <option key={el._id} value={el._id}>{el.modelName}</option>
        ))}
      </Select>
      <br />
      <Input style={{ fontSize: "1.3rem", cursor: "pointer" }} type='submit' />
    </form>
  )
}

export default Dealers