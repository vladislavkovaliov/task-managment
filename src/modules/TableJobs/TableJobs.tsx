import { Icon } from "../../components";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Job, Status } from "../types";

const defaultData = [
    {
        status: 0,
        jobId: "1",
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        username: "Vlad Kovaliov",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 1,
        jobId: "2",
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        username: "Vlad Kovaliov1",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 0,
        jobId: "3",
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        username: "Vlad Kovaliov3",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 2,
        jobId: "4",
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        username: "Vlad Kovaliov4",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
];

export interface TableProps {
    data?: Array<Job>;
}

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

export function TableJobs({ data = defaultData }: TableProps) {
    let history = useHistory();

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
                    {Object.keys(data[0]).map((key) => {
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
                {data.map((item) => {
                    const keys = Object.values(item);

                    return (
                        <tr
                            className="cursor-pointer group"
                            key={item.startedAt + item.username}
                            onClick={handleOpenJob(item.jobId)}
                        >
                            {keys.map((value, index) => {
                                if (index === 0) {
                                    switch (value) {
                                        case Status.Success: {
                                            return (
                                                <td key={value}>
                                                    <div className="flex justify-center">
                                                        <Icon icon="success" />
                                                    </div>
                                                </td>
                                            );
                                        }
                                        case Status.InProgress: {
                                            return (
                                                <td key={value}>
                                                    <div className="flex justify-center">
                                                        <Icon
                                                            icon="progress"
                                                            animate="spin"
                                                        />
                                                    </div>
                                                </td>
                                            );
                                        }
                                        case Status.Failed: {
                                            return (
                                                <td key={value}>
                                                    <div className="flex justify-center">
                                                        <Icon icon="fail" />
                                                    </div>
                                                </td>
                                            );
                                        }
                                    }
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
