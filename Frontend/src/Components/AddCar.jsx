import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Select,
    Radio, RadioGroup, Stack
} from '@chakra-ui/react'
import axios from 'axios';

const AddCar = ({ idAdd, type,idMar,handleFetch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDeal, setidDeal] = React.useState(localStorage.getItem("id"));
    const [color,setColor]=React.useState();
    const [value, setValue] = React.useState({
        imageURL: "",
        title: "",
        desc: [],
        KMs_on_Odometer: 0,
        major_Scratches: "",
        original_Paint: "",
        Number_of_accidents: 0,
        Number_of_previous_buyers: 0,
        registration_Place: "",
        OEM_Spec_ID: idAdd,
        dealer_ID: idDeal
    })
    React.useEffect(() => {
        (async () => {
            const res = await fetch(`https://buy-car.onrender.com/OEM_Specs/find/${idAdd}`);
            let data = await res.json();
            setColor(data.POST[0]?.availableColor);
        })();
        (async () => {
            const res = await fetch(`https://buy-car.onrender.com/marketplace/find/${idMar}`);
            let data = await res.json();
            console.log(data);
            setValue(data.POST[0]);
        })();
    }, [])
    const handleChange = (e) => {
        let name = e.target.name;
        let values = e.target.value;
        setValue({
            ...value,
            [name]: values
        });
    }
    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        type==="post"?(await fetch("https://buy-car.onrender.com/marketplace/add", {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                "Content-type": "application/json"
            }
        })):(await axios.patch(`https://buy-car.onrender.com/marketplace/update/${idMar}`,value),handleFetch()
        )
        alert("Details are recorded");
    }
    console.log(value)
    return (
        <div>
            <Button onClick={onOpen}>{type==="post"?"Add Car":"Edit Product"}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmitLogin}>
                            <p style={{ fontSize: "1.3rem" }}>Title</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='title' value={value.title} placeholder="Title" />
                            <p style={{ fontSize: "1.3rem" }}>Image URL</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='imageURL' value={value.imageURL} placeholder="Image URL" />
                            <p style={{ fontSize: "1.3rem" }}>KMs on Odometer</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='KMs_on_Odometer' value={value.KMs_on_Odometer} placeholder="KMs_on_Odometer" />
                            <p style={{ fontSize: "1.3rem" }}>Major Scratches</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='major_Scratches' value={value.major_Scratches} placeholder="Major Scratches" />
                            <p style={{ fontSize: "1.3rem" }}>Original Paint</p>
                            <Select onChange={handleChange} name='original_Paint' value={value.original_Paint}>
                                {color?.map((el) => (
                                    <option value={el} key={el}>{el}</option>
                                ))}
                            </Select>
                            <p style={{ fontSize: "1.3rem" }}>Number of accidents</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='Number_of_accidents' value={value.Number_of_accidents} placeholder="Number of accidents" />
                            <p style={{ fontSize: "1.3rem" }}>Number of previous buyers</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="number" name='Number_of_previous_buyers' value={value.Number_of_previous_buyers} placeholder="Number of previous buyers" />
                            <p style={{ fontSize: "1.3rem" }}>Registration Place</p>
                            <Input style={{ fontSize: "1.3rem" }} onChange={handleChange} type="text" name='registration_Place' value={value.registration_Place} placeholder="Registration Place" />
                            <br />
                            <Input style={{ fontSize: "1.3rem", cursor: "pointer" }} type='submit' />
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></div>
    )
}

export default AddCar