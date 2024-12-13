import { MouseEventHandler, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button(props: Props) {
    return (
        <button className="py-2 px-5 text-lg rounded-xl bg-sky mt-3 transition-colors hover:bg-sky-300 active:bg-sky-800" onClick={ props.onClick }>{ props.children }</button>
    )
}

export default Button