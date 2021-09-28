import { Process } from '../../modules/types';

export class ProcessMapper {
  public static toProcess(rawProcess: any): Process {
    return {
      processId: rawProcess["id"],
      app: rawProcess["app"],
      apiType: rawProcess["api_type"],
      status: Number(rawProcess["status"]),
      duration: rawProcess["duration"],
      startedAt: rawProcess["started_at"],
      username: rawProcess["username"],
      version: rawProcess["version"],
      jobId: rawProcess["job_id"],
    };
  }
}