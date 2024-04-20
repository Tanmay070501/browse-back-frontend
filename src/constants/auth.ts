export enum TokenType {
    ORG_INVITE = "ORG_INVITE",
    SETUP_ORG = "SETUP_ORG",
    LOGIN = "LOGIN"
}


export enum InviteUserFormDataKeys {
    email = "email"
}

export const initialInviteUserValue = {
    email: ""
}