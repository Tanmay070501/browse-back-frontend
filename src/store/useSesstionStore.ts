import { SessionReplay } from '@/@types/session';
import { create } from 'zustand';

interface SessionReplaysStore {
    sessionReplays: SessionReplay[] | null;
    currentSessionReplay: SessionReplay | null
    setSessionReplays: (data: SessionReplay[]) => void;
    setCurrentSessionReplay: (data: SessionReplay) => void;
}

export const useSessionStore = create<SessionReplaysStore>((set) => ({
    sessionReplays: null,
    currentSessionReplay: null,
    setSessionReplays: (data: SessionReplay[]) => {
        set({sessionReplays: data})
    },
    setCurrentSessionReplay: (data: SessionReplay) => {
        set({currentSessionReplay: data})
    },
}));