import { ProcessesStore } from '../../stores';
import { computed, makeObservable, observable, ObservableMap } from 'mobx';
import { Process } from '../types';
import { isEqual } from 'lodash';

export class TableProcessStore {
  private readonly processesStore: ProcessesStore;
  private readonly jobId: number;
  public rawProcesses: ObservableMap<string, any> = observable.map();

  constructor(processesStore: ProcessesStore, jobId: number) {
    makeObservable(this, {
      rawProcesses: observable,
      isLoading: computed,
      nonSortedProcesses: computed,
    });

    this.processesStore = processesStore;
    this.jobId = jobId;

    this.subscribe();
    this.getAllProcess();
  }

  public getAllProcess = async () => {
    const res = await fetch(`/${this.jobId}/processes`);
    const json = await res.json();
    this.processesStore.setRawProcesses(json);
  };

  public get nonSortedProcesses(): Process[] {
    if (this.processesStore.isLoading) {
      return [];
    }
    return Array.from(this.processesStore.processes.values())
      .filter(({jobId}) => isEqual(jobId, this.jobId));
  }

  public get isLoading(): boolean {
    return this.processesStore.isLoading;
  }

  private subscribe = () => {}

  public dispose = () => {
    this.processesStore.dispose();
  }
}
