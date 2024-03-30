export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export enum urlTypes {
    auth = "auth",
}

export const urlProvider: {
    [key in urlTypes]: string
} = {
    [urlTypes.auth]: `${BASE_URL}/auth`
}