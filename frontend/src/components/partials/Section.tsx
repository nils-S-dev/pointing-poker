import { PropsWithChildren } from "react";

function Section({ children }: PropsWithChildren) {
    return (
        <section className="w-full flex flex-col items-start">
            { children }
        </section>
    )
}

export default Section