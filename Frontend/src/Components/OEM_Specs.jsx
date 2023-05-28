import React from 'react'
import AddCar from './AddCar';
import { Select } from '@chakra-ui/react';
import Style from "./OEM_Specs.module.css"

const OEM_Specs = () => {
  let [items, setItems] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetch(`https://buy-car.onrender.com/OEM_Specs`);
      let data = await res.json();
      console.log(data)
      setItems(data.OEM_Specs);
    })();
  },[])
  console.log(items);
  return (
    <>
      <div className={Style.main}>
        {items?.map((el) => (
          <div key={el._id} className={Style.box}>
            <p>Model Name:-{el.modelName}</p>
            <p>Max Speed:-{el.maxSpeed}</p>
            <p>Milage:-{el.mileage}</p>
            <p>Model Year:-{el.modelYear}</p>
            <p>Power:-{el.power}</p>
            <p>Price:-{el.price}</p>
            <div>
              <p>Color:-</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {el.availableColor.map((col) => (
                  <div key={col}>
                    <div>{col}</div>
                  </div>
                ))}
              </div>
            </div>
            <AddCar idAdd={el._id} type={"post"} idMar={""} handleFetch={""}></AddCar>
          </div>

        ))}
      </div>
    </>

  )
}

export default OEM_Specs