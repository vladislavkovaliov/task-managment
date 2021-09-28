import { Transport } from '../transport';
import { IncomingTypes } from '../transport/transport';
import { action, computed, makeObservable, observable, ObservableMap, when } from 'mobx';
import { Process } from '../modules/types';
import { ProcessMapper } from './Mappers/ProcessMapper';

export interface MessageProcessPayload {
  app: string;
  api_type: string;
  job_id: number;
  started_at: string;
  version: string;
  duration: string;
  id: string;
  username: string;
}

export class ProcessesStore {
  private readonly transport: Transport;
  public rawProcesses: ObservableMap<string, MessageProcessPayload> = observable.map();
  public isLoading: boolean = true;

  constructor(transport: any) {
    makeObservable(this, {
      processes: computed,
      rawProcesses: observable,
      isLoading: observable,
      updateProcess: action,
      setRawProcesses: action,
    });

    this.transport = transport;

    this.start();

    when(() => Boolean(this.rawProcesses.size), () => {
      this.isLoading = false;
    })
  }

  private start(): void {
    this.transport.onValue<MessageProcessPayload>(IncomingTypes.updateProcess, this.updateProcess);
    this.transport.onValue<MessageProcessPayload>(IncomingTypes.createProcess, this.createProcess);
  }

  public updateProcess = (data: MessageProcessPayload): void => {
      this.rawProcesses.set(`${data.job_id}/${data.app}`, data);
  };

  public createProcess = (data: MessageProcessPayload): void => {
    if (!this.rawProcesses.has(`${data.job_id}/${data.app}`)) {
      this.rawProcesses.set(`${data.job_id}/${data.app}`, data);
    }
  };

  public setRawProcesses = (rawProcesses: MessageProcessPayload[]) => {
    Array.from(rawProcesses.values()).forEach(p => {
      this.rawProcesses.set(`${p.id}/${p.job_id}/${p.app}`, p);
    })
  };

  public get processes(): Map<string, Process> {
    return new Map(Array.from(this.rawProcesses)
      .map(([processName, raw]) => [processName, ProcessMapper.toProcess(raw)]));
  }

  public dispose(): void {
    this.rawProcesses.clear();
  }
}