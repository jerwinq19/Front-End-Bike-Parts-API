import Swal from "sweetalert2";
import Button from "../components/button";
import Table from "../components/table";
import { CreateInventory, GetAllInventory, DeleteItem, GetOneItem, EditItem } from "../services/bikeService";
import { useState, useEffect } from "react";

const Home = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [editID, setEditID] = useState(null)
    const [data, setDatas] = useState([])
    const [isEdit, setEdit] = useState(false)

    const fetcAllData = async () => {
        const response = await GetAllInventory()
        setDatas(response.content)
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            if (!name || !price || !quantity) {
                Swal.fire({
                    title: "Empty Inputs!",
                    text: "Please fill up the inputs!",
                    icon: "warning"
                })
            }
            const newData = {
                name: name,
                price: price,
                quantity: quantity
            }

            await CreateInventory(newData)
            fetcAllData()

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await DeleteItem(id)
            fetcAllData()
            if (!res) return console.log('error')
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (id) => {
        try {
            setEdit(true) // triggers the edit button

            const tite = await GetOneItem(id)

            // set edited items
            setName(tite.name)
            setPrice(tite.price)
            setQuantity(tite.quantity)
            setEditID(id)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async (id) => {
        try {
            const newData = {
                name,
                price,
                quantity
            };

            await EditItem(id, newData);

            setName("")
            setPrice("")
            setQuantity("")
            setEdit(false);
            setEditID(null)
            fetcAllData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelEdit = () => {
        setName("")
        setPrice("")
        setQuantity("")
        setEdit(false);
        setEditID(null)
        fetcAllData();
    }

    useEffect(() => {
        fetcAllData()
    }, [])

    return (
        <div>
            <form onSubmit={isEdit ? (e) => e.preventDefault() : handleCreate}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name here.."
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="price here.."
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="quantity here.."
                />

                <Button type={isEdit ? null : "submit"} text={isEdit ? "Submit Edit" : "Submit"} onClick={isEdit ? () => handleSave(editID) : null} />
            </form>


            <Table headings={['id', 'name', ' price', 'quantity']} datas={data} onDelete={handleDelete} onEdit={isEdit ? handleCancelEdit : handleEdit} onEditText={isEdit ? "Cancel Edit" : "Edit"} />
        </div>
    );
}


export default Home;