import { Icon, Input } from "../../components";

export function Search() {
    return (
        <div className="flex border w-2/6 py-2 px-2">
            <div className="self-center">
                <Icon icon="search" />
            </div>
            <Input />
        </div>
    );
}
