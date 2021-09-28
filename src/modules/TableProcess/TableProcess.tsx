import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';

import { Icon } from "../../components";
import { Status } from "../types";
import { useStore } from '../../hooks/useStore';
import { TableProcessStore } from './TableProcessStore';
import { useParams } from 'react-router-dom';

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

export function TableProcessComponent() {
    const params = useParams<{jobId: string}>();
    const processesStore = useStore("ProcessesStore");
    const tableProcessStore = useLocalStore(() => new TableProcessStore(processesStore, Number(params.jobId)));

    useEffect(() => {
        return () => {
            processesStore.dispose();
        }
    }, [processesStore, tableProcessStore])

    return tableProcessStore.isLoading ? <div>loading</div> : (
        <table className="table w-full">
            <thead>
                <tr>
                    {Object.keys(tableProcessStore.nonSortedProcesses[0] ?? {}).map((key) => {
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
                {tableProcessStore.nonSortedProcesses.map((item) => {
                    const keys = Object.entries(item);
                    return (
                        <tr key={item.startedAt + item.username + item.processId}>
                            {keys.map(([key, value], index) => {
                                if (key === "status") {
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
                                        <td>
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

export const TableProcess = observer(TableProcessComponent);

