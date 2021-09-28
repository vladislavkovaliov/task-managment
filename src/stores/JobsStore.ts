import { action, computed, makeObservable, observable, ObservableMap, when } from 'mobx';
import { IncomingTypes } from '../transport/transport';
import { Transport } from '../transport';
import { JobMapper } from './Mappers/JobMapper';

export interface MessageJobsPayload {
  id: number | string;
}

export class JobsStore {
  private readonly transport: Transport;
  public rawJobs: ObservableMap<string, MessageJobsPayload> = observable.map();
  public isLoading: boolean = true;

  constructor(transport: Transport) {
    this.transport = transport;

    makeObservable(this, {
      isLoading: observable,
      rawJobs: observable,
      jobs: computed,
      updateJob: action,
      setRawJobs: action,
    })

    when(() => Boolean(this.rawJobs.size), () => {
      this.isLoading =  false;
    });

    this.start();
  }

  public start(): void {
    this.transport.onValue<MessageJobsPayload>(IncomingTypes.updateJob, this.updateJob);
    this.transport.onValue<MessageJobsPayload>(IncomingTypes.createJob, this.createJob);
  }

  public get jobs() {
    return new Map(Array.from(this.rawJobs)
      .map(([jobId, raw]) => [jobId, JobMapper.toJob(raw)]));
  }

  public updateJob = (data: MessageJobsPayload): void => {
    this.rawJobs.set(`${data.id}`, data);
  };

  public createJob = (data: MessageJobsPayload): void => {
    if (!this.rawJobs.has(`${data.id}`)) {
      this.rawJobs.set(`${data.id}`, data);
    }
  }

  public setRawJobs = (rawJobs: MessageJobsPayload[]): void => {
    Array.from(rawJobs.values()).forEach(j => {
      this.rawJobs.set(`${j.id}`, j);
    });
  };

  public dispose(): void {
    this.rawJobs.clear();
  }
}