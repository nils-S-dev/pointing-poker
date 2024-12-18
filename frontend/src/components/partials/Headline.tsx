import { UIComponentProps } from "../../types/UIComponent";

export default {
    h2: ({ className, children }: UIComponentProps) => (
        <h2 className={ `text-3xl ${ className }` }>{ children }</h2>
    ),
    h3: ({ className, children }: UIComponentProps) => (
        <h3 className={ `text-2xl ${ className }` }>{ children }</h3>
    )
}