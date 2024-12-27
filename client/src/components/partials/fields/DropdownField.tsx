import { Dispatch, SetStateAction, useRef, useState } from "react";
import { DropdownOption } from "../../../types/DropdownOption";
import { UIComponentProps } from "../../../types/UIComponent";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface Props<T> extends UIComponentProps {
    state: [DropdownOption<T>, Dispatch<SetStateAction<DropdownOption<T>>>]
    placeholder?: string
    options: Array<DropdownOption<T>>
    name: string
}

function DropdownField<T>({ className, state, children, placeholder = "...", options, name }: Props<T>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [s, setS] = state;
    const container = useRef(null);

    useOutsideClick(container, () => {
        setIsOpen(false);
    })

    return (
        <div ref={ container } className={ `flex flex-col w-full gap-2 mb-3 ${ className }` }>
            <label className="font-bold" htmlFor={ name }>{ children }</label>
            <div 
                id={ name }
                className={ `w-full max-w-[400px] px-3 py-2 h-10 cursor-pointer bg-steel-100 text-steel-800 relative flex items-center justify-start rounded ${ isOpen ? 'rounded-b-none' : '' }`}
                onClick={ () => setIsOpen(!isOpen) }    
                tabIndex={ 0 }
                onFocus={ () => setIsOpen(true) }
                onBlur={ () => setIsOpen(false) }
            >
                <span>{ s?.label ?? placeholder }</span>
                <span className={ `text-xl transition-transform absolute top-1/2 right-4 -translate-y-1/2 ${ isOpen ? 'rotate-90' : '-rotate-90' }` }>❯</span>
                <ul className={ `w-full rounded-b transition-all justify-start bg-steel-100 text-steel-800 flex flex-col absolute left-0 top-full overflow-auto ${ isOpen ? 'max-h-[150px]' : 'max-h-[0]'}` }>
                    {
                        options.map((option: DropdownOption<T>) => (
                            <li 
                                tabIndex={ isOpen ? 0 : 1 } 
                                key={ option.label }
                                className="w-full text-left px-3 py-2 transition-colors coursor-pointer hover:bg-steel-50 hover:text-steel-700" 
                                onClick={ () => setS(option) }>
                                    { option.label }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default DropdownField;