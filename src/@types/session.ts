export enum ReplayTypes {
    error = "error",
    whole_session = "whole_session"
}

export interface SessionReplay {
    id: number,
    sessionId: string,
    projectId?: number,
    events?: Array<any>
    started_at: string,
    ended_at: string,
    metadata: any,
    type: ReplayTypes
}