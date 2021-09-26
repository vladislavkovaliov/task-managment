export interface Job {
    jobId: string;
    startedAt: string;
    username: string;
    version: string;
    app: string;
    duration: string;
    apiType: string;
}

export interface Process {
    processId: string;
    startedAt: string;
    username: string;
    version: string;
    app: string;
    duration: string;
    apiType: string;
}

export enum Status {
    Success = 0,
    InProgress = 1,
    Failed = 2,
}
