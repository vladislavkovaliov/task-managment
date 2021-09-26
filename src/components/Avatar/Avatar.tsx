export interface AvatarProps {
    src: string;
}

export function Avatar({ src }: AvatarProps) {
    return (
        <img
            className="rounded-full h-16 w-16 flex items-center justify-center"
            src={src}
            alt="avatar"
        />
    );
}
