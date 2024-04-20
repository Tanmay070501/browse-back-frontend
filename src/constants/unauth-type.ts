export enum LoginFormDataKeys {
    email = "email",
    password = "password"
}

export type LoginFormData = {
    email: string,
    password: string
}

export const loginInitialVals: LoginFormData = {
    email: "",
    password: ""
}

export enum SignupFormDataKeys {
    email = "email",
    password = "password"
}

export type SignupFormData = {
    email: string,
    password: string
}

export const signupInitialVals: SignupFormData = {
    email: "",
    password: ""
}

export enum SetupOrgDataKeys {
    name = "name",
    orgName = "orgName",
}

export type SetupOrgData = {
    name: string,
    orgName: string,
    token?: string
}

export const setupOrginitialVals: (token: string) => SetupOrgData = (token) => ({
    name: "",
    orgName: "",
    token
})

export enum JoinOrgDataKeys {
    name = "name",
    password = "password",
}

export type JoinOrgData = {
    name: string,
    password: string,
    token?: string
}

export const joinOrginitialVals: (token: string) => JoinOrgData = (token) => ({
    name: "",
    password: "",
    token
})


export enum ForgetPassFormDataKeys {
    email = "email",
}

export type ForgetPassFormData = {
    email: string,
}

export const forgetPassInitialVals: ForgetPassFormData = {
    email: "",
}

export enum ResetPassFormDataKeys {
    password = "password",
}

export type ResetPassFormData = {
    password: string,
    token?: string
}

export const resetPassInitialVals: (token: string) => ResetPassFormData = (token) => ({
    name: "",
    password: "",
    token
})
