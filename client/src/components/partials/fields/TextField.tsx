import { Dispatch, SetStateAction } from "react";
import { UIComponentProps } from "../../../types/UIComponent";

interface Props extends UIComponentProps {
    state: [string, Dispatch<SetStateAction<string>>]
    name: string,
    type: "text"|"number"
}

function InputField(props: Props) {
    const [state, setState] = props.state;
    return (
        <div className={ `w-full flex flex-col items-start gap-2 ${ props.className }` }>
            <label className="font-bold" htmlFor="name">{ props.children }</label>
            <input className="w-full rounded px-3 py-2 bg-steel-100 text-steel-800 lg:max-w-[400px]" type={ props.type } id="name" value={ state } onChange={ (event) => setState(event.target.value) } />
        </div>
    )
}

export default InputField;