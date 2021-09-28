import { observer } from "mobx-react";

import { Container } from "../../components";
import { TableJobs } from "../../modules";

export function Dashboard() {
    return (
        <>
            <Container>
                <TableJobs />
            </Container>
        </>
    );
}

export const DashboardScreen = observer(Dashboard);
