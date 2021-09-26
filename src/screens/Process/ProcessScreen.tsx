import { Container } from "../../components";
import { Search, TableProcess } from "../../modules";

export function ProcessScreen() {
    return (
        <>
            <Container>
                <Search />
            </Container>
            <Container>
                <TableProcess />
            </Container>
        </>
    );
}
