import { Project } from '@/@types/project';
import { create } from 'zustand';
import {persist} from "zustand/middleware"


interface ProjectState {
    currentProject: Project  | null;
    projectsList: Array<Project>;
    setCurrentProject: (data: Project) => void;
    setProjectsList: (data: Array<Project>) => void; 
}

export const useProjectStore = create<ProjectState>()(persist((set) => ({
    currentProject: null,
    projectsList: [],
    setCurrentProject: (data: Project) => {
        set({currentProject: data})
    },
    setProjectsList: (data: Array<Project>) => {
        set({projectsList: data})
    },
}),
{
    name: "projectStore"
}
));