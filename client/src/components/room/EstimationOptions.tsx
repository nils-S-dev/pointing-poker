import { EstimationOption } from "../../types/EstimationOption";
import { EstimationProcedure } from "../../types/EstimationProcedure";
import { UIComponentProps } from "../../types/UIComponent";
import Headline from "../partials/Headline";
import { Optional } from "../../types/Optional";

type Props = Pick<EstimationProcedure, "options"> & UIComponentProps & {
    onClick: (val: number) => void,
    estimation: Optional<number>
}

function EstimationOptions({ options, onClick, className, estimation }: Props) {
    return (
        <>
            <Headline.h3 className="hidden mb-6 md:block">Make Estimation</Headline.h3>
            <div className={ `grid gap-3 grid-cols-4 xl:grid-cols-8 md:gap-5 ${ className }` }>
                {
                    options.map((option: EstimationOption) => (
                        <button key={ option.numeric } onClick={ () => onClick(option.numeric) } className={ `aspect-square rounded-xl text-xl  border-steel-400 transition-all border shadow-2xl hover:bg-steel-400 hover:scale-105 active:bg-sky-700 ${ estimation === option.numeric ? 'bg-sky-700' : 'bg-steel-500' }` }>{ option.label }</button>
                    ))
                }
            </div>
        </>
    )
}

export default EstimationOptions