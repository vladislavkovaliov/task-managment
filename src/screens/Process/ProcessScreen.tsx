import { observer } from "mobx-react";

import { Container } from "../../components";
import { TableProcess } from "../../modules";

export function Process() {
    return (
        <>
            <Container>
                <TableProcess />
            </Container>
        </>
    );
}

export const ProcessScreen = observer(Process);
