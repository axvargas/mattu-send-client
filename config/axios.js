import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${process.env.backendURL}/api`
})

export default axiosClient