import { Message as IMessage } from "../../types/Message"

interface Props extends IMessage {
    onEnd: (id: number) => void
}

function Message({ id, text, onEnd }: Props) {
    return (
        <li onClick={ () => onEnd(id) } className="relative overflow-hidden bg-steel-400 roundend full px-3 py-2">
            { text }
            <div className="w-full h-px bg-sky-700"></div>
        </li>
    )
}

export default Message