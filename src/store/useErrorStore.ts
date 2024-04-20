import { create } from 'zustand';

interface ErrorState {
    message: string;
    setErrorMessage: (message: string) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    message: "",
    setErrorMessage: (message) => {
        set({message})
    },
}));