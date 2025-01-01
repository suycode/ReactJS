import axios from "axios"

const fetchCategories = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/categories')
        return data
    } catch (error) {
        console.log(error)
    }
}
const createCategory = async (payload) => {
    try {
        const { data } = await axios.post('http://localhost:3000/categories', payload)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const categoryServices = {
    fetchCategories,
    createCategory
}