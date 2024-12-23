import { useState } from "react";
import Headline from "../partials/Headline";
import InputField from "../partials/InputField";
import Button from "../partials/Button";
import { UIComponentProps } from "../../types/UIComponent";

interface Props extends UIComponentProps {
    onClick: (val: number) => void,
}

function Input({ onClick, className }: Props) {
    const [value, setValue] = useState<string>("");
    return (
            <div className={ `flex flex-col md:items-start ${ className }` }>
                <Headline.h3 className="hidden mb-6 md:block">Make Estimation</Headline.h3>
                <InputField type="number" name="name" state={ [value, setValue] }>Estimation</InputField>
                <Button onClick={ () => onClick(parseInt(value)) }>Estimate</Button>
            </div>
    )
}

export default Input