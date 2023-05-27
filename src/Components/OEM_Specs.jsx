import React from 'react'

const OEM_Specs = () => {
  let [items, setItems] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetch("https://cute-red-dibbler-garb.cyclic.app/OEM_Specs");
      let data = await res.json();
      console.log(data)
      setItems(data.OEM_Specs);
    })();
  }, [])
  console.log(items);
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
      {items?.map((el) => (
        <div key={el._id}>
          <p>Model Name:-{el.modelName}</p>
          <p>Max Speed:-{el.maxSpeed}</p>
          <p>Milage:-{el.mileage}</p>
          <p>Model Year:-{el.modelYear}</p>
          <p>Power:-{el.power}</p>
          <p>Price:-{el.price}</p>
          <div>
            <p>Color:-</p>
            <div style={{display:"flex",justifyContent:"space-around"}}>
            {el.availableColor.map((col) => (
              <div key={col}>
                <div>{col}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OEM_Specs