import { create } from 'zustand';
import {persist} from  "zustand/middleware"


interface UserState {
    authToken: string;
    setAuthToken: (token: string) => void;
}

export const useUserStore = create<UserState>()(persist(
    (set) => ({
        authToken: "",
        setAuthToken: (token: string) => {
            set({authToken: token})
        }
    })
,{
    name: "useUserStore"
}));