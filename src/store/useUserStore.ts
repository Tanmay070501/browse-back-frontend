import { User } from '@/@types/user';
import { create } from 'zustand';
import {persist} from  "zustand/middleware"


interface UserState {
    authToken: string;
    user: User | null
    setAuthToken: (token: string) => void;
    setUser: (data: User) => void;
    logout: () => void
}

export const initialUserState = {
    authToken: "",
    user: null,
}

export const useUserStore = create<UserState>()(persist(
    (set) => ({
        ...initialUserState,
        setAuthToken: (token: string) => {
            set({authToken: token})
        },
        setUser: (data: User) => {
            set({user: data})
        },
        logout: () => {
            set({...initialUserState})
        }
    })
,{
    name: "useUserStore"
}));