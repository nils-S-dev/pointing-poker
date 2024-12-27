import { MouseEventHandler, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default {
    default(props: Props) {
        return (
            <button className="py-2 px-5 text-lg rounded-xl bg-sky mt-3 transition-colors hover:bg-sky-300 active:bg-sky-800" onClick={ props.onClick }>{ props.children }</button>
        )
    },
    subtle(props: Props) {
        return (
            <button className="py-2 px-5 text-lg rounded-xl bg-steel-500 border-steel-400 border transition-all hover:bg-steel-400 active:bg-steel-700" onClick={ props.onClick }>{ props.children }</button>
        )
    }
}