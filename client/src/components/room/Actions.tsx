import { UIComponentProps } from "../../types/UIComponent";
import Button from "../partials/Button";

interface Props extends UIComponentProps {
    onReveal: () => void;
    onReset: () => void;
}

function Actions({ onReset, onReveal, className }: Props) {
    return (
        <div className={ `w-full flex gap-4 items-center justify-center ${ className }` }>
            <Button.subtle onClick={ onReveal }>Reveal</Button.subtle>
            <Button.subtle onClick={ onReset }>Reset</Button.subtle>
        </div>
    )
}

export default Actions