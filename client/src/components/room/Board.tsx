import { useMemo } from "react";
import { procedures } from "../../constants/procedures/procedures";
import { EstimationProcedure } from "../../types/EstimationProcedure";
import { Room } from "../../types/Room";
import { UIComponentProps } from "../../types/UIComponent";
import { User } from "../../types/User";
import Chip from "../partials/Chip";
import Headline from "../partials/Headline";
import Section from "../partials/Section";
import { EstimationOption } from "../../types/EstimationOption";
import { Optional } from "../../types/Optional";

function Board({ users, revealed, procedure, className }: Room & UIComponentProps) {

    const labels = useMemo(() => {
        if (!procedure) return {};
        const proc = procedures.find((p: EstimationProcedure) => p.name === procedure);
        const result = proc?.options.reduce((res: Record<number, string>, option: EstimationOption) => {
            res[option.value] = option.label
            return res;
        }, {})
        return result
      }, [procedure]);

    const format = (estimation: Optional<number>): Optional<string> => {
        if (estimation === undefined) return estimation;
        if (!labels) return estimation.toString();
        return labels[estimation] ?? estimation;
    }

    return (
        <Section>
            <Headline.h3>Board</Headline.h3>
            <ul className={ `grid ${ className } lg:pl-0` }>
                {
                    users.map((user: User) => (
                        <li key={ user.socketId } className="grid grid-cols-2 border-b border-steel-400 px-3 py-5">
                            <div>{ user.name }</div>
                            <div>
                                {
                                    revealed
                                        ? <>{ format(user.estimation) }</>
                                        : user.estimation 
                                            ? <Chip.highlight>ready</Chip.highlight>
                                            : <Chip.default>open</Chip.default>
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </Section>
    )
}

export default Board