import { User } from "@/@types/user"
import { customAxios } from "@/axios/customAxios"
import { useUserStore } from "@/store/useUserStore"
import { errorToast } from "@/toast/toast"
import { urlProvider } from "@/urls/urlProvider"
import axios from "axios"

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