import { LogoutButton, Avatar, Container } from "../../components";
import React from "react";

export function Header() {
    return (
        <Container>
            <div className="flex h-18 space-x-4 bg-indigo-500 py-2">
                <div className="flex flex-grow" />
                <div>
                    <Avatar src="https://i.pravatar.cc/150" />
                </div>
                <div className="flex px-2">
                    <LogoutButton />
                </div>
            </div>
        </Container>
    );
}
