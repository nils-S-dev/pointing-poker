import { Room } from "../../types/Room";
import { UIComponentProps } from "../../types/UIComponent";
import { User } from "../../types/User";
import Chip from "../partials/Chip";
import Headline from "../partials/Headline";
import Section from "../partials/Section";

function Board({ users, revealed, className }: Room & UIComponentProps) {
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
                                        ? <>{ user.estimation }</>
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