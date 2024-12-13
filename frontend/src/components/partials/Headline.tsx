import { PropsWithChildren } from "react";

function Headline(props: PropsWithChildren) {
    return (
        <h2 className="text-3xl mb-5">{ props.children }</h2>
    )
}

export default Headline