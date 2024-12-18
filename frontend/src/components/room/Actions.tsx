import { SubtleButton } from "../partials/Button";

interface Props {
    onReveal: () => void;
    onReset: () => void;
    className?: string;
}

function Actions({ onReset, onReveal, className }: Props) {
    return (
        <div className={ `w-full flex gap-4 items-center justify-center ${ className }` }>
            <SubtleButton onClick={ onReveal }>Reveal</SubtleButton>
            <SubtleButton onClick={ onReset }>Reset</SubtleButton>
        </div>
    )
}

export default Actions