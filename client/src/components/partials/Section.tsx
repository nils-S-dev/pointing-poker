import { UIComponentProps } from "../../types/UIComponent";

function Section({ children, className }: UIComponentProps) {
    return (
        <section className={ `w-full flex flex-col items-start ${ className }` }>
            { children }
        </section>
    )
}

export default Section