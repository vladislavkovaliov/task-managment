import { JobsStore } from '../../stores';
import { computed, makeObservable } from 'mobx';
import { Job } from '../types';

export class TableJobsStore {
  public jobsStore: JobsStore

  constructor(jobsStore: JobsStore) {
    makeObservable(this, {
      isLoading: computed,
      nonSortedJobs: computed,
    });

    this.jobsStore = jobsStore;

    this.getAllJobs();
  }

  public get nonSortedJobs(): Job[] {
    if (this.jobsStore.isLoading) {
      return [];
    }

    return Array.from(this.jobsStore.jobs.values());
  }

  public get isLoading(): boolean {
    return this.jobsStore.isLoading;
  }

  public getAllJobs = async () => {
    const res = await fetch(`/jobs`);
    const json = await res.json();
    this.jobsStore.setRawJobs(json);
  };


  public dispose = () => {};
}