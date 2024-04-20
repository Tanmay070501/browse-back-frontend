export enum unverifiedRouterPaths {
    LOGIN = "/login",
    SIGNUP = "/signup",
    SETUP_ORG = "/setup_org",
    JOIN_ORG = "/join_org",
    FORGET_PASSWORD = "/forget_password",
    UPDATE_PASSWORD = "/update_password"
}

export enum authenticatedRouterPaths {
    DASHBOARD = "dashboard",
    SESSION_REPLAYS = "session_replays",
    SINGLE_SESSION_REPLAY = "session_replays/:sessionId",
    TEAM = "team",
}