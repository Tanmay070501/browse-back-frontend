import { Project } from "@/@types/project"
import { User } from "@/@types/user"
import { customAxios } from "@/axios/customAxios"
import { ProjectFormData } from "@/constants/project"
import { useProjectStore } from "@/store/useProjectStore"
import { useUserStore } from "@/store/useUserStore"
import { errorToast } from "@/toast/toast"
import { urlProvider } from "@/urls/urlProvider"
import axios from "axios"
import { toast } from "sonner"

export const getProjects = async () => {
    // const setUser = useUserStore.getState().setUser
    const setProjectsList = useProjectStore.getState().setProjectsList
    const setCurrentProject = useProjectStore.getState().setCurrentProject
    const currentProject = useProjectStore.getState().currentProject
    try{
        const res = await customAxios.get<{projects: Array<Project>}>(`${urlProvider.project}`)
        if(res.data?.projects){
            const projects = res.data.projects
            setProjectsList(projects)
            if(projects.length > 0 && !Object.keys(currentProject ?? {}).length){
                setCurrentProject(projects[0])
            }
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}

export const createProject = async (data: ProjectFormData) => {
    console.log("hi")
    // const setUser = useUserStore.getState().setUser
    const setCurrentProject = useProjectStore.getState().setCurrentProject

    try{
        const res = await customAxios.post(`${urlProvider.project}`, data)
        if(res.data?.message){
            toast(res.data.message)
        }
        await getProjects()
        if(res?.data?.project){
            setCurrentProject(res.data.project)
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            errorToast(err.response?.data?.message ?? "Something went wrong!",)
        }
    }
}