export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export enum urlTypes {
    auth = "auth",
    user = "user",
    project = "project",
    session = "session",
}

export const urlProvider: {
    [key in urlTypes]: string
} = {
    [urlTypes.auth]: `${BASE_URL}/auth`,
    [urlTypes.user]: `${BASE_URL}/user`,
    [urlTypes.project]: `${BASE_URL}/project`,
    [urlTypes.session]: `${BASE_URL}/session`,
}