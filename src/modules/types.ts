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
    status: number;
    username: string;
    version: string;
    app: string;
    duration: string;
    apiType: string;
    jobId: number | string;
}

export enum Status {
    Success = 0,
    InProgress = 1,
    Failed = 2,
}
