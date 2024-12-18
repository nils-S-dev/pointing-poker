import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string;
}

export default {
    h2: ({ className, children }: Props) => (
        <h2 className={ `text-3xl ${ className }` }>{ children }</h2>
    ),
    h3: ({ className, children }: Props) => (
        <h3 className={ `text-2xl ${ className }` }>{ children }</h3>
    )
}