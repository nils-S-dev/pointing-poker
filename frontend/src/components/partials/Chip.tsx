import { UIComponentProps } from "../../types/UIComponent";

function Chip({ children, className }: UIComponentProps) {
    return (
        <span className={ `text-sm py-1 px-3 rounded-full ${ className }` }>{ children }</span>
    )
}

export default {
    default: ({ children, className }: UIComponentProps) => (
        <Chip className={ `bg-steel-400 ${ className }` }>{ children }</Chip>
    ),
    highlight: ({ children, className }: UIComponentProps) => (
        <Chip className={ `bg-sky-400 ${ className }` }>{ children }</Chip>
    ),
}