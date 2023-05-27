import React from 'react'

const MarketOEM = (props) => {
    let [items, setItems] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetch(`https://cute-red-dibbler-garb.cyclic.app/OEM_Specs/find/${props.idVal}`);
      let data = await res.json();
      console.log(data)
      setItems(data.POST);
    })();
  }, [])
  console.log(items);
  
  return (
    <div>
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

export default MarketOEM