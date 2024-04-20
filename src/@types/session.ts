import { event } from "./events"

export enum ReplayTypes {
    error = "error",
    whole_session = "whole_session"
}

export interface SessionReplay {
    id: number,
    sessionId: string,
    projectId?: number,
    events?: Array<event>
    started_at: string,
    ended_at: string,
    metadata?: {
        username: string,
        user_identifier: string,
        error?: string
    },
    type: ReplayTypes
}