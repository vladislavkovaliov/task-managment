
export class Transport {
  private eventSource: EventSource;
  private incomingMessages: any;

  public constructor(url: string = 'http://localhost:5001/process') {
    this.eventSource = new EventSource(url);
    this.eventSource.onmessage = function(e) {
      console.log(e);
    }
  }

  public onConnected() {
  }

  public onDisconnected() {
  }

  public onValue<P>() {
  }

}
