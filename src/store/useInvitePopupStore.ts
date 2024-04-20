import { create } from 'zustand';

interface InviteUserPopupState {
    show: boolean;
    setShow: (flag: boolean) => void;
}

export const useInvitePopupStore = create<InviteUserPopupState>((set) => ({
    show: false,
    setShow: (flag) => {
        set({show: flag})
    },
}));