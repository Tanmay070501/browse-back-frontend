export interface SingleUser {
    "user_id": number,
    "name": string,
    "email": string,
    "isAdmin": boolean,
    "orgId": number,
    "created_at": string,
    "emailVerified": boolean,
}
export interface User extends SingleUser {
    "org": {
        "id": number,
        "name": string,
        "users": Array<SingleUser>
    }
}