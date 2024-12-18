import { EstimationOption } from "../../types/EstimationOption";
import { EstimationProcedure } from "../../types/EstimationProcedure";
import { UIComponentProps } from "../../types/UIComponent";
import Headline from "../partials/Headline";
import Section from "../partials/Section";

type Props = Pick<EstimationProcedure, "options"> & UIComponentProps & {
    onClick: (val: number) => void,
}

function Options({ options, onClick, className }: Props) {
    return (
        <Section>
            <Headline.h3 className="mb-6">Make Estimation</Headline.h3>
            <div className={ `grid gap-3 grid-cols-4 lg:grid-cols-8 md:gap-5 ${ className }` }>
                {
                    options.map((option: EstimationOption) => (
                        <button key={ option.numeric } onClick={ () => onClick(option.numeric) } className="aspect-square rounded-xl text-xl bg-steel-500 border-steel-400 transition-all border shadow-2xl hover:bg-steel-400 hover:scale-105 active:bg-sky-700">{ option.label }</button>
                    ))
                }
            </div>
        </Section>
    )
}

export default Options