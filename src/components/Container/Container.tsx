import React from "react";

export interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return <div className="container max-w-full">{children}</div>;
}
