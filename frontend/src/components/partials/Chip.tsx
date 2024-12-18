import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string
}

function Chip({ children, className }: Props) {
    return (
        <span className={ `text-sm py-1 px-3 rounded-full ${ className }` }>{ children }</span>
    )
}

export default {
    default: ({ children, className }: Props) => (
        <Chip className={ `bg-steel-400 ${ className }` }>{ children }</Chip>
    ),
    highlight: ({ children, className }: Props) => (
        <Chip className={ `bg-sky-400 ${ className }` }>{ children }</Chip>
    ),
}