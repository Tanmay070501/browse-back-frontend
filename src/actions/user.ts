import { User } from "@/@types/user"
import { customAxios } from "@/axios/customAxios"
import { useUserStore } from "@/store/useUserStore"
import { errorToast } from "@/toast/toast"
import { urlProvider } from "@/urls/urlProvider"
import axios from "axios"
import { toast } from "sonner"

export const getUserDetails = async () => {
    const setUser = useUserStore.getState().setUser
    try{
        const res = await customAxios.get<User>(`${urlProvider.user}`)
        if(res.data){
            setUser(res.data)
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}

export const inviteUser = async (email: string) => {
    try{
        await customAxios.post(`${urlProvider.user}/invite`, {
            email
        })
        toast.success("Invitation Sent Successfully");
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}

export const removeUser = async (userId: number) => {
    try{
        await customAxios.delete(`${urlProvider.user}/${userId}`);
        toast.success("User Deleted Successfully");
        await getUserDetails()
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}