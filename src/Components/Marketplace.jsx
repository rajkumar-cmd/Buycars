import React from 'react'
import MarketOEM from './MarketOEM';
import { Button } from '@chakra-ui/react'

const Marketplace = () => {
    let [items, setItems] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const res = await fetch("https://cute-red-dibbler-garb.cyclic.app/marketplace");
            let data = await res.json();
            console.log(data)
            setItems(data.marketplaces);
        })();
    }, [])
    console.log(items);
    const handleDelete=async(id)=>{
        await fetch(`https://cute-red-dibbler-garb.cyclic.app/marketplace/delete/${id}`, {
            method: 'DELETE',
          });
      }
    return (
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>{items?.map((el) => (
            <div key={el._id}>
                <p>Title:-{el.title}</p>
                <img src={el.imageURL} alt="" />
                <p>Description:-</p>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                {el.desc.map((des)=>(
                    <div key={des}>
                        <p>{des}</p>
                    </div>
                ))}</div>
                <p>KMs on Odometer:-{el.KMs_on_Odometer}</p>
                <p>Major Scratches:-{el.major_Scratches}</p>
                <p>Number of accidents:-{el.Number_of_accidents}</p>
                <p>Number of previous buyers:-{el.Number_of_previous_buyers}</p>
                <p>Registration Place:-{el.registration_Place}</p>
                <h3>OEM Specs</h3>
                <MarketOEM idVal={el.OEM_Spec_ID}/>
                <Button onClick={handleDelete(el._id)}>DELETE</Button>
            </div>
        ))}</div>
    )
}

export default Marketplace