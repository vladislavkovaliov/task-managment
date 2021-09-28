
export const enum IncomingTypes {
  updateProcess = "update_process",
  createProcess = "create_process",
  updateJob = "update_job",
  createJob = "create_job",
}


type Callback<P> = (value: P) => void;

export class Transport {
  private eventSource: EventSource;

  public constructor(url: string = '/stream') {
    this.eventSource = new EventSource("http://localhost:5000/stream");
  }

  public onConnected(): void {
  }

  public onDisconnected(): void {
  }

  public onValue<P>(type: IncomingTypes, callback: Callback<P>): void {
    switch (type) {
      case IncomingTypes.createProcess: {
        this.eventSource.addEventListener(IncomingTypes.createProcess, (e: Event) => {
          const json = JSON.parse((e as MessageEvent).data);
          callback(json);
        });
        break;
      }
      case IncomingTypes.updateProcess: {
        this.eventSource.addEventListener(IncomingTypes.updateProcess, (e: Event) => {
          const json = JSON.parse((e as MessageEvent).data);
          callback(json);
        });
        break;
      }
      case IncomingTypes.updateJob: {
        this.eventSource.addEventListener(IncomingTypes.updateJob, (e: Event) => {
          const json = JSON.parse((e as MessageEvent).data);
          callback(json);
        });
        break;
      }
      default: {
        break
      }
    }
  }
}
