import React from 'react'
import MarketOEM from './MarketOEM';
import axios from "axios"
import { Button, Select } from '@chakra-ui/react'
import AddCar from './AddCar';
import Style from "./Marketplace.module.css"

const Marketplace = () => {
    let [items, setItems] = React.useState([]);
    let [dealerID, setdealerID] = React.useState(localStorage.getItem("id") || "")
    React.useEffect(() => {
        handleFetch();
    }, [])
    const handleFetch = async () => {
        const res = await fetch("https://buy-car.onrender.com/marketplace");
        let data = await res.json();
        console.log(data)
        setItems(data.marketplaces);
    }
    console.log(items);
    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete(`https://buy-car.onrender.com/marketplace/delete/${id}`);
        handleFetch();
    }
    return (
        <>
            <div className={Style.main}>
                {items?.map((el) => (
                    <div key={el._id} className={Style.box}>
                        <div><img src={el.imageURL} alt="" /></div>
                        <div className={Style.subBox}><div>
                            <p>Title:-{el.title}</p>
                            <p>KMs on Odometer:-{el.KMs_on_Odometer}</p>
                            <p>Major Scratches:-{el.major_Scratches}</p>
                            <p>Number of accidents:-{el.Number_of_accidents}</p>
                            <p>Original Color:-{el.original_Paint}</p>
                            <p>Number of previous buyers:-{el.Number_of_previous_buyers}</p>
                            <p>Registration Place:-{el.registration_Place}</p>
                        </div>
                        <div>
                            <h3>OEM Specs</h3>
                            <MarketOEM idVal={el.OEM_Spec_ID} />
                        </div></div>
                        
                        <div><div>
                        {dealerID == el.dealer_ID ? (
                                <div className={Style.button}>
                                    <Button onClick={() => handleDelete(el._id)}>DELETE</Button>
                                    <AddCar idAdd={el.OEM_Spec_ID} type={"patch"} idMar={el._id} handleFetch={handleFetch}></AddCar>
                                </div>
                            ) : (null)}
                        </div></div>
                    </div>
                ))}</div>
        </>

    )
}

export default Marketplace