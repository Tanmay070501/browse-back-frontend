export enum ProjectFormDataKeys {
    projectName = "projectName",
}

export type ProjectFormData = {
    projectName: string,
}

export const projectInitialVals: ProjectFormData = {
    projectName: "",
}