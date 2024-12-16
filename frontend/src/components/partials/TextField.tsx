import { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface Props extends PropsWithChildren {
    state: [string, Dispatch<SetStateAction<string>>]
    name: string
}

function TextField(props: Props) {
    const [state, setState] = props.state;
    return (
        <div className="w-full flex flex-col items-start gap-2 mb-3">
            <label className="font-bold" htmlFor="name">{ props.children }</label>
            <input className="w-full max-w-[400px] rounded px-3 py-2 bg-steel-100 text-steel-800" type="text" id="name" value={ state } onChange={ (event) => setState(event.target.value) } />
        </div>
    )
}

export default TextField;