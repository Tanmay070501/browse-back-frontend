import { SessionReplay } from "@/@types/session"
import { customAxios } from "@/axios/customAxios"
import { useSessionStore } from "@/store/useSesstionStore"
import { errorToast } from "@/toast/toast"
import { urlProvider } from "@/urls/urlProvider"
import axios from "axios"

export const getSessionReplays = async (projectId: number) => {
    if(!projectId) return
    const setSessionReplays = useSessionStore.getState().setSessionReplays
    try{
        const res = await customAxios.get<{sessions: Array<SessionReplay>}>(`${urlProvider.session}/${projectId}`)
        if(res.data?.sessions){
            setSessionReplays(res.data?.sessions)
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}

export const getSingleSession = async (sessionId: string) => {
    if(!sessionId) return
    const setCurrentSessionReplay = useSessionStore.getState().setCurrentSessionReplay
    try{
        const res = await customAxios.get<SessionReplay>(`${urlProvider.session}/single_session/${sessionId}`)
        if(res.data){
            setCurrentSessionReplay(res.data)
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}