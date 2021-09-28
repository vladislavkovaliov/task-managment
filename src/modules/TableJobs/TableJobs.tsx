import { Icon } from "../../components";
import React, { useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Status } from "../types";
import { useStore } from '../../hooks/useStore';
import { observer, useLocalStore } from 'mobx-react';
import { TableJobsStore } from './TableJobsStore';

export const TableHeadTitle: Record<string, string> = {
    status: "Status",
    jobId: "Job ID",
    startedAt: "Started At",
    username: "Username",
    version: "Version",
    app: "Application",
    duration: "Duration",
    apiType: "Api Type",
};

export function TableJobsComponent() {
    let history = useHistory();
    const jobsStore = useStore("JobsStore")
    const tableJobsStore = useLocalStore(() => new TableJobsStore(jobsStore))

    useEffect(() => {
        return () => {
            tableJobsStore.dispose();
        }
    }, [tableJobsStore]);

    const handleOpenJob = useCallback(
        (jobId: string) => () => {
            history.push(`/jobs/${jobId}`);
        },
        [history]
    );

    return (
        <table className="table w-full">
            <thead>
                <tr>
                    {Object.keys(tableJobsStore.nonSortedJobs[0] ?? {}).map((key) => {
                        return (
                            <th
                                key={key}
                                className="bg-blue-100 border text-left py-2"
                            >
                                {TableHeadTitle[key]}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {tableJobsStore.nonSortedJobs.map((item) => {
                    const keys = Object.values(item);

                    return (
                        <tr
                            className="cursor-pointer group"
                            key={item.startedAt + item.username}
                            onClick={handleOpenJob(item.jobId)}
                        >
                            {keys.map((value, index) => {
                                if (index === 0) {
                                    let content = null;

                                    switch (value) {
                                        case Status.Success: {
                                            content = <Icon icon="success" />;
                                            break;
                                        }
                                        case Status.InProgress: {
                                            content = (
                                                <Icon
                                                    icon="progress"
                                                    animate="spin"
                                                />
                                            );
                                            break;
                                        }
                                        case Status.Failed: {
                                            content = <Icon icon="fail" />;
                                            break;
                                        }
                                    }
                                    return (
                                        <td key={value}>
                                            <div className="flex justify-center">
                                                {content}
                                            </div>
                                        </td>
                                    );
                                }

                                return (
                                    <td
                                        key={value}
                                        className="group-hover:bg-indigo-200 py-2"
                                    >
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export const TableJobs = observer(TableJobsComponent);
