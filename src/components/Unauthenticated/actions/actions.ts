import { TokenType } from "@/constants/auth"
import { LoginFormData, SetupOrgData, SignupFormData } from "@/constants/unauth-type"
import { useErrorStore } from "@/store/useErrorStore"
import { useUserStore } from "@/store/useUserStore"
import { BASE_URL, urlProvider } from "@/urls/urlProvider"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

export const login = async (formValues: LoginFormData, successCb?: () => void) => {
    const setErrorMessage  = useErrorStore.getState().setErrorMessage
    const setAuthToken = useUserStore.getState().setAuthToken
    setErrorMessage("")
    try{
        const res = await axios.post(`${urlProvider.auth}/login`, {
            ...formValues
        })

        if(successCb){
            successCb()
        }

        if(res?.data?.type === TokenType.LOGIN){
            setAuthToken(res?.data?.token ?? "")
        }

    }catch(err){
        if(axios.isAxiosError(err)){
            setErrorMessage(err.response?.data?.message ?? "Something went wrong!")      
        }      
    }
}

export const signup = async (formValues: SignupFormData, successCb?: () => void) => {
    const setErrorMessage  = useErrorStore.getState().setErrorMessage
    try{
        const res = await axios.post(`${urlProvider.auth}/signup`, {
            ...formValues
        })
        if(res.data?.message){
            toast(res.data?.message)
        }

        if(successCb){
            successCb()
        }
        
    }catch(err){
        if(axios.isAxiosError(err)){
            setErrorMessage(err.response?.data?.message ?? "Something went wrong!")      
        }
    }
}

export const setupOrg = async (formValues: SetupOrgData, successCb?: () => void) => {
    const setErrorMessage  = useErrorStore.getState().setErrorMessage
    const setAuthToken = useUserStore.getState().setAuthToken
    try{
        const res = await axios.post(`${urlProvider.auth}/setup_org`, {
            ...formValues
        })
        if(res.data?.message){
            toast(res.data?.message)
        }

        if(res?.data?.type === TokenType.LOGIN){
            setAuthToken(res?.data?.token ?? "")
        }

        if(successCb){
            successCb()
        }
        
    }catch(err){
        if(axios.isAxiosError(err)){
            setErrorMessage(err.response?.data?.message ?? "Something went wrong!")      
        }
    }
}