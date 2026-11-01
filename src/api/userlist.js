import axiosInstance from "./axiosInstance"

export const getuser = async () => {
    const response = await axiosInstance.get("/users")
    return response.data
}

export const getUsersbyid = async (id) => {
    const response = await axiosInstance.get(`/users/${id}`) // slash fix kiya
    return response.data
}