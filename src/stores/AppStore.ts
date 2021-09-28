export class AppStore {
  private transport: any;

  constructor(transport: any) {
    this.transport = transport;
    console.log("AppStore()");
  }

  public dispose(): void {}
}