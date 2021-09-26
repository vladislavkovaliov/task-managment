import { Container } from "../../components";
import { Search, TableJobs } from "../../modules";

export function DashboardScreen() {
    return (
        <>
            <Container>
                <Search />
            </Container>
            <Container>
                <TableJobs />
            </Container>
        </>
    );
}
