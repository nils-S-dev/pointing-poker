import { useState } from "react";
import Headline from "../partials/Headline";
import InputField from "../partials/fields/TextField";
import Button from "../partials/Button";
import { UIComponentProps } from "../../types/UIComponent";

interface Props extends UIComponentProps {
    onClick: (val: number) => void,
}

function EstimationInput({ onClick, className }: Props) {
    const [value, setValue] = useState<string>("");
    return (
            <div className={ `flex flex-col md:items-start ${ className }` }>
                <Headline.h3 className="hidden mb-6 md:block">Make Estimation</Headline.h3>
                <InputField type="number" name="name" state={ [value, setValue] }></InputField>
                <Button.default onClick={ () => onClick(parseInt(value)) }>Estimate</Button.default>
            </div>
    )
}

export default EstimationInput