import { Job } from '../../modules/types';

export class JobMapper {
  public static toJob(rawJob: any): Job {
    return {
      jobId: rawJob["id"],
      startedAt: rawJob["started_at"],
      username: rawJob["username"],
      apiType: rawJob["api_type"],
      app: rawJob["app"],
      version: rawJob["version"],
      duration: rawJob["duration"],
    };
  }
}