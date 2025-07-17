import axios from "axios";
import Swal from "sweetalert2";


export const CreateInventory = async (data) => {
    try {
        let url = `http://localhost:8000/api/inventories`

        axios.post(url, data)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "Successfully Created!",
                    icon: "success"
                })
                return data
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Server Error.",
                    icon: "error"
                })

            })
    } catch (error) {
        console.log(error)
    }
}

export const GetOneItem = async (id) => {
    try {
        const url = `http://localhost:8000/api/inventories/${id}`
        const res = await axios.get(url)
        return res.data.content
    } catch (error) {
        console.log(error)
    }
}


export const GetAllInventory = async () => {
    try {
        const url = 'http://localhost:8000/api/inventories'
        const res = await axios.get(url)

        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteItem = async (id) => {
    try {
        const url = `http://localhost:8000/api/inventories/${id}`
        await axios.delete(url)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "Successfully Deleted!",
                    icon: "success"
                })
            })
            .catch((error) => {
                console.log(`Error deleting. ${error}`)
            })
    } catch (error) {
        console.log(error)
    }
}

export const EditItem = async (id, data) => {
    try {
        const url = `http://localhost:8000/api/inventories/${id}`
        await axios.put(url, data)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "Successfully Edited!",
                    icon: "success"
                })
            })
            .catch((error) => {
                console.log(error)
            })
    } catch (error) {

    }
}