import { FormEvent } from 'react';

export interface InputProps {
    onInput: (e: FormEvent<HTMLInputElement>) => void;
}

export function Input({ onInput }: InputProps) {
    return (
        <input
            onInput={onInput}
            className="w-full h-10 mx-1 px-1 focus:outline-none"
            placeholder="search job..."
        />
    );
}
