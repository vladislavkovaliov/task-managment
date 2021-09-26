import { Icon } from "../../components";
import React from "react";
import { Process, Status } from "../types";

const defaultData = [
    {
        status: 0,
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        processId: "123456",
        username: "Vlad Kovaliov",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 1,
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        processId: "123456",
        username: "Vlad Kovaliov2",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 0,
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        processId: "123456",
        username: "Vlad Kovaliov3",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
    {
        status: 2,
        startedAt: new Date(2021, 1, 1, 5, 35, 59).toString(),
        processId: "123456",
        username: "Vlad Kovaliov4",
        version: "1.0.0",
        app: "app_name",
        duration: "2m",
        apiType: "python",
    },
];

export interface TableProps {
    data?: Array<Process>;
}

export const TableHeadTitle: Record<string, string> = {
    status: "Status",
    startedAt: "Started At",
    processId: "Process Id",
    username: "Username",
    version: "Version",
    app: "Application",
    duration: "Duration",
    apiType: "Api Type",
};

export function TableProcess({ data = defaultData }: TableProps) {
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
                        <tr key={item.startedAt + item.username}>
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
                                    <td key={value} className="py-2">
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
